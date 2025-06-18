const express = require('express');//import express module
const { getProducts, createReview, getReviews, deleteReview } = require('../controllers/productController');
const { newProduct } = require('../controllers/productController');//importing the newProducts function from productController file
const { getSingleProduct } = require('../controllers/productController')
const { updateProduct } = require('../controllers/productController')
const { deleteProduct } = require('../controllers/productController')


const router = express.Router();//Hey Express, give me a new Router object so I can define some grouped routes in it.
const { isAuthenticatedUser , authorizeRoles} = require('../middlewares/authenticate');

router.route('/products').get(isAuthenticatedUser, getProducts);//router is the object created from Express module's one of the funtion named Router and the now we  are accessing route function from previously created router object
router.route('/product/:id').get(getSingleProduct);
router.route('/product/:id').put(updateProduct);
router.route('/product/:id').delete(deleteProduct);


router.route('/review').put(isAuthenticatedUser,createReview)
router.route('/reviews').get(isAuthenticatedUser, getReviews);
router.route('/review').delete(isAuthenticatedUser, deleteReview);

//admin routes
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);





module.exports = router;