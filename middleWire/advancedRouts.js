/**
 * the basic thing we wanna to show here is how to populate, right
 *
 * here is the middleware function added when the route is called
 */
const advancedRoutes = (model, populate) => async (req, res, next) => {
	const requestQuery = { ...req.query };
	const removeParams = ["select", "sort", "page", "limit"];
	removeParams.forEach((params) => delete requestQuery[params]);
	console.log(requestQuery);
	let querySrt = JSON.stringify(requestQuery);
	querySrt = querySrt.replace(
		/\b(gt|gte|lt|lte|in)\b/g,
		(match) => `$${match}`
	);
	let query = modelSchema.find(JSON.parse(querySrt));
	if (req.query.select) {
		const fields = req.query.select.split(",").join(" ");
		//this one is what the select statement of sql database
		query = query.select(fields);
		// console.log(query);
	}
	if (req.query.sort) {
		const sortBy = req.query.sort.split(",").join(" ");
		query = query.sort(sortBy);
	}
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 100;
	const startIndex = (page - 1) * limit; //how much data is shown per page
	const endIndex = page * limit;
	const total = await modelSchema.countDocuments();

	query = query.skip(startIndex).limit(limit);

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
};

module.exports = advancedRoutes;
