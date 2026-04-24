const Liderado = require("../models/Liderado");
const Igreja = require("../models/Igreja");

exports.listarLiderados = async (req, res) => {
  try {
    let filtro = {};

    console.log("USUÁRIO LOGADO:", req.user);

    if (req.user.tipo === "LOCAL") {
      filtro.igrejaId = req.user.igrejaId;
    }

    if (req.user.tipo === "REGIONAL") {
      if (!req.user.regionalId) {
        return res.status(403).json({
          error: "Usuário regional sem regional vinculada",
        });
      }

      const igrejasDaRegional = await Igreja.find({
        regionalId: req.user.regionalId,
      }).select("_id");

      const idsIgrejas = igrejasDaRegional.map((igreja) => igreja._id);

      filtro.igrejaId = { $in: idsIgrejas };
    }

    const liderados = await Liderado.find(filtro)
      .populate("igrejaId", "nome regionalId")
      .populate("criadoPor", "nome email tipo");

    res.json(liderados);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao listar liderados" });
  }
};
