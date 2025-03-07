import { Router } from "express";
import { addToCartValidator, purchaseCartValidator,deleteProductValidator } from "../middlewares/cart-validator.js";
import { addToCart, purchaseCart, deleteProductFromCart, getCartByUser } from "./cart.controller.js";
const router = Router();

/**
 * @swagger
 * /cart/addtoCart/{userId}:
 *   post:
 *     summary: Add a product to the cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 */
router.post("/addtoCart/:userId", addToCartValidator, addToCart);

/**
 * @swagger
 * /cart/purchaseCart/{userId}:
 *   post:
 *     summary: Purchase the cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Cart purchased successfully
 */
router.post("/purchaseCart/:userId", purchaseCartValidator, purchaseCart);

/**
 * @swagger
 * /cart/deleteProduct/{userId}:
 *   put:
 *     summary: Delete a product from the cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product deleted from cart successfully
 */
router.put("/deleteProduct/:userId", deleteProductValidator ,deleteProductFromCart );

/**
 * @swagger
 * /cart/getCart/{userId}:
 *   get:
 *     summary: Retrieve the cart by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 */
router.get("/getCart/:userId", getCartByUser); 

export default router;