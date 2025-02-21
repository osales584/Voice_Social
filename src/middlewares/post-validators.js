import { body, param } from "express-validator";
import { postExists, postTitleExists, postBelongsToUser } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createPostValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    body("title").notEmpty().withMessage("El título es requerido"), 
    body("content").notEmpty().withMessage("El contenido es requerido"), 
    body("title").custom(postTitleExists), 
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const getPostsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE")
];

export const getPostByIdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("uid").notEmpty().withMessage("El ID del post es requerido"),
    param("uid").custom(postExists),
    validarCampos,
    handleErrors
];

export const updatePostByIdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("uid").notEmpty().withMessage("El ID del post es requerido"),
    param("uid").custom(postExists), 
    param("uid").custom((uid, { req }) => postBelongsToUser(uid, req.usuario._id)), 
    body("title").optional().notEmpty().withMessage("El título no puede estar vacío"), 
    body("content").optional().notEmpty().withMessage("El contenido no puede estar vacío"), 
    handleErrors
];


export const deletePostByIdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("uid").notEmpty().withMessage("El ID del post es requerido"),
    param("uid").custom(postExists), 
    param("uid").custom((uid, { req }) => postBelongsToUser(uid, req.usuario._id)), 
    validarCampos,
    handleErrors
];

