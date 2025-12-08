interface KpiCardProps {
  label: string;
  value: string | number;
  unit?: string;
  sublabel?: string;
  trend?: "up" | "down" | "neutral";
}

export function KpiCard({ label, value, unit, sublabel, trend }: KpiCardProps) {
  const trendColor = trend === "down" ? "text-[var(--primary)]" : trend === "up" ? "text-[var(--error)]" : "";
  const trendIcon = trend === "down" ? "↓" : trend === "up" ? "↑" : "";

  return (
    <div className="flex flex-col gap-1 rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4">
      <p className="text-sm text-[var(--foreground-muted)]">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-[var(--primary)]">{value}</span>
        {unit && <span className="text-sm text-[var(--foreground-muted)]">{unit}</span>}
        {trend && <span className={`ml-2 text-sm ${trendColor}`}>{trendIcon}</span>}
      </div>
      {sublabel && (
        <p className="text-xs text-[var(--foreground-muted)]">{sublabel}</p>
      )}
    </div>
  );
}
