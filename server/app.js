import express from "express";
import userRouter from "./routes/user.js";

const app = express();

const port = 3000;

app.use("/user",userRouter)

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})

