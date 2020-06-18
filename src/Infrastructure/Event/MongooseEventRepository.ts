import { Schema } from "mongoose"

const eventSchema = new Schema({
    eventId: {
        type:String,
        required:true,
        index:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    start:{
        type:Date,
        required:true
    },
    end:{
        type:Date,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    referenceLocation:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})
eventSchema.virtual("tickets",{
    ref:"Ticket",
    localField:"eventId",
    foreignField:"eventId",
    justOne:false
})
