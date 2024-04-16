const mongoose = require('mongoose')

const CartDetailSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.ObjectId },
    Quantity : {type : Number},
    Cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    Product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
},
);

module.exports = mongoose.model.CartDetail || mongoose.model('CartDetail', CartDetailSchema);