const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.ObjectId },
    PhoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (phoneNumber) {
                // Regular expression to validate phone numbers
                const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;; // Assuming a 10-digit phone number format

                return phoneRegex.test(phoneNumber);
            },
            message: 'Invalid phone number',
        },
    },
    Password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length >= 8;
            },
            message: 'Password must be at least 8 characters long.'
        }
    },
    Status: {
        type: Boolean,
        default: true,
    }
});
module.exports = mongoose.model.Account || mongoose.model('Account', AccountSchema);