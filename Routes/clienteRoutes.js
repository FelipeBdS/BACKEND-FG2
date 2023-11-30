const express = require('express');
const router = express.Router();
const ClienteController = require('../Controllers/clienteController');


// Rota para cadastrar um novo cliente
router.post('/cadastrarCliente', ClienteController.cadastrarNovoUsuario);
// Rota para fazer login
router.post('/loginCliente', ClienteController.loginCliente);

router.delete('/excluirConta/:nome_usuario', ClienteController.excluirClienteController);

router.put('/atualizarEndereco', ClienteController.atualizarEnderecoController);

router.get('/userInfo', ClienteController.obterUltimoClienteController)


module.exports = router;
