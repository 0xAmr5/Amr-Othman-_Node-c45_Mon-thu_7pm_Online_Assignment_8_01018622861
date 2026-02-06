import User from '../models/User.model.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { encryptPhone } from '../utils/encryption.js';
import jwt from 'jsonwebtoken';

// 1. Signup API
export const signup = async (req, res) => {
    try {
        const { name, email, password, phone, age } = req.body;

        const isExist = await User.findOne({ email });
        if (isExist) {
            return res.status(409).json({ message: "Email already exists." });
        }

        const hashedPassword = hashPassword(password);
        const encryptedPhone = encryptPhone(phone);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone: encryptedPhone,
            age
        });

        return res.status(201).json({ message: "User added successfully.", user: newUser });
    } catch (error) {
        return res.status(500).json({ message: "Error", error: error.message });
    }
};

// 2. Login API
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !comparePassword(password, user.password)) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

       
        const token = jwt.sign(
            { id: user._id },
            'your_jwt_secret_key', 
            { expiresIn: '1h' }
        );

        return res.status(200).json({ message: "login successful", token });
    } catch (error) {
        return res.status(500).json({ message: "Error", error: error.message });
    }
};

// 3. Update logged-in user information (Except Password)
export const updateUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const userId = req.user._id; 

        if (email) {
            const isExist = await User.findOne({ email, _id: { $ne: userId } });
            if (isExist) return res.status(409).json({ message: "Email already exists." });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, age },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User updated", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
    }
};

// 4. Delete logged-in user
export const deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
    }
};

// 5. Get logged-in user data by ID
export const getUserData = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
    }
};