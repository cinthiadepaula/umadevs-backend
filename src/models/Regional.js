const mongoose = require("mongoose");

const RegionalSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Regional", RegionalSchema);
