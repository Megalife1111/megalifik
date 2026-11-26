import { sqlRun, sqlGet } from "../db.js";

const WINDOW_MINUTES = 15;
const MAX_ATTEMPTS = 10;

export async function recordLoginAttempt(identifier) {
  await sqlRun(`INSERT INTO login_attempts (identifier) VALUES (?)`, [identifier]);
  await sqlRun(
    `DELETE FROM login_attempts WHERE attempted_at < datetime('now', '-${WINDOW_MINUTES} minutes')`,
  );
}

export async function isLoginBlocked(identifier) {
  const row = await sqlGet(
    `SELECT COUNT(*) AS c FROM login_attempts
     WHERE identifier = ? AND attempted_at > datetime('now', '-${WINDOW_MINUTES} minutes')`,
    [identifier],
  );
  return (row?.c ?? 0) >= MAX_ATTEMPTS;
}

export async function clearLoginAttempts(identifier) {
  await sqlRun(`DELETE FROM login_attempts WHERE identifier = ?`, [identifier]);
}