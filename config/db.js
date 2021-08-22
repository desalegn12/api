const mongoose = require("mongoose");
const colors = require("colors");
const MyDatabase = require("../model/DatabaseSchema");
//this one is the collection I have create before

const mongoDB = async () => {
	const conn = await mongoose.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});
	console.log(
		`MongoDB Connected ${conn.connection.host}`.cyan.underline.italic
	);
};

/**this is all about the crud operation of mangoDB  */

/**find by name or other field */
// MyDatabase.create(
// 	{
// 		name: "miky yalew",
// 	},
// 	(err, database) => {
// 		console.log(
// 			`err:${err}`.red.bold,
// 			` result:${database}`.green.italic
// 		);
// 	}
// );

// const id = "611f745f4daa1a2afdbfae1a";

/**find by id  */
// MyDatabase.find(
// 	{
// 		id,
// 	},
// 	(err, data) => {
// 		console.log(`err:${err}`.red.bold, `result:${data}`.green.italic);
// 	}
// );

/**updating by id  */

// MyDatabase.findByIdAndUpdate(id, { name: "Updated name" }, (err, data) => {
// 	console.log(`err:${err}`.red.bold, `result:${data}`.green.italic);
// });

/**deleting */
// MyDatabase.findByIdAndDelete(id, (err, data) => {
// 	console.log(`err:${err}`.red.bold, `result:${data}`.green.italic);
// });

module.exports = mongoDB;
