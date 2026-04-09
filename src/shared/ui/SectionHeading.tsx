interface SectionHeadingProps {
  title: string;
  icon: string;
  compact?: boolean;
}

export function SectionHeading({
  title,
  icon,
  compact = false,
}: SectionHeadingProps) {
  return (
    <div className={compact ? "mb-6 space-y-2" : "mb-8 space-y-2"}>
      <div
        className={
          compact ? "flex items-center gap-3" : "flex items-center gap-4"
        }
      >
        <h2
          className={`font-bold tracking-tight text-gradient ${
            compact ? "text-lg md:text-xl" : "text-xl md:text-2xl"
          }`}
        >
          {title}
        </h2>
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className={compact ? "h-6 w-6 opacity-80" : "h-8 w-8 opacity-80"}
        />
      </div>
      <div
        className={`rounded-full bg-gradient-to-r from-blue-500 to-blue-700 ${
          compact ? "h-1 w-16" : "h-1 w-20"
        }`}
      />
    </div>
  );
}
