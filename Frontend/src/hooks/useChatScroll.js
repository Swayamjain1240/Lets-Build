import {
  useEffect,
  useRef,
} from "react";

import {
  getEntityId,
} from "../utils/chatUtils.js";

export default function useChatScroll({
  containerRef,
  messages = [],
  currentUserId,
}) {
  const previousCountRef =
    useRef(0);

  useEffect(() => {
    const container =
      containerRef.current;

    if (!container) {
      return;
    }

    if (messages.length === 0) {
      previousCountRef.current = 0;
      return;
    }

    const previousCount =
      previousCountRef.current;

    const latestMessage =
      messages[
        messages.length - 1
      ];

    const isInitialLoad =
      previousCount === 0;

    const latestIsMine =
      getEntityId(
        latestMessage.sender
      ) ===
      getEntityId(
        currentUserId
      );

    const distanceFromBottom =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;

    const nearBottom =
      distanceFromBottom < 140;

    if (
      isInitialLoad ||
      latestIsMine ||
      nearBottom
    ) {
      requestAnimationFrame(
        () => {
          container.scrollTo({
            top:
              container.scrollHeight,

            behavior:
              isInitialLoad
                ? "auto"
                : "smooth",
          });
        }
      );
    }

    previousCountRef.current =
      messages.length;
  }, [
    messages,
    currentUserId,
    containerRef,
  ]);
}