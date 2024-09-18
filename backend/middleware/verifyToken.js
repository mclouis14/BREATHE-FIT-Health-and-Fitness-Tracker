// Import necessary libraries
import jwt from "jsonwebtoken"; // Library to handle JWT authentication
import { createError } from "../error.js"; // Function to handle custom error creation

/**
 * Middleware function to verify the JWT token from request headers.
 * If the token is missing or invalid, it returns a 401 Unauthorized error.
 * If valid, the decoded user data is attached to the request object and the request proceeds.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const verifyToken = async (req, res, next) => {
    try {
        // Check if Authorization header exists
        if (!req.heders.authorization) {
            return next(createError(401, "User not authenticated, try again!"));
        }

        // Extract token from Authorization header
        const token = req.heders.authorization.split(" ")[1];

        // If token is missing, return an error
        if (!token) return next(createError(401, "User not authenticated, try again!"));

        // Verify the token and decode it
        const decode = jwt.verify(token, process.env.JWT);
        // Attach decoded user data to request object
        req.user = decode;
        // Continue to the next middleware
        return next();
    } catch (err) {
        // Handle any error during the process
        next(err);
    }
};