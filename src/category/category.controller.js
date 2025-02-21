import { hash,verify } from "argon2";
import Category from "./category.model.js"


export const getCategories = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query
        const query = { }

        const [total, categories ] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])
        
        return res.status(200).json({
            success: true,
            total,
            categories
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las categorias",
            error: err.message
        }) 
    }
}

export const getCategoryByName = async (req, res) => {
    try {
        const { name } = req.params;
        const category = await Category.findOne({ name });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada"
            });
        }

        return res.status(200).json({
            success: true,
            category
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener la categoría",
            error: err.message
        });
    }
};


export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(400).json({
                success: false,
                message: "La categoría ya existe"
            });
        }

        const newCategory = new Category({ name, description });
        await newCategory.save();

        return res.status(201).json({
            success: true,
            message: "Categoría creada exitosamente",
            category: newCategory
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear la categoría",
            error: err.message
        });
    }
};

export const updateCategoryByName = async (req, res) => {
    try {
        const { name } = req.params;
        const data = req.body;

        const category = await Category.findOneAndUpdate({ name }, data, { new: true });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Categoría actualizada",
            category
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la categoría",
            error: err.message
        });
    }
};

export const deleteCategoryByName = async (req, res) => {
    try {
        const { name } = req.params;

        const category = await Category.findOneAndDelete({ name });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Categoría eliminada",
            category
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la categoría",
            error: err.message
        });
    }
};