const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRETKEY)

module.exports = stripe