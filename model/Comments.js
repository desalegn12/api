const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
	comment: {
		type: String,
		required: [true, "comment field is the required field"],
	},
	pdfFile: {
		default: "",
		required: [false],
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "user",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
//only the comment and populate the user from the user model right here.
module.exports = mongoose.model("feedback", FeedbackSchema);
