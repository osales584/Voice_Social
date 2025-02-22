import { Router } from "express";
import { getPosts, createPost, getPostById, updatePostById, deletePostById } from "./post.controller.js";
import { getPostsValidator, createPostValidator, getPostByIdValidator, updatePostByIdValidator, deletePostByIdValidator } from "../middlewares/post-validators.js";

const router = Router();

/**
 * @swagger
 * /createPost:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post
 *               content:
 *                 type: string
 *                 description: The content of the post
 *               category:
 *                 type: string
 *                 description: The ID of the category
 *     responses:
 *       201:
 *         description: Post created successfully
 *       500:
 *         description: Error creating post
 */
router.post("/createPost", createPostValidator, createPost);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all posts
 *     tags: [Post]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Limit the number of posts returned
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Skip the first N posts
 *     responses:
 *       200:
 *         description: List of posts
 *       500:
 *         description: Error getting posts
 */
router.get("/", getPostsValidator, getPosts);

/**
 * @swagger
 * /findPost/{uid}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: Post found
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error getting post
 */
router.get("/findPost/:uid", getPostByIdValidator, getPostById);

/**
 * @swagger
 * /updatePost/{uid}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the post
 *               content:
 *                 type: string
 *                 description: The new content of the post
 *               category:
 *                 type: string
 *                 description: The new ID of the category
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error updating post
 */
router.put("/updatePost/:uid", updatePostByIdValidator, updatePostById);

/**
 * @swagger
 * /deletePost/{uid}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error deleting post
 */
router.delete("/deletePost/:uid", deletePostByIdValidator, deletePostById);

export default router;