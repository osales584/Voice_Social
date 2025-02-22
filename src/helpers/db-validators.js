import User from "../user/user.model.js"
import Category from "../category/category.model.js"
import Post from "../post/post.model.js"

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

export const postExists = async (uid = "") => {
    const existe = await Post.findById(uid);
    if (!existe) {
        throw new Error(`La publicación con el ID '${uid}' no existe`);
    }
};

export const postTitleExists = async (title = "") => {
    const existe = await Post.findOne({ title });
    if (existe) {
        throw new Error(`La publicación con el título '${title}' ya existe`);
    }
};

export const postBelongsToUser = async (uid = "", userId = "") => {
    const post = await Post.findById(uid);
    if (!post) {
        throw new Error(`La publicación con el ID '${uid}' no existe`);
    }

    if (post.user.toString() !== String(userId)) {
        throw new Error("No tienes permisos para modificar este comentario");
    }
};