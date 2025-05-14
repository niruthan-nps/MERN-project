const express = require('express');//import express module
const { getProducts } = require('../controllers/productController');
const { newProduct } = require('../controllers/productController');//importing the newProducts function from productController file
const { getSingleProduct } = require('../controllers/productController')
const router = express.Router();//Hey Express, give me a new Router object so I can define some grouped routes in it.

router.route('/products').get(getProducts);
//router is the object created from Express module's one of the funtion named Router and the now we  are accessing route function from previously created router object

router.route('/product/new').post(newProduct);
router.route('/product/:id').get(getSingleProduct);




module.exports = router;