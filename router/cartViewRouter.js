// cart-router.js
const { Router } = require('express');
const CartManagerMongo = require('../dao/manager/cartManagerMongo');
const CartManagerFile = require('../dao/manager/cartManagerFile');
const USE_MONGO_DB = require('../config/config');

const cartRouter = Router();
const cartManager = USE_MONGO_DB ? new CartManagerMongo() : new CartManagerFile();

// Resto del código del cartRouter

// Ruta para mostrar los detalles del carrito
cartRouter.get('/:cid', async (req, res) => {
  const cid = req.params.cid;
  console.log('Carrito ID:', cid);
  const cart = await cartManager.getCartById(cid);
  console.log('Contenido del carrito:', cart);
  res.render('cart', { cart });
});

module.exports = cartRouter;
