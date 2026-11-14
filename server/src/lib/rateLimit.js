import { db } from "../db.js";

const WINDOW_MINUTES = 15;
const MAX_ATTEMPTS = 10;

export function recordLoginAttempt(identifier) {
  db.prepare(`INSERT INTO login_attempts (identifier) VALUES (?)`).run(identifier);
  db.prepare(
    `DELETE FROM login_attempts WHERE attempted_at < datetime('now', '-${WINDOW_MINUTES} minutes')`,
  ).run();
}

export function isLoginBlocked(identifier) {
  const row = db
    .prepare(
      `SELECT COUNT(*) AS c FROM login_attempts
       WHERE identifier = ? AND attempted_at > datetime('now', '-${WINDOW_MINUTES} minutes')`,
    )
    .get(identifier);
  return row.c >= MAX_ATTEMPTS;
}

export function clearLoginAttempts(identifier) {
  db.prepare(`DELETE FROM login_attempts WHERE identifier = ?`).run(identifier);
}