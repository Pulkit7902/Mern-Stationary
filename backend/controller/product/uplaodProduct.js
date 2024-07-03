
const productModel = require("../../model/productModel");

async function uploadProduct(req, res) {
    try {
          // Assuming req.userId is set by middleware

    
        

        const uploadProd = new productModel(req.body);
        const saveProduct = await uploadProd.save();
        
        res.status(201).json({
            message: "Product Uploaded Successfully",
            success: true,
            error: false,
            data: saveProduct
        });

    } catch (err) {
        res.status(500).json({  // Return 500 Internal Server Error for other errors
            message: err.message || "An error occurred while uploading the product",
            error: true,
            success: false
        });
    }
}

module.exports = uploadProduct;
