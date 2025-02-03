import mongoose from "mongoose";

const userModel = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:[true, 'Please add an email'],
            unique:[true , 'Email already exists'],
            trim:true,
            minLength:[5 , 'email must have 5 charecters']
        },
        dob:{
            type:Date,
            default:null
        },
        password:{
            type:String,
            required:[true, 'Please add a password'],
            trim:true,
            minLength:[5 , 'Password must have 5 charecters'],
            select:false
        },
        image:{
            type:String
        },
        verified:{
            type:Boolean,
            default:false
        },
        verificationCode:{
            type:String,
            default:null,
            select:false
        },
        verificationCodeValidity:{
            type:Date,
            default:null,
            select:false
        }
    },{timestamps:true}
)


export default mongoose.model('User', userModel);