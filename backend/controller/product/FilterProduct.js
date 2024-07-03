const productModel = require("../../model/productModel");

const FilterProduct = async(req,res)=>{
    try {
        const categrylist = req?.body?.category
        const product = await productModel.find({
            
                
                    category : {
                        "$in":categrylist
                    }
                
            
        })
        res.json({
            data:product,
            message:"categorylist",
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
module.exports = FilterProduct