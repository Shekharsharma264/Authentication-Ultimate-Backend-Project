import express from 'express';
import { logIn, logOut, signUp } from '../controllers/auth.controller.js';
import { uploadMulter } from '../middlewares/multer.js';

const authRouter=express.Router()

authRouter.post("/signup",uploadMulter.single("profileImage"),signUp)
authRouter.post("/login",logIn)
authRouter.post("/logout",logOut)

export default authRouter;