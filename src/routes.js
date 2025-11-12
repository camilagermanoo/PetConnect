const { Router } = require('express');
const router = Router();

// 1. Importa o controller de animais e usuário que criamos
const animalController = require('./controllers/animalController');
const authController = require('./controllers/authController');

router.get('/', (req, res) => {
  res.send('API funcionando');
});

// --- ROTAS DE AUTENTICAÇÃO ---
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// --- ROTAS PARA O CRUD DE ANIMAIS ---

// 2. Rota para CADASTRAR um novo animal (POST /animais)
router.post('/animais', animalController.createAnimal);

// 3. Rota para LISTAR todos os animais (GET /animais)
router.get('/animais', animalController.getAllAnimals);

// 4. Rota para BUSCAR um animal específico pelo ID (GET /animais/:id)
router.get('/animais/:id', animalController.getAnimalById);

// 5. Rota para ATUALIZAR COMPLETAMENTE um animal pelo ID (PUT /animais/:id)
router.put('/animais/:id', animalController.updateAnimal);

// 6. Rota para ATUALIZAR PARCIALMENTE um animal pelo ID (PATCH /animais/:id)
router.patch('/animais/:id', animalController.updatePartialAnimal);

// 7. Rota para DELETAR um animal pelo ID (DELETE /animais/:id)
router.delete('/animais/:id', animalController.deleteAnimal);

module.exports = router;
