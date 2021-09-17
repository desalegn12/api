const UserSchema = require("../model/User");
const ErrorResponse = require("../util/errorResponse");
const asyncHandler = require("../middleWare/async");
const jwt = require("jsonwebtoken");

exports.getAllUsers = asyncHandler(async (req, res, next) => {
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
				new ErrorResponse("you are not authorize to access this!", 401)
			);
		} else if (req.user.role !== "admin") {
			return next(new ErrorResponse("this user is not admin!", 404));
		}
		const users = await UserSchema.find();
		res.status(200).json({
			success: true,
			users,
		});
	});
});

//get a single user
//the path will be the api/v/coming/auth/user
exports.getSingleUser = asyncHandler(async (req, res, next) => {
	const singleUser = await UserSchema.findById(req.params.userId);

	if (!singleUser) {
		return next(
			new ErrorResponse(
				`there is no user recorded with this id:'${req.params.userId}`,
				404
			)
		);
	}

	res.status(200).json({
		success: true,
		singleUser,
	});
});

//update user
exports.updateUser = asyncHandler(async (req, res, next) => {
	const updateUser = await UserSchema.findByIdAndUpdate(
		req,
		params.userId,
		req.body,
		{
			new: true,
			runValidator: true,
		}
	);

	if (!updateUser) {
		return next(
			new ErrorResponse(
				`you can't find user to be updated with this id:${req.params.userId}`
			)
		);
	}
});

//delete user

exports.deleteUser = asyncHandler(async (req, res, next) => {
	const deleteUser = await UserSchema.findByIdAndDelete(req.params.userId);
	if (!deleteUser) {
		return next(
			new ErrorResponse(
				`you could't delete the user with this id:${req.params.userId}`,
				404
			)
		);
	}

	res.status(200).json({
		success: true,
		user: {},
	});
});

//the CRUD operation of the user model functionality
