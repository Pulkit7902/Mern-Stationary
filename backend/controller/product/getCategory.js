const productModel = require("../../model/productModel");

async function getCategory(req , res){
    try {
        const productCategory = await productModel.distinct("category")
        console.log("category-> ", productCategory)
        const productbycategory = []
        for(const category of productCategory){
            const product = await productModel.findOne({category})
            if(product){
                productbycategory.push(product)
            }
        }
        res.json({
            message:"Mission Successfull",
            success:true,
            error:false,
            data:productbycategory
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
        
    }
}
module.exports = getCategory