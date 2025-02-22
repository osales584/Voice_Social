import { body, param } from "express-validator";
import { categoryNameExists, categoryExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("description").notEmpty().withMessage("La descripción es requerida"),
    body("name").custom(categoryNameExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const getCategoriesValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE")
];

export const getCategoryByNameValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("name").notEmpty().withMessage("El nombre es requerido"),
    param("name").custom(categoryExists),
    validarCampos,
    handleErrors
];

export const updateCategoryByNameValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("name").notEmpty().withMessage("El nombre es requerido"),
    param("name").custom(categoryExists),
    body("description").optional().notEmpty().withMessage("La descripción no puede estar vacía"),
    validarCampos,
    handleErrors
];

export const deleteCategoryByNameValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("name").notEmpty().withMessage("El nombre es requerido"),
    param("name").custom(categoryExists),
    validarCampos,
    handleErrors
];