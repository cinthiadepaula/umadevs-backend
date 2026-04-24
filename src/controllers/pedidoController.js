const Pedido = require("../models/Pedido");
const User = require("../models/User");

exports.criarPedido = async (req, res) => {
  try {
    const { itens } = req.body;

    if (!itens || itens.length === 0) {
      return res.status(400).json({ error: "Informe os itens" });
    }

    const pedido = await Pedido.create({
      liderId: req.user.id,
      itens,
    });

    res.status(201).json(pedido);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
};

exports.listarPedidos = async (req, res) => {
  try {
    let filtro = {};

    if (req.user.tipo === "LOCAL") {
      filtro.liderId = req.user.id;
    }

    if (req.user.tipo === "REGIONAL") {
      const lideres = await User.find({
        regionalId: req.user.regionalId,
      });

      const ids = lideres.map((l) => l._id);

      filtro.liderId = { $in: ids };
    }

    // GERAL vê tudo

    const pedidos = await Pedido.find(filtro).populate("liderId", "nome email");

    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar pedidos" });
  }
};
