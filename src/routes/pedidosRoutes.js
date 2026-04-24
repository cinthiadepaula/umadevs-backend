const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const pedidoController = require("../controllers/pedidoController");

router.post("/", auth, pedidoController.criarPedido);
router.get("/", auth, pedidoController.listarPedidos);

module.exports = router;
