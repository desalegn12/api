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
const CommentRouter = require("./router/Comments");
const error = require("./middleWare/errorHandler");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Grid = require("gridfs-stream");
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

mongoDB();
app.use(express.static("./public")); //where static files and fields put here
app.use(express.json());
app.use(fileUpload());
app.use(logger);
app.use(cookieParser());
app.use(cors());
app.use("/api/v/coming/auth/user", userRoute);
app.use("/api/v/coming/course", CourseRouter);
app.use("/api/v/coming/:databaseSchemaId/course", CourseRouter);
app.use("/api/v/coming/auth", AuthRouter);
app.use("/api/v/coming/comment", CommentRouter);
app.use("/api/v/coming", Router);

app.use(error);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
	console.log(`the app is listening on the ${PORT}`.green.bold);
});

process.on("unhandledRejection", (err, promise) => {
	console.log(`Err:${err.message}`.red.italic.underline);
	server.close(process.exit(1));
});

// "concurrently \"\"\"\"" i.e just how to concurrently start the two servers, right
