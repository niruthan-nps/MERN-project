const express = require('express');//import express module
const { getProducts } = require('../controllers/productController');
const { newProducts } = require('../controllers/productController');//importing the newProducts function from productController file
const router = express.Router();//Hey Express, give me a new Router object so I can define some grouped routes in it.

router.route('/products').get(getProducts)
//router is the object created from Express module's one of the funtion named Router and the now we  are accessing route function from previously created router object

router.route('/products/new').post(newProducts)




module.exports = router;