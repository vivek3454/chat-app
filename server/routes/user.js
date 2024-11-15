import express from "express";
import { acceptFriendRequest, getMyNotifications, getMyProfile, login, logout, searchUser, sendFriendRequest, signup } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { acceptRequestValidator, loginValidator, registerValidator, sendRequestValidator, validateHandler } from "../lib/validators.js";

const userRouter = express.Router();

userRouter.post("/signup", singleAvatar, registerValidator(), validateHandler, signup);
userRouter.post("/login", loginValidator(), validateHandler, login);

userRouter.use(isAuthenticated);

userRouter.get("/me", getMyProfile);

userRouter.get("/logout", logout);

userRouter.get("/search", searchUser);

userRouter.put(
    "/sendrequest",
    sendRequestValidator(),
    validateHandler,
    sendFriendRequest
);

userRouter.put(
    "/acceptrequest",
    acceptRequestValidator(),
    validateHandler,
    acceptFriendRequest
);

userRouter.get("/notifications", getMyNotifications);

export default userRouter;