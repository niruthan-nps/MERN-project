const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/database');


dotenv.config({ path:path.join(__dirname, "config/config.env" )});// need to set absolute path of this file not the relative path
console.log('Environment:', process.env.NODE_ENV); // will reflect dev/prod based on script
connectDatabase();
 //connect to database
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port : ${process.env.PORT} in ${process.env.NODE_ENV}`);
});
//template literals is Javascipt ES6 feature
/**const name = "Alex";
const greeting = `Hello, ${name}!`;
console.log(greeting); // Output: Hello, Alex!
 */
//used to store multiline string message

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection');
    server.close(() => {
        process.exit(1);
    });
})


process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception');
    server.close(() => {
        process.exit(1);
    });
})

// console.log(a);