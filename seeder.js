const dataModel = require("./model/DatabaseSchema");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const colors = require("colors");

dotenv.config({ path: "./config/config.env" });

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
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

	try {
		await dataModel.create(body);
		console.log(`data imported..`.green.reverse);
	} catch (err) {
		console.error(err);
	}

	process.exit(1);
};

const deleteData = async () => {
	try {
		await dataModel.deleteMany({});
		console.log(`the database data is all deleted`.red.reverse);
	} catch (err) {
		console.error(err);
	}

	process.exit(1);
};

if (process.argv[2] === "-i") {
	importData();
} else if (process.argv[2] === "-d") {
	deleteData();
}
