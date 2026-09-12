import mongoose from "mongoose";

import Conversation from "../model/conversationModel.js";
import Message from "../model/messageModel.js";
import User from "../model/userModel.js";
import Notification from "../model/notificationModel.js";

import { getIO } from "../sockets/socket.js";

export const getOrCreateConversation = async (
    senderId,
    receiverId
) => {
    if (!mongoose.isValidObjectId(receiverId)) {
        const error = new Error(
            "Invalid receiver ID"
        );

        error.statusCode = 400;
        throw error;
    }

    if (
        senderId.toString() ===
        receiverId.toString()
    ) {
        const error = new Error(
            "You cannot create a conversation with yourself"
        );

        error.statusCode = 400;
        throw error;
    }

    const receiver =
        await User.findById(receiverId);

    if (!receiver) {
        const error = new Error(
            "Receiver not found"
        );

        error.statusCode = 404;
        throw error;
    }

    let conversation =
        await Conversation.findOne({
            participants: {
                $all: [
                    senderId,
                    receiverId,
                ],
            },

            $expr: {
                $eq: [
                    {
                        $size:
                            "$participants",
                    },
                    2,
                ],
            },
        }).populate(
            "participants",
            "name profilePicture email"
        );

    if (!conversation) {
        conversation =
            await Conversation.create({
                participants: [
                    senderId,
                    receiverId,
                ],
            });

        conversation =
            await conversation.populate(
                "participants",
                "name profilePicture email"
            );
    }

    return conversation;
};

export const getUserConversations =
    async (userId) => {
        return Conversation.find({
            participants: userId,
        })
            .populate(
                "participants",
                "name profilePicture email"
            )
            .populate({
                path: "lastMessage",
                populate: {
                    path: "sender",
                    select:
                        "name profilePicture",
                },
            })
            .sort({
                updatedAt: -1,
            });
    };

export const sendMessage = async (
    conversationId,
    senderId,
    content
) => {
    if (
        !mongoose.isValidObjectId(
            conversationId
        )
    ) {
        const error = new Error(
            "Invalid conversation ID"
        );

        error.statusCode = 400;
        throw error;
    }

    const conversation =
        await Conversation.findById(
            conversationId
        );

    if (!conversation) {
        const error = new Error(
            "Conversation not found"
        );

        error.statusCode = 404;
        throw error;
    }

    const isParticipant =
        conversation.participants.some(
            (participant) =>
                participant.toString() ===
                senderId.toString()
        );

    if (!isParticipant) {
        const error = new Error(
            "Not authorized to send message in this conversation"
        );

        error.statusCode = 403;
        throw error;
    }

    const message =
        await Message.create({
            conversation:
                conversationId,
            sender: senderId,
            content,
        });

    const populatedMessage =
        await message.populate(
            "sender",
            "name profilePicture"
        );

    conversation.lastMessage =
        message._id;

    await conversation.save();

    // Find the other user
    const receiverId =
        conversation.participants.find(
            (participant) =>
                participant.toString() !==
                senderId.toString()
        );

    let populatedNotification = null;

    // Persistent notification
    if (receiverId) {
        const notification =
            await Notification.create({
                recipient: receiverId,
                sender: senderId,
                type: "NEW_MESSAGE",
                conversation:
                    conversation._id,
                isRead: false,
            });

        populatedNotification =
            await notification.populate(
                "sender",
                "name profilePicture"
            );
    }

    // Realtime events
    try {
        const io = getIO();

        // Open chat realtime update
        io.to(
            `conversation:${conversationId}`
        ).emit(
            "message:new",
            populatedMessage
        );

        // Conversation sidebar realtime update
        for (
            const participantId
            of conversation.participants
        ) {
            io.to(
                participantId.toString()
            ).emit(
                "conversation:updated",
                {
                    conversationId:
                        conversation._id,
                    lastMessage:
                        populatedMessage,
                }
            );
        }

        // Receiver notification
        if (
            receiverId &&
            populatedNotification
        ) {
            io.to(
                receiverId.toString()
            ).emit(
                "notification",
                populatedNotification
            );
        }
    } catch (error) {
        console.warn(
            "Socket broadcast skipped:",
            error.message
        );
    }

    return populatedMessage;
};

export const getConversationMessages =
    async (
        conversationId,
        userId
    ) => {
        if (
            !mongoose.isValidObjectId(
                conversationId
            )
        ) {
            const error = new Error(
                "Invalid conversation ID"
            );

            error.statusCode = 400;
            throw error;
        }

        const conversation =
            await Conversation.findById(
                conversationId
            );

        if (!conversation) {
            const error = new Error(
                "Conversation not found"
            );

            error.statusCode = 404;
            throw error;
        }

        const isParticipant =
            conversation.participants.some(
                (participant) =>
                    participant.toString() ===
                    userId.toString()
            );

        if (!isParticipant) {
            const error = new Error(
                "Not authorized to access messages"
            );

            error.statusCode = 403;
            throw error;
        }

        return Message.find({
            conversation:
                conversationId,
        })
            .populate(
                "sender",
                "name profilePicture"
            )
            .sort({
                createdAt: 1,
            });
    };