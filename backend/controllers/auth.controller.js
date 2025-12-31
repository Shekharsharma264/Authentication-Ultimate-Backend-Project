import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signUp = async (req, res) => {
  try {
    const { name, email, password, userName } = req.body;

    if (!name || !email || !password || !userName) {
      return res.status(400).json({ message: "provide all details." });
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
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "internal server error." });
  }
};
