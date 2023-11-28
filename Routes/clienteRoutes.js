const express = require('express');
const router = express.Router();
const ClienteController = require('../Controllers/clienteController');


// Rota para cadastrar um novo cliente
router.post('/cadastrarCliente', ClienteController.cadastrarNovoUsuario);
// Rota para fazer login
router.post('/loginCliente', ClienteController.loginCliente);
// Rota para excluir conta
router.delete('/excluirConta', ClienteController.excluirCliente);
// Rota para atualizar endereço
router.put('/atualizarEndereço/:cliente_id', ClienteController)

module.exports = router;
