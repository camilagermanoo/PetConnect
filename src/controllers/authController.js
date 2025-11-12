const User = require('../models/User.js');

// Função para REGISTRAR novo usuário (POST)
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validação básica
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email e senha são obrigatórios'
      });
    }

    // Verifica se usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        message: 'Email já cadastrado'
      });
    }

    // Cria novo usuário
    const newUser = new User({ email, password });
    const userSaved = await newUser.save();

    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      user: {
        id: userSaved._id,
        email: userSaved.email
      }
    });
  } catch (error) {
    res.status(400).json({
      message: 'Erro ao registrar usuário',
      error: error.message
    });
  }
};

// Função para LOGIN (POST)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validação básica
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email e senha são obrigatórios'
      });
    }

    // Busca usuário
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Email ou senha inválidos'
      });
    }

    // Compara senha (sem bcrypt)
    if (user.password !== password) {
      return res.status(401).json({
        message: 'Email ou senha inválidos'
      });
    }

    // Gera um token simples (sem JWT)
    const token = `token_${user._id}_${Date.now()}`;

    res.status(200).json({
      message: 'Login realizado com sucesso!',
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao fazer login',
      error: error.message
    });
  }
};
