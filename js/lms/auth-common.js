import { api } from "./api.js";
import { attachPasswordToggles } from "./password-field.js";

export function showAlert(el, message, type = "error") {
  if (!el) return;
  el.className = `lms-alert lms-alert-${type}`;
  el.textContent = message;
  el.hidden = !message;
}

export function getNextParam() {
  return new URLSearchParams(window.location.search).get("next") || "/portal/dashboard.html";
}

export async function redirectIfAuthed() {
  const { user } = await api("/api/auth/me");
  if (user) window.location.href = getNextParam();
  return user;
}

export function initAuthPage({ onSubmit }) {
  attachPasswordToggles();
  const form = document.getElementById("auth-form");
  const alert = document.getElementById("auth-alert");
  const submit = document.getElementById("auth-submit");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    showAlert(alert, "");
    submit.disabled = true;
    submit.classList.add("lms-loading");
    try {
      await onSubmit(new FormData(form));
    } catch (err) {
      showAlert(alert, err.message || "Не удалось выполнить действие.");
    } finally {
      submit.disabled = false;
      submit.classList.remove("lms-loading");
    }
  });
}