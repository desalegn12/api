const CommentSchema = require("../model/Comments");
const ErrorResponse = require("../util/errorResponse");
const asyncHandler = require("../middleWare/async");

/**
 * @ get all the comments
 * it should be public
 *
 */
//now time  the user authorization and authentication stuff is left

exports.getComment = asyncHandler(async (req, res, next) => {
	let query;

	if (req.params.userId) {
		query = CommentSchema.findOne({
			user: req.params.userId,
		});
	} else {
		query = CommentSchema.find().populate("user");
	}

	const comments = await query;

	res.status(200).json({
		success: true,
		count: CommentSchema.length,
		comments,
	});
});
/**
 * @ create a comment to the comment model
 */
exports.createComment = asyncHandler(async (req, res, next) => {
	req.body.user = req.user.id;
	const getUser = CommentSchema.findOne({
		user: req.user.id,
	});
	if (!getUser) {
		return next(
			new ErrorResponse(
				`the user with the id:${req.user.id} is not authorized to do this`
			)
		);
	}
	const commentData = await CommentSchema.create(req.body);
	console.log(commentData);

	res.json({
		succuss: true,
		commentData,
	});
});

/**
 * update the user comment
 *
 */

exports.updateComment = asyncHandler(async (req, res, next) => {
	req.body.user = req.user.id;
	const getUser = CommentSchema.findOne({
		user: req.user.id,
	});
	if (!getUser) {
		return next(
			new ErrorResponse(
				`the user with the id:${req.user.id} is not authorized to do this`,
				404
			)
		);
	}
	//find the data and make an update
	const updateComment = await CommentSchema.findByIdAndUpdate(
		req.user.id,
		req.body,
		{
			new: true,
			runValidator: true,
		}
	);
	res.json({
		succuss: true,
		updateComment,
	});
});

/**
 *  @ delete the unwanted comment
 *
 *
 */

exports.deleteComment = asyncHandler(async (req, res, next) => {
	req.body.user = req.user.id;
	const findDeletedOne = CommentSchema.findOne({ user: req.user.id });

	if (!findOneAndDelete) {
		return next(
			new ErrorResponse(`this user did not create the comment! `, 404)
		);
	}
	const deleteOne = CommentSchema.findByIdAndDelete(req.user.id);
	res.json({
		succuss: true,
		deleteOne,
	});
});

//now we make sure to do uploading the file type
exports.fileUpload = asyncHandler(async (req, res, next) => {
	const pdfFile = await DatabaseSchema.findById(req.params.id);

	if (!pdfFile) {
		return next(new ErrorResponse("file uploaded is not found ", 404));
	}
	if (!req.files) {
		return next(new ErrorResponse("please upload a complain file", 404));
	}
	if (req.files.pdfFile.mimetype !== "application/pdf") {
		return next(
			new ErrorResponse("make sure the file you upload must be pdf file", 404)
		);
	}

	console.log(req.files.file);

	if (req.files.size > process.env.MAX_SIZE_OF_COMPLAIN_FILE) {
		return next(
			new ErrorResponse(
				`please upload file size less than one mb or${process.env.MAX_SIZE_OF_COMPLAIN_FILE}`,
				404
			)
		);
	}

	res.status(200).json({
		success: true,
		data: req.files.pdfFile,
	});
});
