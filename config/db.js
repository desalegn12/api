const mongoose = require("mongoose");
const colors = require("colors");
const MyDatabase = require("../model/DatabaseSchema");
//this one is the collection I have create before

const mongoDB = async () => {
	mongoose.set("strictQuery",true)
	const conn = await mongoose.connect(process.env.MONGO_URL);
	console.log(
		`MongoDB Connected ${conn.connection.host}`.cyan.underline.italic
	);
};

module.exports = mongoDB;
