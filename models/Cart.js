const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.ObjectId },
    TotalPrice : {type : Number},
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }    
},
);

module.exports = mongoose.model.Cart || mongoose.model('Cart', CartSchema);