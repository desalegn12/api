const express = require("express");
const advancedResult = require("../middleWire/advancedRouts");
const User = require("../model/User");

const {
	getAllUsers,
	getSingleUser,
	updateUser,
	deleteUser,
} = require("../controller/Users");

const router = express.Router();

router.route("/").get(advancedResult(User, ""), getAllUsers);
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
