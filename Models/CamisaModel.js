const dbConnect = require('../db/index');

const listarCamisasPorMarca = async (marca_id) => {
  const query = 'SELECT camisa_id, marca_id, descricao, tamanho, preco FROM camisas WHERE marca_id = $1';
  const values = [marca_id];

  try {
    const result = await dbConnect.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao listar camisas por marca');
  }
};

const listarCamisasMaisVendidas = async () => {
  const query = 'SELECT camisa_id, marca_id, descricao, tamanho, url_imagem1, url_imagem2, url_imagem3 preco FROM camisas WHERE quantidade_vendida > 100';
  try {
    const result = await dbConnect.query(query);
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao listar camisas mais vendidas');
  }
};

module.exports = {
  listarCamisasPorMarca,
  listarCamisasMaisVendidas,
};
