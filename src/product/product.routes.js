import { Router } from "express";
import { addProduct, getProducts, deleteProduct, updateProduct, getProductById } from "./product.controller.js";
import { addProductValidator, deleteProductValidator, updateProductValidator, getProductByIdValidator } from "../middlewares/product-validator.js";

const router= Router();


router.post("/addProduct",addProductValidator, addProduct);

router.get("/",getProducts);

router.delete("/deleteProduct/:id", deleteProductValidator, deleteProduct);

router.put("/editProduct/:id", updateProductValidator, updateProduct);

router.get("/findProduct/:id", getProductByIdValidator, getProductById);



export default router;