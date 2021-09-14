const express = require("express");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const app = express();

dotenv.config({
	path: "./config/config.env",
});

const PORT = process.env.PORT || 6000;
app.get("/", (req, res) => {
	res.json({
		message: "welcome backend development ...",
	});
});

//make a post request when the user is actually registered

app.post("/post", verifyToken, (req, res) => {
	jwt.verify(req.token, "thesecretekey", (err, tokenData) => {
		if (err) {
			console.log(req.token);
			res.sendStatus(403);
		} else {
			res.json({
				massage: "hello from post...",
				token: req.token,
				tokenData,
			});
		}
	});
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
	const bearerHeader = req.headers["authorization"];
	console.log(bearerHeader);
	//make sure the request object is appered
	if (typeof bearerHeader !== "undefined") {
		const bearerToken = bearerHeader.split(" ");
		const token = bearerToken[1];
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
	jwt.sign(user, "thesecretekey", { expiresIn: "30s" }, (err, token) => {
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
