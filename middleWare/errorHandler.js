const ErrorResponse = require("../util/errorResponse");

const errorHandler = (err, req, res, next) => {
	let error = { ...err }; //destructuring all the error in one big error class and put all of them in one right
	error.message = err.message;
	console.log(err);

	if (err.name === "CastError") {
		const message = `there is no data in this id:${err.value}`;

		error = new ErrorResponse(message, 404);
	}

	//if there is duplication of code the this error message is rise right
	if (err.code === 11000) {
		const message = " duplicate field value entered";

		error = new ErrorResponse(message, 400);
	}
	if (err.kind === "required") {
		const message = Object.values(err.error).map((val) => val.message);
		error = new ErrorResponse(message, 404);
	}

	res.status(error.statusCode || 404).json({
		success: false,
		error: error.message || "server error",
	});
};

module.exports = errorHandler;
