// Import the Express library to create a router and handle HTTP requests
import express from "express";

// Import controller functions for handling user registration and login
import { UserRegister } from "../controllers/User.js";
import { UserLogin } from "../controllers/User.js";

// Create a new Express router instance
const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

// Export the router for use in other parts of the application
export default router;