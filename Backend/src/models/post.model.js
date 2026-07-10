import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true
    },
    mediaUrl:{
        type:String,
        required:true
    },
    mediatype:{
        type:String,
        enum:["image","video"],
        required:true
    },
    description:{
        type:String,
        default:""
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{timestamps:true})

export const Post = mongoose.model("Post",postSchema)