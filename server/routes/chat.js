import express from "express";
import {
    addMembers,
    getMyGroups,
    newGroupChat,
    removeMember
} from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";

const chatRouter = express.Router();


chatRouter.use(isAuthenticated);

chatRouter.post("/new", newGroupChat);

chatRouter.get("/my", getMyChats);

chatRouter.get("/my/groups", getMyGroups);

chatRouter.put("/addmembers", addMembers);

chatRouter.put("/removemember", removeMember);


export default chatRouter;
