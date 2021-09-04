const asyncHandler = require("./async");

/**
 * the basic thing we wanna to show here is how to populate, right
 *
 * here is the middleware function added when the route is called
 */
const advancedRoutes = (model, populate) => async (req, res, next) => {
	let query;
	const requestQuery = { ...req.query };
	const removeParams = ["select", "sort", "page", "limit"];
	removeParams.forEach((params) => delete requestQuery[params]);
	console.log(requestQuery);
	let querySrt = JSON.stringify(requestQuery);
	querySrt = querySrt.replace(
		/\b(gt|gte|lt|lte|in)\b/g,
		(match) => `$${match}`
	);
	query = model.find(JSON.parse(querySrt));
	if (req.query.select) {
		const fields = req.query.select.split(",").join(" ");
		//this one is what the select statement of sql database
		query = query.select(fields);
		// console.log(query);
	}
	if (req.query.sort) {
		const sortBy = req.query.sort.split(",").join(" ");
		query = query.sort(sortBy);
	} else {
		query = query.sort("-createAt");
		//based on the decreasing order of the create at field
	}
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 100;
	const startIndex = (page - 1) * limit; //how much data is shown per page
	const endIndex = page * limit;
	const total = await model.countDocuments();

	query = query.skip(startIndex).limit(limit);
	if (populate) {
		query = query.populate(populate);
	} else {
		query = query;
	}

	const data = await query;
	const pagination = {};
	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit,
		};
	}
	if (startIndex > 0) {
		pagination.next = {
			page: page - 1,
			limit,
		};
	}
	res.advancedRoutes = {
		succuss: true,
		count: data.length,
		pagination,
		data,
	};
	next();
};

module.exports = advancedRoutes;
