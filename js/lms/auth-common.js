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

export function afterAuthRedirect() {
  const next = getNextParam();
  window.location.href = `/portal/welcome.html?next=${encodeURIComponent(next)}`;
}

export async function redirectIfAuthed() {
  const { user } = await api("/api/auth/me");
  if (user) afterAuthRedirect();
  return user;
}

export function clearFieldErrors(form) {
  form?.querySelectorAll("[data-field-error]").forEach((el) => {
    el.textContent = "";
    el.hidden = true;
  });
  form?.querySelectorAll(".lms-input.is-invalid").forEach((el) => el.classList.remove("is-invalid"));
}

export function applyFieldErrors(form, errors = {}) {
  if (!form || !errors) return;
  for (const [name, message] of Object.entries(errors)) {
    const input = form.querySelector(`[name="${name}"]`);
    const slot = form.querySelector(`[data-field-error="${name}"]`);
    if (input) input.classList.add("is-invalid");
    if (slot) {
      slot.textContent = message;
      slot.hidden = false;
    }
  }
}

export function initAuthPage({ onSubmit }) {
  attachPasswordToggles();
  const form = document.getElementById("auth-form");
  const alert = document.getElementById("auth-alert");
  const submit = document.getElementById("auth-submit");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    showAlert(alert, "");
    clearFieldErrors(form);
    submit.disabled = true;
    submit.classList.add("lms-loading");
    try {
      await onSubmit(new FormData(form));
    } catch (err) {
      if (err.errors) applyFieldErrors(form, err.errors);
      else if (err.data?.errors) applyFieldErrors(form, err.data.errors);
      showAlert(alert, err.message || "Не удалось выполнить действие.");
    } finally {
      submit.disabled = false;
      submit.classList.remove("lms-loading");
    }
  });
}