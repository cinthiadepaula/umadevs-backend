const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const regionalController = require("../controllers/regionalController");

router.post("/", auth, regionalController.criarRegional);
router.get("/", auth, regionalController.listarRegionais);

module.exports = router;
