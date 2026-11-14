let csrfToken = null;

async function ensureCsrf() {
  if (csrfToken) return csrfToken;
  const res = await fetch("/api/auth/csrf", { credentials: "include" });
  const data = await res.json();
  csrfToken = data.csrfToken;
  return csrfToken;
}

export async function api(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (method !== "GET" && method !== "HEAD") {
    headers["X-CSRF-Token"] = await ensureCsrf();
  }
  const res = await fetch(path, {
    ...options,
    method,
    headers,
    credentials: "include",
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || "Ошибка запроса");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export function resetCsrf() {
  csrfToken = null;
}