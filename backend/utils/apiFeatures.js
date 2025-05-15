class APIFeatures {
    constructor(query, queryStr){
        this.query = query;          // Mongoose query object (e.g. Product.find())
        this.queryStr = queryStr;    // Query string from URL (e.g. req.query)
    }

    search(){
        let keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword, //mongoose regex operator for pattern matching
                $options: 'i' // Case-insensitive search
            }
        } : {};
        // If keyword is present, create a search object with regex
        // If keyword is not present, create an empty object
        this.query.find({ ...keyword }); // Merge keyword with existing query
        return this; // Return the current instance for method chaining
    }
}

module.exports = APIFeatures;
