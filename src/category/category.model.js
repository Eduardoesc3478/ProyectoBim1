import {Schema, model} from "mongoose";

const categorySchema = Schema({
    name:{
        type : String,
        required : [true, "Name of category is required"],
        maxLength : [25, "Name cannot exceed 25 characters"],
        unique : true
    },

    description:{
        type: String,
        required : [true, "Description of category is required"],
        maxLength : [25, "Description cannot exceed 25 characters"],


    }, 
    status:{
        type: Boolean,
        default: true
    }


})

export default model("Category",categorySchema)