const express = require('express');
const router = express.Router();
const {newOrder, getSingleOrder, myOrders} = require('../controllers/orderController');
const {isAuthenticatedUser} = require('../middlewares/authenticate');

router.route('/orders/new').post( isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/myorders').get(isAuthenticatedUser, myOrders);
module.exports = router;