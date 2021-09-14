const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
	comment: {
		type: String,
		required: [true, "comment field is the required field"],
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "user",
		required: true,
	},
});
//only the comment and populate the user from the user model right here.
module.exports = mongoose.model("feedback", FeedbackSchema);
