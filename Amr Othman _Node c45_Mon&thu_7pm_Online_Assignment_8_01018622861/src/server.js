import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bootstrap from './app.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const port = 3000;

connectDB();


bootstrap(app, express);

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});