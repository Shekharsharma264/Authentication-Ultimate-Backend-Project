import cookieParser from "cookie-parser";
import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import uploadOnCloudinary from "../config/cloudinary.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, userName } = req.body;

    if (!name || !email || !password || !userName) {
      return res.status(400).json({ message: "provide all details." });
    }

    let profileImage;
    if(req.file){
      profileImage= await uploadOnCloudinary(req.file.path)
    }

    let existUser = await User.findOne({ userName });

    if (existUser) {
      return res.status(400).json({ message: "User already exist." });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      userName,
      profileImage
    });

    let token;
    try {
      token = generateToken(user._id);
      console.log(user);
    } catch (error) {
      console.log(error);
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT == "production",
      samesite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      user: {
        name,
        email,
        userName,
        profileImage
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "internal server error." });
  }
};

export const logIn = async (req, res) => {
  try {
    const { password, userName } = req.body;

    let existUser = await User.findOne({ userName });

    if (!existUser) {
      return res.status(400).json({ message: "User does not exist." });
    }

    let matchPassword = await bcrypt.compare(password, existUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    let token;
    try {
      token = generateToken(existUser._id);
    } catch (error) {
      console.log(error);
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT == "production",
      samesite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      user: {
        name:existUser.name,
        email:existUser.email,
        userName:existUser.userName
      },
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const logOut=async (req,res)=>{
  try {
    res.clearCookie("token")
    return res.status(200).json({message:"LogOut Successfully!"})
  } catch (error) {
   return res.status(400).json(error) 
  }
}