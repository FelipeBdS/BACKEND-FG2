const dbConnect = require('../db/index');

// verifica se o nome de usuario já existe
const nomeUsuarioJaExiste = async (nomeUsuario) => {
  const query = 'SELECT nome_usuario FROM cliente WHERE nome_usuario = $1';
  const values = [nomeUsuario];

  try {
    const result = await dbConnect.query(query, values);
    console.log('Resultado da consulta:', result.rows); 
    return result.rows.length > 0;
  } catch (error) {
    console.error('Nome de usuario já existente' + error.message);
    throw error;
  }

};



// Cadastra o usuario no banco de dados
const cadastrarCliente = async (cliente) => {
  const query = "INSERT INTO cliente(nome, nome_usuario, senha, rua, numero_casa, bairro, cidade, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ";
  const values = [cliente.nome, cliente.nome_usuario, cliente.senha, cliente.rua, cliente.numero_casa, cliente.bairro, cliente.cidade, cliente.estado];

  const nomeUsuarioExistente = await nomeUsuarioJaExiste(cliente.nome_usuario);

  if (nomeUsuarioExistente) {
    throw new Error('Nome de usuario ja existe');
  };

  try {
    const result = await dbConnect.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao autenticar cliente:', error.message);
    throw new Error ('erro ao cadastrar cliente');
  };

};


// faz login
const loginCliente = async (cliente) => {
  const query = 'SELECT cliente_id, nome_usuario, senha FROM cliente WHERE nome_usuario = $1 AND senha = $2 ';
  const values = [cliente.nome_usuario, cliente.senha]

  console.log('Query:', query, 'Values:', values);
  console.log('Credenciais recebidas:', cliente);  
  try {
    const result = await dbConnect.query(query, values);
    console.log('Resultados do banco de dados:', result.rows);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao autenticar cliente:', error.message);
    throw new Error('Credenciais inválidas')
  };
};

const credenciaisCliente = async (cliente) => {
  const query = 'SELECT cliente_id, nome, nome_usuario, rua, numero_casa, bairro, cidade, estado FROM cliente WHERE nome_usuario = $1 AND senha = $2';
  const values = [cliente.nome_usuario, cliente.senha];

  try {
    const result = await dbConnect.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter informações do cliente');
  }
};

const atualizarEndereco = async (rua, numero_casa, bairro, cidade, estado, nome_usuario) => {
  const query = 'UPDATE cliente SET rua = $1, numero_casa = $2, bairro = $3, cidade = $4, estado = $5 WHERE nome_usuario = $6 RETURNING nome_usuario, rua';
  const values = [rua, numero_casa, bairro, cidade, estado, nome_usuario];

  try {
    const result = await dbConnect.query(query, values);
    const clienteAtualizado = result.rows[0];

    if (clienteAtualizado) {
      console.log(`Cliente com nome de usuário ${nome_usuario} atualizado com sucesso.`);
      return { sucesso: true, mensagem: `Cliente atualizado com sucesso.`, cliente: clienteAtualizado };
    } else {
      console.log(`Nenhum cliente encontrado com nome de usuário ${nome_usuario}.`);
      return { sucesso: false, mensagem: `Nenhum cliente encontrado com nome de usuário ${nome_usuario}.` };
    }
  } catch (error) {
    console.error('Erro ao atualizar cliente', error);
    return { sucesso: false, mensagem: 'Erro ao atualizar cliente.' };
  }
};

const obterUltimoCliente = async () => {
  const query = 'SELECT * FROM cliente ORDER BY cliente_id DESC LIMIT 1';
  try {
    const result = await dbConnect.query(query);

    if (result.rows.length === 0) {
      return null; // Nenhum cliente encontrado
    }

    return result.rows[0];
  } catch (error) {
    console.error('Erro ao obter o último cliente', error);
    throw error;
  }
};

const excluirCliente = async (nome_usuario) => {
  const query = 'DELETE FROM cliente WHERE nome_usuario = $1';
  const values = [nome_usuario];
  
  try {
    await dbConnect.query(query, values);
    console.log(`Cliente com nome de usuário ${nome_usuario} excluído com sucesso.`);
    return { sucesso: true, mensagem: `Cliente excluído com sucesso.` };
  } catch (error) {
    console.error('Erro ao excluir cliente', error);
    return { sucesso: false, mensagem: 'Erro ao excluir cliente.' };
  }
};


module.exports = {
  nomeUsuarioJaExiste,
  cadastrarCliente,
  loginCliente,
  credenciaisCliente,
  obterUltimoCliente,
  excluirCliente,
  atualizarEndereco
};






