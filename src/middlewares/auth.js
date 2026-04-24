const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Sem token" });
  }

  try {
    const decoded = jwt.verify(token, "SEGREDO_SUPER_FORTE");

    req.user = decoded; // 👈 aqui fica o usuário logado

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};
