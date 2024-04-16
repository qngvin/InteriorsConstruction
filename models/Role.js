const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
    _id: Number,
    Name: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model.Role || mongoose.model('Role', RoleSchema);