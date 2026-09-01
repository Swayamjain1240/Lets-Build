import Conversation from "../model/conversationModel.js"
import Message from "../model/messageModel.js"
import { getIO } from "../sockets/socket.js"
import mongoose from "mongoose";
import User from "../model/userModel.js";

export const getOrCreateConversation = async (senderId, receiverId) => {

    if (!mongoose.isValidObjectId(receiverId)) {
        const error = new Error("Invalid receiver ID");
        error.statusCode = 400;
        throw error;
    }
    if (senderId.toString() === receiverId.toString()) {
        const error = new Error(
            "You cannot create a conversation with yourself"
        );

        error.statusCode = 400;
        throw error;
    }

    const receiver = await User.findById(receiverId);

    if (!receiver) {
        const error = new Error("Receiver not found");
        error.statusCode = 404;
        throw error;
    }

    let conversation = await Conversation.findOne({
        participants: {
            $all: [senderId, receiverId],
        },
        $expr: {
            $eq: [
                { $size: "$participants" },
                2,
            ],
        },
    }).populate('participants', 'name profilePicture email');

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        });
        conversation = await conversation.populate('participants', 'name profilePicture email');
    }


    return conversation;
};

export const getUserConversations = async (userId) => {
    return await Conversation.find({ participants: userId })
        .populate('participants', 'name profilePicture email')
        .populate('lastMessage')
        .sort({ updatedAt: -1 });
};

export const sendMessage = async (conversationId, senderId, text) => {
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
        const error = new Error('Conversation not found');
        error.statusCode = 404;
        throw error;
    }

    if (!conversation.participants.map((p) => p.toString()).includes(senderId.toString())) {
        const error = new Error('Not authorized to send message in this conversation');
        error.statusCode = 403;
        throw error;
    }

    const message = await Message.create({
        conversation: conversationId,
        sender: senderId,
        content: text,
    });
    const populatedMessage = await message.populate('sender', 'name profilePicture');


    conversation.lastMessage = message._id;
    await conversation.save();


    try {
        const io = getIO();
        io.to(conversationId.toString()).emit('receive_message', populatedMessage);
    } catch (err) {
        console.warn('Socket broadcast skipped:', err.message);
    }

    return populatedMessage;
};

export const getConversationMessages = async (conversationId, userId) => {
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
        const error = new Error('Conversation not found');
        error.statusCode = 404;
        throw error;
    }

    if (!conversation.participants.map((p) => p.toString()).includes(userId.toString())) {
        const error = new Error('Not authorized to access messages');
        error.statusCode = 403;
        throw error;
    }

    return await Message.find({ conversation: conversationId })
        .populate('sender', 'name profilePicture')
        .sort({ createdAt: 1 });
};