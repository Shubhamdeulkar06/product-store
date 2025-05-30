import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/products.routes.js';

dotenv.config()

const app = express();
app.use(express.json())

app.use("/api/products",productRoutes )

app.listen(3000,()=>{
    connectDB();
    console.log("server started at port 3000 👌");
})