interface Props {
    onDragStart: (e: React.PointerEvent) => void;
    onClose: () => void;
}

const ChatHeader: React.FC<Props> = ({ onDragStart, onClose }) => {
    return (
        <div
            onPointerDown={onDragStart}
            className="flex items-center justify-between p-2 sm:p-3 md:p-4 bg-[#1b1b1d] text-white border-b border-[#2a2a2d] cursor-move"
        >
            <h3 className="text-xs sm:text-sm md:text-base font-semibold">Assistant</h3>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                className="text-white/80 hover:text-white transition text-base sm:text-lg md:text-xl"
            >
                ✕
            </button>
        </div>
    );
};

export default ChatHeader;
