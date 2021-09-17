const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const app = express();

dotenv.config({
	path: "./config/config.env",
});
const upload = multer({ dist: "./destination" });

const PORT = process.env.PORT || 6000;
app.get("/", (req, res) => {
	res.json({
		message: "welcome backend development ...",
	});
});

//make a post request when the user is actually registered

app.post("/file", upload.single("files"), (req, res, next) => {
	console.log(req.file);
});

app.post("/post", verifyToken, (req, res) => {
	jwt.verify(req.token, "thesecretekey", (err, tokenData) => {
		if (err) {
			console.log("hello from error...");
			console.log(req.token);
			console.log(err);
			res.sendStatus(403);
		} else {
			req.user = tokenData;

			res.status(200).json({
				massage: "hello from post...",
				token: req.token,
				id: req.user.id,
				name: req.user.name,
				email: req.user.email,
				password: req.user.password,
			});
		}
	});
});
app.get("/file", (req, res) => {
	console.log(req.headers["form-data"][1]);
});
app.post("/login", (req, res) => {
	const user = {
		name: "name",
		email: "email@gmail.com",
		password: "password",
		id: "34notcontinuouseid",
	};
	// jwt.sign(user, "thesecretekey", { expiresIn: "30s" }, (err, token) => {
	// 	res.json({
	// 		message: "make post request...",
	// 		token,
	// 	});
	// });
	getToken(user, req, res);
});

//now verify the token we got when the user is registered

function verifyToken(req, res, next) {
	const bearerHeader = req.headers["x-access-token"];
	//console.log(bearerHeader);
	//make sure the request object is appered
	if (typeof bearerHeader !== "undefined") {
		const token = bearerHeader;
		req.token = token;
		// console.log(token);
		next();
	} else {
		console.log("error");
		res.sendStatus(403);
	}
	//one tip is we couldn't use the arrow function before init it
}
function getToken(user, req, res, next) {
	jwt.sign(user, "thesecretekey", { expiresIn: "1000s" }, (err, token) => {
		res.json({
			message: "make post request...",
			token,
		});
		next();
		return token;
	});
}

app.listen(PORT, (req, res) => {
	console.log(`the app  is listing on the port:${PORT}...`);
});
