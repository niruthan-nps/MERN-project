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

    // filter(){
    //     const queryStrCopy = {...this.queryStr};
    //     // Create a copy of the query string to avoid mutating the original
    //     // console.log(queryStrCopy); //before removing fields

    //     const removeFields = ['keyword', 'page', 'llimit'];
    //     // Define fields to be removed from the query string
    //     removeFields.forEach(field => delete queryStrCopy[field]);

    //     // let queryStr = JSON.stringify(queryStrCopy);
    //     // // Convert the query string object to a JSON string
    //     // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`);
    //     // // Replace comparison operators (gt, gte, lt, lte) with MongoDB operators ($gt, $gte, $lt, $lte)
    //     console.log(queryStrCopy); //after replacing operators

        

    //     this.query.find(queryStrCopy);
    //     return this; // Return the current instance for method chaining
    // }

    filter() {
    const queryStrCopy = { ...this.queryStr };

    const removeFields = ['keyword', 'page', 'llimit'];
    removeFields.forEach(field => delete queryStrCopy[field]);

    // ✅ Validate operators
    const allowedOperators = ['gt', 'gte', 'lt', 'lte'];
    for (const key in queryStrCopy) {
        if (typeof queryStrCopy[key] === 'object') {
            for (const op in queryStrCopy[key]) {
                if (!allowedOperators.includes(op)) {
                    throw new Error(`Invalid query operator: ${op}`);
                }
            }
        }
    }

    // ✅ Convert to MongoDB operators
    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
    const mongoQueryObj = JSON.parse(queryStr);

    this.query.find(mongoQueryObj);

    return this;
}

}

module.exports = APIFeatures;
