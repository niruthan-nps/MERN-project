const express = require('express');
const router = express.Router();
const {newOrder, getSingleOrder, myOrders, orders} = require('../controllers/orderController');
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate');

router.route('/orders/new').post( isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/myorders').get(isAuthenticatedUser, myOrders);



router.route('/orders').get(isAuthenticatedUser, authorizeRoles('admin'), orders); // Assuming you want to list all orders for user for admin
module.exports = router;