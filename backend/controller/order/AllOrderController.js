const OrderModel = require("../../model/OrderModel");

const AllOrderController = async(req,res)=>{
    try {
        const Allorder = await OrderModel.find().sort({createdAt :-1})
        return res.json({
            data:Allorder,

            success:true,
            error:false
        })
        
    } catch (err) {
        console.error(err); // Log the error
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
      
    }
}
module.exports =AllOrderController