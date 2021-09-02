const express = require("express");

const { getCourses, addCourse } = require("../controller/courseControler");
/**
 * if parent and child have the same route the it solves by giving the child first
 */

const router = express.Router({ mergeParams: true });

router.route("/").get(getCourses);
router.route("/").post(addCourse);

module.exports = router;
