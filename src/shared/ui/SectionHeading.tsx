import type { LucideIcon } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  icon: LucideIcon;
  compact?: boolean;
}

export function SectionHeading({
  title,
  icon: Icon,
  compact = false,
}: SectionHeadingProps) {
  return (
    <div className={compact ? "mb-6" : "mb-10"}>
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-sky-300 shadow-[0_0_24px_rgba(56,189,248,0.12)]">
          <Icon className={compact ? "h-4 w-4" : "h-5 w-5"} strokeWidth={1.75} />
        </span>
        <div>
          <h2
            className={`font-semibold tracking-tight text-white ${
              compact ? "text-lg md:text-xl" : "text-2xl md:text-3xl"
            }`}
          >
            {title}
          </h2>
          <div className="mt-2 h-px w-16 bg-gradient-to-r from-sky-400 to-transparent" />
        </div>
      </div>
    </div>
  );
}
