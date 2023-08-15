const { Router } = require('express');
const CartManagerMongo = require('../dao/manager/cartManagerMongo');
const CartManagerFile = require('../dao/manager/cartManagerFile');
const cartRouter = Router();

const USE_MONGO_DB = require('../config/config');
const cartManager = USE_MONGO_DB ? new CartManagerMongo() : new CartManagerFile();

cartRouter.get('/', async (req, res) => {
  const carts = await cartManager.getCarts();
  res.json(carts);
});

cartRouter.get('/:cid', async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartManager.getCartById(cid);
  return res.json(cart);
});

cartRouter.post('/', async (req, res) => {
  const newCart = await cartManager.addCart();
  return res.status(201).json(newCart);
});

cartRouter.post('/:cid/products/:pid', async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  try {
    await cartManager.addProductToCart(cid, pid);
    return res.redirect('/cart/64dab5d790a3c289d395ae2e');
  } catch (error) {
    
    return console.log(error);
  }
});

cartRouter.delete('/:cid/products/:pid', async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  
  try {
    await cartManager.removeProductFromCart(cid, pid);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
});

cartRouter.put('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  const updatedProducts = req.body.products; 

  try {
    await cartManager.updateCart(cartId, updatedProducts);
    return res.status(200).json({ status: 'success', message: 'Carrito actualizado con éxito' });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Error al actualizar el carrito' });
  }
});

cartRouter.put('/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const newQuantity = req.body.quantity;

  try {
    await cartManager.updateProductQuantity(cartId, productId, newQuantity);
    return res.status(200).json({ status: 'success', message: 'Cantidad de ejemplares actualizada con éxito' });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Error al actualizar la cantidad de ejemplares' });
  }
});

module.exports = cartRouter;
