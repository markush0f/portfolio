import ReactMarkdown from "react-markdown";

import type { ChatMessage } from "../types";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isTyping: boolean;
  endRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatMessages({
  messages,
  isTyping,
  endRef,
}: ChatMessagesProps) {
  return (
    <div className="flex-1 space-y-3 overflow-y-auto bg-[#0f0f10] p-3 md:p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[88%] rounded-2xl p-3 text-xs shadow-md md:text-sm ${
              message.role === "user"
                ? "rounded-br-none bg-blue-600 text-white shadow-lg"
                : "rounded-tl-none bg-[#1c1c1e] text-white"
            }`}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        </div>
      ))}

      {isTyping ? (
        <div className="flex justify-start">
          <div className="rounded-2xl rounded-tl-none bg-[#1c1c1e] p-3 text-white shadow-md">
            <div className="flex space-x-1">
              {[0, 150, 300].map((delay) => (
                <div
                  key={delay}
                  className="h-2 w-2 animate-bounce rounded-full bg-white/70"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div ref={endRef} />
    </div>
  );
}
