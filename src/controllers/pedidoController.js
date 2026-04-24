const Pedido = require("../models/Pedido");
const User = require("../models/User");
const Igreja = require("../models/Igreja");

exports.listarPedidos = async (req, res) => {
  try {
    let filtro = {};

    if (req.user.tipo === "LOCAL") {
      filtro.liderId = req.user.id;
    }

    if (req.user.tipo === "REGIONAL") {
      const igrejas = await Igreja.find({
        regionalId: req.user.regionalId,
      });

      const igrejasIds = igrejas.map((igreja) => igreja._id);

      const lideres = await User.find({
        igrejaId: { $in: igrejasIds },
        tipo: "LOCAL",
      });

      const lideresIds = lideres.map((lider) => lider._id);

      filtro.liderId = { $in: lideresIds };
    }

    const pedidos = await Pedido.find(filtro).populate({
      path: "liderId",
      select: "nome email tipo igrejaId regionalId",
      populate: {
        path: "igrejaId",
        select: "nome regionalId",
      },
    });

    res.json(pedidos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao listar pedidos" });
  }
};
