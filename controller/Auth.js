const UserSchema = require("../model/User");
const ErrorResponse = require("../util/errorResponse");
const asyncHandler = require("../middleWare/async");
const sendEmail = require("../util/sendEmail");
const crypto = require("crypto");

//api/v/coming/auth/register
exports.register = asyncHandler(async (req, res, next) => {
	const { name, email, password, role } = req.body;

	const user = await UserSchema.create({
		name,
		email,
		password,
		role,
	});
	/**because the token needs to be generated when the user login or register
	 * after the user try that the token be container of the userId, that is way we have to verify the user try to  log or register
	 *
	 */
	sendTokenResponse(user, 200, req, res);
});

exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = await req.body;
	const user = await UserSchema.findOne({ email }).select("+password");
	if (!email || !password) {
		return next(
			new ErrorResponse("either your email or password is not found", 404)
		);
	}

	const isMatch = await user.matchPassword(password);
	if (!isMatch) {
		return next(
			new ErrorResponse(
				"either the password or the email is not match to registered user",
				404
			)
		);
	}
	// const token = user.getSignedWebToken(); //find user by the login userId and
	// localStorage.setItem("token", token); // this one also send the token to the local storage
	sendTokenResponse(user, 200, req, res); //this one send the cookie
});

exports.getUser = asyncHandler(async (req, res, next) => {
	const user = await UserSchema.findById(req.user.id);
	res.status(200).json({
		success: true,
		user,
	});
});

exports.forgetPassword = asyncHandler(async (req, res, next) => {
	const user = await UserSchema.findOne({ email: req.body.email });
	if (!user) {
		return next(
			new ErrorResponse(`there is no user with this email ${req.body.email}`)
		);
	}
	//this one is the method in the userSchema
	const resetToken = user.getResetPasswordToken();
	//this one is the static called under the schema save flag, under the pre static
	await user.save({ validateBeforeSave: false });

	//configure the reset url
	const resetUrl = `${req.protocol}://${req.get(
		"host"
	)}/api/v/coming/auth/forgetPassword/${resetToken}`;
	const message = `message sent because of the password reset request ${resetUrl}`;

	try {
		await sendEmail({
			email: user.email,
			subject: "password reset token",
			message,
		});
		res.status(200).json({
			success: true,
			message: "email sent",
		});
	} catch (err) {
		console.error(err);
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({
			validateBeforeSave: false,
		});

		return next(new ErrorResponse("the email could not be sent", 500));
	}

	// res.status(200).json({
	// 	success: true,
	// 	user,
	// });
});

/**
 * update the user details
 *
 */
exports.updateUserDetails = asyncHandler(async (req, res, next) => {
	const fieldsUpdate = {
		name: req.body.name,
		email: req.body.email,
	};
	const user = UserSchema.findByIdAndUpdate(req.user.id, fieldsUpdate, {
		new: true,
		runValidators: true,
	});
	if (!user) {
		return next(
			new ErrorResponse("could not find the user with the requested id ", 404)
		);
	}
	res.status(200).json({
		success: true,
		user,
	});
});

/**
 * @ put request
 * the request parm is the token
 *
 */

exports.resetPassword = asyncHandler(async (req, res, next) => {
	const passwordResetToken = crypto
		.createHash("sha256")
		.update(req.params.resetToken)
		.digest("hex");

	const user = UserSchema.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});
	if (!user) {
		return next(new ErrorResponse("invalid password reset token", 400));
	}
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	await user.save();
	sendTokenResponse(user, 200, res);
	res.status(200).json({
		success: true,
		user,
	});
});

/**
 * just it is the helper function we put it in the very bottom
 *
 */
const sendTokenResponse = (user, statusCode, req, res) => {
	const token = user.getSignedWebToken();
	const options = {
		expires: new Date(
			Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	res.status(statusCode).cookie("token", token, options).json({
		success: true,
		token,
	});

	//this one is the main focus of today or now
};
