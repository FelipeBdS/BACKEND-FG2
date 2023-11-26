const express = require('express');
const app = express();
const clienteRoutes = require('./Routes/clienteRoutes')
require('dotenv').config();
const pedidoRoutes = require('./Routes/pedidoRoutes')
const carrinhoRoutes = require('./Routes/carrinhoRoutes')
const itemPedidoRoutes = require('./Routes/item_pedidoRoutes')
const camisasRoutes = require('./Routes/camisaRoutes')
const marcasRoutes = require('./Routes/marcasRoutes')


app.use(express.json());

app.use('/api/cliente', clienteRoutes)
app.use('/api/pedido', pedidoRoutes)
app.use('./api/carrinho', carrinhoRoutes)
app.use('./api/itemPedido', itemPedidoRoutes)
app.use('./api/camisas', camisasRoutes)
app.use('/api/marcas', marcasRoutes)


const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});