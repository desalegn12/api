const modelSchema = require("../model/DatabaseSchema");
const ErrorResponse = require("../util/errorResponse");
exports.getData = async (req, res, next) => {
	try {
		const allData = await modelSchema.find(); //find all the data in the database
		res.status(200).json({
			count: allData.length, //just to see all the documents from the database

			success: true,
			data: allData,
		});
	} catch (err) {
		next(new ErrorResponse(`make bad request ${req.originalUrl}`, 404));
	}
};

//finally am realize that the variable we want to use in this field must be unique
exports.getSingleData = async (req, res, next) => {
	try {
		const getASingleData = await modelSchema.findById(req.params.id);
		if (!getASingleData) {
			return res.status(400).json({ success: false });
		}
		res.status(200).json({
			success: true,
			data: getASingleData,
		});
	} catch (err) {
		// res.status(400).json({
		// 	success: false,
		// });

		next(
			new ErrorResponse(
				`there is no data in the in this id:${req.params.id}`,
				404
			)
		);
	}
};
exports.createData = async (req, res, next) => {
	try {
		const dataToDatabase = await modelSchema.create(req.body);
		res.status(201).json({
			success: true,
			data: dataToDatabase,
		});
	} catch (err) {
		next(new ErrorResponse(`server error or invalid data requested`, 400));
	}
};
exports.updateData = async (req, res, next) => {
	try {
		const updateData = await modelSchema.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (!updateData) {
			return new ErrorResponse(
				`there is no data in the in this id:${req.params.id}`,
				404
			);
		}

		res.status(200).json({
			success: true,
			data: updateData,
		});
	} catch (err) {
		next(
			new ErrorResponse(
				`there is no data in the in this id:${req.params.id}`,
				404
			)
		);
	}
};

exports.deleteData = async (req, res, next) => {
	try {
		const deleteData = await modelSchema.findByIdAndDelete(req.params.id);
		if (!deleteData) {
			return new ErrorResponse(
				`there is no data in the in this id:${req.params.id}`,
				404
			);
		}
		res.status({
			success: true,
			data: {},
		});
	} catch (err) {
		next(
			new ErrorResponse(
				`there is no data in the in this id:${req.params.id}`,
				404
			)
		);
	}
};
