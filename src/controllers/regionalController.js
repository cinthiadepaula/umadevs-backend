const Regional = require("../models/Regional");

exports.criarRegional = async (req, res) => {
  try {
    const { nome } = req.body;

    const regional = await Regional.create({ nome });

    res.status(201).json(regional);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar regional" });
  }
};

exports.listarRegionais = async (req, res) => {
  try {
    const regionais = await Regional.find();
    res.json(regionais);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar regionais" });
  }
};
