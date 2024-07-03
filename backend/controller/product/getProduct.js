const productModel = require("../../model/productModel");

async function getProduct(req , res){
    try {
        const allProduct = await productModel.find()
        res.json({
            message:"All Product",
            success:true,
            error:false,
            data:allProduct
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
        
    }

}
module.exports = getProduct