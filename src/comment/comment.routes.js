import { Router } from "express";
import { createComment, getCommentsByPost, updateComment, deleteComment } from "./comment.controller.js";
import { createCommentValidator, getCommentsByPostValidator, updateCommentValidator, deleteCommentValidator } from "../middlewares/comment-validators.js";

const router = Router()

router.post("/createComment", createCommentValidator, createComment)


router.get("/findComment/:uid", getCommentsByPostValidator, getCommentsByPost)

router.put("/updateComment/:commentId", updateCommentValidator, updateComment)

router.delete("/deleteComment/:commentId", deleteCommentValidator, deleteComment)

export default router