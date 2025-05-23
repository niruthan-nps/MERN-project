const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');

//get all products - api/v1/products
exports.getProducts = async (req,res,next) => {
    const resPerPage = 2;
    const apifeatures=  new APIFeatures(Product.find(),req.query).search().filter().paginate(resPerPage);

    const products = await apifeatures.query;
    res.status(200).json({
        success: true,
        count : products.length,
        products
    });
}
//create new product - api/v1/product/new
exports.newProduct = catchAsyncError(async (req,res,next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
   
});

//get single product - api/v1/product/:id
exports.getSingleProduct = async (req,res,next) => {
    console.log("Product ID received:", req.params.id);
    const product = await Product.findById(req.params.id);
    
    if(!product){
       return next(new ErrorHandler('Product not found', 400));
    };

    res.status(201).json({
        success: true,
        product
    });
}




//update product - api/v1/product/:id
exports.updateProduct = async (req,res,next) => {
    let product = await Product.findById(req.params.id);

    if(!product){
    return res.status(404).json({
        success: false,
        message: 'Product not found'
    });

    
}
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
       
    })
    
    res.status(201).json({
        success: true,
        product
    });

}

/**use const when:
You don’t plan to reassign the variable.
It improves code safety and readability.

Use let when:
You plan to change or reassign the variable value later. */

//delete product - api/v1/product/:id
exports.deleteProduct = async (req,res,next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
    return res.status(404).json({
        success: false,
        message: 'Product not found'
    });
}
    // await product.remove();
    
    await product.deleteOne();
    //mongoose 7 and above method to delete a document
    //product.remove() is deprecated in mongoose 7 and above


    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    });
}