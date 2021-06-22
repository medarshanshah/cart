const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    cartItems: [{
        productId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },
        quantity: Number
    }],
    subTotal: Number
})

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart