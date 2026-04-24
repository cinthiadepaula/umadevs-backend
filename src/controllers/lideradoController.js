const Liderado = require("../models/Liderado");
const Igreja = require("../models/Igreja");

exports.listarLiderados = async (req, res) => {
  try {
    let filtro = {};

    if (req.user.tipo === "LOCAL") {
      filtro.igrejaId = req.user.igrejaId;
    }

    if (req.user.tipo === "REGIONAL") {
      const igrejasDaRegional = await Igreja.find({
        regionalId: req.user.regionalId,
      }).select("_id nome regionalId");

      const idsIgrejas = igrejasDaRegional.map((igreja) => igreja._id);

      filtro.igrejaId = { $in: idsIgrejas };

      const liderados = await Liderado.find(filtro)
        .populate("igrejaId", "nome regionalId")
        .populate("criadoPor", "nome email tipo");

      return res.json({
        usuarioLogado: req.user,
        igrejasDaRegional,
        filtroUsado: filtro,
        total: liderados.length,
        liderados,
      });
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
