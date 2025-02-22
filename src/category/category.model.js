import { Schema, model } from "mongoose";

const categorySchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLength: [150, "Description cannot exceed 150 characters"]
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Category", categorySchema)