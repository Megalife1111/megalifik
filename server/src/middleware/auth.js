export function requireAuth(req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Требуется авторизация." });
  }
  if (req.session.userStatus === "blocked") {
    return res.status(403).json({ error: "Аккаунт заблокирован." });
  }
  next();
}

export function requireAdmin(req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Требуется авторизация." });
  }
  if (req.session.userRole !== "admin") {
    return res.status(403).json({ error: "Доступ только для администратора." });
  }
  next();
}

export function attachSessionUser(req, _res, next) {
  req.user = req.session?.userId
    ? {
        id: req.session.userId,
        role: req.session.userRole,
        name: req.session.userName,
        status: req.session.userStatus,
      }
    : null;
  next();
}