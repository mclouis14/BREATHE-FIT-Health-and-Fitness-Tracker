// Import the Express library to create a router and handle HTTP requests
import express from "express";
import { UserLogin, UserRegister, getUserDashboard } from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

router.get("/dashboard", verifyToken, getUserDashboard);

// Export the router for use in other parts of the application
export default router;