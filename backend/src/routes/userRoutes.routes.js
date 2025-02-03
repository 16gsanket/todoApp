import express from 'express'
import { loginUser, registerUser, updateUser, getUser } from '../controllers/userConttroller.controller.js';
import upload from '../middlewares/multer.js';
import { authMiddleware } from '../middlewares/authmiddleware.middleware.js';


const userRoute = express.Router()


userRoute.post("/register-user",upload.single('image') ,registerUser)
userRoute.post("/login-user" ,loginUser)
userRoute.post("/update-user",authMiddleware ,updateUser)
userRoute.get("/get-user",authMiddleware ,getUser)


export default userRoute;
