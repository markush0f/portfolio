import ReactMarkdown from "react-markdown";
import type { Message } from "./types";

interface Props {
    messages: Message[];
    isTyping: boolean;
    endRef: React.RefObject<HTMLDivElement | null>;
}

const ChatMessages: React.FC<Props> = ({ messages, isTyping, endRef }) => {
    return (
        <div className="flex-1 p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3 md:space-y-4 overflow-y-auto bg-[#0f0f10]">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                    <div
                        className={`p-2 sm:p-2.5 md:p-3 max-w-[90%] sm:max-w-[85%] md:max-w-[80%] text-[11px] sm:text-xs md:text-sm rounded-xl sm:rounded-2xl ${msg.role === "user"
                            ? "bg-blue-600 text-white rounded-br-none shadow-lg"
                            : "bg-[#1c1c1e] text-white rounded-tl-none shadow-md"
                            }`}
                    >
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                </div>
            ))}

            {isTyping && (
                <div className="flex justify-start">
                    <div className="p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl bg-[#1c1c1e] text-white rounded-tl-none shadow-md">
                        <div className="flex space-x-1">
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </div>
                </div>
            )}

            <div ref={endRef} />
        </div>
    );
};

export default ChatMessages;
