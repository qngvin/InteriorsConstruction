const express = require('express');
const contractRouter = express.Router();

const contractController = require('../controller/contractController.js');
contractRouter.route('/:name').get(contractController.getContractByName);
contractRouter.route('/').post(contractController.createContract);
contractRouter.route('/').get(contractController.getAllContract);
contractRouter.route('/:id').delete(contractController.deleteContractById);

module.exports = contractRouter;