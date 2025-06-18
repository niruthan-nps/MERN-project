const catchAsyncError = require('../middlewares/catchAsyncError');
const Order = require('../models/orderModel');
const ErrorHandler = require('../utils/errorHandler');
const Product = require('../models/productModel');


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
        user: req.user.id,
        orderStatus: 'Processing'
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


//get all orders - admin - api/v1/admin/orders
exports.orders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });

})




//update order status - admin - api/v1/admin/order/:id
exports.updateOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler(`Order does not exist with id: ${req.params.id}`, 404));
    }

    // if(order.orderStatus === 'Delivered'){
    //     return next(new ErrorHandler('You have already delivered this order', 400));
    // }

    if (order.orderStatus.toLowerCase() === 'delivered') { // ✅ Made check case-insensitive
        return next(new ErrorHandler('You have already delivered this order', 400));
    }
  


    //updating the stock - FIXED LOOP
    for (const orderItem of order.orderItems) { // CHANGED: replaced forEach with for...of
        await updateStock(orderItem.product, orderItem.quantity); // CHANGED: await added
    }

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save();

    res.status(200).json({
        success: true,
        order
    });

})

// FIXED updateStock function
async function updateStock (productId, quantity) {
    const product = await Product.findById(productId);
    product.stock = product.stock - quantity; // CHANGED: fixed 'process.stock' typo
    await product.save({validateBeforeSave: false}); // CHANGED: added await
}


//delete order - admin - api/v1/admin/order/:id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler(`Order does not exist with id: ${req.params.id}`, 404));
    }

    await order.deleteOne();
    //mongoose 7 and above method to delete a document
    //order.remove() is deprecated in mongoose 7 and above

    res.status(200).json({
        success: true,
        message: 'Order deleted successfully'
    });

})