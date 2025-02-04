import asyncHandler from "../utils/asynchandler.js";
import cloudinary from "../utils/cloudinary.js";
import logger from "../utils/logger.js";
import apiError from "../utils/apiError.js";
import User from "../models/userModel.models.js";
import { toHash, validateHashedPassword } from "../utils/hashing.js";
import apiResponse from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
// import fs from "fs"

const registerUser = asyncHandler(async (req, res, next) => {
  logger.info("new user trying to register");

  const { name, email, password, dob } = req.body;

  if (!req.file) {
    console.log("no file");
  }
  console.log(req);

  const foundUser = await User.findOne({ email });
  if (foundUser) {
    logger.info(`user email ${email} already exists`);
    throw new apiError(400, "user already exists");
  }

  const uploadResults = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: "toDoList/users",
    use_filename: true,
    unique_filename: false,
  });

  if (!uploadResults) {
    logger.info(
      `user email ${email} uploaded image to cloudinaey failed result: ${uploadResults}`
    );
    throw new apiError(500, "cannot upload to cloudinary");
  }
  //   fs.unlinkSync(req.file.path);
  logger.info(
    `user email ${email} uploaded image to cloudinaey result: ${uploadResults}`
  );

  const hashedPassword = await toHash(password, 12);

  const registeredUser = new User({
    name,
    email,
    dob,
    password: hashedPassword,
    image: uploadResults.secure_url || "",
  });
  registeredUser.save();

  if (!registeredUser) {
    logger.warn(`user ${email} failed to register`);
    throw new apiError(400, "server failed to register the user");
  }
  logger.info(`user ${email} registered successfully`);

  const responseUser = registeredUser.toObject();
  responseUser.password = undefined;
  responseUser.verified = undefined;
  responseUser.verificationCode = undefined;
  responseUser.verificationCodeValidity = undefined;

  return res
    .status(201)
    .json(new apiResponse(201, "user registered successfully", responseUser));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  logger.info(`logging in user with email ${email}`);
  const foundUser = await User.findOne({ email }).select("+password");
  logger.info(`user found ${foundUser}`);
  if (!foundUser) {
    throw new apiError(404, "user not found");
  }

  const isPasswordCorrect = await validateHashedPassword(
    password,
    foundUser.password
  );

  if (!isPasswordCorrect) {
    logger.info(`incorrect password for user with email ${email}`);
    // return res.status(400).json(new apiResponse(400, "incorrect password"));
    throw new apiError(400, "incorrect password");
  }

  const token = jwt.sign(
    { userId: foundUser._id, email: foundUser.email },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("Authorization", `Bearer ${token}`, {
    expires: new Date(Date.now() + 8 * 3600000),
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production",
  });

  return res
    .status(200)
    .json(new apiResponse(200,{}, "user logged in successfully"));
});

const updateUser = asyncHandler(async (req, res) => {
  const { name, email, dob, image } = req.body;
  let updatedImage;

  if(req.file){
    const uploadResults = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "toDoList/users",
      use_filename: true,
      unique_filename: false,
    });
  
    if (!uploadResults) {
      logger.info(
        `user email ${email} uploaded image to cloudinaey failed result: ${uploadResults}`
      );
      throw new apiError(500, "cannot upload to cloudinary");
    }
    updatedImage = uploadResults.secure_url
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { name, email, dob, image: updatedImage ? updatedImage : image }
  );
  if (!updatedUser) {
    throw new apiError(400, "user not found");
  }
  return res.status(200).json(new apiResponse(200,{} ,"user updated successfully"));

});

const getUser = asyncHandler(async(req,res)=>{
    const updatedUser = await User.findOne({_id:req.user.userId})
    logger.info(`user ${updatedUser} requested to get his profile`)
    if(!updatedUser){
        throw new apiError(400 , "user not found")
    }

    res.status(200).json(new apiResponse(200 , updatedUser,"user found successfully" ))
})
const logOutUser = asyncHandler(async(req,res)=>{
  logger.info(`logging out user with email ${req.user.email}`);

  res.clearCookie("Authorization").status(200).json(new apiResponse(200,{},"user logged out successfully"))
})
export { registerUser, loginUser, updateUser, getUser,  logOutUser };
