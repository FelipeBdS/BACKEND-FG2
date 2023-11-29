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



const atualizarEndereco = async (req, res) => {
  const { rua, numero_casa, bairro, cidade, estado, nome_usuario } = req.body;

  try {
    const response = await ClienteModel.atualizarEndereco(rua, numero_casa, bairro, cidade, estado, nome_usuario);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar endereço.' });
  }
};

const excluirUsuario = async (req, res) => {
  const { nome_usuario } = req.body;

  try {
    const result = await ClienteModel.excluirConta(nome_usuario);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir usuário.' });
  }
};



module.exports = {
  cadastrarNovoUsuario,
  loginCliente,
  atualizarEndereco,
  excluirUsuario

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