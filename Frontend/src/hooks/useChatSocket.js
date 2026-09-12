import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    connectSocket,
} from "../services/socketService.js";

import {
    getEntityId,
} from "../utils/chatUtils.js";

const JOIN_EVENT =
    "conversation:join";

const LEAVE_EVENT =
    "conversation:leave";

const MESSAGE_EVENT =
    "message:new";

const extractMessage = (
    payload
) => {
    return (
        payload?.message ||
        payload?.data?.message ||
        payload
    );
};

export default function useChatSocket({
    conversationId,
    onMessage,
}) {
    const [
        connected,
        setConnected,
    ] = useState(false);

    const onMessageRef =
        useRef(onMessage);

    useEffect(() => {
        onMessageRef.current =
            onMessage;
    }, [onMessage]);

    useEffect(() => {
        if (!conversationId) {
            setConnected(false);
            return;
        }

        const token =
            localStorage.getItem(
                "token"
            );

        if (!token) {
            setConnected(false);
            return;
        }

        const socket =
            connectSocket(token);

        if (!socket) {
            setConnected(false);
            return;
        }

        const normalizedConversationId =
            getEntityId(
                conversationId
            );

        if (
            !normalizedConversationId
        ) {
            return;
        }

        const joinRoom = () => {
            // IMPORTANT:
            // Send raw ID, not object.
            socket.emit(
                JOIN_EVENT,
                normalizedConversationId
            );
        };

        const handleConnect =
            () => {
                setConnected(true);

                joinRoom();
            };

        const handleDisconnect =
            () => {
                setConnected(false);
            };

        const handleNewMessage =
            (payload) => {
                const message =
                    extractMessage(
                        payload
                    );

                if (!message?._id) {
                    return;
                }

                const messageConversationId =
                    getEntityId(
                        message.conversation
                    );

                if (
                    messageConversationId &&
                    messageConversationId !==
                        normalizedConversationId
                ) {
                    return;
                }

                onMessageRef.current?.(
                    message
                );
            };

        socket.on(
            "connect",
            handleConnect
        );

        socket.on(
            "disconnect",
            handleDisconnect
        );

        socket.on(
            MESSAGE_EVENT,
            handleNewMessage
        );

        if (socket.connected) {
            setConnected(true);
            joinRoom();
        }

        return () => {
            socket.off(
                "connect",
                handleConnect
            );

            socket.off(
                "disconnect",
                handleDisconnect
            );

            socket.off(
                MESSAGE_EVENT,
                handleNewMessage
            );

            if (
                socket.connected
            ) {
                // IMPORTANT:
                // Send raw ID here too.
                socket.emit(
                    LEAVE_EVENT,
                    normalizedConversationId
                );
            }
        };
    }, [conversationId]);

    return {
        connected,
    };
}