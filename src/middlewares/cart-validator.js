import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { productExists, userExists } from "../helpers/db-validators.js";

export const addToCartValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE", "ADMIN_ROLE"),
    param("userId").custom(userExists),
    param("userId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("productId").notEmpty().withMessage("El ID del producto es requerido"),
    body("productId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("productId").custom(productExists),
    body("quantity").notEmpty().withMessage("La cantidad es requerida"),
    body("quantity").isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero positivo"),
    validarCampos,
    handleErrors
];

export const purchaseCartValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE", "ADMIN_ROLE"),
    param("userId").custom(userExists),
    param("userId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];

export const deleteProductValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE", "ADMIN_ROLE"),
    param("userId").custom(userExists),
    param("userId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("productId").notEmpty().withMessage("El ID del producto es requerido"),
    body("productId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("productId").custom(productExists),
    validarCampos,
    handleErrors
];