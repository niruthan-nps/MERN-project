const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    }).catch(err => {
        console.error(`Database connection failed: ${err.message}`);
        process.exit(1); // Exit the process if connection fails
    });
};

module.exports = connectDatabase;
