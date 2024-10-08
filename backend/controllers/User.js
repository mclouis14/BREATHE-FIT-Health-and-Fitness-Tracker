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

        // Check if a user with the given email already exists
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
      } catch (error) {
        return next(error); // Pass any errors to the next middleware
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
            expiresIn: "99 years",
        });

        return res.status(200).json({ token, user });
      } catch (error) {
        return next(error);
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
        const totalCaloriesBurnt = await Workout.aggregate([
            { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
            {
                $group: {
                    _id: null,
                    totalCaloriesBurnt: { $sum: "$caloriesBurned" },
                },
            },
        ]);

        // Calculate the total no. of workouts
        const totalWorkouts = await Workout.countDocuments({
            user: userId,
            date: { $gte: startToday, $lt: endToday },
        });

        // Calculate the average calories burned per workout
        const avgCaloriesBurntPerWorkout = 
            totalCaloriesBurnt.length > 0
                ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts
                : 0;

        // Fetch the category of workouts
        const categoryCalories = await Workout.aggregate([
            {
                $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
                {
                    $group: {
                        _id: "$category",
                        totalCaloriesBurnt: { $sum: "$caloriesBurned" },
                    },
                },
        ]);

        // Format category data for pie chart
        const pieChartData = categoryCalories.map((category, index) => ({
            id: index,
            value: category.totalCaloriesBurnt,
            label: category._id,
        }));

        const weeks = [];
        const caloriesBurnt = [];
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
                        totalCaloriesBurnt: { $sum: "$caloriesBurned" },
                    },
                },
                {
                    $sort: { _id: 1 }, // Sort by date in ascending order
                },
            ]);

            caloriesBurnt.push(
                weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0
            );
        }

        return res.status(200).json ({
            totalCaloriesBurnt:
                totalCaloriesBurnt.length > 0
                    ? totalCaloriesBurnt[0].totalCaloriesBurnt
                    : 0,
            totalWorkouts: totalWorkouts,
            avgCaloriesBurntPerWorkout: avgCaloriesBurntPerWorkout,
            totalWeekCaloriesBurnt: {
                weeks: weeks,
                caloriesBurned: caloriesBurnt,
            },
            pieChartData: pieChartData,
        });
    } catch (err) {
      next(err);
    }
};

export const getWorkoutsByDate = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const user = await User.findById(userId);
        let date = req.query.date ? new Date(req.query.date) : new Date();
        if (!user) {
            return next(createError(404, "User not found"));
        }
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

        const todaysWorkouts = await Workout.find({
            userId: userId,
            date: { $gte: startOfDay, $lt: endOfDay },
        });
        const totalCaloriesBurnt = todaysWorkouts.reduce(
            (total, workout) => total + workout.caloriesBurned,
            0
        );
        
        return res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });
    } catch (err) {
      next(err);
    }
};

export const addWorkout = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        console.log("User ID:", userId);
        if (!userId) {
            return next(createError(400, "User ID is missing"));
        }

        const { workoutString } = req.body;
        if (!workoutString) {
            return next(createError(400, "Workout string is missing"));
        }
        console.log("Received workoutString:", workoutString);

        // Split the workout string into individual workouts
        const eachworkout = workoutString.split(",").map((line) => line.trim());
        console.log("Parsed eachworkout:", eachworkout);

        // Check if any workout starts with category marker "#"
        const categories = eachworkout.filter((line) => line.startsWith("#"));
        console.log("Identified categories:", categories);

        if (categories.length === 0) {
            return next(createError(400, "No categories found in workout strings"))
        }

        // Initialize an array to store parsed workout details
        const parsedWorkouts = [];
        let currentCategory = "";
        let count = 0;

        // Loop through each lines to parse workout details
        await eachworkout.forEach((line) => {
            count++;
            if (line.startsWith("#")) {
                const parts = line?.split("\n").map((part) => part.trim());
                console.log("parsed parts:", parts);

                if (parts.length < 5) {
                    return next(createError(400, `Workout string is missing for ${count}th workout`));
                }

                // Update current category from the first part
                currentCategory = parts[0].substring(1).trim();
                // Parse the workout details from the parts array
                const workoutDetails = parsedWorkoutLine(parts);
                if (workoutDetails == null) {
                    return next(createError(400, "Enter in correct format"));
                }

                if (workoutDetails) {
                    // Add category to workout details
                    workoutDetails.category = currentCategory;
                    parsedWorkouts.push(workoutDetails);
                }
            } else {
                return next(createError(400, `Workout string is missing for ${count}th workout`));
            }
        });

        // Calculate calories burned for each workout
        await parsedWorkouts.forEach(async (workout) => {
            workout.caloriesBurned = parseFloat(calculateCaloriesBurnt(workout));
            await Workout.create({ ...workout, user: userId });
        });

        return res.status(201).json({
            message: "Workouts added successfully",
            workouts: parsedWorkouts,
        });
    } catch (err) {
      next(err);
    }
};

// Function to parse workout details from an array of strings
const parsedWorkoutLine = (parts) => {
    const details = {};
    console.log(parts);
    if (parts.length >= 5) {
        details.workoutName = parts[1].substring(1).trim();
        details.sets = parseInt(parts[2].split("sets")[0].substring(1).trim());
        details.reps = parseInt(parts[3].split("reps")[0].substring(1).trim());
        details.weight = parseFloat(parts[4].split("kg")[0].substring(1).trim());
        details.duration = parseFloat(parts[5].split("min")[0].substring(1).trim());
        console.log(details);
        return details;
    }
    return null;
};

// Function to calculate calories burned based on workout details
const calculateCaloriesBurnt = (workoutDetails) => {
    const weightInKg = parseInt(workoutDetails.weight);
    const durationInMinutes = parseInt(workoutDetails.duration);
    const caloriesBurntPerMinute = 5; // Sample value, actual calculation may vary
    return durationInMinutes * caloriesBurntPerMinute * weightInKg;
};