const bcrypt = require("bcryptjs");

const Salt = async () => {
	const salt = await bcrypt.genSalt(103);

	console.log(salt);
};

const printSalt = (salt) => {
	//this is what callback functions do
	salt();
};

printSalt(Salt);

//this function needs enough time to hash the password
const hasPrinter = () =>
	bcrypt.genSalt(20, function (err, salt) {
		if (err) {
			throw err;
		} else {
			bcrypt.hash("DBpassword", salt, function (err, result) {
				if (err) {
					throw err;
				} else {
					console.log(`the result of the hash function is hash=${result}`);
				}
			});
		}
	});
hasPrinter();

const encryption = async () => {
	const salt = await bcrypt.genSalt(90);
	console.log(salt);
	const hash = await bcrypt.hash("password", salt);
	const compare = await bcrypt.compare(
		"password",
		hash,
		function (err, result) {
			console.log(`the result will be ${result}`);
		}
	);
	console.log(compare());
	console.log(hash());
};

encryption();

const userLeft = false;
const seeCatMeme = false;

function withCallBackOfThePromise() {
	return new Promise((callBack, errorCallBack) => {
		if (userLeft) {
			errorCallBack({
				name: "user left",
				message: "user left:->",
			});
		} else if (seeCatMeme) {
			errorCallBack({
				name: "user in",
				message: "user in but he sees cat meme ",
			});
		} else {
			callBack("oops nothing..");
		}
	});
}

withCallBackOfThePromise()
	.then((message) => {
		console.log(message);
	})
	.catch((error) => {
		console.log(error.name + "\n", error.message);
	});

const oneFunctionInsideOtherFunctionShortHand = (takeOne) => (insideOne) =>
	takeOne(insideOne);

function theOther(inOne) {
	console.log(inOne);
}
oneFunctionInsideOtherFunctionShortHand(theOther("this is the inside one "));
//u see this is the advanced
