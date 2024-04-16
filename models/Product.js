const mongoose = require('mongoose')
// require("mongoose-currency").loadType(mongoose);
const ProductSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.ObjectId },
    Name: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    Size: {
        type: String,
        required: true,
    },
    Material: {
        type: String,
        required: true,
    },
    Color: {
        type: String,
        required: true,
    },
    Weigh: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
        required: true,
    },
    Status: {
        type: Boolean,
        required: true,
    },

    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
}, { timestamps: true }
);

module.exports = mongoose.model.Product || mongoose.model('Product', ProductSchema);
// var Product = mongoose.model("Product", ProductSchema);
// module.exports = Product;