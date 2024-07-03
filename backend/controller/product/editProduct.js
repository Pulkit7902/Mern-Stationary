const  productModel = require("../../model/productModel");

async function editProduct(req , res){
    try{
        const {_id , ...resBody} = req.body
        const updateProduct = await productModel.findByIdAndUpdate(_id , resBody)
        res.json({
            message:"Product Updated Successfully",
            success:true,
            error:false,
            data:updateProduct
        })


        
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
        
    }
}
module.exports = editProduct