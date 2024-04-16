const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    id: { type: mongoose.Schema.ObjectId },
    categoryName: {
        type: String,
        required: true
    },
}, { timestamps: true }
);

module.exports = mongoose.model.Category || mongoose.model('Category', CategorySchema);
// var Category = mongoose.model("Category", categorySchema);
// module.exports = Category;