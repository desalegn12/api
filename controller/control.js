const modelSchema = require("../model/DatabaseSchema");
const ErrorResponse = require("../util/errorResponse");
const asyncHandler = require("../middleWire/async");

// const data = JSON.parse(body);

//they are so called middleware functions
exports.getData = asyncHandler(async (req, res, next) => {
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

	res.status(200).json({
		success: true,
		pagination,
		count: data.length,
		data,
	});
});

//finally am realize that the variable we want to use in this field must be unique
exports.getSingleData = asyncHandler(async (req, res, next) => {
	const getASingleData = await modelSchema.findById(req.params.id);
	if (!getASingleData) {
		return res.status(400).json({ success: false });
	}
	res.status(200).json({
		success: true,
		data: getASingleData,
	});
});
exports.createData = asyncHandler(async (req, res, next) => {
	const dataToDatabase = await modelSchema.create(req.body);
	res.status(201).json({
		success: true,
		data: dataToDatabase,
	});
});
exports.updateData = asyncHandler(async (req, res, next) => {
	const updateData = await modelSchema.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);
	if (!updateData) {
		return new ErrorResponse(
			`there is no data in the in this id:${req.params.id}`,
			404
		);
	}

	res.status(200).json({
		success: true,
		data: updateData,
	});
});

exports.deleteData = asyncHandler(async (req, res, next) => {
	const deleteData = await modelSchema.findByIdAndDelete(req.params.id);
	if (!deleteData) {
		return new ErrorResponse(
			`there is no data in the in this id:${req.params.id}`,
			404
		);
	}
	res.status({
		success: true,
		data: {},
	});
});

exports.findByQuery = asyncHandler(async (req, res, next) => {});
