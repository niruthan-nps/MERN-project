const catchAsyncError = require('../middlewares/catchAsyncError');
const Order = require('../models/orderModel');
const ErrorHandler = require('../utils/errorHandler');


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


//get single order details - api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(!order){
        return next(new ErrorHandler(`Order does not exist with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        order
    });

})


//get logged in user orders - api/v1/orders/myorders
exports.myOrders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        orders
    });

})