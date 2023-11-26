const CamisaModel = require('../Models/CamisaModel');

const listarCamisasPorMarca = async (req, res) => {
  const { marca_id } = req.params;

  try {
    const camisas = await CamisaModel.listarCamisasPorMarca(marca_id);
    res.json({ camisas });
  } catch (error) {
    console.error('Erro ao listar camisas por marca:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor ao listar camisas por marca' });
  }
};

const listarCamisasMaisVendidas = async (req, res) => {
  try {
    console.log('Recebido pedido para listar camisas mais vendidas.');
    const camisas = await CamisaModel.listarCamisasMaisVendidas();
    res.json({ camisas });
  } catch (error) {
    console.error('Erro ao listar camisas mais vendidas:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor ao listar camisas mais vendidas' });
  }
};

module.exports = {
  listarCamisasPorMarca,
  listarCamisasMaisVendidas,
};

