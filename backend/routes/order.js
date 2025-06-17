const express = require('express');
const router = express.Router();
const {newOrder} = require('../controllers/orderController');
const {isAuthenticatedUser} = require('../middlewares/authenticate');

router.route('/orders/new').post( isAuthenticatedUser, newOrder);
module.exports = router;