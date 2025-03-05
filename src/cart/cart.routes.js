import { Router } from "express";
import { addToCartValidator, purchaseCartValidator } from "../middlewares/cart-validator.js";
import { addToCart, purchaseCart } from "./cart.controller.js";
const router = Router();

router.post("/addtoCart/:userId", addToCartValidator, addToCart);

router.post("/purchaseCart/:userId", purchaseCartValidator, purchaseCart);


export default router;