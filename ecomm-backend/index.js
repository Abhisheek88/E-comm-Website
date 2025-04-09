
const express = require('express');
const mongoose = require('mongoose');
const server = express();
const cors =require('cors');
const productRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories')
const brandsRouter = require('./routes/Brands');
const usersRouter = require('./routes/User');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart')
const orderRouter = require('./routes/Order')



//Middleware
server.use(cors({
    exposedHeaders:['X-Total-Count']
}));

server.use(express.json())  //to parse req.body : it help to get data in json format
server.use('/products',productRouter.router);
server.use('/brands',brandsRouter.router);
server.use('/categories',categoriesRouter.router);
server.use('/users', usersRouter.router);
server.use('/auth', authRouter.router);
server.use('/cart', cartRouter.router);
server.use('/orders', orderRouter.router);


const MONGO_URI = "mongodb+srv://Abhisheek88:Abhi123@abhi.7hlfr.mongodb.net/ecomm";

 mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB "))
  .catch(err => console.error("MongoDB Connection Error:", err));


server.get('/', (req, res) => {
    res.json({ status: 'Success' });
});






server.listen(8080, () => {
    console.log(' Server Started on Port 8080');
});
