interface ProgressBarProps {
  label: string;
  value: number; // 0-100
  showValue?: boolean;
}

export function ProgressBar({ label, value, showValue = true }: ProgressBarProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="text-base font-medium text-white">{label}</span>
        {showValue && (
          <span className="text-sm font-medium text-[var(--foreground-muted)]">{value}%</span>
        )}
      </div>
      <div className="h-2 w-full rounded-full bg-[var(--primary-muted)]">
        <div
          className="h-2 rounded-full bg-[var(--primary)] transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
