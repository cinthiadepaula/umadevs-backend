const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const lideradoController = require("../controllers/lideradoController");

/**
@swagger
 * /liderados:
 * post:
 * summary: Cadastra um novo liderado
 * tags: [Liderados]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - nome
 * - igrejaId
 * properties:
 * nome:
 * type: string
 * example: "João Silva"
 * igrejaId:
 * type: string
 * example: "69eaf11f104db11dee9d7e55"
 * responses:
 * 201:
 * description: Liderado criado com sucesso
 * 400:
 * description: Erro de validação (Aqui você verá o erro da igreja)
 */

router.post("/", auth, lideradoController.criarLiderado);
router.get("/", auth, lideradoController.listarLiderados);

module.exports = router;
