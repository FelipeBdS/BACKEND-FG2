const dbConnect = require('../db/index');

const adicionarAoCarrinho = async (carrinho) => {
  const query = "INSERT INTO carrinho(cliente_id, item_pedido_id, quantidade, subtotal) VALUES ($1, $2, $3, $4) ";
  const values = [carrinho.cliente_id, carrinho.item_pedido_id, carrinho.quantidade, carrinho.subtotal];

  try {
    const result = await dbConnect.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error.message);
    throw new Error('Erro ao adicionar ao carrinho');
  }
};

const atualizarQuantidadeNoCarrinho = async (carrinho) => {
  const query = 'UPDATE carrinho SET quantidade = $1, subtotal = $2 WHERE cliente_id = $3 AND item_pedido_id = $4 ';
  const values = [carrinho.quantidade, carrinho.subtotal, carrinho.cliente_id, carrinho.item_pedido_id];

  try {
    const result = await dbConnect.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao atualizar quantidade no carrinho:', error.message);
    throw new Error('Erro ao atualizar quantidade no carrinho');
  }
};

const removerItemDoCarrinho = async (cliente_id, item_pedido_id) => {
  const query = 'DELETE FROM carrinho WHERE cliente_id = $1 AND item_pedido_id = $2 ';
  const values = [cliente_id, item_pedido_id];

  try {
    const result = await dbConnect.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao remover item do carrinho:', error.message);
    throw new Error('Erro ao remover item do carrinho');
  }
};

const listarItensDoCarrinho = async (cliente_id) => {
  const query = 'SELECT * FROM carrinho WHERE cliente_id = $1';
  const values = [cliente_id];

  try {
    const result = await dbConnect.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Erro ao listar itens do carrinho:', error.message);
    throw new Error('Erro ao listar itens do carrinho');
  }
};

const limparCarrinho = async (cliente_id) => {
  const query = 'DELETE FROM carrinho WHERE cliente_id = $1 ';
  const values = [cliente_id];

  try {
    const result = await dbConnect.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao limpar carrinho:', error.message);
    throw new Error('Erro ao limpar carrinho');
  }
};

module.exports = {
  adicionarAoCarrinho,
  atualizarQuantidadeNoCarrinho,
  removerItemDoCarrinho,
  listarItensDoCarrinho,
  limparCarrinho,
};
