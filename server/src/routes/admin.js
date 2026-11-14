import { Router } from "express";
import { db } from "../db.js";
import { requireAdmin } from "../middleware/auth.js";
import { computeCourseProgress } from "../lib/access.js";

const router = Router();
router.use(requireAdmin);

router.get("/users", (req, res) => {
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

  const users = db.prepare(sql).all(...params);
  res.json({ users });
});

router.get("/users/:id", (req, res) => {
  const user = db
    .prepare(`SELECT id, email, phone, name, role, status, created_at FROM users WHERE id = ?`)
    .get(req.params.id);
  if (!user) return res.status(404).json({ error: "Пользователь не найден." });

  const courses = db.prepare(`SELECT * FROM courses WHERE is_active = 1 ORDER BY sort_order`).all();
  const courseStats = courses.map((c) => {
    const access = db
      .prepare(`SELECT * FROM course_access WHERE user_id = ? AND course_id = ?`)
      .get(user.id, c.id);
    const progress = computeCourseProgress(user.id, c.id);
    return { course: c, access, progress };
  });

  const lastProgress = db
    .prepare(
      `SELECT p.*, m.title AS material_title, c.title AS course_title
       FROM material_progress p
       JOIN materials m ON m.id = p.material_id
       JOIN courses c ON c.id = m.course_id
       WHERE p.user_id = ? AND p.status = 'completed'
       ORDER BY p.completed_at DESC LIMIT 1`,
    )
    .get(user.id);

  res.json({ user, courseStats, lastProgress });
});

router.patch("/users/:id", (req, res) => {
  const { role, status } = req.body || {};
  const user = db.prepare(`SELECT * FROM users WHERE id = ?`).get(req.params.id);
  if (!user) return res.status(404).json({ error: "Пользователь не найден." });

  if (role && !["user", "admin"].includes(role)) {
    return res.status(400).json({ error: "Недопустимая роль." });
  }
  if (status && !["active", "blocked"].includes(status)) {
    return res.status(400).json({ error: "Недопустимый статус." });
  }

  db.prepare(
    `UPDATE users SET
      role = COALESCE(?, role),
      status = COALESCE(?, status),
      updated_at = datetime('now')
     WHERE id = ?`,
  ).run(role || null, status || null, user.id);

  const updated = db
    .prepare(`SELECT id, email, phone, name, role, status, created_at FROM users WHERE id = ?`)
    .get(user.id);
  res.json({ user: updated });
});

router.get("/access-requests", (_req, res) => {
  const rows = db
    .prepare(
      `SELECT ca.*, u.name AS user_name, u.email, u.phone, c.title AS course_title
       FROM course_access ca
       JOIN users u ON u.id = ca.user_id
       JOIN courses c ON c.id = ca.course_id
       WHERE ca.status = 'pending'
       ORDER BY ca.requested_at DESC`,
    )
    .all();
  res.json({ requests: rows });
});

router.post("/access", (req, res) => {
  const { user_id, course_id, status, admin_comment } = req.body || {};
  if (!user_id || !course_id || !["granted", "rejected", "blocked"].includes(status)) {
    return res.status(400).json({ error: "Некорректные параметры доступа." });
  }

  db.prepare(
    `INSERT INTO course_access (user_id, course_id, status, admin_comment, decided_by, decided_at)
     VALUES (?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(user_id, course_id) DO UPDATE SET
       status = excluded.status,
       admin_comment = excluded.admin_comment,
       decided_by = excluded.decided_by,
       decided_at = datetime('now')`,
  ).run(user_id, course_id, status, admin_comment || null, req.session.userId);

  res.json({ ok: true });
});

router.get("/courses", (_req, res) => {
  const courses = db
    .prepare(`SELECT * FROM courses ORDER BY sort_order, id`)
    .all();
  res.json({ courses });
});

router.post("/courses", (req, res) => {
  const { slug, title, description, sort_order, access_mode, theme, legacy_index_path } =
    req.body || {};
  if (!slug || !title) {
    return res.status(400).json({ error: "Укажите slug и название." });
  }
  try {
    const r = db
      .prepare(
        `INSERT INTO courses (slug, title, description, sort_order, access_mode, theme, legacy_index_path)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        slug,
        title,
        description || null,
        sort_order ?? 0,
        access_mode || "closed",
        theme || null,
        legacy_index_path || null,
      );
    const course = db.prepare(`SELECT * FROM courses WHERE id = ?`).get(r.lastInsertRowid);
    res.status(201).json({ course });
  } catch (e) {
    return res.status(409).json({ error: "Курс с таким slug уже существует." });
  }
});

router.patch("/courses/:id", (req, res) => {
  const course = db.prepare(`SELECT * FROM courses WHERE id = ?`).get(req.params.id);
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
  db.prepare(`UPDATE courses SET ${updates.join(", ")} WHERE id = ?`).run(...params);
  const updated = db.prepare(`SELECT * FROM courses WHERE id = ?`).get(course.id);
  res.json({ course: updated });
});

router.delete("/courses/:id", (req, res) => {
  db.prepare(`UPDATE courses SET is_active = 0, updated_at = datetime('now') WHERE id = ?`).run(
    req.params.id,
  );
  res.json({ ok: true });
});

router.get("/courses/:id/materials", (req, res) => {
  const materials = db
    .prepare(`SELECT * FROM materials WHERE course_id = ? ORDER BY sort_order`)
    .all(req.params.id);
  res.json({ materials });
});

router.post("/courses/:id/materials", (req, res) => {
  const { title, description, sort_order, content_url, is_required } = req.body || {};
  if (!title || !content_url) {
    return res.status(400).json({ error: "Укажите название и URL материала." });
  }
  const r = db
    .prepare(
      `INSERT INTO materials (course_id, title, description, sort_order, content_url, is_required)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .run(
      req.params.id,
      title,
      description || null,
      sort_order ?? 999,
      content_url,
      is_required === false ? 0 : 1,
    );
  const material = db.prepare(`SELECT * FROM materials WHERE id = ?`).get(r.lastInsertRowid);
  res.status(201).json({ material });
});

router.patch("/materials/:id", (req, res) => {
  const material = db.prepare(`SELECT * FROM materials WHERE id = ?`).get(req.params.id);
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
  db.prepare(`UPDATE materials SET ${updates.join(", ")} WHERE id = ?`).run(...params);
  const updated = db.prepare(`SELECT * FROM materials WHERE id = ?`).get(material.id);
  res.json({ material: updated });
});

router.delete("/materials/:id", (req, res) => {
  db.prepare(`UPDATE materials SET is_active = 0, updated_at = datetime('now') WHERE id = ?`).run(
    req.params.id,
  );
  res.json({ ok: true });
});

router.get("/progress", (req, res) => {
  const users = db
    .prepare(`SELECT id, name, email, phone FROM users WHERE role = 'user' ORDER BY name LIMIT 100`)
    .all();
  const data = users.map((u) => {
    const courses = db.prepare(`SELECT id, title FROM courses WHERE is_active = 1`).all();
    const items = courses.map((c) => ({
      course: c,
      progress: computeCourseProgress(u.id, c.id),
    }));
    return { user: u, courses: items };
  });
  res.json({ overview: data });
});

export default router;