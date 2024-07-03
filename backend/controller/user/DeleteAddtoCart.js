const AddtoCartModel = require("../../model/AddtoCartModel")

const DeleteAddtoCart = async(req,res)=>{
    try {
        const currentuerid = req.userId
        const addtocartproductid = req.body._id
        const deleteproduct = await AddtoCartModel.deleteOne({_id:addtocartproductid})
        res.json({
            message:"Product deleted Successfully",
            success:true,
            error:false,
            data:deleteproduct
        })
        
    } catch (err) {
        res.json({
            message : err?.message || err,
            error : true,
            success : false,
        })
        
    }
}
module.exports = DeleteAddtoCart