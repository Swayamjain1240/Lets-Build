import {
  Send,
} from "lucide-react";

import {
  useState,
} from "react";

export default function MessageInput({
  onSend,
  sending = false,
  disabled = false,
}) {
  const [content, setContent] =
    useState("");

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      const cleanContent =
        content.trim();

      if (
        !cleanContent ||
        sending ||
        disabled
      ) {
        return;
      }

      const success =
        await onSend?.(
          cleanContent
        );

      if (success) {
        setContent("");
      }
    };

  const handleKeyDown = (
    event
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      event.currentTarget
        .form?.requestSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-border bg-background p-3 sm:p-4"
    >
      <div className="flex items-end gap-3 rounded-2xl border border-border bg-surface p-2 focus-within:border-brand-500/40">
        <textarea
          value={content}
          onChange={(event) =>
            setContent(
              event.target.value
            )
          }
          onKeyDown={
            handleKeyDown
          }
          disabled={
            disabled || sending
          }
          rows={1}
          placeholder="Write a message..."
          className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-heading outline-none placeholder:text-muted disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={
            disabled ||
            sending ||
            !content.trim()
          }
          aria-label="Send message"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={17} />
        </button>
      </div>

      <p className="mt-2 px-1 text-[11px] text-muted">
        Enter to send · Shift + Enter
        for a new line
      </p>
    </form>
  );
}