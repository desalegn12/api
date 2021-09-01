// const bcrypt = require("bcryptjs");

// const Salt = async () => {
// 	const salt = await bcrypt.genSalt(103);

// 	console.log(salt);
// };

// const printSalt = (salt) => {
// 	//this is what callback functions do
// 	salt();
// };

// printSalt(Salt);

// //now time to how promise is work

// const userLeft = false;
// const seeCatMeme = false;

// function withCallBackOfThePromise() {
// 	return new Promise((callBack, errorCallBack) => {
// 		if (userLeft) {
// 			errorCallBack({
// 				name: "user left",
// 				message: "user left:->",
// 			});
// 		} else if (seeCatMeme) {
// 			errorCallBack({
// 				name: "user in",
// 				message: "user in but he sees cat meme ",
// 			});
// 		} else {
// 			callBack("oops nothing..");
// 		}
// 	});
// }

// withCallBackOfThePromise()
// 	.then((message) => {
// 		console.log(message);
// 	})
// 	.catch((error) => {
// 		console.log(error.name + "\n", error.message);
// 	});

const oneFunctionInsideOtherFunctionShortHand = (takeOne) => (insideOne) =>
	takeOne(insideOne);

function theOther(inOne) {
	console.log(inOne);
}
oneFunctionInsideOtherFunctionShortHand(theOther("this is the inside one "));
