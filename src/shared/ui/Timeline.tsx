import type { ReactNode } from "react";

import { cn } from "../lib/cn";

interface TimelineProps {
  children: ReactNode;
}

interface TimelineItemProps {
  children: ReactNode;
  className?: string;
}

export function Timeline({ children }: TimelineProps) {
  return (
    <div className="relative pl-8 md:pl-12">
      <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-sky-400/80 via-sky-500/20 to-transparent" />
      <div className="space-y-5">{children}</div>
    </div>
  );
}

export function TimelineItem({ children, className }: TimelineItemProps) {
  return (
    <div className={cn("group relative", className)}>
      <div className="absolute -left-[2.15rem] top-5 h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.7)] transition-transform duration-300 group-hover:scale-125 md:-left-[3.15rem]" />

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition duration-200 hover:border-white/20 hover:bg-white/[0.05] md:p-6">
        {children}
      </div>
    </div>
  );
}
