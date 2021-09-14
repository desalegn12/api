const dataModel = require("./model/DatabaseSchema");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const colors = require("colors");
const User = require("./model/User");
const Course = require("./model/Course");
const Comment = require("./model/Comments");
dotenv.config({ path: "./config/config.env" });

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const importData = async () => {
	const body = {
		name: "an other names",
		description: "an other descriptions ",
		address: "29 champs elysée paris",
		email: "otheremails@gmail.com",
		salary: 2000,
	};

	const anOtherBody = {
		name: "on other body name of data",
		description: "on other description of data",
		address: "Addis Ababa, Ethiopia",
		email: "onOther@gmail.com",
		salary: 5000,
		user: "612f6c130221a826db11b139",
	};

	try {
		//first make validation here and then send the data to the database
		/**
		 * the point i want to say this the validation is already done over the model the
		 * after i import the model and validate the form data the make the request to add the data in to the database
		 * that is why this one is the entry pont of both the front and backend
		 */
		await dataModel.create(anOtherBody);
		console.log(`data imported..`.green);
	} catch (err) {
		console.error(err);
	}

	process.exit(1);
};

const deleteData = async () => {
	try {
		await dataModel.deleteMany({});
		console.log(`the database data is all deleted`.red);
	} catch (err) {
		console.error(err);
	}

	process.exit(1);
};

const deleteAllComment = async () => {
	try {
		await Comment.deleteMany({});
		console.log(`all comments are deleted `.red);
	} catch (err) {
		console.error(err);
	}

	process.exit(1);
};

const deleteUser = async () => {
	try {
		await User.deleteMany({});
		console.log(`all the users are deleted `.red.italic);
	} catch (err) {
		console.error(err);
	}
	process.exit(1);
};
const findAllUser = async () => {
	try {
		const users = await User.find();
		console.log("finding all the user!".green.bold);
		console.log(users);
	} catch (err) {
		console.error(err);
	}
};

const addCourse = async () => {
	const data = {
		title: "javascript",
		description: "js for web development",
		weeks: 6,
		databaseSchema: "612fd29268940d5f2e8e19e1",
	};
	try {
		await Course.create(data);
		console.log("courses are added".green);
	} catch (err) {
		console.log(`${err}`.red);
	}
};
if (process.argv[2] === "-i") {
	importData();
} else if (process.argv[2] === "-d") {
	deleteData();
} else if (process.argv[2] === "-ud") {
	deleteUser();
} else if (process.argv[2] === "-f") {
	findAllUser();
} else if (process.argv[2] === "-ac") {
	addCourse();
} else if (process.argv[2] === "-dc") {
	deleteAllComment();
}
