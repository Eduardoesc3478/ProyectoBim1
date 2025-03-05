import Cart from './cart.model.js';
import Product from '../product/product.model.js';

// Método para agregar productos al carrito
export const addToCart = async (req, res) => {
    try {
        const { userId } = req.params; // Obtener el userId de los parámetros de la solicitud
        const { productId, quantity } = req.body;

        // Verificar si el producto existe
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        // Verificar si el carrito del usuario ya existe
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Crear un nuevo carrito si no existe
            cart = new Cart({
                userId,
                products: [{ productId, quantity }]
            });
        } else {
            // Si el carrito existe, verificar si el producto ya está en el carrito
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

            if (productIndex > -1) {
                // Si el producto ya está en el carrito, actualizar la cantidad
                cart.products[productIndex].quantity += quantity;
            } else {
                // Si el producto no está en el carrito, agregarlo
                cart.products.push({ productId, quantity });
            }
        }

        // Guardar el carrito actualizado
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

// Método para realizar la compra del carrito
export const purchaseCart = async (req, res) => {
    try {
        const { userId } = req.params; // Obtener el userId de los parámetros de la solicitud

        // Encontrar el carrito del usuario
        const cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Carrito no encontrado'
            });
        }

        // Actualizar el stock de los productos
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

        // Vaciar el carrito
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