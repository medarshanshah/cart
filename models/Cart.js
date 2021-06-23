const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        
    },
    cartEmpty: Boolean,
})



const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart