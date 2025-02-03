import mongoose from "mongoose";

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
        }
        
    },{timestamps:true}
)

export default mongoose.model("Task",taskSchema)