import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import Conversation from "../model/conversationModel.js";

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin:
                process.env.CLIENT_URL ||
                "https://lets-build-frontend-27j5.onrender.com",

            methods: [
                "GET",
                "POST",
            ],

            credentials: true,
        },
    });

    io.use((socket, next) => {
        try {
            const token =
                socket.handshake.auth
                    ?.token;

            if (!token) {
                return next(
                    new Error(
                        "Authentication required"
                    )
                );
            }

            const decoded =
                jwt.verify(
                    token,
                    process.env.JWT_SECRET
                );

            if (!decoded?.id) {
                return next(
                    new Error(
                        "Invalid token payload"
                    )
                );
            }

            socket.userId =
                decoded.id;

            next();
        } catch (error) {
            next(
                new Error(
                    "Invalid token"
                )
            );
        }
    });

    io.on(
        "connection",
        (socket) => {
            console.log(
                "Socket connected:",
                socket.userId
            );

            // User-specific room
            socket.join(
                socket.userId.toString()
            );

            socket.on(
                "conversation:join",
                async (
                    conversationId
                ) => {
                    try {
                        if (
                            !mongoose.isValidObjectId(
                                conversationId
                            )
                        ) {
                            return;
                        }

                        const conversation =
                            await Conversation.findById(
                                conversationId
                            );

                        if (
                            !conversation
                        ) {
                            return;
                        }

                        const isParticipant =
                            conversation.participants.some(
                                (
                                    participant
                                ) =>
                                    participant.toString() ===
                                    socket.userId.toString()
                            );

                        if (
                            !isParticipant
                        ) {
                            return;
                        }

                        const room =
                            `conversation:${conversationId}`;

                        socket.join(
                            room
                        );

                        console.log(
                            `${socket.userId} joined ${room}`
                        );
                    } catch (
                        error
                    ) {
                        console.error(
                            "Socket join error:",
                            error.message
                        );
                    }
                }
            );

            socket.on(
                "conversation:leave",
                (
                    conversationId
                ) => {
                    if (
                        !conversationId
                    ) {
                        return;
                    }

                    socket.leave(
                        `conversation:${conversationId}`
                    );
                }
            );

            socket.on(
                "disconnect",
                () => {
                    console.log(
                        "Socket disconnected:",
                        socket.userId
                    );
                }
            );
        }
    );

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error(
            "Socket.io has not been initialized!"
        );
    }

    return io;
};

export default {
    initSocket,
    getIO,
};