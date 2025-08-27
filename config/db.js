const mongoose = require('mongoose');
require('dotenv').config(); // Garante que as variáveis de .env sejam carregadas

const connectDB = async () => {
  try {
    // Tenta conectar ao MongoDB usando a string de conexão do arquivo .env
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB conectado com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error.message);
    // Encerra a aplicação com falha se não conseguir conectar ao banco
    process.exit(1);
  }
};

module.exports = connectDB;