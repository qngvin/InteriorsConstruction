const mongoose = require('mongoose')

const ContractSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.ObjectId },
    Name: { type: String, require: true },
    StartDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value >= new Date(); // StartDate must be in the present or future
            },
            message: 'StartDate cannot be in the past.'
        }
    },
    EndDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value >= this.StartDate; // EndDate must be greater than or equal to StartDate
            },
            message: 'EndDate must be greater than or equal to StartDate.'
        }
    },
    Terms: {
        type: String,
    },
    Status: {
        type: Boolean
    },
    Description: {
        type: String
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
);

module.exports = mongoose.model.Contract || mongoose.model('Contract', ContractSchema);