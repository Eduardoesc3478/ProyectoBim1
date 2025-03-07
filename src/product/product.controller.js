import Product from "./product.model.js";

export const addProduct = async (req, res) => {
    try {
        const data = req.body;

        const newProduct = new Product({
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            category: data.category
        });
        
        if (!data.category) {
            const defaultCategory = await Category.findOne({ name: "Categoria por defecto" });
            if (!defaultCategory) {
                return res.status(500).json({
                    success: false,
                    message: 'No se encontró la categoría por defecto'
                });
            }
            data.category = defaultCategory._id;
        }


        await newProduct.save();

        res.status(201).json({
            success: true,
            message: "Se creó el producto correctamente",
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear el producto",
            error: error.message
        });
    }
};

export const getProducts = async (req, res) => {
    try {
        const { limit = 5, skip = 0 } = req.query;
        const query = { status: true };

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(skip))
                .limit(Number(limit))
        ]);

        res.status(200).json({
            success: true,
            total,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;  

        const deletedProduct = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                msg: 'Categoría no encontrada',
            });
        }

        res.status(200).json({
            success: true,
            msg: 'Producto eliminada',
            category: deletedProduct,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al eliminar producto',
            error: err.message,
        });
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true});

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            message: "Producto actualizado correctamente",
            product: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar el producto",
            error: error.message
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }
        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener el producto",
            error: error.message
        });
    }
};



