const express = require('express');
const router = express.Router();
const CarrinhoController = require('../Controllers/carrinhoController');

// Adicionar item ao carrinho
router.post('/adicionar', CarrinhoController.adicionarAoCarrinho);

// Atualizar quantidade no carrinho
router.put('/atualizar', CarrinhoController.atualizarQuantidadeNoCarrinho);

// Remover item do carrinho
router.delete('/remover/:cliente_id/:item_pedido_id', CarrinhoController.removerItemDoCarrinho);

// Listar itens do carrinho
router.get('/listar/:cliente_id', CarrinhoController.listarItensDoCarrinho);



module.exports = router;

