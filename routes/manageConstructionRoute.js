const express = require('express');
const ManageConstructionRouter = express.Router();
const ManageConstructionController = require('../controller/manageConstructionController');

ManageConstructionRouter.route('/all').get(ManageConstructionController.getAllConstruction);
ManageConstructionRouter.route('/create').post(ManageConstructionController.createConstruction);
ManageConstructionRouter.route('/:constructionId').get(ManageConstructionController.getConstructionByConstructionId);
ManageConstructionRouter.route('/:constructionId').put(ManageConstructionController.updateConstructionByConstructionId);
ManageConstructionRouter.route('/:constructionId').delete(ManageConstructionController.deleteConstructionByConstructionId);
ManageConstructionRouter.route('/user/:UserId').get(ManageConstructionController.getConstructionByUserId);

module.exports = ManageConstructionRouter;

