import express from 'express';
import userRouter from './routes/user.routes.js';

const bootstrap = (app) => {
    app.use(express.json());

    app.use('/users', userRouter);

    app.use((req, res) => {
        res.status(404).json({ message: "Route not found" });
    });
};

export default bootstrap;