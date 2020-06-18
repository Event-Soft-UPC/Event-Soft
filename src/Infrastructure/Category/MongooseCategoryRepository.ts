import { Schema } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true
    }
})
categorySchema.virtual("events",{
    ref:"Event",
    localField:"name",
    foreignField:"categories",
    justOne:false
})
