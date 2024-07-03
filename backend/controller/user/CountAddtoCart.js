const AddtoCartModel = require("../../model/AddtoCartModel");

const CountAddtocart = async(req,res)=>{
    try {
        const userId = req.userId
        const count = await AddtoCartModel.countDocuments({
            userId:userId
        })
        res.json({
            data:{
                count: count
            },
            message:"Ok",
            error:false,
            success:true
        })
        
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
        
    }
}
module.exports = CountAddtocart