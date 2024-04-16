const express = require('express');
const requireRouter = express.Router();
const requireController = require('../controller/requirementController');

requireRouter.route('/').get(requireController.getAllReq);
requireRouter.route('/:id').get(requireController.getReqByID);
requireRouter.route('/:name').get(requireController.getReqByName);
requireRouter.route('/:id').put(requireController.updateReqById);
requireRouter.route('/:id').delete(requireController.deleteReqById);
module.exports = requireRouter;