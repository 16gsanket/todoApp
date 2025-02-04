import mongoose, { Schema } from "mongoose";

const taskSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },description:{
            type:String,
            required:true,
            trim:true
        },
        completed:{
            type:Boolean,
            defualt:false
        },priority:{
            type:String,
            required:true,
            trim:true,
            enum: ["low", "medium", "high"],
            default: "low"
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
        
    },{timestamps:true}
)

export default mongoose.model("Task",taskSchema)