import express from "express";
import userRouter from "./routes/user.js";
import dotenv from "dotenv";
import { connectDB } from "./utils/features.js";

dotenv.config({
    path: "./.env",
});

const app = express();

const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI);

const port = 3000;

app.use("/user",userRouter)

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})

