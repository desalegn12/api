const express = require("express");
const CommentSchema = require("../model/Comments");
const { protect } = require("../middleWare/Auth");
// const advancedResult = require("../middleWare/advancedRouts");

const {
	getComment,
	createComment,
	updateComment,
	deleteComment,
	fileUpload,
} = require("../controller/Comments");

const router = express.Router({ mergeParams: true });
router.route("/:id").put(protect, updateComment).delete(protect, deleteComment);
router.route("/:id/file").put(fileUpload);
router.route("/").get(getComment).post(createComment);

module.exports = router;																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																					
