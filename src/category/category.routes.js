import { Router } from "express";
import { getCategories, getCategoryByName, createCategory, updateCategoryByName, deleteCategoryByName} from "./category.controller.js";
import { getCategoriesValidator, getCategoryByNameValidator, createCategoryValidator, updateCategoryByNameValidator, deleteCategoryByNameValidator} from "../middlewares/category-validators.js";

const router = Router()

router.post("/createCategory", createCategoryValidator, createCategory)

router.get("/", getCategoriesValidator, getCategories)

router.get("/findCategory/:name", getCategoryByNameValidator, getCategoryByName)

router.put("/updateCategory/:name", updateCategoryByNameValidator, updateCategoryByName)

router.delete("/deleteCategory/:name", deleteCategoryByNameValidator, deleteCategoryByName)

export default router