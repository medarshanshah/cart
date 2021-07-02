const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const Cart = require('../models/Cart')


// Assertion style ... should
const should = chai.should()
chai.use(chaiHttp)

describe('Cart API', () => {
    /**
     * Test the GET Route
     */
    describe('GET /cart', () => {
        it('get the cart of the current logged in User', () => {
            chai.request(app)
                .get('/cart')
                .then(response => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                })
                .catch(err => {
                    console.error(err);
                    throw err; 
                });
        })
    })

    describe('GET ONE SINGLE CART', () => {
        it('It should get cart of individual Users', () => {
            let cartId = "60d2db1b581f804b4c7b1e43"
            chai.request(app)
                .get('/cart/'+cartId)
                .then(response => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body.length.should.be.eq(1)
                })
                .catch(err => {
                    console.error(err);
                    throw err; 
                });
        })

        it('It should get cart of individual Users', () => {
            let cartId = "60d37fb73c89f451e0516d5e"
            chai.request(app)
                .get('/cart/'+cartId)
                .then(response => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body.length.should.be.eq(1)
                })
                .catch(err => {
                    console.error(err);
                    throw err; 
                });
        })

        it('It should not get this non-existing cart', () => {
            let cartId = "60d37fb73c89f451e0516d5e"
            chai.request(app)
                .get('/cart/'+cartId)
                .then(response => {
                    response.should.have.status(404)
                })
                .catch(err => {
                    console.error(err);
                    throw err; 
                });
        })
    })

    /**
     * Test the POST Route
     */
     describe('POST /cart', () => {
        it('Add item into the cart of the current logged in User', () => {
            chai.request(app)
                .post('/cart')
                .send({
                    cartId: "60d2db1b581f804b4c7b1e43",
                    productId: "60cf4690536e177c1f44d6fd",
                    quantity: 1,
                })
                .then( response => {
                    response.should.have.status(200)
                })
                .catch(err => {
                    console.error(err);
                    throw err; 
                });
        })

        it('It should not add item into the cart of user', () => {
            chai.request(app)
                .post('/cart')
                .send({
                    productId: "60cf4690536e177c1f44d6fd",
                    quantity: 1,
                })
                .then(response => {
                    response.should.have.status(404)
                })
                .catch(err => {
                    console.error(err);
                    throw err; 
                });
        })

        it('It should not add item into the cart of user', () => {
            chai.request(app)
                .post('/cart')
                .send({
                    cartId: "60d2db1b581f804b4c7b1e43",
                    quantity: 1,
                })
                .then(response => {
                    response.should.have.status(404)
                })
                .catch(err => {
                    console.error(err);
                    throw err; 
                });
        })

        it('It should not add item into the cart of user', () => {
            chai.request(app)
                .post('/cart')
                .send({
                    cartId: "60d2db1b581f804b4c7b1e43",
                    productId: "60cf4690536e177c1f44d6fd"
                })
                .then( response => {
                    response.should.have.status(404)
                })
                .catch(err => {
                    console.error(err);
                    throw err; 
                });
        })

        it('It should not add item into the cart of user', () => {
            chai.request(app)
                .post('/cart')
                .send({
                    quantity: 1,
                })
                .then(response => {
                    response.should.have.status(400)
                })
                .catch(err => {
                    console.error(err);
                    throw err; 
                });
        })
    })
    
})