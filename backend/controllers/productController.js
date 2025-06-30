const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');

//get all products - api/v1/products
exports.getProducts = async (req,res,next) => {
    const resPerPage = 3;
    const apifeatures=  new APIFeatures(Product.find(),req.query).search().filter().paginate(resPerPage);

    const products = await apifeatures.query;
    // await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate a delay of 1 second
    res.status(200).json({
        success: true,
        count : products.length,
        products
    });
}
//create new product - api/v1/product/new
exports.newProduct = catchAsyncError(async (req,res,next) => {

    req.body.user = req.user.id; /** goes to isAuthenticatedUser in product route, 
    the  isAuthenticatedUser middleware checks if the user is authenticated and adds the user object to the request
    req.user.id is the id of the user who is creating the product **/
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



//create review  - api/v1/review
exports.createReview = catchAsyncError(async (req,res,next) => {

    const {productId, rating, comment} = req.body;
    const review = {
        user: req.user._id,
        rating,
        comment
    };
    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(review => {
        return review.user.toString() === req.user.id.toString();
    })

    /*  --------------------------------------------------------------
    Either update an existing review by the current user, or add a
    brand-new review, then recalculate the product’s average rating.
    Assumes you already have:

      const { rating, comment } = req.body;      // incoming data
      const review = { rating, comment, user: req.user.id };
      const isReviewed = product.reviews.some(
        r => r.user.toString() === req.user.id.toString()
      );
---------------------------------------------------------------- */

/* ──────────────────────────────────────────────────────────────
   1.  UPDATE the review if the user already reviewed this product
────────────────────────────────────────────────────────────────*/
if (isReviewed) {
  product.reviews.forEach(r => {
    // Compare ObjectIds by string, because .equals() or == can fail
    if (r.user.toString() === req.user.id.toString()) {
      r.rating  = rating;   // overwrite the previous star value
      r.comment = comment;  // overwrite the previous text comment
    }
  });

/* ──────────────────────────────────────────────────────────────
   2.  ADD the review if the user hasn’t reviewed before
────────────────────────────────────────────────────────────────*/
} else {
  product.reviews.push(review);          // add to the array
  product.numOfReviews = product.reviews.length; // keep count in sync
}

/* ──────────────────────────────────────────────────────────────
   3.  RECALCULATE the average rating
────────────────────────────────────────────────────────────────*/
product.ratings =                       // overwrite the existing average
  product.reviews
    .reduce((sum, r) => sum + r.rating, 0)  // sum all ratings
  / product.reviews.length;                // divide by # of reviews

// Edge-case guard: if there are zero reviews, NaN → set to 0
product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

/*  --------------------------------------------------------------
    Later you’ll likely call:
        await product.save({ validateBeforeSave: false });
    or within Mongoose middleware, so the changes persist.
---------------------------------------------------------------- */

await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        message: 'Review created successfully'
    });
})


//get all reviews of a product - api/v1/reviews ? {productId}
exports.getReviews = catchAsyncError(async (req,res,next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });

})


//delete review - api/v1/review
exports.deleteReview = catchAsyncError(async (req,res,next) => {

    const product = await Product.findById(req.query.productId);
    

    //filtering reviews to remove the review with the given id
    const reviews = product.reviews.filter(review => {
        return review._id.toString() !== req.query.id.toString();
    })

    //number of reviews
    const numOfReviews = reviews.length;


    //finding avg rating after filtering the reviews
    let ratings = reviews.reduce((acc, review) => 
        {acc + review.rating}, 0) / reviews.length;

    ratings = isNaN(ratings) ? 0 : ratings;


    //save product with updated reviews, ratings and numOfReviews
    //using findByIdAndUpdate to update the product
    //findByIdAndUpdate is a mongoose method that finds a document by id and updates
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    })  
    res.status(200).json({
        success: true,
        message: 'Review deleted successfully'
    });


})

