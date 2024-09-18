// Import the mongoose library
import mongoose from "mongoose";

// Define the schema for the "User" model
const UserSchema = new mongoose.Schema(
    {
        name: { // User's name
            type: String,
            required: true,
        },
        email: { // User's email (must be unique)
            type: String,
            required: true,
            unique: true,
        },
        password: { // User's password
            type: String,
            required: true,
        },
        img: { // Optional user profile image URL
            type: String,
            default: null,
        },
        age: { // User's age (optional)
            type: Number,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);
// Export the "User" model based on the schema
export default mongoose.model("User", UserSchema);