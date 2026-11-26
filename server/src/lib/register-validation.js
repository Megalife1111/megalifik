import { normalizeEmail, normalizePhone, validatePassword } from "./validation.js";

const GRADE_RE = /^[\d\-–—\sА-Яа-яA-Za-z]+$/;

export function validateRegistration(body) {
  const errors = {};
  const parentFirst = (body.parent_first_name || "").trim();
  const parentLast = (body.parent_last_name || "").trim();
  const email = normalizeEmail(body.email);
  const phone = normalizePhone(body.phone);
  const password = body.password;
  const passwordConfirm = body.password_confirm;
  const childFirst = (body.child_first_name || "").trim();
  const childLast = (body.child_last_name || "").trim();
  const ageRaw = body.child_age;
  const grade = (body.child_grade || "").trim();

  if (parentFirst.length < 2) errors.parent_first_name = "Укажите имя родителя (минимум 2 символа).";
  if (parentLast.length < 2) errors.parent_last_name = "Укажите фамилию родителя (минимум 2 символа).";
  if (!email) errors.email = "Укажите корректный email — он используется для входа.";
  if (!phone) errors.phone = "Укажите корректный номер телефона.";

  const passErr = validatePassword(password);
  if (passErr) errors.password = passErr;
  if (password !== passwordConfirm) errors.password_confirm = "Пароли не совпадают.";

  if (childFirst.length < 2) errors.child_first_name = "Укажите имя ребёнка.";
  if (childLast.length < 2) errors.child_last_name = "Укажите фамилию ребёнка.";
  const age = Number(ageRaw);
  if (!Number.isInteger(age) || age < 3 || age > 25) {
    errors.child_age = "Укажите возраст ребёнка (число от 3 до 25).";
  }
  if (!grade || grade.length > 20 || !GRADE_RE.test(grade)) {
    errors.child_grade = "Укажите класс ребёнка.";
  }

  if (Object.keys(errors).length) {
    return { ok: false, errors };
  }

  const displayName = `${parentFirst} ${parentLast}`;
  return {
    ok: true,
    data: {
      parent_first_name: parentFirst,
      parent_last_name: parentLast,
      name: displayName,
      email,
      phone,
      password,
      child_first_name: childFirst,
      child_last_name: childLast,
      child_age: age,
      child_grade: grade,
    },
  };
}