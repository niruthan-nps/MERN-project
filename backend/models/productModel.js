const mongoose = require('mongoose');
//importing the mongoose library, which is an Object Data Modeling (ODM) tool for MongoDB and Node.js. It provides a way to define schemas and interact with your MongoDB database using models.

const productSchema = new mongoose.Schema({
    /**Here, you're creating a schema named productSchema using mongoose.Schema(). */
    /**A schema is like a blueprint for how your product documents will look in the MongoDB database. It defines the structure, data types, validations, default values, etc. */
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        // maxLength: [5, 'Product price cannot exceed 5 characters'],
        default: 0.0,
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            image: {
                type: String,
                required: true,
            }
            // url: {
            //     type: String,
            //     required: true,
            // },
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum : {
            values: [
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home',
            ],
            message: 'Please select correct category for product',
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller'],
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [20, 'Product stock cannot exceed 20 characters']
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: mongoose.Schema.Types.ObjectId,
            // The 'user' field is defined as an ObjectId type, which is a reference to another document in MongoDB. This is typically used to link the review to a specific user in your application.
            // This allows you to associate each review with a user who created it.
            // This is useful for tracking who wrote the review and for displaying user information alongside the review
            // In Mongoose, ObjectId is a special type that represents a unique identifier for documents
            // in MongoDB. It is commonly used to reference other documents in a one-to-many
            // or many-to-many relationship.
            // In this case, it is used to reference the user who wrote the review.
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],
    user:{
        type : mongoose.Schema.Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});


let schema = mongoose.model('Product', productSchema);
//This creates a Mongoose model called "Product" using the schema productSchema
/**You're importing the mongoose library, then defining a schema productSchema using mongoose.Schema() to describe what a product should look like. Finally, you register this schema as a model named "Product" using mongoose.model(), which allows you to interact with the MongoDB collection for products */
//From this ('Product', productSchema) mongoDB it self creates a collection named 'products' in the database. Mongoose automatically pluralizes the model name to create the collection name. So, if your model is named 'Product', Mongoose will look for a collection named 'products' in the database.
module.exports = schema;