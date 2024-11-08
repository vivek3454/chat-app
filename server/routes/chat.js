import express from "express";
import {
    newGroupChat
} from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";

const chatRouter = express.Router();


chatRouter.use(isAuthenticated);

chatRouter.post("/new", newGroupChat);

chatRouter.get("/my", getMyChats);


export default chatRouter;
