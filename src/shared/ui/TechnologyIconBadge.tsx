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
  const iconSize = size === "sm" ? "h-6 w-6" : "h-8 w-8";
  const wrapperPadding = size === "sm" ? "p-2.5" : "p-2";

  return (
    <div className="group/tech relative">
      <div className="absolute -inset-2 rounded-xl bg-blue-500 opacity-0 transition-opacity duration-200 group-hover/tech:opacity-20" />
      <div
        className={`relative rounded-xl border border-gray-700 bg-gray-800/50 transition-all duration-200 hover:border-blue-500/50 hover:bg-gray-800/70 ${wrapperPadding}`}
      >
        <img
          src={`/icons/technologies/${icon}`}
          alt={label}
          className={`${iconSize} object-contain`}
        />
      </div>

      {tooltip ? (
        <div className="pointer-events-none absolute -bottom-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover/tech:opacity-100">
          {label}
        </div>
      ) : null}
    </div>
  );
}
