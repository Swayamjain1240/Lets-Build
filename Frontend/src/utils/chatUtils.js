export const getEntityId = (
  value
) => {
  if (!value) {
    return "";
  }

  if (typeof value === "object") {
    return String(
      value._id ||
      value.id ||
      ""
    );
  }

  return String(value);
};

export const getOtherParticipant = (
  conversation,
  currentUserId
) => {
  const participants =
    conversation?.participants || [];

  return (
    participants.find(
      (participant) =>
        getEntityId(participant) !==
        getEntityId(currentUserId)
    ) || null
  );
};

export const formatChatTime = (
  value
) => {
  if (!value) return "";

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  return date.toLocaleTimeString(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
    }
  );
};

export const formatConversationDate = (
  value
) => {
  if (!value) return "";

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  const today = new Date();

  const sameDay =
    date.toDateString() ===
    today.toDateString();

  if (sameDay) {
    return formatChatTime(value);
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
    }
  );
};