const PedidoModel = require('../Models/PedidoModel');

const fazerPedido = async (req, res) => {
    const { cliente_id, data_pedido, total, carrinho_id, status } = req.body;

   

    try {
        const novoPedido = await PedidoModel.fazerPedido({
            cliente_id,
            data_pedido,
            total,
            carrinho_id,
            status
        });

        // Enviar a resposta com os dados do novo pedido
        res.json({ mensagem: 'Pedido feito com sucesso', pedido: novoPedido });
    } catch (error) {
        console.error('Erro ao fazer pedido:', error.message);
        res.status(500).json({ error: 'Erro interno do servidor ao fazer pedido' });
    }
};

const listarPedidos = async (req, res) => {
   
    const { cliente_id } = req.body;

    // Validar os dados conforme necessário

    try {
        // Chamar a função do modelo para listar os pedidos
        const pedidos = await PedidoModel.listarPedidos({ cliente_id });

        // Enviar a resposta com os pedidos listados
        res.json({ pedidos });
    } catch (error) {
        console.error('Erro ao listar pedidos:', error.message);
        res.status(500).json({ error: 'Erro interno do servidor ao listar pedidos' });
    }
};

module.exports = {
    fazerPedido,
    listarPedidos
};
