const COVER_FALLBACK = {
  chtivo: "/img/courses/course_yellow.png",
  megachtivo: "/img/courses/course_green.png",
  neurochtivo: "/img/courses/course_violet.png",
  prochtivo: "/img/courses/course_blue.png",
  homework: "/img/courses/form_violet.png",
  trial: "/img/courses/trial_1.png",
  english: "/img/courses/english_1.png",
  "reading-test": "/img/courses/reading.png",
};

export function courseCover(course) {
  return course.cover_image || COVER_FALLBACK[course.slug] || "/img/courses/plug.png";
}

function statusPill(access, canView) {
  if (canView) {
    return `<span class="lms-pill lms-pill--open" aria-label="Доступ открыт">
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
      Доступ открыт
    </span>`;
  }
  if (access.status === "pending") {
    return `<span class="lms-pill lms-pill--wait" aria-label="Ожидает одобрения">
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.99l7-3.66z"/></svg>
      На рассмотрении
    </span>`;
  }
  return `<span class="lms-pill lms-pill--lock" aria-label="Доступ закрыт">
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18 8h-1V6a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2M9 6a3 3 0 0 1 6 0v2H9zm3 7a2 2 0 1 0 2 2 2 2 0 0 0-2-2"/></svg>
    Скоро будет доступно
  </span>`;
}

function courseAction(course) {
  const { access, progress } = course;
  const arrow = `<svg class="lms-btn-arrow" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>`;

  if (access.canView) {
    const label = progress.completed > 0 ? "Продолжить" : "Начать";
    return `<a class="lms-btn lms-btn-course" href="course.html?id=${course.id}">${label}${arrow}</a>`;
  }
  if (access.canRequest) {
    return `<button type="button" class="lms-btn lms-btn-course lms-btn-course--alt" data-request="${course.id}">Запросить доступ${arrow}</button>`;
  }
  if (access.status === "pending") {
    return `<button type="button" class="lms-btn lms-btn-course" disabled>Ожидает одобрения</button>`;
  }
  return `<button type="button" class="lms-btn lms-btn-course" disabled>Скоро будет доступно</button>`;
}

export function renderCourseTile(course) {
  const cover = courseCover(course);
  const canView = course.access.canView;
  const locked = !canView;
  const newCount = canView ? Math.max(0, course.progress.total - course.progress.completed) : 0;
  const newBadge =
    newCount > 0 ? `<span class="lms-pill lms-pill--new">${newCount} новых</span>` : "";

  const overlayTitle = course.title.toUpperCase();
  const progressLine = canView
    ? `${course.progress.completed} из ${course.progress.total} уроков`
    : "—";

  return `<article class="lms-tile ${locked ? "lms-tile--locked" : ""}">
    <div class="lms-tile-cover" style="background-image:url('${cover}')">
      <div class="lms-tile-cover__shade"></div>
      ${statusPill(course.access, canView)}
      ${newBadge}
      <div class="lms-tile-cover__title">${overlayTitle}</div>
    </div>
    <div class="lms-tile-body">
      <h2 class="lms-tile-title">${course.title}</h2>
      <p class="lms-tile-desc">${course.description || ""}</p>
      <div class="lms-tile-progress-head">
        <span>${progressLine}</span>
        <span>${canView ? `${course.progress.percent}%` : ""}</span>
      </div>
      <div class="lms-progress lms-progress--tile" aria-hidden="${!canView}">
        <span style="width:${canView ? course.progress.percent : 0}%"></span>
      </div>
      ${courseAction(course)}
    </div>
  </article>`;
}