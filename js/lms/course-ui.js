const BANNER_FALLBACK = {
  chtivo: "/img/lms-banners/chtivo.jpg",
  megachtivo: "/img/lms-banners/megachtivo.jpg",
  neurochtivo: "/img/lms-banners/neurochtivo.jpg",
  prochtivo: "/img/lms-banners/prochtivo.jpg",
  homework: "/img/lms-banners/homework.jpg",
  trial: "/img/lms-banners/trial.jpg",
  "trial-english": "/img/lms-banners/trial-english.jpg",
  english: "/img/lms-banners/english.jpg",
  "reading-test": "/img/lms-banners/reading-test.jpg",
  "reading-speed": "/img/lms-banners/reading-speed.jpg",
  conformity: "/img/lms-banners/conformity.jpg",
  texts: "/img/lms-banners/texts.jpg",
  "motivational-trainer": "/img/lms-banners/motivational-trainer.jpg",
  "reading-by-algorithm": "/img/lms-banners/reading-by-algorithm.jpg",
  memory: "/img/lms-banners/memory.jpg",
  "emotional-intelligence": "/img/lms-banners/emotional-intelligence.jpg",
  "online-trainers": "/img/lms-banners/online-trainers.jpg",
};

export function courseBanner(course) {
  return course.cover_image || BANNER_FALLBACK[course.slug] || "/img/courses/plug.png";
}

function statusPill(access, canView, accessMode) {
  if (!canView && access.status === "login_required" && accessMode === "open") {
    return `<span class="lms-pill lms-pill--open">Открытый курс</span>`;
  }
  if (canView) {
    return `<span class="lms-pill lms-pill--open">Доступ открыт</span>`;
  }
  if (access.status === "pending") {
    return `<span class="lms-pill lms-pill--wait">На рассмотрении</span>`;
  }
  return `<span class="lms-pill lms-pill--lock">Скоро будет доступно</span>`;
}

function resolveHref(course) {
  const { access } = course;
  if (access.status === "login_required") {
    return `/portal/login.html?next=${encodeURIComponent(`course.html?id=${course.id}`)}`;
  }
  if (access.canView) {
    return `course.html?id=${course.id}`;
  }
  return null;
}

function footerFab(course) {
  const arrow = `<span class="lms-fab-icon" aria-hidden="true">›</span>`;
  const { access, progress } = course;

  if (access.status === "login_required") {
    return `<a class="lms-fab" href="/portal/login.html?next=${encodeURIComponent(`course.html?id=${course.id}`)}" aria-label="Войти, чтобы начать">${arrow}</a>`;
  }
  if (access.canView) {
    const label = progress.completed > 0 ? "Продолжить" : "Начать";
    return `<a class="lms-fab" href="course.html?id=${course.id}" aria-label="${label}">${arrow}</a>`;
  }
  if (access.canRequest) {
    return `<button type="button" class="lms-fab" data-request="${course.id}" aria-label="Запросить доступ">${arrow}</button>`;
  }
  return `<span class="lms-fab is-disabled" aria-hidden="true">${arrow}</span>`;
}

export function renderCourseTile(course) {
  const banner = courseBanner(course);
  const canView = course.access.canView;
  const locked = !canView && course.access.status !== "login_required";
  const href = resolveHref(course);
  const newCount = canView ? Math.max(0, course.progress.total - course.progress.completed) : 0;
  const newBadge = newCount > 0 ? `<span class="lms-pill lms-pill--new">${newCount} новых</span>` : "";

  const progressLine = canView
    ? `${course.progress.completed} из ${course.progress.total} уроков`
    : course.progress.total
      ? `${course.progress.total} уроков`
      : "Раздел";

  const visual = href
    ? `<a class="lms-banner-card__hit" href="${href}"><img src="${banner}" alt="" loading="lazy" decoding="async" /></a>`
    : `<div class="lms-banner-card__hit" role="img" aria-label="${course.title}"><img src="${banner}" alt="" loading="lazy" decoding="async" /></div>`;

  const requestBtn =
    course.access.canRequest && !course.access.canView
      ? `<button type="button" class="lms-btn lms-btn-ghost lms-btn-sm" data-request="${course.id}">Запросить доступ</button>`
      : "";

  return `<article class="lms-banner-card ${locked ? "is-locked" : ""}">
    <div class="lms-banner-card__frame">
      <div class="lms-banner-card__badges">
        ${statusPill(course.access, canView, course.access_mode)}
        ${newBadge}
      </div>
      ${visual}
      <span class="lms-sr-only">${course.title}. ${course.description || ""}</span>
    </div>
    <div class="lms-banner-card__footer">
      <div class="lms-banner-card__progress">
        <span>${progressLine}</span>
        <span>${canView ? `${course.progress.percent}%` : ""}</span>
      </div>
      <div class="lms-progress lms-progress--banner" aria-hidden="${!canView && !course.progress.total}">
        <span style="width:${canView ? course.progress.percent : 0}%"></span>
      </div>
      <div class="lms-banner-card__actions">
        ${requestBtn}
        ${footerFab(course)}
      </div>
    </div>
  </article>`;
}