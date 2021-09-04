const UserSchema = require("../model/User");
const ErrorResponse = require("../util/errorResponse");
const asyncHandler = require("../middleWare/async");
const errorHandler = require("../middleWare/errorHandler");

exports.getAllUsers = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedRoutes); //any selection is working here
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
