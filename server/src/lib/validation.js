const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email) {
  if (!email || typeof email !== "string") return null;
  const v = email.trim().toLowerCase();
  return EMAIL_RE.test(v) ? v : null;
}

export function normalizePhone(phone) {
  if (!phone || typeof phone !== "string") return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) return null;
  return digits.startsWith("375") ? `+${digits}` : `+${digits}`;
}

export function validatePassword(password) {
  if (typeof password !== "string" || password.length < 8) {
    return "Пароль должен содержать минимум 8 символов.";
  }
  if (!/[A-Za-zА-Яа-яЁё]/.test(password)) {
    return "Пароль должен содержать хотя бы одну букву.";
  }
  if (!/\d/.test(password)) {
    return "Пароль должен содержать хотя бы одну цифру.";
  }
  return null;
}

export function parseLoginIdentifier(identifier) {
  const trimmed = (identifier || "").trim();
  if (!trimmed) return { error: "Укажите email или телефон." };
  const email = normalizeEmail(trimmed);
  if (email) return { email };
  const phone = normalizePhone(trimmed);
  if (phone) return { phone };
  return { error: "Некорректный email или номер телефона." };
}