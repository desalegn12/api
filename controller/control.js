const ErrorResponse = require("../util/errorResponse");
const asyncHandler = require("../middleWare/async");
const DatabaseSchema = require("../model/DatabaseSchema");

// const data = JSON.parse(body);

//they are so called middleware functions
exports.getData = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedRoutes);
});

//finally am realize that the variable we want to use in this field must be unique
exports.getSingleData = asyncHandler(async (req, res, next) => {
	const getASingleData = await DatabaseSchema.findById(req.params.id);
	if (!getASingleData) {
		return res.status(400).json({ success: false });
	}
	res.status(200).json({
		success: true,
		data: getASingleData,
	});
});
exports.createData = asyncHandler(async (req, res, next) => {
	req.body.user = req.user.id;
	//find out the user for publish the database
	const publishDSchema = DatabaseSchema.findOne({ user: req.user.id });

	if (publishDSchema && req.user.role !== "publisher") {
		return next(
			new ErrorResponse(
				`the user with an ID:${req.user.id} has already published or role of user must be a user`
			)
		);
	}

	const dataToDatabase = await DatabaseSchema.create(req.body);
	res.status(201).json({
		success: true,
		data: dataToDatabase,
	});
});
exports.updateData = asyncHandler(async (req, res, next) => {
	const publishDSchema = DatabaseSchema.findOne({ user: req.user.id });

	if (publishDSchema && req.user.role !== "publisher") {
		return next(
			new ErrorResponse(
				`the user with an ID:${req.user.id} has not permission to do this`
			)
		);
	}

	const updateData = await DatabaseSchema.findByIdAndUpdate(
		req.user.id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);
	if (!updateData) {
		return new ErrorResponse(
			`the requested id ${req.user.id}has not permission to update the document`,
			404
		);
	}

	res.status(200).json({
		success: true,
		data: updateData,
	});
});

exports.deleteData = asyncHandler(async (req, res, next) => {
	const publishDSchema = await DatabaseSchema.findOne({ user: req.user.id });
	console.log(`to test the document requested by user id ${publishDSchema}`);
	if (publishDSchema && req.user.role !== "publisher") {
		return next(
			new ErrorResponse(
				`the user with an ID:${req.user.id} has not permission to update the document`
			)
		);
	}
	const deleteData = await DatabaseSchema.findById(req.user.id);
	if (!deleteData) {
		return next(
			new ErrorResponse(`there is no the requested user id:${req.user.id}`, 404)
		);
	}
	deleteData.remove(); //the remove middleware function is called here

	res.status(200).json({
		success: true,
		deleteData: {},
	});
});

exports.photoUpload = asyncHandler(async (req, res, next) => {
	const photo = await DatabaseSchema.findById(req.params.id);

	if (!photo) {
		return next(new ErrorResponse("photo uploaded is not found ", 404));
	}
	if (!req.files) {
		return next(new ErrorResponse("please upload a photo", 404));
	}
	if (!req.files.file.mimetype.startsWith("image")) {
		return next(new ErrorResponse("please upload an image", 404));
	}

	console.log(req.files.file);

	if (req.files.size > process.env.MAX_PHOTO_SIZE) {
		return next(
			new ErrorResponse(
				`please upload file size less than one mb or${process.env.MAX_PHOTO_SIZE}`,
				404
			)
		);
	}

	await DatabaseSchema.findByIdAndUpdate(req.params.id, req.files.file, {
		new: true,
		runValidators: true,
	});
	console.log(DatabaseSchema._id);
	res.status(200).json({
		success: true,
		data: req.files.file,
	});
});

exports.findByQuery = asyncHandler(async (req, res, next) => {});
/**
 * therefore the user's id could be found
 * under the token, req.user user the token and change it to
 * the id of the user then user id associated with the db id, that is right
 *
 */
