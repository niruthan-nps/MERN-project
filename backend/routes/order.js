const express = require('express');
const router = express.Router();
const {newOrder, getSingleOrder, myOrders, orders, updateOrder, deleteOrder} = require('../controllers/orderController');
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate');

router.route('/orders/new').post( isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/myorders').get(isAuthenticatedUser, myOrders);



router.route('/orders').get(isAuthenticatedUser, authorizeRoles('admin'), orders); // Assuming you want to list all orders for user for admin
router.route('/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder);
router.route('/order/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);


module.exports = router;