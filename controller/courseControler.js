const ErrorResponse = require("../util/errorResponse");
const asyncHandler = require("../middleWare/async");
const CourseSchema = require("../model/Course");
const DatabaseSchema = require("../model/DatabaseSchema");

/**
 * find the course by the database schema id
 * @ route /api/v/comping/courses/:databaseSchema id
 */

exports.getCourses = asyncHandler(async (req, res, next) => {
	let query;

	if (req.params.databaseSchemaId) {
		query = CourseSchema.find({
			databaseSchema: req.params.databaseSchemaId,
		});
	} else {
		query = CourseSchema.find().populate({
			path: "databaseSchema",
			select: "location name",
		});
	}

	const courses = await query;

	res.status(200).json({
		success: true,
		count: CourseSchema.length,
		courses,
	});
});

//create the data
exports.addCourse = asyncHandler(async (req, res, next) => {
	req.body.databaseSchema = req.params.id;
	const databaseSchema = await DatabaseSchema.findById(
		req.params.databaseSchemaId
	);

	if (!databaseSchema) {
		return next(
			new ErrorResponse(
				`there is no databaseSchema with the requested  id:${req.params.id}`,
				404
			)
		);
	}

	const addCourses = await CourseSchema.create(req.body); //create whatever data inside the body including the
	res.status(200).json({
		success: true,
		count: addCourses.length,
		addCourses,
	});
});
