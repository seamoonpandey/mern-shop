import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protect routes
const protect=asyncHandler(async (req, res, next) => {
    let token;

    // Read the jwt from the cookie
    token=req.cookies.jwt;

    if (token) {
        try {
            const decoded=jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (err) {
            console.error(err);
            res.status(401);
            throw new Error('Not authorized, token is invalid');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized to access');
    }
});

// Admin middleware

const admin=(req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as admin');
    }
}

export { protect, admin };