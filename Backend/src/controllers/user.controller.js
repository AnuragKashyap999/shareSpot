import User from '../models/user.model.js'
import uploadOnCloudinary from '../utils/cloudinary.js'
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { create } from 'domain'


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


const loginUser = asyncHandler(async(req,res)=>{
    const {username,email} = req.body;

    if([username,email].some((field)=>field.trim()==="")){
        throw new ApiError(400,"username or email is required")
    }

    const user = await User.findone({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(404,"User does not exist")
    }

    const isPasswordValid = await user.isPasswordcorrect(password)


    if(!isPasswordValid){
        throw new ApiError(401,"Invalid user credentials")
    }

    const {accessToken,refreshToken}= generateAccessTokenAndRefreshToken(user._id)


    const loggedInUser = await User.findById(user._id).
    select("-password -refreshToken")

    const options ={
        httpOnly:true,
        secure:true
    }

    return res 
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "User logged In Successfully"
        )
    )





    
})

export {registerUser}




const registerUser = asyncHandler((req,res)=>{

    const {username , email, password } = req.body

    if([username , email,password].some((field)=>field.trim()==='')){
        throw new ApiError(400 ,"All fields are required")
    }

    const isUserExist = await User.findone(
        $or[{username},{email}]
    )

    if(isUserExist){
        throw new ApiError(400,"User is already exist")
    }

    // avatar 

    const avatarLocalPath = req.files?.avatar[0]?.path  //url

    if(!avatarLocalPath){
        throw new ApiError(400,"avatar is require")
    }

    const coverImageLocalPath ;

    if(req.files && req.files?.coverImage[0]?.path && Array.isArray(req.file.coverImage)){
        coverImageLocalPath= req.files?.coverImage[0]?.path
    }


    const avatar = uploadOnCloudinary(avatarLocalPath)
    const coverImage = uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"something wents wrong while uploading the avatar on cloudinary")
    }

    const bio = req.body?.bio || "";

    const user = await User.create({
        username:username.toLowerCase(),
        email,
        password,
        bio,
        avatar:avatar.url,
        coverImage:coverImage.url || ""
    })


    const refreshToken = await user.generateAccessToken(user._id)
    const asccessToken = await user.generateAccessToken(user._id)

    








})