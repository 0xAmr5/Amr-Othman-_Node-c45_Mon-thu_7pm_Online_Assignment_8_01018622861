import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.CONNECTION_URL, {
            serverSelectionTimeoutMS: 5000, 
        });
        console.log(`DB Connected successfully: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`DB Connection error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;