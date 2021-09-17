const CommentSchema = require("../model/Comments");
const UserSchema = require("../model/User");
const ErrorResponse = require("../util/errorResponse");
const asyncHandler = require("../middleWare/async");
const multer = require("multer");
const dotenv = require("dotenv");
const path = require("path");
const jwt = require("jsonwebtoken");

//config the environment variable here
dotenv.config({
	path: "config/config.en",
});

/**
 * @ get all the comments
 * it should be public
 *
 */

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "/public/files");
	},
	filename: function (req, file, cb) {
		cb(null, file.filename + Date.now() + path.extname(file.originalname));
	},
});
const upload = multer({
	storage: storage,
});
exports.getComment = asyncHandler(async (req, res, next) => {
	let token;
	if (req.headers["x-access-token"]) {
		token = req.headers["x-access-token"];
	} else if (!token) {
		return next(
			new ErrorResponse("no user is registered with this route", 401)
		);
	}

	jwt.verify(token, process.env.SIGN_IN_WEB_SECTRATE, async (err, decode) => {
		req.user = await UserSchema.findById(decode.id);
		if (!req.user) {
			return next(
				new ErrorResponse(
					`unauthorized user try to view the comment of the user`,
					401
				)
			);
		}
		let query;
		query = CommentSchema.find().populate("user");

		const comments = await query;

		res.status(200).json({
			success: true,
			count: CommentSchema.length,
			comments,
		});
	});
});
/**
 * @ create a comment to the comment model
 */
exports.createComment = asyncHandler(
	upload.single("pdfFile"),
	async (req, res, next) => {
		let token;
		if (req.headers["x-access-token"]) {
			token = req.headers["x-access-token"];
		} else if (!token) {
			return next(
				new ErrorResponse("no user is registered with this route", 401)
			);
		}
		console.log(req.file);
		if (req.file.mimetype !== "application/pdf") {
			return next(
				new ErrorResponse("make sure the file you upload must be pdf file", 404)
			);
		}

		if (req.files.size > process.env.MAX_SIZE_OF_COMPLAIN_FILE) {
			return next(
				new ErrorResponse(
					`please upload file size less than one mb or${process.env.MAX_SIZE_OF_COMPLAIN_FILE}`,
					404
				)
			);
		}

		jwt.verify(token, process.env.SIGN_IN_WEB_SECTRATE, async (err, decode) => {
			req.user = await UserSchema.findById(decode.id);

			req.body.user = req.user.id;
			const commentData = await CommentSchema.create(req.body);
			console.log(commentData);
			if (!commentData) {
				return next(
					new ErrorResponse(
						`the user with the id:${req.user.id} is not authorized to do this`
					)
				);
			}

			res.status(200).json({
				succuss: true,
				commentData,
			});
			console.log(`this is the middleware function user:${req.user.id}`);
		});
	}
);

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
	const pdfFile = await commentData.findById(req.params.id);

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

//random bite file generated with the crypto
