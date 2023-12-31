import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

import connectDb from './config/db.js';
import productRoutes from './routes/productRoutes.js';




const port= process.env.PORT || 5000;

connectDb();

const app=express();
app.use(cors());


app.get('/', (req, res) => { 
    res.send("API is runnnig....");
});

app.use('/api/products', productRoutes);


app.listen(port, (req, res) => { console.log(`Server running on port ${port}`); });