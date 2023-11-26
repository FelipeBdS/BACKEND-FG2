const ItemPedidoModel = require('../Models/ItemPedidoModel');
const CarrinhoModel = require('../Models/CarrinhoModel');

const adicionarAoCarrinho = async (req, res) => {
  const { camisa_id, quantidade, preco_unitario, cliente_id } = req.body;

  try {
    // Cria um novo item de pedido com as informações da camisa
    const novoItemPedido = await ItemPedidoModel.novoItemPedido({
      camisa_id,
      quantidade,
      preco_unitario
    });

    // Adiciona o item ao carrinho
    const novoCarrinho = await CarrinhoModel.adicionarAoCarrinho({
      cliente_id,
      item_pedido_id: novoItemPedido.item_pedido_id,
      quantidade,
      subtotal: quantidade * preco_unitario
    });

    res.json({ mensagem: 'Item adicionado ao carrinho com sucesso', carrinho: novoCarrinho });
  } catch (error) {
    console.error('Erro ao adicionar item ao carrinho:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor ao adicionar item ao carrinho' });
  }
};

const atualizarQuantidadeNoCarrinho = async (req, res) => {
  const { item_pedido_id } = req.params;
  const { quantidade, preco_unitario, cliente_id } = req.body;

  try {
    // Atualiza a quantidade no carrinho
    const carrinhoAtualizado = await CarrinhoModel.atualizarQuantidadeNoCarrinho({
      cliente_id,
      item_pedido_id,
      quantidade,
      subtotal: quantidade * preco_unitario
    });

    res.json({ mensagem: 'Quantidade atualizada no carrinho com sucesso', carrinho: carrinhoAtualizado });
  } catch (error) {
    console.error('Erro ao atualizar quantidade no carrinho:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor ao atualizar quantidade no carrinho' });
  }
};

const removerItemDoCarrinho = async (req, res) => {
  const { item_pedido_id } = req.params;
  const { cliente_id } = req.body;

  try {
    // Remove o item do carrinho
    await CarrinhoModel.removerItemDoCarrinho(cliente_id, item_pedido_id);

    res.json({ mensagem: 'Item removido do carrinho com sucesso' });
  } catch (error) {
    console.error('Erro ao remover item do carrinho:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor ao remover item do carrinho' });
  }
};

const listarItensDoCarrinho = async (req, res) => {
  const { cliente_id } = req.params;

  try {
    // Lista os itens do carrinho
    const itensCarrinho = await CarrinhoModel.listarItensDoCarrinho(cliente_id);

    res.json({ itensCarrinho });
  } catch (error) {
    console.error('Erro ao listar itens do carrinho:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor ao listar itens do carrinho' });
  }
};

const limparCarrinho = async (req, res) => {
  const { cliente_id } = req.params;

  try {
    // Limpa o carrinho
    await CarrinhoModel.limparCarrinho(cliente_id);

    res.json({ mensagem: 'Carrinho esvaziado com sucesso' });
  } catch (error) {
    console.error('Erro ao limpar carrinho:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor ao limpar carrinho' });
  }
};

module.exports = {
  adicionarAoCarrinho,
  atualizarQuantidadeNoCarrinho,
  removerItemDoCarrinho,
  listarItensDoCarrinho,
  limparCarrinho,
};
