require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/config");
const User = require("./src/models/User");
const userRoutes = require("./src/routes/userRoutes");
const auth = require("./src/middlewares/auth");
const lideradoRoutes = require("./src/routes/lideradoRoutes");
const regionalRoutes = require("./src/routes/regionalRoutes");
const igrejaRoutes = require("./src/routes/igrejaRoutes");
const pedidosRoutes = require("./src/routes/pedidosRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/liderados", lideradoRoutes);
app.use("/regionais", regionalRoutes);
app.use("/igrejas", igrejaRoutes);
app.use("/pedidos", pedidosRoutes);

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

app.get("/teste", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

app.get("/privado", auth, (req, res) => {
  res.json({
    message: "Acesso liberado",
    user: req.user,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});
