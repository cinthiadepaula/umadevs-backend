const Liderado = require("../models/Liderado");
const Igreja = require("../models/Igreja");

exports.criarLiderado = async (req, res) => {
  try {
    const { nome, igrejaId } = req.body;

    let igrejaDoLiderado = igrejaId;

    if (req.user.tipo === "LOCAL") {
      igrejaDoLiderado = req.user.igrejaId;
    }

    if (!igrejaDoLiderado) {
      return res.status(400).json({
        error: "Informe a igreja do liderado",
      });
    }

    const liderado = await Liderado.create({
      nome,
      igrejaId: igrejaDoLiderado,
      criadoPor: req.user.id,
    });

    res.status(201).json(liderado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao cadastrar liderado" });
  }
};

exports.listarLiderados = async (req, res) => {
  try {
    let filtro = {};

    if (req.user.tipo === "LOCAL") {
      filtro.igrejaId = req.user.igrejaId;
    }

    if (req.user.tipo === "REGIONAL") {
      const igrejas = await Igreja.find({
        regionalId: req.user.regionalId,
      });

      const igrejasIds = igrejas.map((igreja) => igreja._id);

      filtro.igrejaId = { $in: igrejasIds };
    }

    const liderados = await Liderado.find(filtro)
      .populate("igrejaId", "nome")
      .populate("criadoPor", "nome email");

    res.json(liderados);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar liderados" });
  }
};
