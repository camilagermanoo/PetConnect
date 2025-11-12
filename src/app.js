const express = require('express');
const routes = require('./routes.js');
// const connectDB = require('../config/db');
require('dotenv').config(); // Carrega as variáveis de ambiente do .env
const routesAnimaisPertidosAchados = require('../routes/animalPerdidoEncontradoroutes')

const app = express();

// Conecta ao banco de dados
// const connectDB = require('../config/db');
// connectDB(); // ❌ Comentado - não conecta automaticamente ao importar


// Middleware para o Express entender requisições em formato JSON
app.use(express.json());

// Adiciona o prefixo /api para todas as rotas definidas em 'routes'
app.use('/api', routes);
app.use('/api', routesAnimaisPertidosAchados);
module.exports = app;