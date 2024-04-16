const mongoose = require('mongoose')

const RequirementSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.ObjectId },
 
    Description: {
        type: String
    },
    Status: {
        type: Boolean
    },
    Cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    Contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract'
    }
}, { timestamps: true }
);

module.exports = mongoose.model.Requirement || mongoose.model('Requirement', RequirementSchema);