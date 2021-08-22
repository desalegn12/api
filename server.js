const express = require("express");
const colors = require("colors");
//environment variable calling though this library
const dotenv = require("dotenv");
const logger = require("./middleWire/logger");
const morgan = require("morgan");

const mongoDB = require("./config/db");
const Router = require("./router/routs");
const error = require("./middleWire/errorHandler");

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
//this is the database want to connect
mongoDB();
app.use("/api/v/coming", Router);
//all the middleWire must be called here because sequential run of express
app.use(error);

const PORT = process.env.PORT || 6000;

const server = app.listen(PORT, () => {
	console.log(`the app is listening on the ${PORT}`.green.bold);
});
//if error is happened in the process of connection then error message is printed out
process.on("unhandledRejection", (err, promise) => {
	console.log(`Err:${err.message}`.red.italic.underline);
	server.close(process.exit(1));
});
