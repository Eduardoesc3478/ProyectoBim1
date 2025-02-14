import { Router } from "express";
import { addCategory, getCategories, updateCategory } from "./category.controller.js";
import {  addCategoryValidator, updateCategoryValidator} from "../middlewares/category-validator.js";

const router = Router();

router.post("/addCategory", addCategory, addCategoryValidator)

router.get("/", getCategories)

router.put("/updateCategory", updateCategory, updateCategoryValidator)


export default router;