const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../util/errorResponse");
const UserSchema = require("../model/User");

exports.protect = asyncHandler(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	} else if (!token) {
		return next(
			new ErrorResponse("no user is registered with this route", 401)
		);
	}
	try {
		//this decode gets the taken from time when the user is register in to the system
		//because for security purpose
		const decode = jwt.verify(token, process.env.SIGN_IN_WEB_SECTRATE); //we needs to pass the token and the secrete
		console.log(decode);
		req.user = await UserSchema.findById(decode.id);

		console.log(req.user);

		next();
	} catch (err) {
		return next(
			new ErrorResponse("there is no user registered with this route", 401)
		);
	}
});

exports.authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorResponse(
					`the user is not authorized use, in terms of role${req.user.role}`,
					403
				)
			);
		}
		next();
	};
};
