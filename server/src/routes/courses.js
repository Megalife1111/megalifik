import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import {
  getCourseAccessState,
  userCanAccessMaterial,
  computeCourseProgress,
} from "../lib/access.js";

const router = Router();

router.get("/", (req, res) => {
  const userId = req.session?.userId || null;
  const courses = db
    .prepare(
      `SELECT * FROM courses WHERE is_active = 1 ORDER BY sort_order, id`,
    )
    .all();

  const items = courses.map((course) => {
    const access = getCourseAccessState(userId, course);
    const progress = computeCourseProgress(userId, course.id);
    return {
      ...course,
      access,
      progress,
    };
  });

  res.json({ courses: items });
});

router.get("/materials/:materialId", requireAuth, (req, res) => {
  const check = userCanAccessMaterial(req.session.userId, Number(req.params.materialId));
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

  const course = db
    .prepare(`SELECT * FROM courses WHERE id = ?`)
    .get(check.material.course_id);
  const siblings = db
    .prepare(
      `SELECT id, title, sort_order FROM materials
       WHERE course_id = ? AND is_active = 1 ORDER BY sort_order`,
    )
    .all(check.material.course_id);

  const prog = db
    .prepare(
      `SELECT status, completed_at FROM material_progress WHERE user_id = ? AND material_id = ?`,
    )
    .get(req.session.userId, check.material.id);

  res.json({
    material: check.material,
    course,
    progress: prog || { status: "not_started" },
    siblings,
  });
});

router.post("/materials/:materialId/progress", requireAuth, (req, res) => {
  const { status, metadata } = req.body || {};
  if (!["in_progress", "completed"].includes(status)) {
    return res.status(400).json({ error: "Недопустимый статус." });
  }

  const check = userCanAccessMaterial(req.session.userId, Number(req.params.materialId));
  if (!check.allowed) {
    return res.status(403).json({ error: "Нет доступа к материалу." });
  }

  const completed_at = status === "completed" ? new Date().toISOString() : null;
  db.prepare(
    `INSERT INTO material_progress (user_id, material_id, status, completed_at, metadata, updated_at)
     VALUES (?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(user_id, material_id) DO UPDATE SET
       status = excluded.status,
       completed_at = excluded.completed_at,
       metadata = excluded.metadata,
       updated_at = datetime('now')`,
  ).run(
    req.session.userId,
    check.material.id,
    status,
    completed_at,
    metadata ? JSON.stringify(metadata) : null,
  );

  const progress = computeCourseProgress(req.session.userId, check.material.course_id);
  res.json({ ok: true, progress });
});

router.get("/:id", requireAuth, (req, res) => {
  const course = db
    .prepare(`SELECT * FROM courses WHERE id = ? AND is_active = 1`)
    .get(req.params.id);
  if (!course) return res.status(404).json({ error: "Курс не найден." });

  const access = getCourseAccessState(req.session.userId, course);
  const progress = computeCourseProgress(req.session.userId, course.id);

  const materials = db
    .prepare(
      `SELECT * FROM materials WHERE course_id = ? AND is_active = 1 ORDER BY sort_order`,
    )
    .all(course.id);

  let sequentialLocked = false;
  const enriched = materials.map((m) => {
    let locked = false;
    if (sequentialLocked) {
      locked = true;
    } else {
      const check = userCanAccessMaterial(req.session.userId, m.id);
      locked = !check.allowed;
      if (!check.allowed && check.reason === "sequential_lock") {
        sequentialLocked = true;
      }
    }
    const prog = db
      .prepare(
        `SELECT status, completed_at FROM material_progress WHERE user_id = ? AND material_id = ?`,
      )
      .get(req.session.userId, m.id);

    return {
      ...m,
      locked: access.canView ? locked : true,
      progress: prog || { status: "not_started", completed_at: null },
    };
  });

  res.json({ course, access, progress, materials: enriched });
});

router.post("/:id/request-access", requireAuth, (req, res) => {
  const course = db.prepare(`SELECT * FROM courses WHERE id = ?`).get(req.params.id);
  if (!course) return res.status(404).json({ error: "Курс не найден." });
  if (course.access_mode !== "approval") {
    return res.status(400).json({ error: "Для этого курса не требуется заявка." });
  }

  const existing = db
    .prepare(`SELECT * FROM course_access WHERE user_id = ? AND course_id = ?`)
    .get(req.session.userId, course.id);

  if (existing?.status === "granted") {
    return res.json({ status: "granted", message: "Доступ уже открыт." });
  }
  if (existing?.status === "pending") {
    return res.json({ status: "pending", message: "Заявка уже на рассмотрении." });
  }

  db.prepare(
    `INSERT INTO course_access (user_id, course_id, status, requested_at)
     VALUES (?, ?, 'pending', datetime('now'))
     ON CONFLICT(user_id, course_id) DO UPDATE SET
       status = 'pending',
       requested_at = datetime('now'),
       admin_comment = NULL,
       decided_at = NULL,
       decided_by = NULL`,
  ).run(req.session.userId, course.id);

  res.json({ status: "pending", message: "Заявка отправлена администратору." });
});

export default router;