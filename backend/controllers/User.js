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

        // Check if email is in use
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
            expiresIn: "100 years",
        });
        return res.status(200).json({ token, user });
    } catch (err) {
        next(err);
    }
};

export const UserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        // Check if user exists
        if (!user) {
            return next(createError(404, "User not found"));
        }
        console.log(user);
        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return next(createError(403, "Incorrect Password"));
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT, {
            expiresIn: "100 years",
        });

        return res.status(200).json({ token, user });
    } catch (err) {
        return next(err);
    }
};

export const getUserDashboard = async (req, res, next) => {
    try{
        const userId = req.user?.id;
        const user = await User.findById(userId);
        if (!user) {
            return next(createError(404, "User not found"));
        }

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
    } catch (err) {
        next(err);
    }
};
