const mongoose = require("mongoose");
const geocoder = require("../util/geocode");

const slugify = require("slugify");

const DatabaseModelSchema = new mongoose.Schema(
	{
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
		salary: {
			type: Number,
			required: true,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "userSchema",
			required: true,
		},
	},
	{
		toJSON: { virtuals: true }, //some one able to change it into json or object
		toObject: { virtuals: true },
	}
);

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

DatabaseModelSchema.pre("remove", async function () {
	await this.model("courseSchema").deleteMany({
		databaseSchema: this._id, // delete by the id inside the database schema
	});
	console.log(
		`the data is removed from the database plus from the course too ${this._id}`
	);
	next();
});

DatabaseModelSchema.virtual("courses", {
	ref: "courses",
	localField: "_id",
	foreignField: "databaseSchema",
	justOne: false,
});

module.exports = mongoose.model("Collection", DatabaseModelSchema); //an essential part os this programming is assigning the collection for the enter data

//the first argument indicates the collection in the database
//this is what a model si work
//show pagination
