const express = require("express");

const { getCourses } = require("../controller/courseControler");

const router = express.Router();

router.route("/").get(getCourses);

module.exports = router;
