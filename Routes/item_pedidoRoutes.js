const express = require('express');
const router = express.Router();

const ItemPedidoController = require('../Controllers/itemPedidoController');

// Rota para adicionar um item ao carrinho
router.post('/adicionar', ItemPedidoController.adicionarItemAoCarrinho);

// Rota para atualizar a quantidade de um item no carrinho
router.put('/atualizar/:item_pedido_id', ItemPedidoController.atualizarQuantidadeNoCarrinho);

// Rota para remover um item do carrinho
router.delete('/remover/:item_pedido_id', ItemPedidoController.removerItemDoCarrinho);

// Rota para listar os itens do carrinho
router.get('/listar/:cliente_id', ItemPedidoController.listarItensDoCarrinho);

// Rota para limpar o carrinho
router.delete('/limpar/:cliente_id', ItemPedidoController.limparCarrinho);

module.exports = router;
