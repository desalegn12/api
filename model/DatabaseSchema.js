const mongoose = require("mongoose");
const geocoder = require("../util/geocode");

const slugify = require("slugify");

const DatabaseModelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "please insert name cause is is required field"],
		unique: true,
		trim: true,
		maxlength: [25, "nome length will not be length greater than 25"],
		minlengthz: [2, "the name length must not be below 2"],
	},
	slug: String,
	description: {
		required: [true, "description is not empty"],
		type: String,
		unique: true,
	},
	address: {
		type: String,
		required: [true, "please the address couldn't be empty"],
	},
	location: {
		type: {
			type: String, // Don't do `{ location: { type: String } }`
			enum: ["Point"], // 'location.type' must be 'Point'
			// required: true,
		},
		coordinates: {
			type: [Number],
			// required: true,
			index: "2dsphere",
		},
		//to put the two d of the location of the city
	},
	email: {
		type: String,
		required: [true, "email field is not be empty"],
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"please input a valid email address",
		],
	},
	salary : {
		type: Number,
		required: true,
	},
	user:{
		type:mongoose.Schema.ObjectId,
		ref:'userSchema',
		required:true,
	}

});

//to find the avg of the salary

/**
 * that is aggregation
 */
// DatabaseModelSchema.static.averageSalary= async function(objectId){
// 	/**
// 	 * this is only for calculate the average salary
// 	 */
// 	console.log('Calculating the average id..'.blue);
// 	const obj=await this.aggregate([
// 		{
// 			$match:{
//                salary:objectId
// 			}
// 		},
// 		{
// 			$group:{
//              _id:'$salary',
// 			 averageSalary:{$avg:'$salary'}
// 			}
// 		}
// 	])

// }

//the below is the slugify, doing only in the post request cause it is pre meaning before save into the database

DatabaseModelSchema.pre("save", async function (next) {
	this.slug = slugify(this.name, {
		lower: true, //this makes sense, cause before save the document, it changes to the lowercase right
	});
	next();
});
DatabaseModelSchema.pre("save", async function (next) {
	this.name = this.name.toLowerCase();
	next();
});

DatabaseModelSchema.pre("save", async function (next) {
	const loc = await geocoder.geocode(this.address);
	this.location = {
		type: "Point",
		coordinates: [loc[0].longitude, loc[0].latitude],

		//this tells us why the address field is so important for location address right
	};
	this.address = undefined;
	next();
});

/**
 * all the middleware is called here before the model is called in order to call middleware to be called
 */
module.exports = mongoose.model("Collection", DatabaseModelSchema); //an essential part os this programming is assigning the collection for the enter data

//the first argument indicates the collection in the database
//this is what a model si work
//show pagination
