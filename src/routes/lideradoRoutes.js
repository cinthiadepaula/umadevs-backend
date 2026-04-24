const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const lideradoController = require("../controllers/lideradoController");

router.post("/", auth, lideradoController.criarLiderado);
router.get("/", auth, lideradoController.listarLiderados);

module.exports = router;
