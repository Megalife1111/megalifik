import bcrypt from "bcryptjs";
import { db } from "./db.js";
import "./migrate.js";

const legacyCourses = [
  {
    slug: "chtivo",
    title: 'ЧтиВО',
    description: "Развитие памяти, внимания, осознанное чтение и нейробика",
    sort_order: 1,
    access_mode: "open",
    theme: "yellow",
    legacy_index_path: "/courses/course1.html",
    cover_image: "/img/courses/course_yellow.png",
    lessonPrefix: "/courses/course/page",
    lessonCount: 12,
  },
  {
    slug: "megachtivo",
    title: "МегаЧтиВО",
    description: "Углублённый курс скорочтения",
    sort_order: 2,
    access_mode: "open",
    theme: "green",
    legacy_index_path: "/courses/course2.html",
    cover_image: "/img/courses/course_green.png",
    lessonPrefix: "/courses/mega/page",
    lessonCount: 12,
  },
  {
    slug: "neurochtivo",
    title: "НейроЧтиВО",
    description: "Нейропсихологический подход к чтению",
    sort_order: 3,
    access_mode: "approval",
    theme: "violet",
    legacy_index_path: "/courses/course3.html",
    cover_image: "/img/courses/course_violet.png",
    lessonPrefix: "/courses/neiro/page",
    lessonCount: 12,
  },
  {
    slug: "prochtivo",
    title: "PROЧтиВО",
    description: "Профессиональный уровень",
    sort_order: 4,
    access_mode: "selected",
    theme: "blue",
    legacy_index_path: "/courses/course4.html",
    cover_image: "/img/courses/course_blue.png",
    lessonPrefix: "/courses/pro/page",
    lessonCount: 12,
  },
  {
    slug: "homework",
    title: "Домашние задания",
    description: "Отправка домашних заданий",
    sort_order: 5,
    access_mode: "open",
    theme: "violet",
    legacy_index_path: "/homework/page.html",
    materials: [{ title: "Домашние задания", url: "/homework/page.html" }],
  },
  {
    slug: "trial",
    title: "Пробное занятие",
    sort_order: 6,
    access_mode: "open",
    theme: "yellow",
    legacy_index_path: "/courses/page1.html",
    materials: [{ title: "Пробное занятие", url: "/courses/page1.html" }],
  },
  {
    slug: "english",
    title: "Занятия по английскому",
    sort_order: 7,
    access_mode: "open",
    theme: "blue",
    legacy_index_path: "/english/page.html",
    materials: [{ title: "Английский", url: "/english/page.html" }],
  },
  {
    slug: "reading-test",
    title: "Проверить скорость чтения",
    sort_order: 8,
    access_mode: "open",
    theme: "lime",
    legacy_index_path: "/reading/reading.html",
    materials: [{ title: "Тест скорости", url: "/reading/reading.html" }],
  },
];

const insertCourse = db.prepare(`
  INSERT INTO courses (slug, title, description, sort_order, access_mode, theme, legacy_index_path, cover_image)
  VALUES (@slug, @title, @description, @sort_order, @access_mode, @theme, @legacy_index_path, @cover_image)
  ON CONFLICT(slug) DO UPDATE SET
    title = excluded.title,
    description = excluded.description,
    sort_order = excluded.sort_order,
    access_mode = excluded.access_mode,
    theme = excluded.theme,
    legacy_index_path = excluded.legacy_index_path,
    cover_image = excluded.cover_image
`);

const getCourseId = db.prepare(`SELECT id FROM courses WHERE slug = ?`);

const insertMaterial = db.prepare(`
  INSERT INTO materials (course_id, title, sort_order, content_url, content_type)
  VALUES (@course_id, @title, @sort_order, @content_url, 'legacy_html')
  ON CONFLICT DO NOTHING
`);

const deleteMaterials = db.prepare(`DELETE FROM materials WHERE course_id = ?`);

for (const course of legacyCourses) {
  insertCourse.run({
    slug: course.slug,
    title: course.title,
    description: course.description || null,
    sort_order: course.sort_order,
    access_mode: course.access_mode,
    theme: course.theme || null,
    legacy_index_path: course.legacy_index_path,
    cover_image: course.cover_image || null,
  });
  const { id: courseId } = getCourseId.get(course.slug);
  deleteMaterials.run(courseId);

  if (course.lessonCount) {
    const ins = db.prepare(`
      INSERT INTO materials (course_id, title, sort_order, content_url, content_type)
      VALUES (?, ?, ?, ?, 'legacy_html')
    `);
    for (let i = 1; i <= course.lessonCount; i++) {
      ins.run(courseId, `Занятие ${i}`, i, `${course.lessonPrefix}${i}.html`);
    }
  } else if (course.materials) {
    const ins = db.prepare(`
      INSERT INTO materials (course_id, title, sort_order, content_url, content_type)
      VALUES (?, ?, ?, ?, 'legacy_html')
    `);
    course.materials.forEach((m, idx) => {
      ins.run(courseId, m.title, idx + 1, m.url);
    });
  }
}

const adminEmail = process.env.LMS_ADMIN_EMAIL || "admin@megalife.local";
const adminPassword = process.env.LMS_ADMIN_PASSWORD || "Admin12345";
const adminHash = bcrypt.hashSync(adminPassword, 12);

db.prepare(
  `INSERT INTO users (email, name, password_hash, role)
   VALUES (?, 'Администратор', ?, 'admin')
   ON CONFLICT(email) DO UPDATE SET password_hash = excluded.password_hash, role = 'admin'`,
).run(adminEmail, adminHash);

console.log("Seed complete.");
console.log(`Admin: ${adminEmail} / ${adminPassword}`);