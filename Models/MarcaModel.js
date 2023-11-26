const dbConnect = require('../db/index');

const obterTodasAsMarcas = async () => {
  const query = 'SELECT * FROM marcas';

  try {
    const result = await dbConnect.query(query);
    return result.rows;
  } catch (error) {
    console.error('Erro ao obter marcas:', error.message);
    throw new Error('Erro ao obter marcas');
  }
};

module.exports = {
  obterTodasAsMarcas,
};
