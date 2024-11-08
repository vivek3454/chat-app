import express from "express";
import { getMyProfile, login, logout, searchUser, signup } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", singleAvatar, signup);
userRouter.post("/login", login);

userRouter.use(isAuthenticated);

userRouter.get("/me", getMyProfile);

userRouter.get("/logout", logout);

userRouter.get("/search", searchUser);

export default userRouter;