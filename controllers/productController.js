const productService = require('../services/productServices');
const logger = require('../logger');
async function getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      logger.error(`Error en getAllProducts: ${error}`);
      const errorMessage = customErrorHandler('PRODUCT_FETCH_FAILED');
      res.status(500).json(errorMessage);
    }
  }
  
  async function getProductById(req, res) {
    const pid = req.params.id;
    try {
      const product = await productService.getProductById(pid);
      res.json(product);
    } catch (error) {
      logger.error(`Error en getProductById: ${error}`);
      const errorMessage = customErrorHandler('PRODUCT_FETCH_FAILED');
      res.status(500).json(errorMessage);
    }
  }
  
  async function addProduct(req, res) {
    const body = req.body;
    try {
      const product = await productService.addProduct(body);
      res.status(201).json(product);
    } catch (error) {
      logger.error(`Error en addProduct: ${error}`);
      const errorMessage = customErrorHandler('PRODUCT_CREATE_FAILED');
      res.status(500).json(errorMessage);
    }
  }
  
  async function updateProduct(req, res) {
    const pid = req.params.id;
    const body = req.body;
    try {
      const product = await productService.updateProduct(pid, body);
      res.json(product);
    } catch (error) {
      logger.error(`Error en updateProduct: ${error}`);
      const errorMessage = customErrorHandler('PRODUCT_UPDATE_FAILED');
      res.status(500).json(errorMessage);
    }
  }
  
  async function deleteProduct(req, res) {
    const pid = req.params.id;
    try {
      const product = await productService.deleteProduct(pid);
      res.json(product);
    } catch (error) {
      logger.error(`Error en deleteProduct: ${error}`);
      const errorMessage = customErrorHandler('PRODUCT_DELETE_FAILED');
      res.status(500).json(errorMessage);
    }
  }

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}