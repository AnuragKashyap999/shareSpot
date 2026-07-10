import mongoose, { trusted } from "mongoose"

const likeSchema = new mongoose.Schema({
    likedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true,
    }
},{timestamps:true})

//compound Unique Index

likeSchema.index(
    {likedBy:1,post:1},
    {unique:true}
);

export const Like = mongoose.model("Like",likeSchema)