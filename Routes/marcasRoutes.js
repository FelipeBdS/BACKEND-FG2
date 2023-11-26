const express = require('express');
const router = express.Router();

const MarcaController = require('../Controllers/marcaController');

// Rota para obter todas as marcas
router.get('/obter-todas', MarcaController.obterTodasAsMarcas);

module.exports = router;
