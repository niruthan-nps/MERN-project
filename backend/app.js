const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config({ path:path.join(__dirname, "config/config.env" )});// need to set absolute path of this file not the relative path



app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname,'uploads'))); // Serve static files from the uploads directory


const products = require('./routes/product');
const auth = require('./routes/auth');
const orders = require('./routes/order');
const payment = require('./routes/payment')

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', orders);
app.use('/api/v1', payment);

app.use(errorMiddleware);

module.exports = app;