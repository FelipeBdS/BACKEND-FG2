const dbConnect = require('../db/index')

const novoItemPedido = async (item_pedido) => {
    const query = "INSERT INTO item_pedido(camisa_id, quantidade, preco_unitario) VALUES($1, $2, $3) "
    const values = [item_pedido.camisa_id, item_pedido.quantidade, item_pedido.preco_unitario]

    try {
        const result = await dbConnect.query(query, values)
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao adicionar item para o carrinho', error.message);
        throw new Error('Erro ao adicionar item ao carrinho')
    };
};

module.exports = {
    novoItemPedido,
}