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
	tuition: {
		type: Number,
		required: [true, "please add the tuition of the course"],
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
		ref: "Collection", //because only the database schema reference is important to link the models
		required: true,
	},
});

CourseSchema.static.averageTuition = async function (databaseSchemaId) {
	/**
	 * this is only for calculate the average salary
	 */
	console.log("Calculating the average id..".blue);
	const obj = await this.aggregate([
		{
			$match: {
				databaseSchema: databaseSchemaId,
			},
		},
		{
			$group: {
				_id: "$databaseSchema", //this is the relational one
				averageTuition: { $avg: "$tuition" },
			},
		},
	]);

	console.log(obj); //this one is checking wether the given static method is working or not
};

CourseSchema.post("save", function () {
	this.constructor.averageTuition(this.databaseSchema);
});

CourseSchema.pre("remove", function () {
	this.constructor.averageTuition(this.databaseSchema);
});

module.exports = mongoose.model("courses", CourseSchema);
