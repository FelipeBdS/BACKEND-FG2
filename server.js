const express = require('express');
const app = express();
const cors = require('cors')
const clienteRoutes = require('./Routes/clienteRoutes')
require('dotenv').config();
const pedidoRoutes = require('./Routes/pedidoRoutes')
const carrinhoRoutes = require('./Routes/carrinhoRoutes')
const itemPedidoRoutes = require('./Routes/item_pedidoRoutes')
const camisasRoutes = require('./Routes/camisaRoutes')
const marcasRoutes = require('./Routes/marcasRoutes')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173/FRONTEND-FG2');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api/cliente', clienteRoutes)
app.use('/api/pedido', pedidoRoutes)
app.use('./api/carrinho', carrinhoRoutes)
app.use('/api/itemPedido', itemPedidoRoutes)
app.use('/api/camisas', camisasRoutes)
app.use('/api/marcas', marcasRoutes)


const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});