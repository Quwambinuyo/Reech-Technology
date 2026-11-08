type ProgressBarProps = {
  value: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
  trackClassName?: string;
  barClassName?: string;
  label?: string;
};

const sizeClass = {
  sm: "h-1.5",
  md: "h-2.5",
};

const MIN_VISIBLE_PERCENT = 2;

export const ProgressBar = ({
  value,
  max = 100,
  size = "sm",
  className = "",
  trackClassName = "bg-[#E2E8F0]",
  barClassName = "bg-[#4A148C]",
  label,
}: ProgressBarProps) => {
  const safeMax = max > 0 ? max : 0;
  const percent = safeMax > 0 ? Math.min(100, (value / safeMax) * 100) : 0;
  const visiblePercent =
    value > 0 ? Math.max(percent, MIN_VISIBLE_PERCENT) : 0;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={Math.min(value, safeMax)}
      className={`${sizeClass[size]} w-full overflow-hidden rounded-full ${trackClassName} ${className}`}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-300 ${barClassName}`}
        style={{ width: `${visiblePercent}%` }}
      />
    </div>
  );
};

export default ProgressBar;