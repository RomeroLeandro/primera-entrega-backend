const {Router} = require('express')
const ProductManagerMongo = require('../dao/manager/productsManagerMongo')
const ProductManagerFile = require('../dao/manager/productsManagerFile');
const productsViewsRouter = Router()
const productModel = require('../dao/model/products-model');

// const USE_MONGO_DB = require('../config/config');
// const productManager = USE_MONGO_DB ? new ProductManagerMongo() : new ProductManagerFile();



productsViewsRouter.get('/', async(req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  const options = {
    page: page,
    limit: limit,
  };

  const products = await productModel.paginate({ }, options);
  console.log(products)

  products.docs = products.docs.map(product => product.toObject())

return res.render('products', products)
})

module.exports = productsViewsRouter