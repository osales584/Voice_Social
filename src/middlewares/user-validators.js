import { body, param } from "express-validator";
import { emailExists, userExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { authorizeUser } from "./auth-user.js";
import { validateJWT } from "./validate-jwt.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("password").isLength({min: 4}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]

export const getUserProfileValidator = [
    validateJWT
]

export const updatePasswordValidator = [
    validateJWT,
    authorizeUser,
    body("newPassword").isLength({min: 8}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]

export const updateUserValidator = [
    validateJWT,
    authorizeUser,
    body("name").optional().notEmpty().withMessage("El nombre es requerido"), 
    body("surname").optional().notEmpty().withMessage("El apellido es requerido"),
    body("email").optional().isEmail().withMessage("El email no es válido"),
    validarCampos,
    handleErrors
]
