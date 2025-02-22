import { Router } from "express";
import { getPosts, createPost, getPostById, updatePostById, deletePostById } from "./post.controller.js";
import { getPostsValidator, createPostValidator, getPostByIdValidator, updatePostByIdValidator, deletePostByIdValidator } from "../middlewares/post-validators.js";

const router = Router()

router.post("/createPost", createPostValidator, createPost)

router.get("/", getPostsValidator, getPosts)

router.get("/findPost/:uid", getPostByIdValidator, getPostById)

router.put("/updatePost/:uid", updatePostByIdValidator, updatePostById)

router.delete("/deletePost/:uid", deletePostByIdValidator, deletePostById)

export default router