import { Router } from "express";
import { createComment, getCommentsByPost, updateComment, deleteComment } from "./comment.controller.js";
import { createCommentValidator, getCommentsByPostValidator, updateCommentValidator, deleteCommentValidator } from "../middlewares/comment-validators.js";

const router = Router();

/**
 * @swagger
 * /createComment:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - post
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *               post:
 *                 type: string
 *                 description: The ID of the post
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error creating comment
 */
router.post("/createComment", createCommentValidator, createComment);

/**
 * @swagger
 * /findComment/{uid}:
 *   get:
 *     summary: Get comments by post ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: List of comments
 *       500:
 *         description: Error getting comments
 */
router.get("/findComment/:uid", getCommentsByPostValidator, getCommentsByPost);

/**
 * @swagger
 * /updateComment/{commentId}:
 *   put:
 *     summary: Update a comment by ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: The new content of the comment
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Error updating comment
 */
router.put("/updateComment/:commentId", updateCommentValidator, updateComment);

/**
 * @swagger
 * /deleteComment/{commentId}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       403:
 *         description: No permission to delete the comment
 *       500:
 *         description: Error deleting comment
 */
router.delete("/deleteComment/:commentId", deleteCommentValidator, deleteComment);

export default router;