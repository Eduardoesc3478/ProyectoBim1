import { Router } from "express";
import { addCategory, getCategories, updateCategory, deleteCategory } from "./category.controller.js";
import {  addCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validator.js";

const router = Router();

router.post("/addCategory", addCategory, addCategoryValidator)

router.get("/", getCategories)

router.put("/updateCategory/:uid", updateCategory, updateCategoryValidator)

router.delete("/deleteCategory/:uid", deleteCategory, deleteCategoryValidator)

export default router;