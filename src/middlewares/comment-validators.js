import { body, param } from "express-validator";
import { commentExists, commentBelongsToPost, commentBelongsToUser } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createCommentValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    body("content").notEmpty().withMessage("El contenido es requerido"),
    body("post").notEmpty().withMessage("El ID de la publicación es requerido"),
    body("post").custom(commentBelongsToPost),  
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const getCommentsByPostValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("uid").notEmpty().withMessage("El ID de la publicación es requerido"),
    validarCampos,
    handleErrors
];

export const updateCommentValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("commentId").notEmpty().withMessage("El ID del comentario es obligatorio"),
    param("commentId").custom(commentExists),
    param("commentId").custom((commentId, { req }) => commentBelongsToUser(commentId, req.usuario._id)),
    body("content").notEmpty().withMessage("El contenido del comentario es requerido"),
    validarCampos,
    handleErrors
];

export const deleteCommentValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("commentId").notEmpty().withMessage("El ID del comentario es obligatorio"),
    param("commentId").custom(commentExists),
    param("commentId").custom((commentId, { req }) => commentBelongsToUser(commentId, req.usuario._id)),
    validarCampos,
    handleErrors
];