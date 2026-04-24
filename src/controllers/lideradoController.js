const Liderado = require("../models/Liderado");
const Igreja = require("../models/Igreja");
const mongoose = require("mongoose"); // Importe o mongoose

exports.listarLiderados = async (req, res) => {
  try {
    let filtro = {};

    console.log(`Usuário logado: ${req.user.nome} | Tipo: ${req.user.tipo}`);

    if (req.user.tipo === "LOCAL") {
      filtro.igrejaId = req.user.igrejaId;
    }

    if (req.user.tipo === "REGIONAL") {
      // 1. Garantir que o regionalId é um ObjectId válido
      const regId = new mongoose.Types.ObjectId(req.user.regionalId);

      const igrejasDaRegional = await Igreja.find({ regionalId: regId }).select(
        "_id",
      );
      const idsIgrejas = igrejasDaRegional.map((igreja) => igreja._id);

      console.log(
        `Regional ID: ${req.user.regionalId} | Igrejas encontradas: ${idsIgrejas.length}`,
      );

      // Se não houver igrejas, forçamos o filtro a não retornar nada
      if (idsIgrejas.length === 0) {
        return res.json({
          liderados: [],
          message: "Nenhuma igreja vinculada a esta regional.",
        });
      }

      filtro.igrejaId = { $in: idsIgrejas };
    }

    // Se for DIRETORIA, o filtro permanece {} e traz tudo.

    const liderados = await Liderado.find(filtro)
      .populate("igrejaId", "nome regionalId")
      .populate("criadoPor", "nome email tipo");

    // Padronize a resposta para facilitar o Front-end
    res.json({
      total: liderados.length,
      liderados: liderados,
    });
  } catch (error) {
    console.error("Erro no Controller de Liderados:", error);
    res.status(500).json({ error: "Erro ao listar liderados" });
  }
};
