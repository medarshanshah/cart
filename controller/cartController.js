const Cart = require('../models/Cart')
const CartItem = require('../models/CartItem')


module.exports.create_cart = async (req, res) => {
    let userId = req.body.userId
    let cartEmpty = true
    let cartItems = []
    let subTotal = 0
    
    try {
        const cart = await Cart.create({ userId, cartEmpty, cartItems, subTotal })
        res.status(201).json(cart)
    } catch (err) {
        console.log('Could not create cart')
        res.status(400).send(err)
    }
}


module.exports.get_cart = async (req, res) => {
    let cartId = req.cookies['cartId']
    try {
        const cart =  await Cart.findById({_id:cartId})
        if(cart.cartEmpty){
            res.status(200).send('Your Shopping Cart is empty')
        } else {
            const cartitem = await CartItem.find({cartId})
            console.log(cartitem)
            res.status(200).json(cartitem)
        }        
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports.post_addToCart = async (req, res) => {
    let cartId = req.cookies['cartId']
    console.log('cart id: '+cartId)
    let productId = req.body.productId
    console.log(`product id: ${productId}`)
    let quantity = 1

    try {
        const cartitem =  await CartItem.create({ cartId, productId, quantity })
        console.log(cartitem)
        try {
            const cart =  await Cart.findById({_id:cartId})
            if(cart.cartEmpty){
                await Cart.findByIdAndUpdate({_id:cartId},{cartEmpty:false})
            }
        } catch (err) {
            console.log(err)
        }
        res.status(200).send('cart item created')
    } catch (err) {
        res.status(400).send('Unable to create cart item')
    }    
}


module.exports.edit_cartItemQuantity = async (req, res) => {
    let cartItemId = req.body.cartItemId
    let quantity = req.body.quantity
    try {
        const cartitem = await CartItem.findByIdAndUpdate({_id:cartItemId},{quantity})
        res.status(200).send("Updated quantity")
    } catch (err) {
        res.status(400).send('Unable to update quantity')
    }
}

module.exports.delete_cartItem = async (req, res) => {
    let cartItemId = req.body.cartItemId
    try {
        await CartItem.deleteOne({_id: cartItemId})
        res.status(200).send('Successfully deleted')
    } catch (err) {
        res.status(400).send('Unable to delete')
    }
}