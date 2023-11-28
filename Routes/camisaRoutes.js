const express = require('express');
const router = express.Router();
const CamisaController = require('../Controllers/camisaController');

router.get('/porMarca/:marca_id', CamisaController.listarCamisasPorMarca);
router.get('/maisVendidas', CamisaController.listarCamisasMaisVendidas);


module.exports = router;
