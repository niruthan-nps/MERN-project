const catchAsyncError = require('../middlewares/catchAsyncError');
const Order = require('../models/orderModel');


//create new ordre - api/v1/orders/new
exports.newOrder = catchAsyncError(async (req, res, next) => {

    const  {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;


    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id
    })

    res.status(201).json({
        success: true,
        order
    });

})