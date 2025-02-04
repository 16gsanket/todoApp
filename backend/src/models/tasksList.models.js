import mongoose from 'mongoose'

const tasksListSchema = mongoose.Schema(
    {
        owner:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        },
        taskcreatedDateId:{
            type:String,
            default:0
        },
        tasks:[{
            type:mongoose.Schema.ObjectId,
            ref:"Task"
        }]
    },{timestamps:true}
)

export default mongoose.model("Taskslist",tasksListSchema)
