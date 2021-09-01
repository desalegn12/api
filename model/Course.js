const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "please add the course tittle"],
		trim: true,
	},
	description: {
		type: String,
		required: [true, "please describe the course"],
	},

	weeks: {
		type: Number,
		required: [true, "please add the number of weeks the course is taken"],
	},
	minimumSkill: {
		type: String,
		enum: ["minimum", "intermediate", "advanced"],
		default: "minimum",
	},
	scholarship: {
		type: Boolean,
		default: false,
	},
	createAt: {
		type: Date,
		default: Date.now,
	},

	//model which is referenced
	databaseSchema: {
		type: mongoose.Schema.ObjectId,
		ref: "DatabaseSchema", //because only the database schema reference is important to link the models
		required: true,
	},
});

/**
 * export the model and its collection name
 */

module.exports = mongoose.model("courses", CourseSchema);
