import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
import Workout from "../models/Workout.js";

dotenv.config();

export const UserRegister = async () => {
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