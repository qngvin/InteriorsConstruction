const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.ObjectId },
    Name: { type: String, require: true },
    Stars: {
        type: Number,
        enum: {

            values: [1, 2, 3, 4, 5],
            message: '{VALUE} is not supported'
        },
    },
    Description: {
        type: String
    },
    Status: {
        type: Boolean
    },

    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    Product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
}, { timestamps: true }
);

module.exports = mongoose.model.Feedback || mongoose.model('Feedback', FeedbackSchema);