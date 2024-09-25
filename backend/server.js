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

// Route to handle user-related operations, mounted at "/api/user"
app.use("/api/user/", UserRoutes);
// Error handling middleware for handling unexpected errors
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";

    // Log the error details for debugging purposes
    console.error(`Error: ${message}, Status Code: ${status}`);
    console.error(err.stack);

    // Log request-specific information
    console.error(`Request URL: ${req.originalUrl}`);
    console.error(`Request Method: ${req.method}`);
    console.error(`Request Headers: ${JSON.stringify(req.headers)}`);

    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

// Define the root route ("/") of the API
app.get("/", async(req, res) => {
    res.status(200).json({
        message: "Hello fitness enthusiasts from BREATHE FIT", // Respond with a greeting message
    });
});

// Function to connect to the MongoDB database using Mongoose
const connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(process.env.MONGODB_SECRET_URL)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => {
        console.error("Failed to connect with MongoDB");
        console.error(err);
      });
};

// Function to start the server
const startServer = async () => {
    try {
        connectDB();
        app.listen(8080, () => console.log("Server running at port 8080"));
    } catch (error) {
        console.log(error);
    }
};

// Start the server by invoking the startServer function
startServer();