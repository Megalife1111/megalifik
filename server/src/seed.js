import bcrypt from "bcryptjs";
import { initDb, sqlGet, sqlRun } from "./db.js";

const banner = (slug) => `/img/lms-banners/${slug}.jpg`;

const legacyCourses = [
  {
    slug: "chtivo",
    title: "ЧтиВО",
    description: "Развитие памяти, внимания, осознанное чтение и нейробика",
    sort_order: 1,
    access_mode: "open",
    theme: "yellow",
    legacy_index_path: "/courses/course1.html",
    cover_image: banner("chtivo"),
    lessonPrefix: "/courses/course/page",
    lessonCount: 12,
  },
  {
    slug: "megachtivo",
    title: "МегаЧтиВО",
    description: "Углублённый курс скорочтения",
    sort_order: 2,
    access_mode: "selected",
    theme: "green",
    legacy_index_path: "/courses/course2.html",
    cover_image: banner("megachtivo"),
    lessonPrefix: "/courses/mega/page",
    lessonCount: 12,
  },
  {
    slug: "neurochtivo",
    title: "НейроЧтиВО",
    description: "Нейропсихологический подход к чтению",
    sort_order: 3,
    access_mode: "selected",
    theme: "violet",
    legacy_index_path: "/courses/course3.html",
    cover_image: banner("neurochtivo"),
    lessonPrefix: "/courses/neiro/page",
    lessonCount: 12,
  },
  {
    slug: "prochtivo",
    title: "PROЧтиВО",
    description: "Выходи на новый уровень чтения!",
    sort_order: 4,
    access_mode: "selected",
    theme: "blue",
    legacy_index_path: "/courses/course4.html",
    cover_image: banner("prochtivo"),
    lessonPrefix: "/courses/pro/page",
    lessonCount: 12,
  },
  {
    slug: "homework",
    title: "Домашние задания",
    description: "Закрепляй навык самостоятельно!",
    sort_order: 5,
    access_mode: "open",
    theme: "violet",
    legacy_index_path: "/homework/page.html",
    cover_image: banner("homework"),
    materials: [{ title: "Домашние задания", url: "/homework/page.html" }],
  },
  {
    slug: "trial",
    title: "Пробное занятие",
    description: "Познакомься с платформой и заданиями!",
    sort_order: 6,
    access_mode: "open",
    theme: "yellow",
    legacy_index_path: "/courses/page1.html",
    cover_image: banner("trial"),
    materials: [{ title: "Пробное занятие", url: "/courses/page1.html" }],
  },
  {
    slug: "english",
    title: "Занятия по английскому",
    description: "Изучай язык интересно и легко!",
    sort_order: 7,
    access_mode: "open",
    theme: "blue",
    legacy_index_path: "/english/page.html",
    cover_image: banner("english"),
    materials: [{ title: "Английский", url: "/english/page.html" }],
  },
  {
    slug: "trial-english",
    title: "Пробное занятие по английскому",
    description: "Попробуй формат и начни говорить!",
    sort_order: 8,
    access_mode: "open",
    theme: "blue",
    legacy_index_path: "/courses/page2.html",
    cover_image: banner("trial-english"),
    materials: [{ title: "Пробное по английскому", url: "/courses/page2.html" }],
  },
  {
    slug: "reading-test",
    title: "Проверить скорость чтения",
    description: "Проверь свой темп и точность",
    sort_order: 9,
    access_mode: "open",
    theme: "lime",
    legacy_index_path: "/reading/reading.html",
    cover_image: banner("reading-test"),
    materials: [{ title: "Тест скорости", url: "/reading/reading.html" }],
  },
  {
    slug: "conformity",
    title: "Найти соответствие",
    description: "Сравнивай, думай и соединяй!",
    sort_order: 10,
    access_mode: "open",
    theme: "violet",
    legacy_index_path: "/conformity/conformity.html",
    cover_image: banner("conformity"),
    materials: [{ title: "Найти соответствие", url: "/conformity/conformity.html" }],
  },
  {
    slug: "texts",
    title: "Тексты",
    description: "Читай материалы и тренируй понимание!",
    sort_order: 11,
    access_mode: "open",
    theme: "violet",
    legacy_index_path: "/texts/texts.html",
    cover_image: banner("texts"),
    materials: [{ title: "Тексты", url: "/texts/texts.html" }],
  },
  {
    slug: "motivational-trainer",
    title: "Мотивационный тренажёр",
    description: "Двигайся к цели шаг за шагом!",
    sort_order: 12,
    access_mode: "open",
    theme: "green",
    legacy_index_path: "/motivational-trainer.html",
    cover_image: banner("motivational-trainer"),
    materials: [{ title: "Мотивационный тренажёр", url: "/motivational-trainer.html" }],
  },
  {
    slug: "reading-by-algorithm",
    title: "Чтение по алгоритму",
    description: "Освой чтение по шагам!",
    sort_order: 13,
    access_mode: "open",
    theme: "yellow",
    legacy_index_path: "/reading-by-algorithm/reading-by-algorithm.html",
    cover_image: banner("reading-by-algorithm"),
    materials: [
      {
        title: "Чтение по алгоритму",
        url: "/reading-by-algorithm/reading-by-algorithm.html",
      },
    ],
  },
  {
    slug: "memory",
    title: "Тест на зрительную память",
    description: "Запомни детали и проверь свою память!",
    sort_order: 14,
    access_mode: "open",
    theme: "violet",
    legacy_index_path: "/memory.html",
    cover_image: banner("memory"),
    materials: [{ title: "Тест на память", url: "/memory.html" }],
  },
  {
    slug: "reading-speed",
    title: "Скорость чтения",
    description: "Тренируй скорость и осознанность",
    sort_order: 15,
    access_mode: "open",
    theme: "lime",
    legacy_index_path: "/reading-speed/reading-speed.html",
    cover_image: banner("reading-speed"),
    materials: [{ title: "Скорость чтения", url: "/reading-speed/reading-speed.html" }],
  },
  {
    slug: "emotional-intelligence",
    title: "Дневник по эмоциональному интеллекту",
    description: "Учись замечать и понимать эмоции!",
    sort_order: 16,
    access_mode: "open",
    theme: "violet",
    legacy_index_path: "/emotional-intelligence.html",
    cover_image: banner("emotional-intelligence"),
    materials: [
      { title: "Эмоциональный интеллект", url: "/emotional-intelligence.html" },
    ],
  },
  {
    slug: "online-trainers",
    title: "Онлайн-тренажёры",
    description: "Тренируй навыки в цифровом формате!",
    sort_order: 17,
    access_mode: "open",
    theme: "blue",
    legacy_index_path: "/online-trainers/online-trainers.html",
    cover_image: banner("online-trainers"),
    materials: [{ title: "Онлайн-тренажёры", url: "/online-trainers/online-trainers.html" }],
  },
];

async function seed() {
  await initDb();

  for (const course of legacyCourses) {
    await sqlRun(
      `INSERT INTO courses (slug, title, description, sort_order, access_mode, theme, legacy_index_path, cover_image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(slug) DO UPDATE SET
         title = excluded.title,
         description = excluded.description,
         sort_order = excluded.sort_order,
         access_mode = excluded.access_mode,
         theme = excluded.theme,
         legacy_index_path = excluded.legacy_index_path,
         cover_image = excluded.cover_image`,
      [
        course.slug,
        course.title,
        course.description || null,
        course.sort_order,
        course.access_mode,
        course.theme || null,
        course.legacy_index_path,
        course.cover_image || null,
      ],
    );
    const row = await sqlGet(`SELECT id FROM courses WHERE slug = ?`, [course.slug]);
    const courseId = row.id;
    await sqlRun(`DELETE FROM materials WHERE course_id = ?`, [courseId]);

    if (course.lessonCount) {
      for (let i = 1; i <= course.lessonCount; i++) {
        await sqlRun(
          `INSERT INTO materials (course_id, title, sort_order, content_url, content_type)
           VALUES (?, ?, ?, ?, 'legacy_html')`,
          [courseId, `Занятие ${i}`, i, `${course.lessonPrefix}${i}.html`],
        );
      }
    } else if (course.materials) {
      for (let idx = 0; idx < course.materials.length; idx++) {
        const m = course.materials[idx];
        await sqlRun(
          `INSERT INTO materials (course_id, title, sort_order, content_url, content_type)
           VALUES (?, ?, ?, ?, 'legacy_html')`,
          [courseId, m.title, idx + 1, m.url],
        );
      }
    }
  }

  const adminEmail = process.env.LMS_ADMIN_EMAIL || "admin@megalife.local";
  const adminPassword = process.env.LMS_ADMIN_PASSWORD || "Admin12345";
  const adminHash = bcrypt.hashSync(adminPassword, 12);

  await sqlRun(
    `INSERT INTO users (email, name, password_hash, role)
     VALUES (?, 'Администратор', ?, 'admin')
     ON CONFLICT(email) DO UPDATE SET password_hash = excluded.password_hash, role = 'admin'`,
    [adminEmail, adminHash],
  );

  console.log("Seed complete.");
  console.log(`Admin: ${adminEmail} / ${adminPassword}`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});