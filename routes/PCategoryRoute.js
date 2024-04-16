const express = require('express');
const PCategoryRouter = express.Router();
const PCategoryController = require('../controller/PCategoryController');

PCategoryRouter.route('/').get(PCategoryController.getAllPCategory);
PCategoryRouter.route('/').post(PCategoryController.createPCategory);
PCategoryRouter.route('/').delete(PCategoryController.deleteAllPCategory);


module.exports = PCategoryRouter;