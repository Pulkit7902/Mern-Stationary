const productModel = require("../../model/productModel");

const DeleteProductFromDb = async (req, res) => {
    try {
        const productId = req.body._id;
        
        // Check if productId is provided
        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false
            });
        }

        // Check if productId is valid
        if (!productModel.isValidObjectId(productId)) {
            return res.status(400).json({
                message: "Invalid Product ID",
                error: true,
                success: false
            });
        }

        const deleteResult = await productModel.deleteOne({ _id: productId });

        // Check if any document was deleted
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
                error: true
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            error: false,
            data: deleteResult
        });

    } catch (err) {
        console.error(err); // Log the error
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = DeleteProductFromDb;
