import bcrypt from "bcrypt"; // For hashing and verifying passwords
import jwt from "jsonwebtoken"; // For generating JWT tokens
import dotenv from "dotenv"; // To load environment variables from a .env file
import { createError } from "../error.js"; // Custom error handling utility
import User from "../models/User.js"; // User model for database operations
import Workout from "../models/Workout.js"; 

dotenv.config(); // Load environment variables

// User registration controller
export const UserRegister = async (req, res, next) => {
    try {
        const { email, password, name, img } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return next(createError(409, "Email already in use"));
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create and save new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            img,
        });
        const createdUser = await user.save();
        // Generate JWT token
        const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
            expiresIn: "99 years",
        });
        return res.status(200).json({ token, user });
    } catch (err) {
        next(err);
    }
};


// User login controller
export const UserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;


        // Check if user exists
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return next(createError(404, "User not found"));
        }

        // Verify password
        const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return next(createError(403, "Incorrect Password"));
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT, {
            expiresIn: "99 years",
        });
        return res.status(200).json({ token, user });
    } catch (err) {
        return next(err);
    }
};

// Fetch user dashboard (example controller)
const getUserDashboard = async (req, res, next) => {
    try{
        const userId = req.user?.id;

        // Retrieve user by ID
        const user = await User.findById(userId);
        if (!user) {
            return next(createError(404, "User not found"));
        }
        
        // (Additional logic for the dashboard can be added here)
    } catch (err) {
        next(err);
    }
};