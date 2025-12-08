import {
  Building2,
  Factory,
  Layers,
  Flame,
  Fuel,
  Recycle,
  Leaf,
  Zap,
  Cloud,
  Bolt,
  RefreshCw,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  building: Building2,
  factory: Factory,
  layers: Layers,
  flame: Flame,
  fuel: Fuel,
  recycle: Recycle,
  leaf: Leaf,
  zap: Zap,
  cloud: Cloud,
  bolt: Bolt,
  refresh: RefreshCw,
};

interface EjeCardProps {
  codigo: string;
  nombre: string;
  aporte: number;
  descripcion: string;
  icon: string;
  indicador: string;
  valorActual: string;
  meta2050: string;
}

export function EjeCard({
  codigo,
  nombre,
  aporte,
  descripcion,
  icon,
  indicador,
  valorActual,
  meta2050,
}: EjeCardProps) {
  const Icon = iconMap[icon] || Layers;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-muted)] text-[var(--primary)]">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex flex-col">
          <p className="text-base font-medium text-white">{nombre}</p>
          <p className="text-sm text-[var(--foreground-muted)]">
            {aporte}% de contribución
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-2 w-full rounded-full bg-[var(--primary-muted)]">
          <div
            className="h-2 rounded-full bg-[var(--primary)]"
            style={{ width: `${Math.min(aporte * 2, 100)}%` }}
          />
        </div>
        <p className="text-sm text-[var(--foreground-muted)]">{descripcion}</p>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--border)] pt-3">
        <div className="text-center">
          <p className="text-xs text-[var(--foreground-muted)]">Actual</p>
          <p className="font-bold text-white">{valorActual}</p>
        </div>
        <div className="text-[var(--foreground-muted)]">→</div>
        <div className="text-center">
          <p className="text-xs text-[var(--foreground-muted)]">Meta 2050</p>
          <p className="font-bold text-[var(--primary)]">{meta2050}</p>
        </div>
      </div>
    </div>
  );
}
