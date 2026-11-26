import { Router } from "express";
import { sqlGet, sqlAll, sqlRun } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import {
  getCourseAccessState,
  userCanAccessMaterial,
  computeCourseProgress,
} from "../lib/access.js";

const router = Router();

router.get("/", async (req, res) => {
  const userId = req.session?.userId || null;
  const courses = await sqlAll(
    `SELECT * FROM courses WHERE is_active = 1 ORDER BY sort_order, id`,
  );

  const items = await Promise.all(
    courses.map(async (course) => {
      const access = await getCourseAccessState(userId, course);
      const progress = await computeCourseProgress(userId, course.id);
      return {
        ...course,
        access,
        progress,
      };
    }),
  );

  res.json({ courses: items });
});

router.get("/materials/:materialId", requireAuth, async (req, res) => {
  const check = await userCanAccessMaterial(req.session.userId, Number(req.params.materialId));
  if (!check.allowed) {
    const messages = {
      not_found: "Материал не найден.",
      no_course_access: "Нет доступа к этому курсу.",
      sequential_lock: "Сначала завершите предыдущий обязательный материал.",
    };
    return res.status(403).json({
      error: messages[check.reason] || "Доступ запрещён.",
      reason: check.reason,
      blockedBy: check.blockedBy,
    });
  }

  const course = await sqlGet(`SELECT * FROM courses WHERE id = ?`, [check.material.course_id]);
  const siblings = await sqlAll(
    `SELECT id, title, sort_order FROM materials
     WHERE course_id = ? AND is_active = 1 ORDER BY sort_order`,
    [check.material.course_id],
  );

  const prog = await sqlGet(
    `SELECT status, completed_at FROM material_progress WHERE user_id = ? AND material_id = ?`,
    [req.session.userId, check.material.id],
  );

  res.json({
    material: check.material,
    course,
    progress: prog || { status: "not_started" },
    siblings,
  });
});

router.post("/materials/:materialId/progress", requireAuth, async (req, res) => {
  const { status, metadata } = req.body || {};
  if (!["in_progress", "completed"].includes(status)) {
    return res.status(400).json({ error: "Недопустимый статус." });
  }

  const check = await userCanAccessMaterial(req.session.userId, Number(req.params.materialId));
  if (!check.allowed) {
    return res.status(403).json({ error: "Нет доступа к материалу." });
  }

  const completed_at = status === "completed" ? new Date().toISOString() : null;
  await sqlRun(
    `INSERT INTO material_progress (user_id, material_id, status, completed_at, metadata, updated_at)
     VALUES (?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(user_id, material_id) DO UPDATE SET
       status = excluded.status,
       completed_at = excluded.completed_at,
       metadata = excluded.metadata,
       updated_at = datetime('now')`,
    [
      req.session.userId,
      check.material.id,
      status,
      completed_at,
      metadata ? JSON.stringify(metadata) : null,
    ],
  );

  const progress = await computeCourseProgress(req.session.userId, check.material.course_id);
  res.json({ ok: true, progress });
});

router.get("/:id", requireAuth, async (req, res) => {
  const course = await sqlGet(`SELECT * FROM courses WHERE id = ? AND is_active = 1`, [req.params.id]);
  if (!course) return res.status(404).json({ error: "Курс не найден." });

  const access = await getCourseAccessState(req.session.userId, course);
  const progress = await computeCourseProgress(req.session.userId, course.id);

  const materials = await sqlAll(
    `SELECT * FROM materials WHERE course_id = ? AND is_active = 1 ORDER BY sort_order`,
    [course.id],
  );

  let sequentialLocked = false;
  const enriched = [];
  for (const m of materials) {
    let locked = false;
    if (sequentialLocked) {
      locked = true;
    } else {
      const check = await userCanAccessMaterial(req.session.userId, m.id);
      locked = !check.allowed;
      if (!check.allowed && check.reason === "sequential_lock") {
        sequentialLocked = true;
      }
    }
    const prog = await sqlGet(
      `SELECT status, completed_at FROM material_progress WHERE user_id = ? AND material_id = ?`,
      [req.session.userId, m.id],
    );
    enriched.push({
      ...m,
      locked: access.canView ? locked : true,
      progress: prog || { status: "not_started", completed_at: null },
    });
  }

  res.json({ course, access, progress, materials: enriched });
});

router.post("/:id/request-access", requireAuth, async (req, res) => {
  const course = await sqlGet(`SELECT * FROM courses WHERE id = ?`, [req.params.id]);
  if (!course) return res.status(404).json({ error: "Курс не найден." });
  if (course.access_mode !== "approval") {
    return res.status(400).json({ error: "Для этого курса не требуется заявка." });
  }

  const existing = await sqlGet(
    `SELECT * FROM course_access WHERE user_id = ? AND course_id = ?`,
    [req.session.userId, course.id],
  );

  if (existing?.status === "granted") {
    return res.json({ status: "granted", message: "Доступ уже открыт." });
  }
  if (existing?.status === "pending") {
    return res.json({ status: "pending", message: "Заявка уже на рассмотрении." });
  }

  await sqlRun(
    `INSERT INTO course_access (user_id, course_id, status, requested_at)
     VALUES (?, ?, 'pending', datetime('now'))
     ON CONFLICT(user_id, course_id) DO UPDATE SET
       status = 'pending',
       requested_at = datetime('now'),
       admin_comment = NULL,
       decided_at = NULL,
       decided_by = NULL`,
    [req.session.userId, course.id],
  );

  res.json({ status: "pending", message: "Заявка отправлена администратору." });
});

export default router;