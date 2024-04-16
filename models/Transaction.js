const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    To: {
        type: String,
        required: [true, 'To field is required'],
        trim: true,
    },
    Value: {
        type: Number,
        required: [true, 'Value field is required'],
    },
    Description: {
        type: String,
        required: [true, 'Description field is required'],
        trim: true,
    },
    Status: {
        type: Boolean,
        default: false,
    },
    Contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract',
    },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
