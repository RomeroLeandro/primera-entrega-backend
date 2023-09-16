const {Router} = require('express')
const productController = require('../controllers/productController')
const productsRouter = Router()


productsRouter.get('/', productController.getAllProducts)
productsRouter.get('/:pid', productController.getProductById)
productsRouter.post('/', productController.addProduct)
productsRouter.put('/:pid', productController.updateProduct)
productsRouter.delete('/:pid', productController.deleteProduct)

module.exports = productsRouter
