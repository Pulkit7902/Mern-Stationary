const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    ProductDetail:{
        type:Array,
        default:[]
    },
    email:{
        type:String,
        default:""

    },
    userId:{
        type:String,
        default:""

    },
    paymentDetails:{
        paymentId:{
            type:String,
            default:""
        },
        payment_method_type:[],
        payment_status:{
            type:String,
            default:""
        }
    },
    shipping_option:[],
    totalAmount:{
        type:Number,
        default:0
    }
},{
    timestamps:true    


});

const OrderModel = mongoose.model('OrderDetails', OrderSchema);

module.exports = OrderModel;