const express = require('express');
const router = express.Router();

const animalPerdidoController = require('../src/controllers/animalPerdidoEncontradoController');

router.get('/', (req, res) => {
  res.send('API de Animais Perdidos e Encontrados funcionando');
});

// --- ROTAS PARA O CRUD DE ANIMAIS PERDIDOS/ENCONTRADOS ---

// 2. Rota para CADASTRAR um novo animal perdido/encontrado (POST /animais-perdidos)
router.post('/animais-perdidos', animalPerdidoController.createAnimal);

// 3. Rota para LISTAR todos os animais perdidos/encontrados (GET /animais-perdidos)
router.get('/animais-perdidos', animalPerdidoController.getAllAnimals);

// 4. Rota para BUSCAR um animal específico pelo ID (GET /animais-perdidos/:id)
router.get('/animais-perdidos/:id', animalPerdidoController.getAnimalById);

// 5. Rota para ATUALIZAR COMPLETAMENTE um animal pelo ID (PUT /animais-perdidos/:id)
router.put('/animais-perdidos/:id', animalPerdidoController.updateAnimal);

// 6. Rota para ATUALIZAR PARCIALMENTE um animal pelo ID (PATCH /animais-perdidos/:id)
router.patch('/animais-perdidos/:id', animalPerdidoController.updatePartialAnimal);

// 7. Rota para DELETAR um animal pelo ID (DELETE /animais-perdidos/:id)
router.delete('/animais-perdidos/:id', animalPerdidoController.deleteAnimal);

module.exports = router;
