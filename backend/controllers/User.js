import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
import Workout from "../models/Workout.js";

dotenv.config();

export const UserRegister = async (req, res, next) => {
    try {
        const { email, password, name, img } = req.body;

        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return next(createError(409, "Email already in use"));
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            img,
        });
        const createdUser = await user.save();
        const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
            expiresIn: "99 years",
        });
        return res.status(200).json({ token, user });
    } catch (err) {
        next(err);
    }
};



export const UserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).exec();
        if (!user) {
            return next(createError(404, "User not found"));
        }
        const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return next(createError(403, "Incorrect Password"));
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT, {
            expiresIn: "99 years",
        });
        return res.status(200).json({ token, user });
    } catch (err) {
        return next(err);
    }
};

const getUserDashboard = async (req, res, next) => {
    try{
        const userId = req.user?.id;
        const user = await User.findById(userId);
        if (!user) {
            return next(createError(404, "User not found"));
        }
    } catch (err) {
        next(err);
    }
};