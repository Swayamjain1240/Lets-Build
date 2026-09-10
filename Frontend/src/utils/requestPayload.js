const cleanMessage = (message = "") => {
  return message.trim();
};

export const buildJoinRequestPayload = ({
  projectId,
  receiverId,
  message,
}) => {
  return {
    project: projectId,
    receiver: receiverId,
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
    project: projectId,
    receiver: receiverId,
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