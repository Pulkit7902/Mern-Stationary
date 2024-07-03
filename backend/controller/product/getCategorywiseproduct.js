const productModel = require("../../model/productModel");

async function getcategorywise(req , res){
    try {
        const {category} = req?.body

        const product = await productModel.find({category})
        res.json({
            data:product,
            message:"Product ",
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
module.exports = getcategorywise