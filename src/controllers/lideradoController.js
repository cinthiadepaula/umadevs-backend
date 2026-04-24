const Liderado = require("../models/Liderado");
const Igreja = require("../models/Igreja");
const mongoose = require("mongoose");

exports.listarLiderados = async (req, res) => {
  try {
    let filtro = {};

    // 1. Lógica para Líder LOCAL
    if (req.user.tipo === "LOCAL") {
      filtro.igrejaId = req.user.igrejaId;
    }

    // 2. Lógica para Líder REGIONAL
    if (req.user.tipo === "REGIONAL") {
      // Buscamos todas as igrejas que pertencem à regional do líder logado
      const igrejasDaRegional = await Igreja.find({
        regionalId: req.user.regionalId,
      }).select("_id");

      const idsIgrejas = igrejasDaRegional.map((igreja) => igreja._id);

      // Filtra liderados que pertencem a qualquer uma dessas igrejas
      filtro.igrejaId = { $in: idsIgrejas };
    }

    // 3. Se for DIRETORIA, o filtro continua vazio {}, trazendo tudo.

    // No seu Liderado.find(filtro)...
    const liderados = await Liderado.find(filtro)
      .populate({
        path: "igrejaId",
        select: "nome regionalId",
        populate: { path: "regionalId", select: "nome" }, // Traz o nome da regional também
      })
      .populate("criadoPor", "nome email tipo");

    // Retornamos um formato padronizado
    res.json({
      total: liderados.length,
      liderados: liderados,
    });
  } catch (error) {
    console.error("Erro ao listar liderados:", error);
    res.status(500).json({ error: "Erro ao buscar dados no servidor" });
  }
};
