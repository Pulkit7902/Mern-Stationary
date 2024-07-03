const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    productId:{
        ref:'ProductData',
        type:String,
    },
    quantity:Number,
    userId:String

},{
    timestamps:true
});

const AddtoCartModel = mongoose.model('AddToCart', userSchema);

module.exports = AddtoCartModel;