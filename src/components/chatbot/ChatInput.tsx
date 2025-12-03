import { Send } from "lucide-react";

interface Props {
    value: string;
    onChange: (val: string) => void;
    onSend: () => void;
}

const ChatInput: React.FC<Props> = ({ value, onChange, onSend }) => {
    return (
        <div className="p-2 sm:p-3 md:p-4 bg-[#1b1b1d] border-t border-[#2a2a2d]">
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSend()}
                    placeholder="Type a message..."
                    className="w-full px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 pr-8 sm:pr-10 md:pr-12 text-xs sm:text-sm md:text-base rounded-lg bg-[#2a2a2d] text-white placeholder-gray-400 outline-none border border-[#3a3a3d]"
                />

                <button
                    onClick={onSend}
                    className="absolute right-1.5 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300 transition text-base sm:text-lg md:text-xl"
                >
                    ➤
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
