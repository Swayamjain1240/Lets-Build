import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  "http://localhost:5000";

let socket = null;
let activeToken = null;

export const connectSocket = (token) => {
  if (!token) {
    return null;
  }

  if (
    socket &&
    activeToken === token
  ) {
    if (!socket.connected) {
      socket.connect();
    }

    return socket;
  }

  if (socket) {
    socket.disconnect();
  }

  activeToken = token;

  socket = io(SOCKET_URL, {
    autoConnect: true,

    auth: {
      token,
    },

    transports: [
      "websocket",
      "polling",
    ],
  });

  return socket;
};

export const getSocket = () => {
  return socket;
};

export const disconnectSocket = () => {
  if (!socket) {
    return;
  }

  socket.removeAllListeners();
  socket.disconnect();

  socket = null;
  activeToken = null;
};