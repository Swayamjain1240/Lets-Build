import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        type: {
            type: String,
            enum: [
                "JOIN_REQUEST_RECEIVED",
                "INVITATION_RECEIVED",
                "REQUEST_ACCEPTED",
                "REQUEST_REJECTED",
                "NEW_MESSAGE",
            ],
            required: true,
        },

        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            default: null,
        },

        request: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Request",
            default: null,
        },

        conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            default: null,
        },

        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model(
    "Notification",
    notificationSchema
);

export default Notification;