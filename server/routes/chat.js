import express from "express";
import {
    addMembers,
    deleteChat,
    getChatDetails,
    getMyChats,
    getMyGroups,
    leaveGroup,
    newGroupChat,
    removeMember,
    renameGroup,
    sendAttachments
} from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";

const chatRouter = express.Router();


chatRouter.use(isAuthenticated);

chatRouter.post("/new", newGroupChat);

chatRouter.get("/my", getMyChats);

chatRouter.get("/my/groups", getMyGroups);

chatRouter.put("/addmembers", addMembers);

chatRouter.put("/removemember", removeMember);

chatRouter.delete("/leave/:id", leaveGroup);

// Send Attachments
chatRouter.post(
    "/message",
    attachmentsMulter,
    sendAttachments
);


chatRouter
    .route("/:id")
    .get(getChatDetails)
    .put(renameGroup)
    .delete(deleteChat);


export default chatRouter;
