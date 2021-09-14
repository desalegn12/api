const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../util/errorResponse");
const UserSchema = require("../model/User");

exports.protect = asyncHandler(async (req, res, next) => {
	let token;
	if (req.headers["x-access-token"]) {
		token = req.headers["x-access-token"];
	} else if (!token) {
		return next(
			new ErrorResponse("no user is registered with this route", 401)
		);
	}
	try {
		jwt.verify(token, process.env.SIGN_IN_WEB_SECTRATE, async (err, decode) => {
			req.user = await UserSchema.findById(decode.id);
		});

		next();
	} catch (err) {
		return next(new ErrorResponse("couldn't get the token right this", 401));
	}
});
//identify the role of the user
exports.authorize = (...roles) => {
	//the route which has this route before considers to be verify the user role first
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
