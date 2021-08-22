// module.exports.log = (msg) => {
// 	console.log(msg);
// };

module.exports = function (firstName, lastName) {
	//the point we don't use the arrow function here is the arrow function means something back right
	this.firstName = firstName;
	this.lastName = lastName;
	this.fullName = () => this.firstName + " " + this.lastName;
};
/**
 *
 *
 * the will export it as this format {log:(msg)=>{
 *    console.log(msg)
 * }}
 *
 *
 * that is why we call the exported variable .log(' and put here the message we want to pass right. ')
 */
