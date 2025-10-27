const express = require('express');
const controllerAnimaisPerdidosEncontrados = require('../src/controllers/animalPerdidoEncontradoController');

const router = express.Router();
                            // -------------------- Rotas -------------------- //
// ROTA POST //                             
router.post('/animais-perdidos', controllerAnimaisPerdidosEncontrados.criarAnimal);

// ROTAS GET //
router.get('/animais-perdidos',controllerAnimaisPerdidosEncontrados.listarAnimal);
router.get('/animais-perdidos/:id',controllerAnimaisPerdidosEncontrados.listarAnimalPorId);

// ROTAS PUT/PATCH // 
router.put('/animais-perdidos/:id', controllerAnimaisPerdidosEncontrados.atualizarAnimal);
router.patch('/animais-perdidos/:id',controllerAnimaisPerdidosEncontrados.atualizarParcialAnimal);

// ROTA DELETE //
router.delete('/animais-perdidos/:id',controllerAnimaisPerdidosEncontrados.excluirAnimal);

module.exports = router;
