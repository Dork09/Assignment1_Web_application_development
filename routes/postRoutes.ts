import express from "express";
import * as postController from "../controllers/postController.js";

const router = express.Router();

router.get("/", postController.getPost); //pass pointer to the function
router.get("/:post_id", postController.getPostById); //pass pointer to the function

router.post("/", postController.createPost);

router.put("/:post_id", postController.updatePost);
router.delete("/:post_id", postController.deletePost);

export default router;