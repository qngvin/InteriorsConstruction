const mongoose = require('mongoose');

const ManageConstructionSchema = new mongoose.Schema({
    Description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    Image: {
        type: String,
        required: [true, 'Image URL is required'],
        trim: true,
    },
    Status: {
        type: Boolean,
        default: false,
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
}, { timestamps: true });

module.exports = mongoose.model('ManageConstruction', ManageConstructionSchema);
