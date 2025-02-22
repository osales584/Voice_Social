import { Schema, model } from "mongoose";

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: [true, "El contenido del comentario es obligatorio"],
            maxLength: [250, "El comentario no puede exceder los 250 caracteres"],
        },
        user: {
            type: Schema.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: Schema.ObjectId,
            ref: "Post",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("Comment", commentSchema);