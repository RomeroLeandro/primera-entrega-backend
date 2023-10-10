const { Router } = require('express');
const mockingRouter = Router();
const mockingModule = require('../mocking/mocking')

mockingRouter.get('/mockingproducts', (res, req) => {
    const products = mockingModule.generateMockProducts();
    res.json(products);
    });