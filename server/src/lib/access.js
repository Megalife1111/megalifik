import { sqlGet, sqlAll } from "../db.js";

export async function getCourseAccessState(userId, course) {
  if (!userId) {
    return { canView: false, status: "login_required", canRequest: false };
  }

  if (course.access_mode === "open") {
    return { canView: true, status: "granted", canRequest: false };
  }

  if (course.access_mode === "closed") {
    return { canView: false, status: "blocked", canRequest: false };
  }

  const row = await sqlGet(
    `SELECT status, admin_comment FROM course_access WHERE user_id = ? AND course_id = ?`,
    [userId, course.id],
  );

  if (course.access_mode === "selected") {
    if (row?.status === "granted") {
      return { canView: true, status: "granted", canRequest: false, comment: row.admin_comment };
    }
    if (row?.status === "blocked") {
      return { canView: false, status: "blocked", canRequest: false, comment: row.admin_comment };
    }
    return { canView: false, status: "no_access", canRequest: false };
  }

  if (course.access_mode === "approval") {
    if (row?.status === "granted") {
      return { canView: true, status: "granted", canRequest: false, comment: row.admin_comment };
    }
    if (row?.status === "pending") {
      return { canView: false, status: "pending", canRequest: false, comment: row.admin_comment };
    }
    if (row?.status === "rejected" || row?.status === "blocked") {
      return {
        canView: false,
        status: row.status,
        canRequest: row.status === "rejected",
        comment: row.admin_comment,
      };
    }
    return { canView: false, status: "can_request", canRequest: true };
  }

  return { canView: false, status: "unknown", canRequest: false };
}

export async function userCanAccessMaterial(userId, materialId) {
  const material = await sqlGet(
    `SELECT m.*, c.access_mode, c.id AS course_id
     FROM materials m
     JOIN courses c ON c.id = m.course_id
     WHERE m.id = ? AND m.is_active = 1 AND c.is_active = 1`,
    [materialId],
  );

  if (!material) return { allowed: false, reason: "not_found" };

  const course = {
    id: material.course_id,
    access_mode: material.access_mode,
  };
  const access = await getCourseAccessState(userId, course);
  if (!access.canView) {
    return { allowed: false, reason: "no_course_access", material };
  }

  const prevRequired = await sqlGet(
    `SELECT m.id FROM materials m
     LEFT JOIN material_progress p ON p.material_id = m.id AND p.user_id = ?
     WHERE m.course_id = ? AND m.is_active = 1 AND m.is_required = 1
       AND m.sort_order < ?
       AND COALESCE(p.status, 'not_started') != 'completed'
     ORDER BY m.sort_order ASC LIMIT 1`,
    [userId, material.course_id, material.sort_order],
  );

  if (prevRequired) {
    return { allowed: false, reason: "sequential_lock", material, blockedBy: prevRequired.id };
  }

  return { allowed: true, material };
}

export async function computeCourseProgress(userId, courseId) {
  const courseRow = await sqlGet(`SELECT access_mode FROM courses WHERE id = ?`, [courseId]);
  if (!courseRow) return null;

  const totalRow = await sqlGet(
    `SELECT COUNT(*) AS c FROM materials WHERE course_id = ? AND is_active = 1`,
    [courseId],
  );
  const total = totalRow?.c ?? 0;

  const course = { id: courseId, access_mode: courseRow.access_mode };
  const state = await getCourseAccessState(userId, course);
  if (!state.canView) {
    return { percent: 0, completed: 0, total, accessible: false };
  }

  const completedRow = await sqlGet(
    `SELECT COUNT(*) AS c
     FROM material_progress p
     JOIN materials m ON m.id = p.material_id
     WHERE p.user_id = ? AND m.course_id = ? AND m.is_active = 1 AND p.status = 'completed'`,
    [userId, courseId],
  );
  const completed = completedRow?.c ?? 0;

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { percent, completed, total, accessible: true };
}