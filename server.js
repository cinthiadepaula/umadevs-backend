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
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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

setupSwagger(app);
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

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API UMADEVS",
      version: "1.0.0",
      description: "Documentação do sistema de Liderados e Pedidos",
      contact: {
        name: "Desenvolvedor",
      },
      servers: [{ url: "https://umadevs-backend.onrender.com" }], // Sua URL do Render
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  // Caminho para os arquivos que contêm as anotações (Ex: suas rotas)
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
