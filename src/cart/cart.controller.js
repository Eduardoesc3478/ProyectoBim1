import Cart from './cart.model.js';
import Product from '../product/product.model.js';


export const addToCart = async (req, res) => {
    try {
        const { userId } = req.params; 
        const { productId, quantity } = req.body;

        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            
            cart = new Cart({
                userId,
                products: [{ productId, quantity }]
            });
        } else {

            const product = cart.products.findIndex(p => p.productId.toString() === productId);

            if (product > -1) {
                
                cart.products[product].quantity += quantity;
            } else {
                
                cart.products.push({ productId, quantity });
            }
        }

        
        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Producto agregado al carrito',
            cart
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al agregar el producto al carrito',
            error: err.message
        });
    }
};


export const purchaseCart = async (req, res) => {
    try {
        const { userId } = req.params; 

       
        const cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Carrito no encontrado'
            });
        }

        
        for (const item of cart.products) {
            const product = item.productId;
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Stock insuficiente para el producto: ${product.name}`
                });
            }
            product.stock -= item.quantity;
            await product.save();
        }


        cart.products = [];
        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Compra realizada exitosamente'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al realizar la compra',
            error: err.message
        });
    }
};

export const deleteProductFromCart = async (req, res) => {
    try {
        const { userId } = req.params; 
        const { productId } = req.body; 

        
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Carrito no encontrado'
            });
        }

       
        const productIndex = cart.products.findIndex(prod => prod.productId.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado en el carrito'
            });
        }

        
        cart.products.splice(productIndex, 1);
        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Producto eliminado del carrito'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar el producto del carrito',
            error: err.message
        });
    }
};

export const getCartByUser = async (req, res) => {
    try {
        const { userId } = req.params; 

        
        const cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Carrito no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            cart
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el carrito de compras',
            error: err.message
        });
    }
};

