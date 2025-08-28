const express = require('express');
const routes = require('./routes');
const connectDB = require('../config/db');
require('dotenv').config(); // Carrega as variáveis de ambiente do .env

const app = express();

// Conecta ao banco de dados
connectDB();

// Middleware para o Express entender requisições em formato JSON
app.use(express.json());

// Adiciona o prefixo /api para todas as rotas definidas em 'routes'
app.use('/api', routes);

module.exports = app;
