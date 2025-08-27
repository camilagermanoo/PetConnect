const express = require('express');
const routes = require('./src/routes');
const connectDB = require('./config/db');
require('dotenv').config(); // Carrega as variáveis de ambiente do .env

const app = express();
const PORT = process.env.PORT || 3000; // Define a porta do servidor

// Conecta ao banco de dados
connectDB();

// Middleware para o Express entender requisições em formato JSON
app.use(express.json());

// Adiciona o prefixo /api para todas as rotas definidas em 'routes'
app.use('/api', routes);

// Inicia o servidor para ouvir na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});

module.exports = app;
