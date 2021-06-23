require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
// const swaggerDocs = require('./swagger.json')
const cartRoutes = require('./routes/cartRoutes')
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authmiddleware')

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


//Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Cart API',
            version: '1.0.0',
            description: 'Cart Microservice',
            contact: {
                name: "Darshan"
            },
            servers: ['http://localhost:7000']
        }

    },
    apis: ['./routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))


// Atlas Database Connection
const dbURI = 'mongodb+srv://user:n8wiS7i922SCiz6@cluster.hc0cw.mongodb.net/cartsdb';
mongoose.connect(dbURI, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then((result) => app.listen(7000))
.catch((err) => console.log(err));


// Routes
app.get('*', checkUser)
app.get('/',(req,res) => res.send('Hello World from cart service'))
app.use('/cart',cartRoutes)


