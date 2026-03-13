"use client";

import { ArrowUp, ArrowDown } from "lucide-react";
import { kpiData, gruposDescarbonizacion, comparativaEmisiones } from "@/lib/data";
import { useTrayectoria, ultimoAnio } from "@/lib/useIndicadores";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";

export default function DashboardPage() {
  const { serie } = useTrayectoria();

  // Datos dinámicos del último año disponible, con fallback a data.ts
  const ultimo = serie ? ultimoAnio(serie) : null;
  const emisionActual = ultimo?.emisiones_netas ?? kpiData.emisionesEspecificas.actual;
  const factorClinkerActual = ultimo?.factor_clinker ?? kpiData.factorClinker.actual;
  const eficienciaTermicaActual = ultimo?.eficiencia_termica ?? kpiData.eficienciaTermica.actual;
  const tsrActual = ultimo?.tsr ?? kpiData.coprocesamiento.actual;

  // Calcular progreso: desde 612 (1990) hasta 0 (2050), actualmente en valor real
  const emisionBase = 612;
  const reduccionLograda = ((emisionBase - emisionActual) / emisionBase) * 100;
  const progresoTotal = Math.round(reduccionLograda);

  // Comparativa internacional: enriquecer con datos históricos reales si hay
  const evolucionEmisiones = comparativaEmisiones.map((d) => {
    const punto: Record<string, string | number | null> = {
      año: d.año.toString(),
      argentina: d.argentina,
      lac: d.lac,
      global: d.global,
    };
    // Si tenemos datos reales de la API para este año, sobreescribir Argentina
    if (serie) {
      const real = serie.find((s) => s.anio === d.año);
      if (real) {
        punto.argentina = real.emisiones_netas;
      }
    }
    return punto;
  });

  return (
    <main className="flex-1 bg-[var(--background-secondary)] min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-8 lg:px-8">
        <h1 className="text-3xl font-bold text-[var(--primary)] tracking-tight">
          Dashboard
        </h1>
        <p className="mt-1 text-[var(--foreground-muted)]">
          Progreso del sector cementero argentino hacia Net Zero 2050.
        </p>
      </div>

      <div className="px-6 py-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Progreso General */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-[var(--primary)]">Progreso General Net Zero</h2>
                <p className="text-sm text-[var(--foreground-muted)]">
                  Reducción desde línea base 1990 ({emisionBase} kgCO₂/t) hasta Net Zero
                </p>
              </div>
              <span className="text-2xl font-bold text-[var(--accent)]">{progresoTotal}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-[var(--gray-light)] overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
                style={{ width: `${progresoTotal}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-[var(--foreground-muted)]">
              <span>1990: {emisionBase}</span>
              <span>Actual: {emisionActual}</span>
              <span>Meta 2030: {kpiData.emisionesEspecificas.meta2030}</span>
              <span>Meta 2050: Net Zero</span>
            </div>
          </div>

          {/* KPIs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1: Emisiones */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-5">
              <p className="text-sm text-[var(--foreground-muted)] mb-2">Emisiones Netas</p>
              <p className="text-3xl font-bold text-[var(--primary)]">{emisionActual}</p>
              <p className="text-lg text-[var(--foreground-muted)]">kgCO₂/t cemento</p>
              <div className="flex items-center gap-1 mt-3">
                <ArrowDown className="h-4 w-4 text-[var(--success)]" />
                <span className="text-[var(--success)] text-sm font-medium">
                  {Math.round(((emisionBase - emisionActual) / emisionBase) * 100)}% vs 1990
                </span>
              </div>
            </div>

            {/* KPI 2: Factor Clínker */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-5">
              <p className="text-sm text-[var(--foreground-muted)] mb-2">Factor Clínker</p>
              <p className="text-3xl font-bold text-[var(--primary)]">{factorClinkerActual}%</p>
              <p className="text-sm text-[var(--foreground-muted)]">Meta 2050: {kpiData.factorClinker.meta2050}%</p>
              <div className="flex items-center gap-1 mt-3">
                <ArrowDown className="h-4 w-4 text-[var(--success)]" />
                <span className="text-[var(--success)] text-sm font-medium">
                  vs global {kpiData.factorClinker.global}%
                </span>
              </div>
            </div>

            {/* KPI 3: Eficiencia Térmica */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-5">
              <p className="text-sm text-[var(--foreground-muted)] mb-2">Eficiencia Térmica</p>
              <p className="text-3xl font-bold text-[var(--primary)]">{eficienciaTermicaActual}</p>
              <p className="text-lg text-[var(--foreground-muted)]">MJ/t clínker</p>
              <div className="flex items-center gap-1 mt-3">
                <ArrowDown className="h-4 w-4 text-[var(--success)]" />
                <span className="text-[var(--success)] text-sm font-medium">
                  vs global {kpiData.eficienciaTermica.global}
                </span>
              </div>
            </div>

            {/* KPI 4: Coprocesamiento */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-5">
              <p className="text-sm text-[var(--foreground-muted)] mb-2">Coprocesamiento</p>
              <p className="text-3xl font-bold text-[var(--primary)]">{tsrActual}%</p>
              <p className="text-sm text-[var(--foreground-muted)]">Meta 2050: {kpiData.coprocesamiento.meta2050}%</p>
              <div className="flex items-center gap-1 mt-3">
                <ArrowUp className="h-4 w-4 text-[var(--success)]" />
                <span className="text-[var(--success)] text-sm font-medium">
                  Meta 2030: {kpiData.coprocesamiento.meta2030}%
                </span>
              </div>
            </div>
          </div>

          {/* Gráfico y Grupos */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico de Líneas - Comparativa Internacional */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-[var(--border)] p-6">
              <h2 className="text-base font-semibold text-[var(--primary)] mb-6">
                Evolución Emisiones (kgCO₂/t cemento)
              </h2>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={evolucionEmisiones} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="año"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      domain={[400, 800]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="argentina"
                      name="Argentina"
                      stroke="#5B9BD5"
                      strokeWidth={3}
                      dot={{ fill: "#5B9BD5", strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="lac"
                      name="LAC"
                      stroke="#10B981"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "#10B981", strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="global"
                      name="Global"
                      stroke="#9CA3AF"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "#9CA3AF", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Grupos de Descarbonización */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-6">
              <h2 className="text-base font-semibold text-[var(--primary)] mb-6">
                Contribución por Grupo
              </h2>
              <div className="space-y-5">
                {gruposDescarbonizacion.map((grupo) => (
                  <div key={grupo.grupo}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[var(--foreground-muted)]">{grupo.nombre}</span>
                      <span className="text-sm font-semibold" style={{ color: grupo.color }}>
                        {grupo.aporte}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[var(--gray-light)] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${grupo.aporte}%`, backgroundColor: grupo.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--foreground-muted)] mt-4">
                Contribución de cada grupo al objetivo Net Zero 2050
              </p>
            </div>
          </div>

          {/* Resumen de Emisiones Totales */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <h2 className="text-base font-semibold text-[var(--primary)] mb-4">
              Emisiones Totales del Sector
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-[var(--background-secondary)] rounded-lg">
                <p className="text-sm text-[var(--foreground-muted)]">Directas</p>
                <p className="text-2xl font-bold text-[var(--primary)]">{kpiData.emisionesTotales.directas}</p>
                <p className="text-sm text-[var(--foreground-muted)]">MtCO₂</p>
              </div>
              <div className="text-center p-4 bg-[var(--background-secondary)] rounded-lg">
                <p className="text-sm text-[var(--foreground-muted)]">Indirectas</p>
                <p className="text-2xl font-bold text-[var(--primary)]">{kpiData.emisionesTotales.indirectas}</p>
                <p className="text-sm text-[var(--foreground-muted)]">MtCO₂</p>
              </div>
              <div className="text-center p-4 bg-[var(--background-secondary)] rounded-lg">
                <p className="text-sm text-[var(--foreground-muted)]">Total Actual</p>
                <p className="text-2xl font-bold text-[var(--accent)]">{kpiData.emisionesTotales.actual}</p>
                <p className="text-sm text-[var(--foreground-muted)]">MtCO₂</p>
              </div>
              <div className="text-center p-4 bg-[var(--background-secondary)] rounded-lg">
                <p className="text-sm text-[var(--foreground-muted)]">BAU 2050</p>
                <p className="text-2xl font-bold text-[var(--error)]">{kpiData.emisionesTotales.bau2050}</p>
                <p className="text-sm text-[var(--foreground-muted)]">MtCO₂</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
