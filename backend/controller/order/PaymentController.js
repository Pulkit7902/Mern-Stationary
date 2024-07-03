const stripe = require('../../db/Stripe');
const UserModel = require('../../model/userModel');

const PaymentController = async (req, res) => {
    try {
        const { cart_item } = req.body;
        const user = await UserModel.findOne({ _id: req.userId });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                error: true,
                success: false
            });
        }

        console.log("cartitems", cart_item);

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1PWxhi2NoS72AiyRFVnmPPUe'
                }
            ],
            customer_email: user.email,
            metadata:{
                userId:req.userId
            },
            line_items: cart_item.map((items) => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: items.productId.productName,
                            images: items.productId.productImage,
                            metadata: {
                                productId: items.productId._id
                            }
                        },
                        unit_amount: items.productId.sellingPrice * 100
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    quantity: items.quantity
                };
            }),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`
        };

        const session = await stripe.checkout.sessions.create(params);
        res.json(session);

    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = PaymentController;
