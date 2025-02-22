import Comment from "./comment.model.js";
import Post from "../post/post.model.js";

export const createComment = async (req, res) => {
    try {
        const { content, post } = req.body; 

        const foundPost = await Post.findById(post); 
        
        if (!foundPost) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada",
            });
        }

        const newComment = new Comment({
            content,
            user: req.usuario._id, 
            post: post,  
        });

        await newComment.save();

        return res.status(201).json({
            success: true,
            message: "Comentario creado con éxito",
            comment: newComment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al crear el comentario",
            error: error.message,
        });
    }
};

export const getCommentsByPost = async (req, res) => {
    try {
        const { uid } = req.params;

        const comments = await Comment.find({ post: uid })
            .populate("user", "name _id")
            .populate("post", "title _id");

        return res.status(200).json({
            success: true,
            total: comments.length,
            comments,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los comentarios",
            error: error.message,
        });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comentario no encontrado",
            });
        }

        comment.content = content;
        await comment.save();

        return res.status(200).json({
            success: true,
            message: "Comentario actualizado",
            comment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el comentario",
            error: error.message,
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comentario no encontrado",
            });
        }

        // Solo el autor del comentario puede eliminarlo
        if (comment.user.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "No tienes permisos para eliminar este comentario",
            });
        }

        await comment.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Comentario eliminado",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el comentario",
            error: error.message,
        });
    }
};