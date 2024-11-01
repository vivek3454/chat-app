import express from "express";
import { login, signup } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/signup", singleAvatar, signup)
userRouter.post("/login", login)

export default userRouter;