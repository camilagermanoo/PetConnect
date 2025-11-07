const express = require('express');
const controllerAnimalPerdidoEncontrado = require('../src/controllers/animalPerdidoEncontradoController');

const router = express.Router();

//Rotas

router.post('/animais-perdidos', animalPerdidoController.createAnimal);
router.get('/animais-perdidos', animalPerdidoController.getAllAnimals);
router.get('/animais-perdidos/:id', animalPerdidoController.getAnimalById);
router.put('/animais-perdidos/:id', animalPerdidoController.updateAnimal);
router.patch('/animais-perdidos/:id', animalPerdidoController.updatePartialAnimal);
router.delete('/animais-perdidos/:id', animalPerdidoController.deleteAnimal);

module.exports = router;
