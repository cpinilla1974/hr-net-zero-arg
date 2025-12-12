import { ejesDescarbonizacion, gruposDescarbonizacion } from "@/lib/data";

// Agrupar ejes por grupo
const ejesPorGrupo = gruposDescarbonizacion.map((grupo) => ({
  ...grupo,
  ejesData: ejesDescarbonizacion.filter((eje) => eje.grupo === grupo.grupo),
}));

export default function HojaDeRutaPage() {
  const progresoActual = 17;

  return (
    <main className="flex-1 bg-[var(--background-secondary)] min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-8 lg:px-8">
        <h1 className="text-3xl font-bold text-[var(--primary)] tracking-tight">
          Hoja de Ruta Net Zero 2050
        </h1>
        <p className="mt-1 text-[var(--foreground-muted)]">
          11 ejes de descarbonización del sector cementero argentino.
        </p>
      </div>

      <div className="px-6 py-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna principal - Ejes por Grupo */}
            <div className="lg:col-span-2 space-y-8">
              {ejesPorGrupo.map((grupo) => (
                <div key={grupo.grupo}>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: grupo.color }}
                    />
                    <h2 className="text-lg font-semibold text-[var(--primary)]">
                      Grupo {grupo.grupo}: {grupo.nombre}
                    </h2>
                    <span
                      className="text-lg font-bold"
                      style={{ color: grupo.color }}
                    >
                      {grupo.aporte}%
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {grupo.ejesData.map((eje) => (
                      <EjeCard key={eje.id} eje={eje} color={grupo.color} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Columna lateral - Progreso y Resumen */}
            <div className="space-y-6">
              {/* Progress Ring */}
              <div className="bg-white rounded-xl border border-[var(--border)] p-6 text-center">
                <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">
                  Progreso Total
                </h3>
                <div className="relative w-40 h-40 mx-auto mb-4">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${progresoActual * 2.51} 251`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-[var(--success)]">
                      {progresoActual}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[var(--foreground-muted)]">
                  Reducción lograda desde 1990
                </p>
              </div>

              {/* Contribución por Grupo */}
              <div className="bg-white rounded-xl border border-[var(--border)] p-6">
                <h3 className="text-base font-semibold text-[var(--primary)] mb-4">
                  Contribución al Net Zero
                </h3>
                <div className="space-y-4">
                  {gruposDescarbonizacion.map((grupo) => (
                    <div key={grupo.grupo}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-[var(--foreground-muted)]">
                          {grupo.nombre}
                        </span>
                        <span
                          className="text-sm font-bold"
                          style={{ color: grupo.color }}
                        >
                          {grupo.aporte}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[var(--gray-light)] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${grupo.aporte}%`,
                            backgroundColor: grupo.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumen Total */}
              <div className="bg-[var(--primary)] rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">Resumen</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Ejes</span>
                    <span className="font-semibold">11</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Grupos</span>
                    <span className="font-semibold">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Meta 2030</span>
                    <span className="font-semibold">500 kgCO₂/t</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Meta 2050</span>
                    <span className="font-semibold">Net Zero</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

interface EjeData {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  aporte: number;
  indicador: string;
  valorActual: string;
  meta2050?: string;
  meta2030?: string;
}

function EjeCard({ eje, color }: { eje: EjeData; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-[var(--border)] p-5 hover:border-[var(--accent)] transition-colors">
      <div className="flex items-start justify-between mb-3">
        <span
          className="text-xs font-semibold px-2 py-1 rounded"
          style={{ backgroundColor: `${color}20`, color: color }}
        >
          {eje.codigo}
        </span>
        <span className="text-xl font-bold" style={{ color: color }}>
          {eje.aporte}%
        </span>
      </div>
      <h4 className="font-semibold text-[var(--primary)] mb-2">{eje.nombre}</h4>
      <p className="text-sm text-[var(--foreground-muted)] mb-3 line-clamp-2">
        {eje.descripcion}
      </p>
      <div className="pt-3 border-t border-[var(--border)] text-xs">
        <div className="flex justify-between text-[var(--foreground-muted)]">
          <span>{eje.indicador}</span>
          <span className="font-medium text-[var(--primary)]">
            {eje.valorActual} → {eje.meta2050 || eje.meta2030}
          </span>
        </div>
      </div>
    </div>
  );
}
