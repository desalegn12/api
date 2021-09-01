const express = require("express");

const {
	register,
	login,
	getUser,
	forgetPassword,
} = require("../controller/Auth");
const { protect } = require("../middleWire/Auth");

const router = express.Router();

router.post("/register", register);
router.route("/login").post(login);
router.route("/user").get(protect, getUser);
router.route("/forgetPassword").post(forgetPassword);

//we can call this if we need for authorized role do what needs to do

module.exports = router;
