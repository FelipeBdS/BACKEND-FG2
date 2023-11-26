const MarcaModel = require('../Models/MarcaModel');

const obterTodasAsMarcas = async (req, res) => {
  try {
    const marcas = await MarcaModel.obterTodasAsMarcas();
    res.json({ marcas });
  } catch (error) {
    console.error('Erro ao obter marcas:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor ao obter marcas' });
  }
};

module.exports = {
  obterTodasAsMarcas,
};
