import {
  MessageCircle,
} from "lucide-react";

import {
  useRef,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import useAuth from "../../hooks/useAuth.js";

import {
  createConversation,
} from "../../services/communicationService.js";

const getId = (value) =>
  String(
    typeof value === "object"
      ? value?._id || ""
      : value || ""
  );

const extractConversation = (
  response
) => {
  return (
    response?.data?.conversation ||
    response?.data ||
    null
  );
};

export default function StartConversationButton({
  developer,
}) {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [starting, setStarting] =
    useState(false);

  const [error, setError] =
    useState("");

  const requestInFlight =
    useRef(false);

  const currentUserId =
    getId(user?._id);

  const developerId =
    getId(developer?._id);

  const isSelf =
    currentUserId ===
    developerId;

  if (
    isSelf ||
    !developerId
  ) {
    return null;
  }

  const handleStartConversation =
    async () => {
      if (requestInFlight.current) {
        return;
      }

      requestInFlight.current = true;
      setStarting(true);
      setError("");

      try {
        const response =
          await createConversation({
            receiverId:
              developerId,
          });

        const conversation =
          extractConversation(
            response
          );

        const conversationId =
          conversation?._id ||
          conversation?.id;

        if (!conversationId) {
          throw new Error(
            "Conversation could not be created."
          );
        }

        navigate(
          `/messages/${conversationId}`
        );
      } catch (err) {
        console.error(
          "Conversation creation failed:",
          err
        );

        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to start conversation."
        );
      } finally {
        requestInFlight.current =
          false;

        setStarting(false);
      }
    };

  return (
    <div>
      <button
        type="button"
        onClick={
          handleStartConversation
        }
        disabled={starting}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-heading transition-colors hover:bg-surface-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        <MessageCircle size={17} />

        {starting
          ? "Opening..."
          : "Message"}
      </button>

      {error && (
        <p className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}