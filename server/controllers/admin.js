import jwt from "jsonwebtoken";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/utility.js";
import { cookieOptions } from "../utils/features.js";
import { adminSecretKey } from "../app.js";

const adminLogin = TryCatch(async (req, res, next) => {
    const { secretKey } = req.body;

    const isMatched = secretKey === adminSecretKey;

    if (!isMatched) return next(new ErrorHandler("Invalid Admin Key", 401));

    const token = jwt.sign(secretKey, process.env.JWT_SECRET);

    return res
        .status(200)
        .cookie("chat-admin-token", token, {
            ...cookieOptions,
            maxAge: 1000 * 60 * 15,
        })
        .json({
            success: true,
            message: "Authenticated Successfully, Welcome BOSS",
        });
});

const adminLogout = TryCatch(async (req, res, next) => {
    return res
        .status(200)
        .cookie("chat-admin-token", "", {
            ...cookieOptions,
            maxAge: 0,
        })
        .json({
            success: true,
            message: "Logged Out Successfully",
        });
});

const getAdminData = TryCatch(async (req, res, next) => {
    return res.status(200).json({
        admin: true,
    });
});

const allUsers = TryCatch(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({})
        .skip(skip)
        .limit(limit)

    const totalUsers = await User.countDocuments()

    const transformedUsers = await Promise.all(
        users.map(async ({ name, username, avatar, _id }) => {
            const [groups, friends] = await Promise.all([
                Chat.countDocuments({ groupChat: true, members: _id }),
                Chat.countDocuments({ groupChat: false, members: _id }),
            ]);

            return {
                name,
                username,
                avatar: avatar.url,
                _id,
                groups,
                friends,
            };
        })
    );

    return res.status(200).json({
        status: "success",
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        totalUsers,
        users: transformedUsers,
    });
});

const allChats = TryCatch(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const chats = await Chat.find({})
        .skip(skip)
        .limit(limit)
        .populate("members", "name avatar")
        .populate("creator", "name avatar");

    const totalChats = await Chat.countDocuments()

    const transformedChats = await Promise.all(
        chats.map(async ({ members, _id, groupChat, name, creator }) => {
            const totalMessages = await Message.countDocuments({ chat: _id });

            return {
                _id,
                groupChat,
                name,
                avatar: members.slice(0, 3).map((member) => member.avatar.url),
                members: members.map(({ _id, name, avatar }) => ({
                    _id,
                    name,
                    avatar: avatar.url,
                })),
                creator: {
                    name: creator?.name || "None",
                    avatar: creator?.avatar.url || "",
                },
                totalMembers: members.length,
                totalMessages,
            };
        })
    );

    return res.status(200).json({
        status: "success",
        totalPages: Math.ceil(totalChats / limit),
        currentPage: page,
        totalChats,
        chats: transformedChats,
    });
});

const allMessages = TryCatch(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const messages = await Message.find({})
        .skip(skip)
        .limit(limit)
        .populate("sender", "name avatar")
        .populate("chat", "groupChat name");

    const totalMessages = await Message.countDocuments(); // Total messages in the collection

    res.json({
        status: "success",
        messages,
        totalPages: Math.ceil(totalMessages / limit),
        currentPage: page,
        totalMessages
    });
});

const getDashboardStats = TryCatch(async (req, res) => {
    const [groupsCount, usersCount, messagesCount, totalChatsCount] =
        await Promise.all([
            Chat.countDocuments({ groupChat: true }),
            User.countDocuments(),
            Message.countDocuments(),
            Chat.countDocuments(),
        ]);

    const today = new Date();

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const last7DaysMessages = await Message.find({
        createdAt: {
            $gte: last7Days,
            $lte: today,
        },
    }).select("createdAt");

    const messages = new Array(7).fill(0);
    const dayInMiliseconds = 1000 * 60 * 60 * 24;

    last7DaysMessages.forEach((message) => {
        const indexApprox =
            (today.getTime() - message.createdAt.getTime()) / dayInMiliseconds;
        const index = Math.floor(indexApprox);

        messages[6 - index]++;
    });

    const stats = {
        groupsCount,
        usersCount,
        messagesCount,
        totalChatsCount,
        messagesChart: messages,
    };

    return res.status(200).json({
        success: true,
        stats,
    });
});

export {
    allUsers,
    allChats,
    allMessages,
    getDashboardStats,
    adminLogin,
    adminLogout,
    getAdminData,
};
