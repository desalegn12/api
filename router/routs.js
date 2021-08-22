const express = require("express");

const {
	getData,
	getSingleData,
	createData,
	updateData,
	deleteData,
} = require("../controller/control");

const router = express.Router();

router.route("/").get(getData).post(createData);

//cause those request methods need the id of the data
router.route("/:id").get(getSingleData).put(updateData).delete(deleteData);

module.exports = router;
