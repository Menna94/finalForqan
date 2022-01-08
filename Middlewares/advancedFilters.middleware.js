const filter = (model) => async (req, res, next) => {
  try {
    const reqQuery = { ...req.query };

    //=>CASE(1): Quantity Filters
    //RemoveFiltering Fields
    const filterKeys = ["select", "sort", "page", "limit"];
    //
    filterKeys.forEach((key) => delete reqQuery[key]);

    //create query string
    let queryString = JSON.stringify(reqQuery);

    //mongoose filters
    //create number filters for-> money/age/num of children...etc
    // = model.find({money : {$gt:5000}})
    queryString = queryString.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    );

    let query = model.find(JSON.parse(queryString));

    //=>CASE(2): Sort Filters
    //sort
    // = model.find({ ... }).sort({})
    if (req.query.sort) {
        const sortBy = req.query.sort
        // .split(",").join(" ");
        query = query.sort(sortBy);
    } else {
        query = query.sort("-createdAt");
    }


    //=>CASE(3): Page Filters
    //pagination
    // = model.find({ ... }).sort({})
    //http://localhost:300/ROUTE?page=2
    //show results of page no. 2
    const page = parseInt(req.query.page, 10) || 1;

    //http:localhost:3000/ROUTE?limit=3
    //limits documents returned
    const limit = parseInt(req.query.limit, 10);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    query = query.skip(startIndex).limit(limit);

    //==DEMO==//
    // "pagination": {
    //     "next": {
    //         "page": 4, -> ~Current Page
    //         "limit": 3 -> ~Data Displayed
    //     },
    //     "prev": {
    //         "page": 2,
    //         "limit": 3
    //     }
    // },

    const pagination = {};
    

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit,
        };
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }

    const results = await query;

    if (!results) {
        return res.status(404).send({
        success: false,
        msg: "Couldnot Fetch Data!",
        data: null,
        });
    }
    return res.status(200).send({
        success: true,
        msg: "Data Fetched Successfully!",
        pagination,
        count: results.length,
        data: results,
    });

    
    next();
  } catch (err) {
    res.status(500).send({
        success: false,
        msg: "Internal Server Error",
        data: err.message,
      });
  }
};

module.exports = filter;
