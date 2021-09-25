const express = require("express");

const { getCourses, addCourse } = require("../controller/courseControler");


const router = express.Router({ mergeParams: true });

router.route("/").get(getCourses);
router.route("/").post(addCourse);

module.exports = router;
