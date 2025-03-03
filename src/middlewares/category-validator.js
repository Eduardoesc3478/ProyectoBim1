import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { categoryExists } from "../helpers/db-validators.js";

export const addCategoryValidator = [
    validateJWT,  
    hasRoles("ADMIN_ROLE"),  
    body("name").notEmpty().withMessage("El nombre de la categoría es requerido"),
    body("description").notEmpty().withMessage("La descripción de la categoría es requerida"),
    validarCampos,  
    handleErrors  
];
export const updateCategoryValidator = [
    validateJWT,  
    hasRoles("ADMIN_ROLE"),  
    param("uid", "No es un ID válido").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(categoryExists),
    validarCampos,  
    handleErrors  
];

export const deleteCategoryValidator = [
    validateJWT,  
    hasRoles("ADMIN_ROLE"),  
    param("uid", "No es un ID válido").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(categoryExists),
    validarCampos,  
    handleErrors  
];