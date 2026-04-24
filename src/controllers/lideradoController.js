const Liderado = require("../models/Liderado");
const Igreja = require("../models/Igreja");

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
      .populate("igrejaId", "nome regionalId")
      .populate("criadoPor", "nome email");

    res.json(liderados);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao listar liderados" });
  }
};
