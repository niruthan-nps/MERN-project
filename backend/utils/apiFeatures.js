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

    

//     filter() {
//     const queryStrCopy = { ...this.queryStr };

//     // Remove fields that are not used for filtering
//     const removeFields = ['keyword', 'page', 'limit'];
//     removeFields.forEach(field => delete queryStrCopy[field]);

//     const mongoFilter = {};

//     // Convert `price[gt]` to { price: { $gt: value } }
//     Object.entries(queryStrCopy).forEach(([key, value]) => {
//     const match = key.match(/^(.+)\[(.+)\]$/); // matches key[operator]
//     if (match) {
//       const field = match[1];
//       const operator = match[2];

//       if (!mongoFilter[field]) {
//         mongoFilter[field] = {};
//       }

//       mongoFilter[field][`$${operator}`] = isNaN(value) ? value : Number(value);
//     } else {
//       mongoFilter[key] = isNaN(value) ? value : Number(value);
//     }
//     });

//     this.query = this.query.find(mongoFilter);

//     console.log('MongoDB Filter:', mongoFilter); // Debug output

//   return this;
// }

filter() {
    const queryStrCopy = { ...this.queryStr };

    // Remove fields that are not used for filtering
    const removeFields = ['keyword', 'page', 'limit'];
    removeFields.forEach(field => delete queryStrCopy[field]);

    // Construct the proper MongoDB filter object
    const mongoFilter = {};

    for (let key in queryStrCopy) {
        // Check for keys like price[gt], price[lte], etc.
        const match = key.match(/^(\w+)\[(gte|gt|lte|lt)\]$/);

        if (match) {
            const field = match[1]; // e.g., "price"
            const operator = match[2]; // e.g., "gt"

            // Initialize field if not present
            if (!mongoFilter[field]) {
                mongoFilter[field] = {};
            }

            // Convert value to number if applicable
            const value = isNaN(queryStrCopy[key]) ? queryStrCopy[key] : Number(queryStrCopy[key]);

            mongoFilter[field][`$${operator}`] = value;
        } else {
            // Normal field (e.g., category=electronics)
            const value = isNaN(queryStrCopy[key]) ? queryStrCopy[key] : Number(queryStrCopy[key]);
            mongoFilter[key] = value;
        }
    }

    // Apply to Mongoose query
    this.query = this.query.find(mongoFilter);

    return this;
}

}

 module.exports = APIFeatures;