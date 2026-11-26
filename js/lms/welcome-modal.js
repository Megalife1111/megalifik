const WELCOME_VIDEO = "https://www.youtube.com/embed/6jZ9cG_xfcw?rel=0&playsinline=1";

let activeBackdrop = null;

export function shouldShowWelcomeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("welcome") === "1";
}

function finishWelcome() {
  const url = new URL(window.location.href);
  const next = url.searchParams.get("next");
  url.searchParams.delete("welcome");
  url.searchParams.delete("next");
  const clean = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState({}, "", clean);
  if (next && !next.includes("dashboard.html")) {
    window.location.href = next;
  }
}

export function openWelcomeModal() {
  if (activeBackdrop) return;

  const backdrop = document.createElement("div");
  backdrop.className = "lms-welcome-backdrop";
  backdrop.setAttribute("role", "dialog");
  backdrop.setAttribute("aria-modal", "true");
  backdrop.setAttribute("aria-labelledby", "lms-welcome-title");
  backdrop.innerHTML = `
    <div class="lms-welcome-sheet" role="document">
      <button type="button" class="lms-welcome-close" aria-label="Закрыть">×</button>
      <h2 class="lms-welcome-title" id="lms-welcome-title">Добро пожаловать в MegaLife</h2>
      <p class="lms-welcome-lead">Короткое видео о том, как устроено обучение</p>
      <div class="lms-welcome-video" aria-label="Приветственное видео">
        <iframe
          src="${WELCOME_VIDEO}"
          title="Приветственное видео MegaLife"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          referrerpolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
      <button type="button" class="lms-btn lms-btn-primary lms-btn-block lms-welcome-continue">Продолжить к курсам</button>
    </div>`;

  const close = () => {
    backdrop.remove();
    document.body.classList.remove("lms-welcome-open");
    activeBackdrop = null;
    finishWelcome();
  };

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });
  backdrop.querySelector(".lms-welcome-close")?.addEventListener("click", close);
  backdrop.querySelector(".lms-welcome-continue")?.addEventListener("click", close);

  document.body.classList.add("lms-welcome-open");
  document.body.appendChild(backdrop);
  activeBackdrop = backdrop;
  backdrop.querySelector(".lms-welcome-continue")?.focus();
}

/** Показать попап на каталоге, если пользователь вошёл / зарегистрировался. */
export function mountWelcomeOnDashboard(isLoggedIn) {
  if (!isLoggedIn || !shouldShowWelcomeFromUrl()) return;
  requestAnimationFrame(() => openWelcomeModal());
}