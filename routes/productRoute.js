const express = require('express');
const productRouter = express.Router();
const productController = require('../controller/productController');

productRouter.route('/').get(productController.getAllProduct);
productRouter.route('/').post(productController.createProduct);
productRouter.route('/').delete(productController.deleteAllProduct);
productRouter.route('/:id').get(productController.getProductById);
productRouter.route('/:id').put(productController.updateProductById);
productRouter.route('/:id').delete(productController.deleteProductById);

module.exports = productRouter;