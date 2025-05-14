const products = require('../data/products.json');
const Product = require('../models/productModel');


const seedProducts = async()=> {

    try{
        await Product.deleteMany();
        console.log('All products deleted');

        await Product.insertMany(products);
        console.log('Products seeded successfully');

    }catch(error){
        console.error(`Error: ${error.message}`);
    }

    

}

seedProducts();