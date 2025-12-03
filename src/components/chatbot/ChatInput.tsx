import { Send } from "lucide-react";

interface Props {
    value: string;
    onChange: (val: string) => void;
    onSend: () => void;
}

const ChatInput: React.FC<Props> = ({ value, onChange, onSend }) => {
    return (
        <div className="p-4 bg-[#1b1b1d] border-t border-[#2a2a2d]">
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSend()}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 pr-12 rounded-lg bg-[#2a2a2d] text-white placeholder-gray-400 outline-none border border-[#3a3a3d]"
                />

                <button
                    onClick={onSend}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300 transition"
                >
                    ➤
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
