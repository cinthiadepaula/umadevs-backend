const mongoose = require("mongoose");

const IgrejaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },

    regionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Regional",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Igreja", IgrejaSchema);
