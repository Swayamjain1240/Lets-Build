const cleanMessage = (message = "") => {
    return message.trim();
};

export const buildJoinRequestPayload = ({
    projectId,
    receiverId,
    message,
}) => {
    return {
        projectId,
        receiverId,
        type: "JOIN_REQUEST",
        message: cleanMessage(message),
    };
};

export const buildInvitationPayload = ({
    projectId,
    receiverId,
    message,
}) => {
    return {
        projectId,
        receiverId,
        type: "INVITATION",
        message: cleanMessage(message),
    };
};

export const validateRequestTarget = ({
    projectId,
    receiverId,
}) => {
    if (!projectId) {
        return "Project is required.";
    }

    if (!receiverId) {
        return "Receiver is required.";
    }

    return "";
};