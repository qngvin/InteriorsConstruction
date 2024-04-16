const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.ObjectId },
    Name: {
        type: String,
    },
    Address: { type: String },
    Email: {
        type: String,
        validate: {
            validator: function(value) {
                const emailRegex = /^\S+@\S+\.\S+$/;
                return emailRegex.test(value); // Validate email format using regex
            },
            message: 'Invalid email format.'
        }
    },
    IDCard: {
        type: String,
        validate: {
            validator: function(value) {
                const idCardRegex = /^[0-9]+$/;
                return idCardRegex.test(value); // Validate IDCard format using regex (only allows digits)
            },
            message: 'IDCard can only contain digits.'
        }
       
    },
    Image: { type: String },
    Gender: {
        type: String,
        enum: {
            values: ['Nam', 'Nữ'],
            message: '{VALUE} is not supported'
        },
    },
    Status: { type: Boolean },
    IdRole: {
        type: Number,
        ref: 'Role',
        default: 1,
    },
    IdAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        
    }
});

module.exports = mongoose.model.User || mongoose.model('User', UserSchema);
