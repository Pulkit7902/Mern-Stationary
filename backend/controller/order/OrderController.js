const OrderModel = require("../../model/OrderModel");

const orderController = async(req,res)=>{
    try {
        const currentuserId = req.userId
        const orderList = await OrderModel.find({userId:currentuserId})
        res.json({
            data:orderList,
            message:"Order List",
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
module.exports = orderController