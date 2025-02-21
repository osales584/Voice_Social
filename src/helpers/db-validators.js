import User from "../user/user.model.js"
import Category from "../category/category.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}    

export const categoryExists = async (name = "") => {
    const existe = await Category.findOne({ name });
    if (!existe) {
        throw new Error(`La categoría '${name}' no existe`);
    }
};

export const categoryNameExists = async (name = "") => {
    const existe = await Category.findOne({ name });
    if (existe) {
        throw new Error(`La categoría '${name}' ya existe`);
    }
};