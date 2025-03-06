import { Router } from "express";
import { addToCartValidator, purchaseCartValidator,deleteProductValidator } from "../middlewares/cart-validator.js";
import { addToCart, purchaseCart, deleteProductFromCart, getCartByUser } from "./cart.controller.js";
const router = Router();

router.post("/addtoCart/:userId", addToCartValidator, addToCart);

router.post("/purchaseCart/:userId", purchaseCartValidator, purchaseCart);

router.put("/deleteProduct/:userId", deleteProductValidator ,deleteProductFromCart );

router.get("/getCart/:userId", getCartByUser); 

export default router;