const mongoose = require("mongoose");
const colors = require("colors");
const MyDatabase = require("../model/DatabaseSchema");
//this one is the collection I have create before

const mongoDB = async () => {
	const conn = await mongoose.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,

		useUnifiedTopology: true,
	});
	console.log(
		`MongoDB Connected ${conn.connection.host}`.cyan.underline.italic
	);
};

module.exports = mongoDB;
