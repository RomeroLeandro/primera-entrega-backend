const express = require('express');
const productRouter = require('./router/products-router');
const cartRouter = require('./router/cart-router');

const path = require('path');
const handlebars = require('express-handlebars').create({
  defaultLayout: 'home',
  layoutsDir: path.join(__dirname, 'views', 'layouts')
});
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs').promises;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 8082;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views', 'layouts'));

// Middleware para procesar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Rutas
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.get('/', async (req, res) => {
  try {
    const productsFilePath = path.join(__dirname, 'database', 'products.json');
    const data = await fs.readFile(productsFilePath, 'utf8');
    const products = JSON.parse(data);

    res.render('home', { productos: products });
  } catch (error) {
    console.error('Error al obtener los productos', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});
app.get('/realtimeproducts', async (req, res) => {
  try {
    const productsFilePath = path.join(__dirname, 'database', 'products.json');
    const data = await fs.readFile(productsFilePath, 'utf8');
    const products = JSON.parse(data);

    res.render('realtimeproducts', { productos: products });
  } catch (error) {
    console.error('Error al obtener los productos', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Escuchar el evento "productosActualizados" y emitir los productos actualizados a través del socket
io.on('connection', (socket) => {
  socket.on('productosActualizados', async () => {
    try {
      const productsFilePath = path.join(__dirname, 'database', 'products.json');
      const data = await fs.readFile(productsFilePath, 'utf8');
      const products = JSON.parse(data);
      socket.emit('productosActualizados', { productos }); // Emitir los productos actualizados al cliente
    } catch (error) {
      console.error('Error al obtener los productos', error);
    }
  });
});

app.set('socketio', io);

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});

module.exports = { app, server, io };
