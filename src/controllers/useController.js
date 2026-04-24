const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { nome, email, senha, tipo, igrejaId, regionalId } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const user = await User.create({
      nome,
      email,
      senha: senhaHash,
      tipo,
      igrejaId,
      regionalId,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(400).json({ error: "Senha inválida" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        tipo: user.tipo,
        igrejaId: user.igrejaId,
        regionalId: user.regionalId,
      },
      "SEGREDO_SUPER_FORTE",
      { expiresIn: "1d" },
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Erro no login" });
  }
};
