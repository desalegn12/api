const UserSchema = require("../model/User");
const ErrorResponse = require("../util/errorResponse");
const asyncHandler = require("../middleWire/async");

//api/v/coming/auth/register
exports.register = asyncHandler(async (req, res, next) => {
	const { name, email, password, role } = req.body;

	//so now create a user
	/**
	 * the data is coming from the request .body but
	 * we wanna get the data from the user right
	 */
	const user = await UserSchema.create({
		name,
		email,
		password,
		role,
	});

	sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = await req.body;
	const User = await UserSchema.findOne({ email }).select("+password");
	if (!email || !password) {
		return next(
			new ErrorResponse("either your email or password is not found", 404)
		);
	} else {
		if (!User.email || !User.password) {
			return next(
				new ErrorResponse(
					"either the password or the emil is not found in database",
					404
				)
			);
		}

		const token = User.getSignedWebToken();
		res.status(200).json({
			success: true,
			token,
			User,
		});
	}
});

const sendTokenResponse = (user, statusCode, res) => {
	const token = user.getSignedWebToken();
	const options = {
		expires: new Date(
			Date.now + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	res.status(statusCode).cookie("token", token, options).json({
		success: true,
		token,
	});
};

exports.getUser = asyncHandler(async (req, res, next) => {
	const user = await UserSchema.findById(req.user.id);
	res.status(200).json({
		success: true,
		user,
	});
});
