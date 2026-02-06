import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true 
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true, 
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required']
        },
        age: {
            type: Number,
            min: [18, 'Age must be at least 18'], 
            max: [60, 'Age cannot exceed 60']   
        }
    },
    {
        timestamps: true, 
        bufferCommands: false 
    }
);

const User = mongoose.models.User || model('User', userSchema);

export default User;