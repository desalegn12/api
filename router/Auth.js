const express = require("express");

const { register, login, getUser } = require("../controller/Auth");
const { protect, authorize } = require("../middleWire/Auth");

const router = express.Router();

router.post("/register", register);
router.route("/login").post(login);
router.route("/user").get(protect, getUser);

//we can call this if we need for authorized role do what needs to do

module.exports = router;
