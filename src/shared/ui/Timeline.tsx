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
      <div className="absolute bottom-0 left-0 top-0 w-[2px] bg-gradient-to-b from-blue-500 via-blue-600 to-transparent" />
      <div className="space-y-6">{children}</div>
    </div>
  );
}

export function TimelineItem({ children, className }: TimelineItemProps) {
  return (
    <div className={cn("group relative", className)}>
      <div className="absolute -left-[2.4rem] top-2 h-4 w-4 rounded-full border-4 border-gray-900 bg-blue-500 shadow-lg shadow-blue-500/50 transition-transform duration-300 group-hover:scale-125 group-hover:bg-blue-400 md:-left-[3.4rem]" />

      <div className="relative">
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
        <div className="relative rounded-xl border border-gray-800 bg-gray-900/80 p-3 transition-colors duration-200 hover:border-gray-700 md:p-5">
          {children}
        </div>
      </div>
    </div>
  );
}
