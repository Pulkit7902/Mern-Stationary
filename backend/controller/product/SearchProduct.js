const productModel = require("../../model/productModel")

const SearchProduct = async(req,res)=>{
    try {
        const query = req.query.q
        const regex = new RegExp(query ,'i','g')
        const product = await productModel.find({
            "$or":[
                {
                    productName:regex
                },
                {
                    category:regex
                }

            ]
        })
        res.json({
            message:"Search ProductList",
            success:true,
            error:false,
            data:product
        })
        console.log("query issssssssss ->",query)

        
    } catch (err) {
        res.status(500).json({  // Return 500 Internal Server Error for other errors
            message: err.message || "An error occurred while uploading the product",
            error: true,
            success: false
        });
        
    }
}
module.exports = SearchProduct