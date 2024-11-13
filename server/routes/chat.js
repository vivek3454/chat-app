import express from "express";
import {
    addMembers,
    deleteChat,
    getChatDetails,
    getMessages,
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
import { addMemberValidator, chatIdValidator, newGroupValidator, removeMemberValidator, renameValidator, sendAttachmentsValidator, validateHandler } from "../lib/validators.js";

const chatRouter = express.Router();


chatRouter.use(isAuthenticated);

chatRouter.post("/new", newGroupValidator(), validateHandler, newGroupChat);

chatRouter.get("/my", getMyChats);

chatRouter.get("/my/groups", getMyGroups);

chatRouter.put("/addmembers", addMemberValidator(), validateHandler, addMembers);

chatRouter.put(
    "/removemember",
    removeMemberValidator(),
    validateHandler,
    removeMember
);

chatRouter.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);

// Send Attachments
chatRouter.post(
    "/message",
    attachmentsMulter,
    sendAttachmentsValidator(),
    validateHandler,
    sendAttachments
);

chatRouter
    .route("/:id")
    .get(chatIdValidator(), validateHandler, getChatDetails)
    .put(renameValidator(), validateHandler, renameGroup)
    .delete(chatIdValidator(), validateHandler, deleteChat);

chatRouter.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

export default chatRouter;
