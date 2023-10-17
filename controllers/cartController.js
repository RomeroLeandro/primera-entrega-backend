const cartService = require('../services/cartServices');
const customErrorHandler = require('../errors/errorController');
const logger = require('../logger');

async function getCart(req, res) {
    try {
      const carts = await cartService.getCart();
      res.json(carts);
    } catch (error) {
      logger.error(`Error en getCart: ${error}`);
      const errorMessage = customErrorHandler('CART_FETCH_FAILED');
      res.status(500).json(errorMessage);
    }
  }
  
  async function getCartById(req, res) {
    const cid = req.params.id;
    try {
      const cart = await cartService.getCartById(cid);
      res.json(cart);
    } catch (error) {
      logger.error(`Error en getCartById: ${error}`);
      const errorMessage = customErrorHandler('CART_FETCH_FAILED');
      res.status(500).json(errorMessage);
    }
  }
  
  async function addCart(req, res) {
    try {
      const cart = await cartService.addCart(req.body);
      res.status(201).json(newCart);
    } catch (error) {
      logger.error(`Error en addCart: ${error}`);
      const errorMessage = customErrorHandler('CART_ADD_FAILED');
      res.status(500).json(errorMessage);
    }
  }
  
  async function addProductToCart(req, res) {
    const cid = req.params.id;
    const pid = req.params.id;
    try {
      const cart = await cartService.addProductToCart(cid, pid);
      res.status(201).json(cart);
    } catch (error) {
      logger.error(`Error en addProductToCart: ${error}`);
      const errorMessage = customErrorHandler('PRODUCT_ADD_TO_CART_FAILED');
      res.status(500).json(errorMessage);
    }
  }
  
  async function removeProductFromCart(req, res) {
    const cid = req.params.id;
    const pid = req.params.id;
    try {
      await cartService.removeProductFromCart(cid, pid);
      res.status(204).json({ status: 'success', message: 'Producto eliminado del carrito con éxito' });
    } catch (error) {
      logger.error(`Error en removeProductFromCart: ${error}`);
      const errorMessage = customErrorHandler('PRODUCT_REMOVE_FROM_CART_FAILED');
      res.status(500).json(errorMessage);
    }
  }
  
  module.exports = {
    getCart,
    getCartById,
    addCart,
    addProductToCart,
    removeProductFromCart,
    updateCart,
    updateProductQuantity,
    purchaseCart
  };