const productModel = require("../../model/productModel");

const getProductDetails = async(req,res)=>{
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({
            data:product,
            message:"Ok",
            success:true,
            error:false,
            
        })
    } catch (err) {
        res.status(500).json({  // Return 500 Internal Server Error for other errors
            message: err.message || "An error occurred while uploading the product",
            error: true,
            success: false
        });
        
    }
}
module.exports = getProductDetails