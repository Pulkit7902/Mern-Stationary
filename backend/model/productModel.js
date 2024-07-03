const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    productImage: {
        type: [String],  // Specify the type of elements in the array
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0  // Optional: ensures price is non-negative
    },
    sellingPrice: {
        type: Number,
        required: true,
        min: 0  // Optional: ensures selling price is non-negative
    }
}, {
    timestamps: true
});

const productModel = mongoose.model('ProductData', productSchema);
module.exports = productModel;
