const express = require('express');
const feedbackRouter = express.Router();
const feedbackController = require('../controller/feedbackController.js');

feedbackRouter.route('/feedbacks/:productId').get(feedbackController.getFeedbackByProductId);
feedbackRouter.route('/feedbacks/:userId').get(feedbackController.getFeedbackByUserId);
feedbackRouter.route('/feedbacks/:id').get(feedbackController.getFeedbackById);
feedbackRouter.route('/feedbacks').post(feedbackController.createFeedback);
feedbackRouter.route('/feedbacks/:id').put(feedbackController.updateFeedback);

module.exports = feedbackRouter;
