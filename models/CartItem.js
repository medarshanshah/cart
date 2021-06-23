const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    cartId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    productId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        default: 1
    }
})

const CartItem = mongoose.model('cartItem', cartItemSchema)

module.exports = CartItem