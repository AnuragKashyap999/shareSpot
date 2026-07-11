import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    text:{
        type:String,
        trim:true,
        default:""
    },
    mediaUrl:{
    type: String,
    default: ""
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true
    }

},{timestamps:true});

commentSchema.pre("validate",function(next){
    const hasText=this.text.trim().length>0;
    const hasMedia= this.mediaUrl.trim().length>0;

    if(!hasText && !hasMedia){
        return next(new Error("Comment must contain either text or media."))
    }
    next();

})

export const Comment = mongoose.model("Comment" , commentSchema);
















// Iske andar Mongoose internally kuch aisa karta hai:
// User Comment Submit
//         │
//         ▼
// Comment.create()
//         │
//         ▼
// pre("validate")
//         │
//         ├── Check Text
//         ├── Check Media
//         │
//         ▼
// Validation Pass?
//         │
//    Yes ─────► Save
//         │
//    No ─────► Error