const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema(
  {
    liderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    itens: [
      {
        tamanho: String,
        quantidade: Number,
      },
    ],

    status: {
      type: String,
      default: "PENDENTE",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Pedido", PedidoSchema);
