import User from '../models/user.model.js'
import uploadOnCloudinary from '../utils/cloudinary.js'
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"


const generateAccessTokenAndRefreshToken = async (userId)=>{
    try {
       const user =await User.findById(userId);

    if(!user){
        console.log("user is null")
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken

    await user.save({valiadteBeforeSave:false})

    return {accessToken , refreshToken} 
    } catch (error) {
        throw new ApiError(500,error.message || "Something went wrong while generating the refresh and access token")
    }

}

const registerUser =asyncHandler(async (req,res)=>{

    const {username,email,password} = req.body
    
    // validation
    if([username,email,password].some((field)=>field.trim() ==="")){
      throw new ApiError(400,"All fields are required")
    }

    const existedUser = await User.findone({
        $or :[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }

    // upload avatar 

    const avatarLocalPath = req.files?.avatar[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    // coverImage

    let coverImageLocalPath ;

    if(
        req.files && 
        Array.isArray(req.files.coverImage) && 
        req.files.coverImage.length>0
    ){
        coverImageLocalPath = req.files?.coverImage[0]?.path;
    }

    const avatar = uploadOnCloudinary(avatarLocalPath)
    const coverImage =uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    // bio 

    let  {bio} = req.body ;

    const user= await User.create({
        username:usernametoLowerCase(),
        email,
        password,
        avatar:avatar.url,
        coverImage:coverImage.url || "",
        bio
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshtoken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registerd successfully")

    )
})


export {registerUser}