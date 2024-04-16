const express = require('express');
const transactionRouter = express.Router();
const transactionController = require('../controller/transactionController');

transactionRouter.route('/').get(transactionController.getAllTransactions);
transactionRouter.route('/').post(transactionController.createTransaction);
transactionRouter.route('/:id').get(transactionController.getTransactionById);
transactionRouter.route('/:id').put(transactionController.updateTransactionById);
transactionRouter.route('/:id').delete(transactionController.deleteTransactionById);


module.exports = transactionRouter;