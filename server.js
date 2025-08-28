const app = require('./src/app');

// Define a porta a partir do ambiente ou usa 3000 como padrão
const PORT = process.env.PORT || 3000;

// Inicia o servidor e o faz ouvir na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});