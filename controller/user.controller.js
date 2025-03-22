import { UserModel } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
export const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(501).json({
        status: false,
        message: "User Already register",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    const addNewUser = await UserModel.create({
      name,
      email,
      password: hashpassword,
    });

    return res.status(200).json({
      statu: true,
      message: "User Register Successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await UserModel.findOne({ email });
    if (!checkUser) {
      return res.status(502).json({
        statu: false,
        message: "User Not Register",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!isPasswordMatch) {
      return res.status(201).json({
        statu: false,
        message: "Password Is Not Match",
      });
    }
    const payload = {
      email: checkUser.email,
      name: checkUser.name,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET);

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `User Login Successfully`,
        success: true,
        token,
      });
  } catch (err) {
    console.log(err);
  }
};

export const userProfile = async (req, res) => {
  try {
    const id = req.id;
    const userDetails = await UserModel.findOne({ email: id });
    if (!userDetails) {
      return res.status(404).json({
        status: false,
        message: "User Not Found",
      });
    }

    const newUserObject = userDetails.toObject();
    newUserObject.name = userDetails.name;
    newUserObject.email = userDetails.email;
    newUserObject.password = undefined;
    return res.status(200).json({
      status: true,
      message: "User Profile",
      User: newUserObject,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const id = req.id;
    const { email, name } = req.body;
    const checkUser = await UserModel.findOneAndUpdate(
      { email: id },
      { $set: { email, name } },
      { new: true }
    );
    if (!checkUser) {
      return res.status(404).json({
        status: false,
        message: "User Not Found",
      });
    }

    return res.status(202).json({
      status: true,
      message: "User Profile Update",
      data: checkUser,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const id = req.id;
    const checkUser = await UserModel.findOneAndDelete({ email: id });
    if (!checkUser) {
      return res.status(404).json({
        status: false,
        message: "User Not Found",
      });
    }

    return res.status(202).json({
      status: true,
      message: "User Profile Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
  }
};
