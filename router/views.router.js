const {Router} = require('express')
const ProductManagerMongo = require('../dao/manager/productsManagerMongo')
const ProductManagerFile = require('../dao/manager/productsManagerFile');
const productsViewsRouter = Router()
const USE_MONGO_DB = false;
const productManager = USE_MONGO_DB ? new ProductManagerMongo() : new ProductManagerFile();


productsViewsRouter.get('/', async(req, res) => {
    const products = await productManager.getAllProducts()
    console.log({ products })
    return res.render('products', { products })
})

module.exports = productsViewsRouter