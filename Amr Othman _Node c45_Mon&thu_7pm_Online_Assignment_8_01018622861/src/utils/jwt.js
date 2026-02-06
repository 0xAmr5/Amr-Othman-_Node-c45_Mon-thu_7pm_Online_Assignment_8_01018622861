import jwt from 'jsonwebtoken';


export const generateToken = (payload) => {
    
    return jwt.sign(
        payload, 
        process.env.JWT_SECRET || 'your_default_secret_key', 
        { expiresIn: '1h' }
    );
};


export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'your_default_secret_key');
    } catch (error) {
        return null;
    }
};