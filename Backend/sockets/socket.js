import { Server } from "socket.io";
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

import Conversation from "../model/conversationModel"

let io;

export const initSocket = (server) => {

  io = new Server(server, {
    cors: {
      origin:
        process.env.CLIENT_URL ||
        "http://localhost:5173",

      methods: ["GET", "POST"],
      credentials: true,
    },
  });


  // Authenticate socket connection
  io.use((socket, next) => {
    try {

      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(
          new Error("Authentication required")
        );
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      socket.userId = decoded.id;

      next();

    } catch (error) {
      next(new Error("Invalid token"));
    }
  });


  io.on("connection", (socket) => {

    // Automatically join own notification room
    socket.join(socket.userId.toString());


    socket.on(
      "join_conversation",
      async (conversationId) => {
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

          if (!conversation) {
            return;
          }

          const isParticipant =
            conversation.participants.some(
              (participant) =>
                participant.toString() ===
                socket.userId.toString()
            );

          if (!isParticipant) {
            return;
          }

          socket.join(
            conversationId.toString()
          );

        } catch (error) {
          console.error(
            "Socket join error:",
            error.message
          );
        }
      }
    );


    socket.on(
      "leave_conversation",
      (conversationId) => {
        if (conversationId) {
          socket.leave(
            conversationId.toString()
          );
        }
      }
    );

  });

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