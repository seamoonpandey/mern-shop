import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
dotenv.config();

import { notFound, errorHandler } from './middleware/errorHandler.js';

import connectDb from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';




const port= process.env.PORT || 5000;

connectDb();

const app=express();
app.use(cors());

// Body parser middleware
app.get(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => { 
    res.send("API is runnnig....");
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);


app.listen(port, (req, res) => { console.log(`Server running on port ${port}`); });