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

<<<<<<< HEAD
        // Check if email is in use
=======
        // Check if user already exists
>>>>>>> 7e4207b8083f9e465e1ec54718e6b680feac45b4
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
            expiresIn: "100 years",
        });
        return res.status(200).json({ token, user });
    } catch (err) {
        next(err);
    }
};

<<<<<<< HEAD
=======

// User login controller
>>>>>>> 7e4207b8083f9e465e1ec54718e6b680feac45b4
export const UserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

<<<<<<< HEAD
        const user = await User.findOne({ email: email });
        // Check if user exists
        if (!user) {
            return next(createError(404, "User not found"));
        }
        console.log(user);
        // Check if password is correct
=======

        // Check if user exists
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return next(createError(404, "User not found"));
        }

        // Verify password
>>>>>>> 7e4207b8083f9e465e1ec54718e6b680feac45b4
        const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return next(createError(403, "Incorrect Password"));
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT, {
            expiresIn: "100 years",
        });

        return res.status(200).json({ token, user });
    } catch (err) {
        return next(err);
    }
};

<<<<<<< HEAD
export const getUserDashboard = async (req, res, next) => {
=======
// Fetch user dashboard (example controller)
const getUserDashboard = async (req, res, next) => {
>>>>>>> 7e4207b8083f9e465e1ec54718e6b680feac45b4
    try{
        const userId = req.user?.id;

        // Retrieve user by ID
        const user = await User.findById(userId);
        if (!user) {
            return next(createError(404, "User not found"));
        }
<<<<<<< HEAD

        const currentDateFormatted = new Date();
        const startToday = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate()
        );
        const endToday = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate() + 1
        );

        // Calculate the total calories burned
        const totalCaloriesBurned = await Workout.aggregate([
            { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
            {
                $group: {
                    _id: null,
                    totalCaloriesBurned: { $sum: "$caloriesBurnt" },
                },
            },
        ]);

        // Calculate the total no. of workouts
        const totalWorkouts = await Workout.countDocuments({
            user: userId,
            date: { $gte: startToday, $lt: endToday },
        });

        // Calculate the average calories burned per workout
        const avgCaloriesBurnedPerWorkout = 
            totalCaloriesBurned.length > 0
                ? totalCaloriesBurned[0].totalCaloriesBurned / totalWorkouts
                : 0;

        // Fetch the category of workouts
        const categoryCalories = await Workout.aggregate([
            {
                $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
                {
                    $group: {
                        _id: "$category",
                        totalCaloriesBurned: { $sum: "$caloriesBurnt" },
                    },
                },
        ]);

        // Format category data for pie chart
        const pieChartData = categoryCalories.map((category, index) => ({
            id: index,
            value: category.totalCaloriesBurned,
            label: category._id,
        }));

        const weeks = [];
        const caloriesBurned = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(
                currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
            );
            weeks.push(`${date.getDate()}th`);

            const startOfDay = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            );
            const endOfDay = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() + 1
            );

            const weekData = await Workout.aggregate([
                {
                    $match: {
                        user: user._id,
                        date: { $gte: startOfDay, $lt: endOfDay },
                    },
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                        totalCaloriesBurned: { $sum: "$caloriesBurnt" },
                    },
                },
                {
                    $sort: { _id: 1 }, // Sort by date in ascending order
                },
            ]);

            caloriesBurned.push(
                weekData[0]?.totalCaloriesBurned ? weekData[0]?.totalCaloriesBurned : 0
            );
        }

        return res.status(200).json ({
            totalCaloriesBurned:
                totalCaloriesBurned.length > 0
                    ? totalCaloriesBurned[0].totalCaloriesBurned
                    : 0,
            totalWorkouts: totalWorkouts,
            avgCaloriesBurnedPerWorkout: avgCaloriesBurnedPerWorkout,
            totalWeekCaloriesBurned: {
                weeks: weeks,
                caloriesBurnt: caloriesBurned,
            },
            pieChartData: pieChartData,
        });
=======
        
        // (Additional logic for the dashboard can be added here)
>>>>>>> 7e4207b8083f9e465e1ec54718e6b680feac45b4
    } catch (err) {
        next(err);
    }
};
