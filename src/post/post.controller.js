import Post from "./post.model.js"

export const getPosts = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = {};

        const [total, posts] = await Promise.all([
            Post.countDocuments(query),
            Post.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('category', 'name')
                .populate('user', 'name') 
        ]);

        return res.status(200).json({
            success: true,
            total,
            posts
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las publicaciones",
            error: err.message
        });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, content, category } = req.body;

        const newPost = new Post({
            title,
            content,
            category,
            user: req.usuario._id,
        });

        await newPost.save();

        return res.status(201).json({
            success: true,
            message: "Publicación creada exitosamente",
            post: newPost
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear la publicación",
            error: err.message
        });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { uid } = req.params;
        const post = await Post.findById(uid).populate('category').populate('user', 'name');

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            });
        }

        return res.status(200).json({
            success: true,
            post
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener la publicación",
            error: err.message
        });
    }
};

export const updatePostById = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const post = await Post.findById(uid);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            });
        }
               
        if (post.user.toString() !== req.usuario._id.toString()) {
            console.log("Los IDs NO coinciden:", post.user.toString(), req.usuario._id.toString());
            return res.status(403).json({
                success: false,
                message: "No tienes permisos para editar esta publicación"
            });
        }

        
        const updatedPost = await Post.findByIdAndUpdate(uid, data, { new: true });

        return res.status(200).json({
            success: true,
            message: "Publicación actualizada",
            post: updatedPost
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la publicación",
            error: err.message
        });
    }
};

export const deletePostById = async (req, res) => {
    try {
        const { uid } = req.params;

        const post = await Post.findById(uid);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            });
        }

        if (post.user.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "No tienes permisos para eliminar esta publicación"
            });
        }

        await Post.findByIdAndDelete(uid);

        return res.status(200).json({
            success: true,
            message: "Publicación eliminada",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la publicación",
            error: err.message
        });
    }
};