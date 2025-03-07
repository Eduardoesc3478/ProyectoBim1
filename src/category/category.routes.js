import { Router } from "express";
import { addCategory, getCategories, updateCategory, deleteCategory } from "./category.controller.js";
import {  addCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validator.js";

const router = Router();

/**
 * @swagger
 * /categories/addCategory:
 *   post:
 *     summary: Add a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category added successfully
 */
router.post("/addCategory", addCategory, addCategoryValidator)

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/", getCategories)

/**
 * @swagger
 * /categories/updateCategory/{uid}:
 *   put:
 *     summary: Update a category by ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */
router.put("/updateCategory/:uid", updateCategory, updateCategoryValidator)

/**
 * @swagger
 * /categories/deleteCategory/{uid}:
 *   delete:
 *     summary: Delete a category by ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete("/deleteCategory/:uid", deleteCategory, deleteCategoryValidator)

export default router;