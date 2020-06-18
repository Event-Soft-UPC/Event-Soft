import { Schema } from "mongoose";

export const ticketSchema = new Schema({
    zone: {
        type: String,
        required: true,
        uppercase:true,
    },
    userId: {
        type: String,
        required: true,
    },
    eventId: {
        type: String,
        required: true
    },
    seat:{
        type:String,
        index:true,
        unique:true,
        required:true
    },
    cost: {
        type:Number,
        required:true
    },
    currency : {
        type:String,
        required:true
    }
})
