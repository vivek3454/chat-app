import express from "express";
import {
    adminLogin,
    adminLogout,
    allChats,
    allMessages,
    allUsers,
    getAdminData,
    getDashboardStats,
} from "../controllers/admin.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import { adminOnly } from "../middlewares/auth.js";

const adminRouter = express.Router();

adminRouter.post("/verify", adminLoginValidator(), validateHandler, adminLogin);

adminRouter.get("/logout", adminLogout);

// Only Admin Can Accecss these Routes

adminRouter.use(adminOnly);

adminRouter.get("/", getAdminData);

adminRouter.get("/users", allUsers);
adminRouter.get("/chats", allChats);
adminRouter.get("/messages", allMessages);

adminRouter.get("/stats", getDashboardStats);

export default app;
