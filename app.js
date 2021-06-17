const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')

const app = express()


// Atlas Database Connection
const dbURI = 'mongodb+srv://user:n8wiS7i922SCiz6@cluster.hc0cw.mongodb.net/cartsdb';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then((result) => app.listen(7000))
.catch((err) => console.log(err));


// Routes
app.get('/',(req,res) => res.send('Hello World from cart service'))

app.get('/',(req,res) => {
    productId=787547998765
    axios.get(`http://localhost:4000/product/`).then((response) => {
        var cart = { productId: response.data.id, profileId:''}
        profileId=56
        axios.get(`http://localhost:3000/user/${profileId}`).then((response) => {
        cart.profileId = response.data.id
        res.send(`this is cart of ${cart.profileId} having product ${cart.productId}`)
        })
    })
})
