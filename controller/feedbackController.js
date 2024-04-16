const FeedbackModel = require('../models/Feedback.js');

const getFeedbackByProductId = async (req, res, next) => {
    const productId = req.params.Product;
    try {
        const feedbacks = await FeedbackModel.find({ Product: productId });
        res.status(200).json(feedbacks);
    } catch (error) {
        return res.status(500).json({
            msg: 'Failed',
        });
    }
};

const getFeedbackByUserId = async (req, res, next) => {
    const userId = req.params.User;
    try {
        const feedbacks = await FeedbackModel.find({ User: userId });
        res.status(200).json(feedbacks);
    } catch (error) {
        return res.status(500).json({
            msg: 'Failed',
        });
    }
};

const getFeedbackById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const feedback = await FeedbackModel.findOne({ _id: id }).populate('User');
        if (feedback) {
            res.status(200).json(feedback);
        } else {
            res.status(404).json({ msg: 'Not Found' });
        }
    } catch (error) {
        return res.status(500).json({
            msg: 'Failed',
        });
    }
};

const createFeedback = async (req, res, next) => {
    const { Name, Stars, Description, Status } = req.body;
    try {
        const feedback = await FeedbackModel.create({
            Name,
            Stars,
            Description,
            Status,
        });
        res.status(201).json({
            msg: 'Create new feedback successfully',
            data: feedback,
        });
    } catch (error) {
        if (error) {
            res.status(400).json({ error: 'Failed to create feedback' });
        }
        return res.status(500).json({
            msg: 'Failed',
        });
    }
};

const updateFeedback = async (req, res, next) => {
    const { Name, Stars, Description, Status, User } = req.body;
    const id = req.params.id;

    try {
        const feedbackToUpdate = await FeedbackModel.findById(id);
        if (!feedbackToUpdate) {
            return res.status(404).json({ msg: 'Not Found' });
        }
        feedbackToUpdate.Name = Name || feedbackToUpdate.Name;
        feedbackToUpdate.Stars = Stars || feedbackToUpdate.Stars;
        feedbackToUpdate.Description = Description || feedbackToUpdate.Description;
        feedbackToUpdate.Status = Status || feedbackToUpdate.Status;

        await feedbackToUpdate.save();

        res.status(200).json({
            msg: 'Update successfully',
            data: feedbackToUpdate,
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Failed' });
    }
};

module.exports = {
    getFeedbackByProductId,
    getFeedbackByUserId,
    getFeedbackById,
    createFeedback,
    updateFeedback,
};
