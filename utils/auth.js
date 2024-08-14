// utils/auth.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = '7c7f55abb883c3d4b16f69a15e0c29fc';

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};
