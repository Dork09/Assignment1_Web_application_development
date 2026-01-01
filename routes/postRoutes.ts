export {};
const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.getPost); //pass pointer to the function
router.get("/:post_id", postController.getPostById); //pass pointer to the function

router.post("/", postController.createPost);

router.put("/:post_id", postController.updatePost);
router.delete("/:post_id", postController.deletePost);

module.exports = router;