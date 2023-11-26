const express = require('express');
const router = express.Router();
const PedidoController = require('../Controllers/pedidoController');


// Rota para cadastrar um novo cliente
router.post('/novoPedido', PedidoController.fazerPedido);
// Rota para fazer login
router.get('/pedidos', PedidoController.listarPedidos);


module.exports = router;
