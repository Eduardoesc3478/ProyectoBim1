import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { productExists} from "../helpers/db-validators.js"

export const addProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body('name').notEmpty().withMessage('Name is required'),
    body('name').isLength({ max: 25 }).withMessage('Name cannot exceed 25 characters'),
    body('description').notEmpty().withMessage('Description is required'),
    body('description').isLength({ max: 50 }).withMessage('Description cannot exceed 50 characters'),
    body('price').notEmpty().withMessage('Price is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('stock').notEmpty().withMessage('Stock is required'),
    body('stock').isNumeric().withMessage('Stock must be a number'),
    body('category').notEmpty().withMessage('Category is required'),
    body('category').isMongoId().withMessage('Category must be a valid Mongo ID'),
    validarCampos,
    handleErrors
];

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param('id', 'No es un ID válido').isMongoId().withMessage('No es un ID válido de MongoDB'),
    param('id').custom(productExists),
    validarCampos,
    handleErrors
];

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param('id', 'No es un ID válido').isMongoId().withMessage('No es un ID válido de MongoDB'),
    param('id').custom(productExists),
    body('name').optional().isLength({ max: 25 }).withMessage('Name cannot exceed 25 characters'),
    body('description').optional().isLength({ max: 50 }).withMessage('Description cannot exceed 50 characters'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
    body('stock').optional().isNumeric().withMessage('Stock must be a number'),
    body('category').optional().isMongoId().withMessage('Category must be a valid Mongo ID'),
    validarCampos,
    handleErrors
];

export const getProductByIdValidator = [
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(productExists),
    validarCampos,
    handleErrors
];