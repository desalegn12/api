const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DatabaseModelSchema = new Schema({
	id: {
		type: String,
		unique: true,
	},
	name: {
		type: String,
		require: [true, "please insert name cause is is required field"],
		unique: true,
		trim: true,
		maxlength: [25, "nome length will not be length greater than 25"],
		minlengthz: [2, "the name length must not be below 2"],
	},

	description: {
		type: String,
		unique: true,
	},
	email: {
		type: String,
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"please input a valid email address",
		],
	},
});
//why the name is string so as for validation

const DatabaseSchemaModel = mongoose.model("Collection", DatabaseModelSchema); //an essential part os this programming is assigning the collection for the enter data

module.exports = DatabaseSchemaModel;

//the first argument indicates the collection in the database
//this is what a model si work
