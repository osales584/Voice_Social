import { Router } from "express";
import { getCategories, getCategoryByName, createCategory, updateCategoryByName, deleteCategoryByName} from "./category.controller.js";
import { getCategoriesValidator, getCategoryByNameValidator, createCategoryValidator, updateCategoryByNameValidator, deleteCategoryByNameValidator} from "../middlewares/category-validators.js";

const router = Router();

/**
 * @swagger
 * /createCategory:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *               description:
 *                 type: string
 *                 description: The description of the category
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Category already exists
 *       500:
 *         description: Error creating category
 */
router.post("/createCategory", createCategoryValidator, createCategory);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Limit the number of categories returned
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Skip the first N categories
 *     responses:
 *       200:
 *         description: List of categories
 *       500:
 *         description: Error getting categories
 */
router.get("/", getCategoriesValidator, getCategories);

/**
 * @swagger
 * /findCategory/{name}:
 *   get:
 *     summary: Get a category by name
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the category
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error getting category
 */
router.get("/findCategory/:name", getCategoryByNameValidator, getCategoryByName);

/**
 * @swagger
 * /updateCategory/{name}:
 *   put:
 *     summary: Update a category by name
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the category
 *               description:
 *                 type: string
 *                 description: The new description of the category
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error updating category
 */
router.put("/updateCategory/:name", updateCategoryByNameValidator, updateCategoryByName);

/**
 * @swagger
 * /deleteCategory/{name}:
 *   delete:
 *     summary: Delete a category by name
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the category
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error deleting category
 */
router.delete("/deleteCategory/:name", deleteCategoryByNameValidator, deleteCategoryByName);

export default router;