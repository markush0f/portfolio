interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder: string;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder,
}: ChatInputProps) {
  return (
    <div className="border-t border-[#2a2a2d] bg-[#1b1b1d] p-2 sm:p-3 md:p-4">
      <div className="relative">
        <input
          type="text"
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSend();
            }
          }}
          placeholder={placeholder}
          className="w-full rounded-lg border border-[#3a3a3d] bg-[#2a2a2d] px-2.5 py-2 pr-10 text-xs text-white outline-none transition disabled:cursor-not-allowed disabled:opacity-60 sm:px-3 md:px-4 md:text-sm"
        />

        <button
          type="button"
          onClick={onSend}
          disabled={disabled}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-base text-blue-400 transition hover:text-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send message"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
