const ErrorResponse = require("../util/errorResponse");
const asyncHandler = require("../middleWire/async");
const CourseSchema = require("../model/Course");

/**
 * find the course by the database schema id
 * @ route /api/v/comping/courses/:databaseSchema id
 */

exports.getCourses = asyncHandler(async (req, res, next) => {
	let query;

	if (req.params.databaseSchemaId) {
		query = CourseSchema.find({ databaseSchema: req.params.databaseSchemaId });
	} else {
		query = CourseSchema.find(); //find all data in the database
	}

	const courses = await query;

	res.status(200).json({
		success: true,
		count: CourseSchema.length,
		courses,
	});
});

//create the data
