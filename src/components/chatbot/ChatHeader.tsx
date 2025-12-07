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
            <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm md:text-base font-semibold">Assistant</h3>

                {/* Added modern version badge */}
                <span className="px-2 py-0.5 text-[10px] sm:text-xs bg-[#2f2f32] text-white/70 rounded-md border border-white/10">
                    v0.0.1
                </span>
            </div>

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
