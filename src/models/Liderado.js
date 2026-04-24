const mongoose = require("mongoose");

const LideradoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },

    igrejaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Igreja",
      required: true,
    },

    criadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Liderado", LideradoSchema);
