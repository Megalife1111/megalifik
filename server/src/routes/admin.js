import { Router } from "express";
import { sqlGet, sqlAll, sqlRun } from "../db.js";
import { requireAdmin } from "../middleware/auth.js";
import { computeCourseProgress } from "../lib/access.js";

const router = Router();
router.use(requireAdmin);

router.get("/users", async (req, res) => {
  const { q, status, role } = req.query;
  let sql = `SELECT id, email, phone, name, role, status, created_at FROM users WHERE 1=1`;
  const params = [];

  if (q) {
    sql += ` AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)`;
    const like = `%${q}%`;
    params.push(like, like, like);
  }
  if (status) {
    sql += ` AND status = ?`;
    params.push(status);
  }
  if (role) {
    sql += ` AND role = ?`;
    params.push(role);
  }
  sql += ` ORDER BY created_at DESC LIMIT 200`;

  const users = await sqlAll(sql, params);
  res.json({ users });
});

router.get("/users/:id", async (req, res) => {
  const user = await sqlGet(
    `SELECT id, email, phone, name, role, status, created_at FROM users WHERE id = ?`,
    [req.params.id],
  );
  if (!user) return res.status(404).json({ error: "Пользователь не найден." });

  const courses = await sqlAll(`SELECT * FROM courses WHERE is_active = 1 ORDER BY sort_order`);
  const courseStats = await Promise.all(
    courses.map(async (c) => {
      const access = await sqlGet(
        `SELECT * FROM course_access WHERE user_id = ? AND course_id = ?`,
        [user.id, c.id],
      );
      const progress = await computeCourseProgress(user.id, c.id);
      return { course: c, access, progress };
    }),
  );

  const lastProgress = await sqlGet(
    `SELECT p.*, m.title AS material_title, c.title AS course_title
     FROM material_progress p
     JOIN materials m ON m.id = p.material_id
     JOIN courses c ON c.id = m.course_id
     WHERE p.user_id = ? AND p.status = 'completed'
     ORDER BY p.completed_at DESC LIMIT 1`,
    [user.id],
  );

  res.json({ user, courseStats, lastProgress });
});

router.patch("/users/:id", async (req, res) => {
  const { role, status } = req.body || {};
  const user = await sqlGet(`SELECT * FROM users WHERE id = ?`, [req.params.id]);
  if (!user) return res.status(404).json({ error: "Пользователь не найден." });

  if (role && !["user", "admin"].includes(role)) {
    return res.status(400).json({ error: "Недопустимая роль." });
  }
  if (status && !["active", "blocked"].includes(status)) {
    return res.status(400).json({ error: "Недопустимый статус." });
  }

  await sqlRun(
    `UPDATE users SET
      role = COALESCE(?, role),
      status = COALESCE(?, status),
      updated_at = datetime('now')
     WHERE id = ?`,
    [role || null, status || null, user.id],
  );

  const updated = await sqlGet(
    `SELECT id, email, phone, name, role, status, created_at FROM users WHERE id = ?`,
    [user.id],
  );
  res.json({ user: updated });
});

router.get("/access-requests", async (_req, res) => {
  const rows = await sqlAll(
    `SELECT ca.*, u.name AS user_name, u.email, u.phone, c.title AS course_title
     FROM course_access ca
     JOIN users u ON u.id = ca.user_id
     JOIN courses c ON c.id = ca.course_id
     WHERE ca.status = 'pending'
     ORDER BY ca.requested_at DESC`,
  );
  res.json({ requests: rows });
});

router.post("/access", async (req, res) => {
  const { user_id, course_id, status, admin_comment } = req.body || {};
  if (!user_id || !course_id || !["granted", "rejected", "blocked"].includes(status)) {
    return res.status(400).json({ error: "Некорректные параметры доступа." });
  }

  await sqlRun(
    `INSERT INTO course_access (user_id, course_id, status, admin_comment, decided_by, decided_at)
     VALUES (?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(user_id, course_id) DO UPDATE SET
       status = excluded.status,
       admin_comment = excluded.admin_comment,
       decided_by = excluded.decided_by,
       decided_at = datetime('now')`,
    [user_id, course_id, status, admin_comment || null, req.session.userId],
  );

  res.json({ ok: true });
});

router.get("/courses", async (_req, res) => {
  const courses = await sqlAll(`SELECT * FROM courses ORDER BY sort_order, id`);
  res.json({ courses });
});

router.post("/courses", async (req, res) => {
  const { slug, title, description, sort_order, access_mode, theme, legacy_index_path } =
    req.body || {};
  if (!slug || !title) {
    return res.status(400).json({ error: "Укажите slug и название." });
  }
  try {
    const r = await sqlRun(
      `INSERT INTO courses (slug, title, description, sort_order, access_mode, theme, legacy_index_path)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        slug,
        title,
        description || null,
        sort_order ?? 0,
        access_mode || "closed",
        theme || null,
        legacy_index_path || null,
      ],
    );
    const course = await sqlGet(`SELECT * FROM courses WHERE id = ?`, [r.lastInsertRowid]);
    res.status(201).json({ course });
  } catch (e) {
    return res.status(409).json({ error: "Курс с таким slug уже существует." });
  }
});

router.patch("/courses/:id", async (req, res) => {
  const course = await sqlGet(`SELECT * FROM courses WHERE id = ?`, [req.params.id]);
  if (!course) return res.status(404).json({ error: "Курс не найден." });

  const fields = ["title", "description", "sort_order", "access_mode", "theme", "legacy_index_path", "is_active"];
  const updates = [];
  const params = [];
  for (const f of fields) {
    if (req.body[f] !== undefined) {
      updates.push(`${f} = ?`);
      params.push(req.body[f]);
    }
  }
  if (!updates.length) return res.status(400).json({ error: "Нет полей для обновления." });
  updates.push(`updated_at = datetime('now')`);
  params.push(course.id);
  await sqlRun(`UPDATE courses SET ${updates.join(", ")} WHERE id = ?`, params);
  const updated = await sqlGet(`SELECT * FROM courses WHERE id = ?`, [course.id]);
  res.json({ course: updated });
});

router.delete("/courses/:id", async (req, res) => {
  await sqlRun(`UPDATE courses SET is_active = 0, updated_at = datetime('now') WHERE id = ?`, [
    req.params.id,
  ]);
  res.json({ ok: true });
});

router.get("/courses/:id/materials", async (req, res) => {
  const materials = await sqlAll(
    `SELECT * FROM materials WHERE course_id = ? ORDER BY sort_order`,
    [req.params.id],
  );
  res.json({ materials });
});

router.post("/courses/:id/materials", async (req, res) => {
  const { title, description, sort_order, content_url, is_required } = req.body || {};
  if (!title || !content_url) {
    return res.status(400).json({ error: "Укажите название и URL материала." });
  }
  const r = await sqlRun(
    `INSERT INTO materials (course_id, title, description, sort_order, content_url, is_required)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      req.params.id,
      title,
      description || null,
      sort_order ?? 999,
      content_url,
      is_required === false ? 0 : 1,
    ],
  );
  const material = await sqlGet(`SELECT * FROM materials WHERE id = ?`, [r.lastInsertRowid]);
  res.status(201).json({ material });
});

router.patch("/materials/:id", async (req, res) => {
  const material = await sqlGet(`SELECT * FROM materials WHERE id = ?`, [req.params.id]);
  if (!material) return res.status(404).json({ error: "Материал не найден." });

  const fields = ["title", "description", "sort_order", "content_url", "is_required", "is_active"];
  const updates = [];
  const params = [];
  for (const f of fields) {
    if (req.body[f] !== undefined) {
      updates.push(`${f} = ?`);
      params.push(req.body[f]);
    }
  }
  if (!updates.length) return res.status(400).json({ error: "Нет полей для обновления." });
  updates.push(`updated_at = datetime('now')`);
  params.push(material.id);
  await sqlRun(`UPDATE materials SET ${updates.join(", ")} WHERE id = ?`, params);
  const updated = await sqlGet(`SELECT * FROM materials WHERE id = ?`, [material.id]);
  res.json({ material: updated });
});

router.delete("/materials/:id", async (req, res) => {
  await sqlRun(`UPDATE materials SET is_active = 0, updated_at = datetime('now') WHERE id = ?`, [
    req.params.id,
  ]);
  res.json({ ok: true });
});

router.get("/progress", async (_req, res) => {
  const users = await sqlAll(
    `SELECT id, name, email, phone FROM users WHERE role = 'user' ORDER BY name LIMIT 100`,
  );
  const courses = await sqlAll(`SELECT id, title FROM courses WHERE is_active = 1`);
  const data = await Promise.all(
    users.map(async (u) => {
      const items = await Promise.all(
        courses.map(async (c) => ({
          course: c,
          progress: await computeCourseProgress(u.id, c.id),
        })),
      );
      return { user: u, courses: items };
    }),
  );
  res.json({ overview: data });
});

export default router;