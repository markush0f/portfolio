import { Fragment } from "react";

import { cn } from "../lib/cn";

interface HighlightedTextProps {
  text: string;
  highlights: string[];
  className?: string;
}

export function HighlightedText({
  text,
  highlights,
  className,
}: HighlightedTextProps) {
  const words = text.split(/\s+/);

  return (
    <span className={className}>
      {words.map((word, index) => {
        const cleanWord = word.replace(/[.,:;!?(){}[\]]/g, "");
        const isHighlighted = highlights.includes(cleanWord);

        return (
          <Fragment key={`${cleanWord}-${index}`}>
            <span
              className={cn(
                isHighlighted &&
                  "font-semibold text-blue-400 transition-colors duration-200 hover:text-blue-300",
              )}
            >
              {word}
            </span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </span>
  );
}
