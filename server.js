const express = require("express");
const colors = require("colors");
//environment variable calling though this library
const dotenv = require("dotenv");
//this is mounting the path if they are builtin they needs not mount the path right
const logger = require("./middleWare/logger");
const morgan = require("morgan");
const userRoute = require("./router/Users");
const mongoDB = require("./config/db");
const Router = require("./router/routs");
const AuthRouter = require("./router/Auth");
const CourseRouter = require("./router/courseRouter");
const error = require("./middleWare/errorHandler");
const photoUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
//this is the database want to connect
/**the database must be called after the environment variable is configured  */

mongoDB();
app.use(photoUpload());
app.use(logger);
app.use(cookieParser());
app.use("/api/v/coming/auth/user", userRoute);
app.use("/api/v/coming/course", CourseRouter);
app.use("/api/v/coming/:databaseSchemaId/course", CourseRouter);
app.use("/api/v/coming/auth", AuthRouter);
app.use("/api/v/coming", Router); //because after this one is excuted then request response cycle is ended
/**based on this every middleware functions called before the route
 * and error middleware after them cause, the request response cycle is not end up if there is error  */
app.use(error);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
	console.log(`the app is listening on the ${PORT}`.green.bold);
});
//if error is happened in the process of connection then error message is printed out
process.on("unhandledRejection", (err, promise) => {
	console.log(`Err:${err.message}`.red.italic.underline);
	server.close(process.exit(1));
});
