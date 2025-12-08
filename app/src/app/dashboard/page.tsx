"use client";

import { ArrowUp, ArrowDown } from "lucide-react";
import { kpiData } from "@/lib/data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const reduccionAnualData = [
  { year: "2020", reduccion: 2.1 },
  { year: "2021", reduccion: 3.2 },
  { year: "2022", reduccion: 2.8 },
  { year: "2023", reduccion: 4.1 },
  { year: "2024", reduccion: 3.5 },
];

export default function DashboardPage() {
  const progresoTotal = 17; // 17% de progreso hacia Net Zero

  return (
    <main className="flex-1 p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
          Dashboard de Progreso
        </h1>
        <p className="mt-2 text-[var(--foreground-muted)]">
          Bienvenido, aquí está el resumen de la Hoja de Ruta Net Zero.
        </p>
      </div>

      {/* Progreso Total */}
      <section className="mb-8 rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-6">
        <h2 className="text-lg font-semibold mb-2">Progreso Total hacia Net Zero</h2>
        <div className="relative h-4 w-full rounded-full bg-[var(--background-secondary)] overflow-hidden mb-2">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-[var(--primary)] transition-all duration-500"
            style={{ width: `${progresoTotal}%` }}
          />
        </div>
        <p className="text-sm text-[var(--foreground-muted)]">
          Avance general de la descarbonización: <span className="font-bold text-white">{progresoTotal}%</span> - Meta: 100% para 2050.
        </p>
      </section>

      {/* KPIs Grid */}
      <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Reducción Emisiones CO2 */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <p className="text-sm text-[var(--foreground-muted)] mb-1">Reducción Emisiones CO2</p>
          <p className="text-3xl font-bold">1.2M</p>
          <p className="text-xl font-bold text-[var(--foreground-muted)]">ton</p>
          <div className="flex items-center gap-1 mt-3">
            <ArrowUp className="h-4 w-4 text-[var(--primary)]" />
            <span className="text-[var(--primary)] text-sm font-medium">5.2%</span>
          </div>
        </div>

        {/* KPI 2: Coprocesamiento */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <p className="text-sm text-[var(--foreground-muted)] mb-1">Coprocesamiento</p>
          <p className="text-3xl font-bold">{kpiData.coprocesamiento.actual}%</p>
          <p className="text-xl font-bold text-[var(--foreground-muted)]">TSR</p>
          <div className="flex items-center gap-1 mt-3">
            <ArrowUp className="h-4 w-4 text-[var(--primary)]" />
            <span className="text-[var(--primary)] text-sm font-medium">+3.1%</span>
          </div>
        </div>

        {/* KPI 3: Factor Clínker */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <p className="text-sm text-[var(--foreground-muted)] mb-1">Factor Clínker</p>
          <p className="text-3xl font-bold">{kpiData.factorClinker.actual}%</p>
          <p className="text-xl font-bold text-[var(--foreground-muted)]">ratio</p>
          <div className="flex items-center gap-1 mt-3">
            <ArrowDown className="h-4 w-4 text-[var(--primary)]" />
            <span className="text-[var(--primary)] text-sm font-medium">-1.2%</span>
          </div>
        </div>

        {/* KPI 4: Emisiones Específicas */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <p className="text-sm text-[var(--foreground-muted)] mb-1">Emisiones Específicas</p>
          <p className="text-3xl font-bold">{kpiData.emisionesEspecificas.actual}</p>
          <p className="text-xl font-bold text-[var(--foreground-muted)]">kgCO₂/t</p>
          <div className="flex items-center gap-1 mt-3">
            <ArrowDown className="h-4 w-4 text-[var(--primary)]" />
            <span className="text-[var(--primary)] text-sm font-medium">-18% vs 1990</span>
          </div>
        </div>
      </section>

      {/* Gráfico de Reducción Anual */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Reducción Anual de Emisiones</h2>
          <p className="text-sm text-[var(--foreground-muted)]">
            Promedio últimos 5 años: <span className="font-bold text-white">-8% anual</span>
          </p>
        </div>

        <div className="h-64 lg:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reduccionAnualData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a2e1a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value: number) => [`${value}%`, "Reducción"]}
              />
              <Bar
                dataKey="reduccion"
                fill="#11d462"
                radius={[4, 4, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Metas por Eje */}
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Eficiencia Energética */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Eficiencia Energética</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-[var(--primary)]/20 text-[var(--primary)]">E1</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--foreground-muted)]">Progreso actual</span>
              <span className="font-medium">45%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[var(--background-secondary)]">
              <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: "45%" }} />
            </div>
            <p className="text-xs text-[var(--foreground-muted)]">
              Aporte esperado: 5% de la reducción total
            </p>
          </div>
        </div>

        {/* Sustitución de Combustibles */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Sustitución de Combustibles</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-[var(--primary)]/20 text-[var(--primary)]">E2</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--foreground-muted)]">Progreso actual</span>
              <span className="font-medium">28%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[var(--background-secondary)]">
              <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: "28%" }} />
            </div>
            <p className="text-xs text-[var(--foreground-muted)]">
              Aporte esperado: 12% de la reducción total
            </p>
          </div>
        </div>

        {/* Reducción Factor Clínker */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Reducción Factor Clínker</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-[var(--primary)]/20 text-[var(--primary)]">E3</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--foreground-muted)]">Progreso actual</span>
              <span className="font-medium">35%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[var(--background-secondary)]">
              <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: "35%" }} />
            </div>
            <p className="text-xs text-[var(--foreground-muted)]">
              Aporte esperado: 11% de la reducción total
            </p>
          </div>
        </div>

        {/* CCUS */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Captura y Almacenamiento CO₂</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-[var(--primary)]/20 text-[var(--primary)]">E5</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--foreground-muted)]">Progreso actual</span>
              <span className="font-medium">5%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[var(--background-secondary)]">
              <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: "5%" }} />
            </div>
            <p className="text-xs text-[var(--foreground-muted)]">
              Aporte esperado: 36% de la reducción total
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
