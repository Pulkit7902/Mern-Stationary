const AddtoCartModel = require("../../model/AddtoCartModel");

const AddtoCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const currentuser = req.userId;

        // Check if the product is already available in the cart for the specific user
        const isproductavailable = await AddtoCartModel.findOne({ productId, userId: currentuser });
        if (isproductavailable) {
            return res.status(400).json({
                message: "Already registered in cart",
                success: false,
                error: true
            });
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentuser
        };

        const newAddtocart = new AddtoCartModel(payload);
        const saveproduct = await newAddtocart.save();

        res.json({
            data: saveproduct,
            message: "Product Added",
            success: true,
            error: false
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || "An error occurred while adding the product to the cart",
            error: true,
            success: false
        });
    }
};

module.exports = AddtoCart;
