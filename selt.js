const bcrypt = require("bcryptjs");
const { find } = require("./model/User");

const Salt = async () => {
	//this inside function waiting sometime to execute this genSalt function sot the Salt function wait for
	const salt = await bcrypt.genSalt(103);

	console.log(salt);
};

const printSalt = (salt) => {
	//this is what callback functions do
	salt();
};

printSalt(Salt);


this function needs enough time to hash the password
const hashPrinter = async (password) => {
	const salt = await bcrypt.genSalt(20);
	const hash = await bcrypt.hash(password, salt);
	console.log(hash);
};

console.log("before hash");
hashPrinter("thisOne");
hashPrinter("thisOne");
console.log("after hash");

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
