import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export const auth = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({ message: "Token is required" });
        }

        const decoded = jwt.verify(token, 'your_jwt_secret_key'); 

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
};