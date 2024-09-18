// Import the Mongoose library for MongoDB interactions
import mongoose from "mongoose";

// Define the schema for Workout documents
const WorkoutSchema = new mongoose.Schema(
    {
        // Reference to the user who performed the workout
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // Category of the workout (e.g., cardio, strength)
        category: {
            type: String,
            required: true,
        },
        // Unique name for the workout
        workoutName: {
            type: String,
            required: true,
            unique: true,
        },
        // Number of repetitions in the workout
        reps: {
            type: Number,
        },
        // Number of sets performed
        sets: {
            type: Number,
        },
        // Weight used in the workout
        weight: {
            type: Number,
        },
        // Duration of the workout in minutes
        duration: {
            type: Number,
        },
        // Estimated calories burned during the workout
        caloriesBurned: {
            type: Number,
        },
        // Date the workout was performed, defaults to the current date
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
// Export the Workout model for use in other files
export default mongoose.model("Workout", WorkoutSchema);