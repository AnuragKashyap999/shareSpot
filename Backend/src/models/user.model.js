import mongoose from "mongoose"

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String  // cloudinary URL 
    },
    coverImage:{
        type:String, // cloudinary URL
    },
    bio:{
        type:String,
        default:""
    },
    postsCount:{
        type:Number,
        default:0
    },
    refreshToken:{
        type:String
    }

},{timepstamps:true})

export const User = mongoose.model("User",userSchema); 


