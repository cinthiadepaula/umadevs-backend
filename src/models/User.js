const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },

    tipo: {
      type: String,
      enum: ["LOCAL", "REGIONAL", "GERAL"],
      required: true,
    },

    igrejaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Igreja",
    },

    regionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Regional",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
