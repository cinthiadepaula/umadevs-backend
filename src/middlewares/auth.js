const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Sem token" });
  }

  try {
    // Se o seu token vier com "Bearer ", remova:
    const tokenFormatado = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const decoded = jwt.verify(tokenFormatado, "SEGREDO_SUPER_FORTE");

    req.user = decoded;

    // Debug crucial: Veja se o regionalId aparece aqui no log do Render
    console.log("DADOS NO TOKEN:", req.user);

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};
