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

const excluirCliente = async(cliente) => {
  const query = "DELETE FROM cliente WHERE cliente_id = $1";
  const values = [cliente.cliente_id]

  try {
    const result = await dbConnect.query(query, values);
    if (result.rowCount > 0) {
      return { success: true, message: 'Cliente excluído com sucesso.' };
    } else {
      
      return { success: false, message: 'Cliente não encontrado.' };
    }
  } catch (error) {
    
    console.error('Erro ao excluir cliente:', error.message);
    return { success: false, message: 'Erro ao excluir cliente.' };
  }
};

const atualizarInformacoesCliente = async (cliente_id, novasInformacoes) => {
  const {
    rua,
    numero_casa,
    bairro,
    cidade,
    estado,
  } = novasInformacoes;

  const query =
    'UPDATE cliente SET rua = $1, numero_casa = $2, bairro = $3, cidade = $4, estado = $5 WHERE cliente_id = $6';
  const values = [
    rua,
    numero_casa,
    bairro,
    cidade,
    estado,
    cliente_id
  ];

  try {
    const result = await dbConnect.query(query, values);

    if (result.rowCount > 0) {
      return { success: true, message: 'Informações do cliente atualizadas com sucesso.' };
    } else {
      return { success: false, message: 'Cliente não encontrado.' };
    }
  } catch (error) {
    console.error('Erro ao atualizar informações do cliente:', error.message);
    return { success: false, message: 'Erro ao atualizar informações do cliente.' };
  }
};


module.exports = {
  nomeUsuarioJaExiste,
  cadastrarCliente,
  loginCliente,
  credenciaisCliente,
  excluirCliente,
  atualizarInformacoesCliente
};






