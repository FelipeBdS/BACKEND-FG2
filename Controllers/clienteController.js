const ClienteModel = require('../Models/ClienteModel.js')



const cadastrarNovoUsuario = async(req, res) => {
  const { nome, nome_usuario, senha, rua, numero_casa, bairro, cidade, estado } = req.body;

  const nomeUsuarioExistente = await ClienteModel.nomeUsuarioJaExiste( nome_usuario );
  if (nomeUsuarioExistente) {
    return res.status(400).json({ error: "Nome de usuário já existe."});
  }

  const novoCliente = await ClienteModel.cadastrarCliente({nome, nome_usuario, senha, rua, numero_casa, bairro, cidade, estado});
  res.json(novoCliente);
};


const loginCliente = async (req, res) => {
  const { nome_usuario, senha } = req.body;

  try {
    const usuarioAutenticado = await ClienteModel.loginCliente({ nome_usuario, senha });

    if (usuarioAutenticado) {
      const informacoesCliente = await ClienteModel.credenciaisCliente(usuarioAutenticado);

      if (informacoesCliente) {
        
        res.json({ mensagem: 'Autenticação bem-sucedida', usuario: informacoesCliente });
      } else {
        res.status(500).json({ error: 'Erro ao obter informações do cliente - Cliente_ID não encontrado' });
      }
    } else {
      res.status(401).json({ error: 'Nome de usuário ou senha inválidos' });
    }
  } catch (error) {
    console.error('Erro ao autenticar cliente:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


const excluirCliente = async (req, res) => {
  const { cliente_id } = req.params.ciente_id;

  try {
    const cliente = await ClienteModel.credenciaisCliente({ cliente_id });

    if (!cliente) {
      return res.status(404).json({ success: false, message: 'Cliente não encontrado.' });
    }

    const resultadoExclusao = await ClienteModel.excluirCliente(cliente);

    if (resultadoExclusao.success) {
      return res.status(200).json({ success: true, message: resultadoExclusao.message });
    } else {
      return res.status(500).json({ success: false, message: resultadoExclusao.message });
    }
  } catch (error) {
    console.error('Erro ao excluir cliente:', error.message);
    res.status(500).json({ success: false, message: 'Erro ao excluir cliente.' });
  }
};

const atualizarInformacoesCliente = async (req, res) => {
  const { cliente_id } = req.params;
  const novasInformacoes = req.body;

  try {
    const resultadoAtualizacao = await ClienteModel.atualizarInformacoesCliente(
      cliente_id,
      novasInformacoes
    );

    if (resultadoAtualizacao.success) {
      return res.status(200).json({ success: true, message: resultadoAtualizacao.message });
    } else {
      return res.status(404).json({ success: false, message: resultadoAtualizacao.message });
    }
  } catch (error) {
    console.error('Erro ao atualizar informações do cliente:', error.message);
    res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
  }
};


module.exports = {
  cadastrarNovoUsuario,
  loginCliente,
  excluirCliente,
  atualizarInformacoesCliente
  
}



















// Rota para cadastrar um cliente
// const getAllClients = async (req, res) => {
  // CRIAR CLIENT
  // const values = req.body
  // const query = "INSERT INTO cliente(nome, nome_usuario, senha, rua, numero_casa, bairro, cidade, estado) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *"
  // const values = ['Justin', 'JustinBrabo', "12345", "José Vanderlei", 12, "monte", "paulicity", "sp" ]


  // dbConnect.query("SELECT * FROM cliente").then(response => {
  //   res.json(response.rows)
  // })
  // try {
  //   const novoCliente = await Cliente.create(req.body);
  //   res.status(201).json(novoCliente);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ mensagem: 'Erro interno do servidor' });
  // }
// };

// module.exports = { getAllClients }