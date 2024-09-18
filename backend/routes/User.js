// Import the Express library to create a router and handle HTTP requests
import express from "express";
<<<<<<< HEAD
import { UserLogin, UserRegister, getUserDashboard } from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js"; 

=======

// Import controller functions for handling user registration and login
import { UserRegister } from "../controllers/User.js";
import { UserLogin } from "../controllers/User.js";

// Create a new Express router instance
>>>>>>> 7e4207b8083f9e465e1ec54718e6b680feac45b4
const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

<<<<<<< HEAD
router.get("/dashboard", verifyToken, getUserDashboard);

=======
// Export the router for use in other parts of the application
>>>>>>> 7e4207b8083f9e465e1ec54718e6b680feac45b4
export default router;