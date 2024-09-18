// Import required modules and packages
import express from "express";             // Web framework for building APIs
import * as dotenv from "dotenv";          // Load environment variables from .env file
import cors from "cors";                   // Enable Cross-Origin Resource Sharing (CORS)
import mongoose from "mongoose";           // MongoDB object modeling tool
import UserRoutes from "./routes/User.js"; // Import user-related API routes

// Load environment variables from the .env file into process.env
dotenv.config();

// Initialize an Express application
const app = express();

// Middleware to enable CORS for all requests (cross-origin resource sharing)
app.use(cors());

// Middleware to parse incoming JSON requests with a size limit of 50MB
app.use(express.json({ limit: "50mb" }));

// Middleware to parse URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Define the root route ("/") of the API
app.get("/", async(req, res) => {
    res.status(200).json({
        message: "Hello fitness enthusiasts from Breathe Fit", // Respond with a greeting message
    });
});

// Route to handle user-related operations, mounted at "/api/user"
app.use("/api/user", UserRoutes);

// Error handling middleware for handling unexpected errors
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

// Function to connect to the MongoDB database using Mongoose
const connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(process.env.MONGOBD_URL)
      .then((res) => console.log("connected to MongoDB"))
      .catch((err) => {
        console.log(err);
      });
};

// Function to start the server
const startServer = async () => {
    try {
        connectDB();
        app.listen(8080, () => console.log("Server running at port 8080"));
    } catch (err) {
        console.log(err);
    }
};

// Start the server by invoking the startServer function
startServer();