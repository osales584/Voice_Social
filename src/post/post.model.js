import { Schema, model } from "mongoose";

const postSchema = Schema({
    title:{
        type: String,
        required: [true, "Title is required"],
        maxLength: [25, "Title cannot exceed 25 characters"]
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category',
        required: true,
    },
    content:{
        type: String,
        required: [true, "Content is required"],
        maxLength: [150, "Content cannot exceed 150 characters"]
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,
    },
},
{
    timestamps: true,
    versionKey: false,
})

export default model ('Post', postSchema);