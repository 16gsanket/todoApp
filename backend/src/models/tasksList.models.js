import mongoose from 'mongoose'

const tasksListSchema = mongoose.Schem(
    {
        owner:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        },
        tasks:[{
            type:mongoose.Schema.ObjectId,
            ref:"Task"
        }]
    },{timestamps:true}
)

export default mongoose.model("TasksList",tasksListSchema)
