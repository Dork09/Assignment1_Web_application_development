export {};
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.get("/", commentController.getComments); //pass pointer to the function
router.get("/:post_id", commentController.getCommentsByPostId); //pass pointer to the function

router.post("/", commentController.createComment);
router.put("/:comment_id", commentController.updateComment);
router.delete("/:comment_id", commentController.deleteComment);

module.exports = router;