const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "please user name is an important field"],
	},
	email: {
		type: String,
		required: [true, "email field is not be empty"],
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"please input a valid email address",
		],
	},
	role: {
		type: String,
		enum: ["user", "publisher"],
		default: "user",
	},
	password: {
		type: String,
		required: [true, "please add the password"],
		minlength: 6,
		select: false,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);

	next();
});

userSchema.methods.getSignedWebToken = function () {
	return jwt.sign({ id: this._id }, process.env.SIGN_IN_WEB_SECTRATE, {
		expiresIn: process.env.EXPIRE_TIME,
	});
};

module.exports = mongoose.model("user", userSchema);
