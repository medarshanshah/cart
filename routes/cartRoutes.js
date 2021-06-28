const { Router } = require('express') 
const { requireAuth } = require('../middleware/authmiddleware')
const cartController = require('../controller/cartController')

const cartRouter = Router()

// automatically called during user signup from profile microservice
cartRouter.post('/cart_create', cartController.create_cart)



/**
 * @swagger
 * components:
 *      schemas:
 *          cart:
 *              type: object
 *              required:
 *                  - productId
 *              properties:
 *                  cartItemId:
 *                      type: string
 *                      description: The auto generated unique id of the cart item
 *                  productId:
 *                      type: string
 *                      description: The productId of the product added into cart
 *                  quantity:
 *                      type: Number
 *                      description: The quantity of products added into cart
*/

/**
 * @swagger
 * tags: 
 *      name: Cart
 *      description: The cart managing API.
 */


/**
 * @swagger
 * /cart:
 *  get:
 *      summary: Request to get the cart of the current logged in User
 *      tags: [Cart]
 *      responses:
 *          '200':
 *              description: A successful response
 *          '400':
 *              description: Bad Request. Error in Retrieving products
 */
cartRouter.get('/', requireAuth, cartController.get_cart)

/**
 * @swagger
 * /cart:
 *  post:
 *      summary: Request to add product into cart
 *      tags: [Cart]
 *      requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              productId:
 *                                  type: string
 *      parameters:
 *            - in: body
 *              name: Product id
 *              required: true
 *              description: The cart id 
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              productId:
 *                                  type: string
 *          '400':
 *              description: Bad Request. Error in Retrieving products
 */
cartRouter.post('/', requireAuth, cartController.post_addToCart)

/**
 * @swagger
 * /cart:
 *  put:
 *      summary: Request to update quantity in cart
 *      tags: [Cart]
 *      requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              cartItemId:
 *                                  type: string
 *                              quantity:
 *                                  type: number
 *      parameters:
 *            - in: body
 *              name: cartItemId and quantity
 *              required: true
 *              description: The cartItem id and quantity
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              cartItemId:
 *                                  type: string
 *                              quantity:
 *                                  type: number
 *          '400':
 *              description: Bad Request. Error in Retrieving products
 */
cartRouter.put('/', requireAuth, cartController.edit_cartItemQuantity)

/**
 * @swagger
 * /cart:
 *  delete:
 *      summary: Request to delete items from cart
 *      tags: [Cart]
 *      requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              cartItemId:
 *                                  type: string
 *      parameters:
 *            - in: body
 *              name: CartItem Id
 *              required: true
 *              description: The cart item id 
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              cartItemId:
 *                                  type: string
 *          '400':
 *              description: Bad Request. Error in deleting
 */
cartRouter.delete('/', requireAuth, cartController.delete_cartItem)

cartRouter.delete('/:id', requireAuth, cartController.empty_cart)

module.exports = cartRouter