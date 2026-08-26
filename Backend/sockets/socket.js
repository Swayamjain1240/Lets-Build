import {Server} from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.on('join_user', (userId) => {
      if (userId) {
        socket.join(userId.toString());
      }
    });


    socket.on('join_conversation', (conversationId) => {
      if (conversationId) {
        socket.join(conversationId.toString());
      }
    });

    
    socket.on('leave_conversation', (conversationId) => {
      if (conversationId) {
        socket.leave(conversationId.toString());
      }
    });

    
    socket.on('disconnect', () => {
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io has not been initialized!');
  }
  return io;
};

export default {
  initSocket,
  getIO,
};