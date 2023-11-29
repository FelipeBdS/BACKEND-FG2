const express = require('express');
const router = express.Router();
const ClienteController = require('../Controllers/clienteController');


// Rota para cadastrar um novo cliente
router.post('/cadastrarCliente', ClienteController.cadastrarNovoUsuario);
// Rota para fazer login
router.post('/loginCliente', ClienteController.loginCliente);

router.delete('/excluirConta', ClienteController.excluirUsuario);

router.put('/atualizarEndereco', ClienteController.atualizarEndereco);

router.get('/userInfo', ClienteController.obterUltimoCliente)

module.exports = router;
