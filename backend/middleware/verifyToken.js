import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
    try {
        if (!req.heders.authorization) {
            return next(createError(401, "User not authenticated, try again!"));
        }

        const token = req.heders.authorization.split(" ")[1];

        if (!token) return next(createError(401, "User not authenticated, try again!"));

        const decode = jwt.verify(token, process.env.JWT);
        req.user = decode;
        return next();
    } catch (err) {
        next(err);
    }
};