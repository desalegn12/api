const express = require("express");

const {
	getData,
	getSingleData,
	createData,
	updateData,
	deleteData,
	photoUpload,
} = require("../controller/control");

/**
 * we can bind the router path under this router.use('rout ', and binding object)
 */

const router = express.Router();

router.route("/").get(getData).post(createData);

//cause those request methods need the id of the data
router.route("/:id").get(getSingleData).put(updateData).delete(deleteData);
router.route("/:id/photo").put(photoUpload);

module.exports = router;
