import express from "express";
import userRouter from "./routes/user.js";
import dotenv from "dotenv";
import { connectDB } from "./utils/features.js";
import bodyParser from "body-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import chatRouter from "./routes/chat.js";

dotenv.config({
    path: "./.env",
});

const app = express();

const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI);

const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRouter)
app.use("/api/v1/chat", chatRouter)

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

