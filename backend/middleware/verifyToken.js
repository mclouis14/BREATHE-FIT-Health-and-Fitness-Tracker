import jwt from "jsonwebtoken"; // Library to handle JWT authentication
import { createError } from "../error.js"; // Function to handle custom error creation

// Middleware function to verify the JWT token from request headers.
export const verifyToken = async (req, res, next) => {
    try {
        // Check if Authorization header exists
        if (!req.headers.authorization) {
            return next(createError(401, "User not authenticated, try again!"));
        }

        // Extract token from Authorization header
        const token = req.headers.authorization.split(" ")[1];

        // If token is missing, return an error
        if (!token) return next(createError(401, "User not authenticated, try again!"));

        // Verify the token and decode it
        const decode = jwt.verify(token, process.env.JWT);
        // Attach decoded user data to request object
        req.user = decode;
        return next(); // Pass to the next middleware
      } catch (err) {
        // Handle any error during the process
        next(err);
     }
};