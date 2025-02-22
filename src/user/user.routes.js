import { Router } from "express";
import { getUserProfile, updatePassword, updateUser } from "./user.controller.js";
import { getUserProfileValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/user-validators.js";

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       500:
 *         description: Error retrieving user profile
 */
router.get("/", getUserProfileValidator, getUserProfile);

/**
 * @swagger
 * /updatePassword:
 *   patch:
 *     summary: Update user password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: The current password of the user
 *               newPassword:
 *                 type: string
 *                 description: The new password of the user
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid current password
 *       500:
 *         description: Error updating password
 */
router.patch("/updatePassword", updatePasswordValidator, updatePassword);

/**
 * @swagger
 * /updateUser:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the user
 *               surname:
 *                 type: string
 *                 description: The new surname of the user
 *               email:
 *                 type: string
 *                 description: The new email of the user
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       500:
 *         description: Error updating user profile
 */
router.put("/updateUser", updateUserValidator, updateUser);

export default router;