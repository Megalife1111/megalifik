import { api, resetCsrf } from "./api.js";

export async function requireUser() {
  const { user } = await api("/api/auth/me");
  if (!user) {
    window.location.href = `/portal/login.html?next=${encodeURIComponent(location.pathname + location.search)}`;
    return null;
  }
  return user;
}

/** Текущий пользователь или null (без редиректа). */
export async function getOptionalUser() {
  const { user } = await api("/api/auth/me");
  return user ?? null;
}

export function renderTopbar(user, active = "courses") {
  const adminLink =
    user?.role === "admin"
      ? `<a class="lms-btn lms-btn-ghost" href="/portal/admin.html">Админ-панель</a>`
      : "";
  const authBlock = user
    ? `<button type="button" class="lms-btn lms-btn-primary" id="logout-btn">Выйти</button>`
    : `<a class="lms-btn lms-btn-ghost" href="/portal/login.html?next=${encodeURIComponent(location.pathname + location.search)}">Войти</a>
       <a class="lms-btn lms-btn-primary" href="/portal/register.html">Регистрация</a>`;
  const sub = user ? `Личный кабинет — ${user.name}` : "Каталог курсов — войдите, чтобы сохранять прогресс";
  return `
    <header class="lms-topbar">
      <a class="lms-brand" href="/portal/dashboard.html" style="text-decoration:none;color:inherit">
        <img src="/img/logo.png" alt="" />
        <div>
          <p class="lms-brand-title">MegaLife</p>
          <p class="lms-brand-sub">${sub}</p>
        </div>
      </a>
      <nav class="lms-nav">
        <a class="lms-btn lms-btn-ghost" href="/portal/dashboard.html">Курсы</a>
        <a class="lms-btn lms-btn-ghost" href="/">Старая главная</a>
        ${adminLink}
        ${authBlock}
      </nav>
    </header>`;
}

export function wireLogout() {
  document.getElementById("logout-btn")?.addEventListener("click", async () => {
    await api("/api/auth/logout", { method: "POST" });
    resetCsrf();
    window.location.href = "/portal/login.html";
  });
}

export function accessLabel(access) {
  const map = {
    granted: { text: "Доступ открыт", cls: "lms-badge-open" },
    pending: { text: "Ожидает одобрения", cls: "lms-badge-pending" },
    blocked: { text: "Заблокирован", cls: "lms-badge-blocked" },
    can_request: { text: "Нужна заявка", cls: "lms-badge-pending" },
    no_access: { text: "Нет доступа", cls: "lms-badge-blocked" },
    login_required: { text: "Войдите", cls: "lms-badge-blocked" },
  };
  return map[access.status] || { text: access.status, cls: "lms-badge-blocked" };
}