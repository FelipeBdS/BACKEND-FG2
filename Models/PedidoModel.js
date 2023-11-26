const dbConnect = require('../db/index');

const fazerPedido = async (pedido) => {
    const query = "INSERT INTO pedido(cliente_id, data_pedido, total, carrinho_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [
        pedido.cliente_id,
        pedido.data_pedido,
        pedido.total,
        pedido.carrinho_id,
        pedido.status
    ];

    try {
        const result = await dbConnect.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao fazer pedido:', error.message);
        throw new Error('Erro ao fazer pedido');
    }
};

const listarPedidos = async (pedido) => {
    const query = "SELECT pedido_id, cliente_id, data_pedido, total, status FROM pedido WHERE cliente_id = $1";
    const values = [pedido.cliente_id];

    try {
         const result = await dbConnect.query(query, values);
         console.log('Resultados do banco de dados:', result.rows);
         return result.rows;
    } catch (error) {
        console.error('Erro ao obter pedidos: ', error.message);
    throw new Error('Erro ao consultar pedidos')
    }

}

module.exports = {
    fazerPedido,
    listarPedidos
};
