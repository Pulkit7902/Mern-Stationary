const stripe = require('../../db/Stripe')
const AddtoCartModel = require('../../model/AddtoCartModel')
const OrderModel = require('../../model/OrderModel')
const endpointwebhook = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRETKEY
async function getlineitem(lineitem){
    let productitem = []
    if(lineitem?.data?.length){
        for(const item of lineitem.data){
            const product = await stripe.products.retrieve(item.price.product)
            const productId = product.metadata.productId
            const productdata={
                productId: productId,
                name:product.name,
                price:item.price.unit_amount/100,
                quantity : item.quantity,
                image:product.images
            }
            productitem.push(productdata)

        }
    }
    return productitem
}
const webhook = async(req,res)=>{
    const sig = req.headers['stripe-signature']
    let event;
    const payloadstring  = JSON.stringify(req.body)
    const header = stripe.webhooks.generateTestHeaderString({
        payload:payloadstring,
        secret:endpointwebhook,
    })

    try {
      event = stripe.webhooks.constructEvent(payloadstring, header, endpointwebhook);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    res.status(200).send()
    switch (event.type) {
        case 'checkout.session.completed':
        const session  = event.data.object
        const lineitem = await stripe.checkout.sessions.listLineItems(session.id)
        console.log("session is " , session)
        const productdetail =await getlineitem(lineitem)
        const orderdetail = {
            ProductDetail:productdetail,
            email:session.customer_email,
            userId:session.metadata.userId,
            paymentDetails:{
                paymentId:session.payment_intent,
                payment_method_type:session.payment_method_types,
                payment_status:session.payment_status,
               

            },
            shipping_option:session.shipping_options.map(s=>{
                return{
                    ...s,
                    shipping_amount:s.shipping_amount /100
                }
            }),
            totalAmount:session.amount_total/100

                


        }
        const order = new OrderModel(orderdetail)
        const saveOrder = await order.save() 
        if(saveOrder?._id){
            const deleteaddtocart = await AddtoCartModel.deleteMany({userId:session.metadata.userId})
            

        }

          // Then define and call a function to handle the event payment_intent.succeeded
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
}
module.exports = webhook