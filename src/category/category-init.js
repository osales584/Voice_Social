import Category from "./category.model.js";

export const initializeCategories = async () => {
    try {
        const existingCategory = await Category.findOne({ name: "General" });

        if (!existingCategory) {
            await Category.create({
                name: "General",
                description: "Categoría por defecto"
            });
            console.log("Categoría por defecto creada correctamente.");
        } else {
            console.log("La categoría por defecto ya existe.");
        }
    } catch (error) {
        console.error("Error al inicializar categorías:", error);
    }
};
