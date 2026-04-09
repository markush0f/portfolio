interface ChatHeaderProps {
  title: string;
  statusLabel: string;
  isAvailable: boolean;
  onDragStart: (event: React.PointerEvent) => void;
  onClose: () => void;
}

export function ChatHeader({
  title,
  statusLabel,
  isAvailable,
  onDragStart,
  onClose,
}: ChatHeaderProps) {
  return (
    <div
      onPointerDown={onDragStart}
      className="flex cursor-move items-center justify-between border-b border-[#2a2a2d] bg-[#1b1b1d] p-3 text-white md:p-4"
    >
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold md:text-base">{title}</h3>
        <span
          className={`rounded-md border px-2 py-0.5 text-[10px] md:text-xs ${
            isAvailable
              ? "border-blue-500/30 bg-blue-500/10 text-blue-200"
              : "border-amber-500/30 bg-amber-500/10 text-amber-200"
          }`}
        >
          {statusLabel}
        </span>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        className="text-base text-white/80 transition hover:text-white md:text-xl"
        aria-label="Close assistant"
      >
        ✕
      </button>
    </div>
  );
}
