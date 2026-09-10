interface TechnologyIconBadgeProps {
  icon: string;
  size?: "sm" | "md";
  tooltip?: boolean;
}

function getTechnologyLabel(icon: string) {
  return icon
    .replace(/\.(svg|png)$/i, "")
    .replace(/-/g, " ")
    .toUpperCase();
}

export function TechnologyIconBadge({
  icon,
  size = "sm",
  tooltip = false,
}: TechnologyIconBadgeProps) {
  const label = getTechnologyLabel(icon);
  const iconSize = size === "sm" ? "h-5 w-5" : "h-7 w-7";

  return (
    <div className="group/tech relative">
      <div
        className={`relative flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition duration-200 hover:-translate-y-0.5 hover:border-sky-400/40 hover:bg-white/[0.06] ${
          size === "sm" ? "h-11 w-11" : "h-14 w-14"
        }`}
      >
        <img
          src={`/icons/technologies/${icon}`}
          alt={label}
          className={`${iconSize} object-contain`}
        />
      </div>

      {tooltip ? (
        <div className="pointer-events-none absolute -bottom-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#0b0f14] px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/80 opacity-0 transition-opacity duration-300 group-hover/tech:opacity-100">
          {label}
        </div>
      ) : null}
    </div>
  );
}
