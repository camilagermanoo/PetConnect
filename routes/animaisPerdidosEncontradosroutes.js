const express = require('express');
const controllerAnimaisPerdidosEncontrados = require('../src/controllers/animaisPerdidosEncontradosController');

const router = express.Router();

router.post('/animais-perdidos', controllerAnimaisPerdidosEncontrados.registrarAnimal);
router.get('/animais-perdidos',controllerAnimaisPerdidosEncontrados.listarTodos);
router.get('/animais-perdidos/:id',controllerAnimaisPerdidosEncontrados.listarPorId);
router.put('/animais-perdidos/:id', controllerAnimaisPerdidosEncontrados.atualizarAnimal);
router.patch('/animais-perdidos/:id',controllerAnimaisPerdidosEncontrados.atualizarAnimal);
router.delete('/animais-perdidos/:id',controllerAnimaisPerdidosEncontrados.deletarAnimal);

module.exports = router;
