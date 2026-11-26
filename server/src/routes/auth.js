import { Router } from "express";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import crypto from "crypto";
import { sqlGet, sqlRun } from "../db.js";
import { normalizeEmail, validatePassword, parseLoginIdentifier } from "../lib/validation.js";
import { validateRegistration } from "../lib/register-validation.js";
import {
  recordLoginAttempt,
  isLoginBlocked,
  clearLoginAttempts,
} from "../lib/rateLimit.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
const SESSION_COOKIE = "megalife.sid";

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function setUserSession(req, user) {
  req.session.userId = user.id;
  req.session.userRole = user.role;
  req.session.userName = user.name;
  req.session.userStatus = user.status;
}

async function publicUser(user) {
  const child = await sqlGet(`SELECT first_name, last_name, age, grade FROM children WHERE user_id = ?`, [
    user.id,
  ]);
  return {
    id: user.id,
    name: user.name,
    parent_first_name: user.parent_first_name,
    parent_last_name: user.parent_last_name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
    created_at: user.created_at,
    child: child || null,
  };
}

router.get("/csrf", (req, res) => {
  if (!req.session.csrfToken) {
    req.session.csrfToken = nanoid(32);
  }
  res.json({ csrfToken: req.session.csrfToken });
});

router.post("/register", async (req, res) => {
  const validated = validateRegistration(req.body || {});
  if (!validated.ok) {
    return res.status(400).json({ error: "Проверьте поля формы.", errors: validated.errors });
  }
  const d = validated.data;

  const emailTaken = await sqlGet(`SELECT id FROM users WHERE email = ?`, [d.email]);
  if (emailTaken) {
    return res.status(409).json({
      error: "Этот email уже зарегистрирован.",
      errors: { email: "Этот email уже зарегистрирован." },
    });
  }
  const phoneTaken = await sqlGet(`SELECT id FROM users WHERE phone = ?`, [d.phone]);
  if (phoneTaken) {
    return res.status(409).json({
      error: "Этот телефон уже зарегистрирован.",
      errors: { phone: "Этот телефон уже зарегистрирован." },
    });
  }

  const password_hash = bcrypt.hashSync(d.password, 12);
  const result = await sqlRun(
    `INSERT INTO users (email, phone, name, parent_first_name, parent_last_name, password_hash)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [d.email, d.phone, d.name, d.parent_first_name, d.parent_last_name, password_hash],
  );
  const userId = result.lastInsertRowid;
  await sqlRun(
    `INSERT INTO children (user_id, first_name, last_name, age, grade) VALUES (?, ?, ?, ?, ?)`,
    [userId, d.child_first_name, d.child_last_name, d.child_age, d.child_grade],
  );

  const user = await sqlGet(`SELECT * FROM users WHERE id = ?`, [userId]);
  setUserSession(req, user);
  res.status(201).json({ user: await publicUser(user), redirect: "/portal/welcome.html" });
});

router.post("/login", async (req, res) => {
  const { password, email: rawEmail, identifier } = req.body || {};
  const email = normalizeEmail(rawEmail || identifier);
  if (!email) {
    return res.status(400).json({ error: "Укажите корректный email." });
  }

  if (await isLoginBlocked(email)) {
    return res.status(429).json({
      error: "Слишком много попыток входа. Попробуйте позже.",
    });
  }

  const user = await sqlGet(`SELECT * FROM users WHERE email = ?`, [email]);

  if (!user || !bcrypt.compareSync(password || "", user.password_hash)) {
    await recordLoginAttempt(email);
    return res.status(401).json({ error: "Неверный email или пароль." });
  }
  if (user.status === "blocked") {
    return res.status(403).json({ error: "Аккаунт заблокирован." });
  }

  await clearLoginAttempts(email);
  setUserSession(req, user);
  res.json({ user: await publicUser(user), redirect: "/portal/welcome.html" });
});

router.post("/logout", requireAuth, (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Не удалось выйти." });
    res.clearCookie(SESSION_COOKIE);
    res.json({ ok: true });
  });
});

router.get("/me", async (req, res) => {
  if (!req.session?.userId) {
    return res.json({ user: null });
  }
  const user = await sqlGet(`SELECT * FROM users WHERE id = ?`, [req.session.userId]);
  if (!user) {
    req.session.destroy(() => {});
    return res.json({ user: null });
  }
  setUserSession(req, user);
  res.json({ user: await publicUser(user) });
});

router.post("/forgot-password", async (req, res) => {
  const parsed = parseLoginIdentifier(req.body?.identifier);
  if (parsed.error) return res.status(400).json({ error: parsed.error });

  let user = null;
  if (parsed.email) {
    user = await sqlGet(`SELECT * FROM users WHERE email = ?`, [parsed.email]);
  } else {
    user = await sqlGet(`SELECT * FROM users WHERE phone = ?`, [parsed.phone]);
  }

  const generic = {
    message:
      "Если аккаунт существует, мы отправили инструкцию для сброса пароля.",
  };

  if (!user) return res.json(generic);

  await sqlRun(
    `UPDATE password_reset_tokens SET used_at = datetime('now')
     WHERE user_id = ? AND used_at IS NULL`,
    [user.id],
  );

  const token = nanoid(48);
  const token_hash = hashToken(token);
  await sqlRun(
    `INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
     VALUES (?, ?, datetime('now', '+1 hour'))`,
    [user.id, token_hash],
  );

  const base = process.env.LMS_PUBLIC_URL || `http://localhost:${process.env.PORT || 3000}`;
  const resetUrl = `${base}/portal/reset-password.html?token=${token}`;

  if (process.env.NODE_ENV !== "production") {
    return res.json({ ...generic, devResetUrl: resetUrl, devCode: token.slice(0, 8) });
  }
  res.json(generic);
});

router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body || {};
  if (!token) return res.status(400).json({ error: "Недействительная ссылка сброса." });
  const passErr = validatePassword(password);
  if (passErr) return res.status(400).json({ error: passErr });

  const token_hash = hashToken(token);
  const row = await sqlGet(
    `SELECT * FROM password_reset_tokens
     WHERE token_hash = ? AND used_at IS NULL AND expires_at > datetime('now')`,
    [token_hash],
  );

  if (!row) {
    return res.status(400).json({ error: "Ссылка устарела или уже использована." });
  }

  const password_hash = bcrypt.hashSync(password, 12);
  await sqlRun(`UPDATE users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?`, [
    password_hash,
    row.user_id,
  ]);
  await sqlRun(`UPDATE password_reset_tokens SET used_at = datetime('now') WHERE id = ?`, [row.id]);
  await sqlRun(
    `UPDATE password_reset_tokens SET used_at = datetime('now')
     WHERE user_id = ? AND used_at IS NULL`,
    [row.user_id],
  );

  res.json({ message: "Пароль успешно изменён. Теперь можно войти." });
});

export default router;