export function attachPasswordToggles(root = document) {
  root.querySelectorAll("[data-password-toggle]").forEach((btn) => {
    const inputId = btn.getAttribute("aria-controls");
    const input = inputId ? document.getElementById(inputId) : btn.parentElement?.querySelector("input");
    if (!input) return;

    const setState = (visible) => {
      input.type = visible ? "text" : "password";
      btn.setAttribute("aria-pressed", visible ? "true" : "false");
      btn.setAttribute("aria-label", visible ? "Скрыть пароль" : "Показать пароль");
      btn.textContent = visible ? "🙈" : "👁";
    };

    btn.addEventListener("click", () => setState(input.type === "password"));
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setState(input.type === "password");
      }
    });
    setState(false);
  });
}