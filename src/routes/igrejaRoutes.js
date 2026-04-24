const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const igrejaController = require("../controllers/igrejaController");

router.post("/", auth, igrejaController.criarIgreja);
router.get("/", auth, igrejaController.listarIgrejas);

module.exports = router;
