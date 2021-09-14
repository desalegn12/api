const express = require("express");

const {
	register,
	login,
	getUser,
	forgetPassword,
	resetPassword,
	updateUserDetails,
} = require("../controller/Auth");
const { protect } = require("../middleWare/Auth");

const router = express.Router();
//protect is used for decoding the user snd find the user's information

router.post("/register", register);
router.route("/login").post(login);
router.route("/user").get(protect, getUser);
router.route("/forgetPassword").post(forgetPassword);
router.route("/resetPassword/:resetToken").put(resetPassword);
router.route("/updateUser").put(protect, updateUserDetails);

//we can call this if we need for authorized role do what needs to do

module.exports = router;
