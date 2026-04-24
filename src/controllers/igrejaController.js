const Igreja = require("../models/Igreja");

exports.criarIgreja = async (req, res) => {
  try {
    const { nome, regionalId } = req.body;

    const igreja = await Igreja.create({
      nome,
      regionalId,
    });

    res.status(201).json(igreja);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar igreja" });
  }
};

exports.listarIgrejas = async (req, res) => {
  try {
    let filtro = {};

    if (req.user.tipo === "REGIONAL") {
      filtro.regionalId = req.user.regionalId;
    }

    const igrejas = await Igreja.find(filtro).populate("regionalId", "nome");

    res.json(igrejas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar igrejas" });
  }
};
