import { Router } from "express";
import { getUserProfile, updatePassword, updateUser } from "./user.controller.js";
import { getUserProfileValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/user-validators.js";

const router = Router()

router.get("/", getUserProfileValidator, getUserProfile)
router.patch("/updatePassword", updatePasswordValidator, updatePassword)
router.put("/updateUser", updateUserValidator, updateUser)

export default router