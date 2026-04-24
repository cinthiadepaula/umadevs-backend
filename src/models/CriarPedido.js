exports.criarPedido = async (req, res) => {
  const { itens } = req.body;

  const pedido = await Pedido.create({
    liderId: req.user.id,
    itens,
  });

  res.json(pedido);
};
