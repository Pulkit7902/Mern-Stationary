const AddtoCartModel = require("../../model/AddtoCartModel")

const AddtoviewCart = async(req,res)=>{
    try {
        const currentuser = req.userId
        const allproduct = await AddtoCartModel.find({
            userId:currentuser
        }).populate("productId")
        res.json({
            data:allproduct,
            success:true,
            error:false
        })
        
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
        
    }
}
module.exports = AddtoviewCart