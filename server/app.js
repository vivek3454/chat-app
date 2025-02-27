import express from "express";
import userRouter from "./routes/user.js";
import dotenv from "dotenv";
import { connectDB } from "./utils/features.js";
import bodyParser from "body-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import chatRouter from "./routes/chat.js";
import { createUser } from "./seeders/user.js";
import { createGroupChats, createMessagesInAChat, createSingleChats } from "./seeders/chat.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { corsOptions } from "./constants/config.js";
import adminRouter from "./routes/admin.js";
import { v4 as uuid } from "uuid";
import { Message } from "./models/message.js";
import { getSockets } from "./lib/helper.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, NEW_MESSAGE_ALERT, ONLINE_USERS, START_TYPING, STOP_TYPING, USER_LAST_SEEN } from "./constants/events.js";
import { socketAuthenticator } from "./middlewares/auth.js";
import { User } from "./models/user.js";

dotenv.config({
    path: "./.env",
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: corsOptions,
});

const mongoURI = process.env.MONGO_URI;
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "adsasdsdfsdfsdfd";
const userSocketIDs = new Map();
const onlineUsers = new Set();

connectDB(mongoURI);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// createMessagesInAChat("67335e99909e10475e41716c",50)

const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.set("io", io);

// createUser(5);
app.use("/api/v1/user", userRouter)
app.use("/api/v1/chat", chatRouter)
app.use("/api/v1/admin", adminRouter);

io.use((socket, next) => {
    cookieParser()(
        socket.request,
        socket.request.res,
        async (err) => await socketAuthenticator(err, socket, next)
    );
});

io.on("connection", (socket) => {
    // console.log("connected");
    const user = socket.user;
    userSocketIDs.set(user._id.toString(), socket.id);

    socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {

        console.log("message", message);

        const messageForRealTime = {
            content: message,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name,
            },
            chat: chatId,
            status: "sent",
            createdAt: new Date().toISOString(),
        };

        const messageForDB = {
            content: message,
            sender: user._id,
            chat: chatId,
            status: "sent",
        };

        const membersSocket = getSockets(members);
        io.to(membersSocket).emit(NEW_MESSAGE, {
            chatId,
            message: messageForRealTime,
        });
        io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

        try {
            await Message.create(messageForDB);
        } catch (error) {
            throw new Error(error);
        }
    });

    socket.on(START_TYPING, ({ members, chatId }) => {
        const membersSockets = getSockets(members);
        socket.to(membersSockets).emit(START_TYPING, { chatId });
    });

    socket.on(STOP_TYPING, ({ members, chatId }) => {
        const membersSockets = getSockets(members);
        socket.to(membersSockets).emit(STOP_TYPING, { chatId });
    });

    socket.on(CHAT_JOINED, ({ userId, members }) => {
        onlineUsers.add(userId.toString());

        const membersSocket = getSockets(members);
        io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
    });

    socket.on(CHAT_LEAVED, ({ userId, members }) => {
        onlineUsers.delete(userId.toString());

        const membersSocket = getSockets(members);
        io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
    });

    socket.on("disconnect", async() => {
        // console.log("disconnected");
        userSocketIDs.delete(user._id.toString());
        onlineUsers.delete(user._id.toString());

        await User.findByIdAndUpdate(user._id, { lastSeen: new Date() });

        socket.broadcast.emit(USER_LAST_SEEN, {
            userId: user._id,
            lastSeen: new Date(),
        });

        socket.broadcast.emit(ONLINE_USERS, Array.from(onlineUsers));
    });
});

app.use(errorMiddleware);

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

export { adminSecretKey, userSocketIDs };