
import Category from "../category/category.model.js";

export const addCategory = async (req, res) => {
    try {
        const data = req.body;  

        
        if (!data.name || !data.description) {
            return res.status(400).json({
                success: false,
                message: 'El nombre y la descripción son requeridos'
            });
        }

       
        const category = new Category({
            name: data.name,
            description: data.description, 
        });

        
        await category.save();

        res.status(201).json({
            success: true,
            category
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error al guardar la categoría',
            error: error.message || error
        });
    }
};


export const getCategories = async (req, res) => {
    try {
       
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };  

       
        const [total, categories] = await Promise.all([
            Category.countDocuments(query), 
            Category.find(query)  
                .skip(Number(desde))  
                .limit(Number(limite)) 
        ]);

       
        return res.status(200).json({
            success: true,
            total,
            categories 
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las categorías",
            error: err.message
        });
    }
};


export const updateCategory = async (req, res) => {
    try {
        const { uid } = req.params;  
        const data = req.body;  

        const updatedCategory = await Category.findByIdAndUpdate(uid, data, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                msg: 'Categoría no encontrada',
            });
        }

        res.status(200).json({
            success: true,
            msg: 'Categoría actualizada',
            category: updatedCategory,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar categoría',
            error: err.message,
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { uid } = req.params;  

        const deletedCategory = await Category.findByIdAndUpdate(uid, { status: false }, { new: true });

        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                msg: 'Categoría no encontrada',
            });
        }

        res.status(200).json({
            success: true,
            msg: 'Categoría eliminada',
            category: deletedCategory,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al eliminar categoría',
            error: err.message,
        });
    }
}



export const categoriaPorDefecto = async () => {
    try {
        const categoriaPorDefecto = await Category.findOne({ name: "Categoria por defecto" });

        if (!categoriaPorDefecto) {
            const catDefec = {
                name: "Categoria por defecto",
                description: "Categoria por defecto ",
                status: true
            };
            await Category.create(catDefec);
            console.log("Categoria por defecto creada exitosamente");
        } else {
            console.log("La categoria por defecto ya existe");
        }
    } catch (err) {
        console.error("Error al crear la categoria por defecto:", err.message);
    }
};