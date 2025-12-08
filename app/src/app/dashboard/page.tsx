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
  CartesianGrid,
} from "recharts";

const reduccionAnualData = [
  { year: "2019", reduccion: 2.1 },
  { year: "2020", reduccion: 3.2 },
  { year: "2021", reduccion: 2.8 },
  { year: "2022", reduccion: 4.1 },
  { year: "2023", reduccion: 3.5 },
];

const ejesDescarbonizacion = [
  { nombre: "Eficiencia Energética", progreso: 45 },
  { nombre: "Sustitución de Combustibles", progreso: 28 },
  { nombre: "Reducción Factor Clinker", progreso: 35 },
  { nombre: "CCUS", progreso: 5 },
];

export default function DashboardPage() {
  const progresoTotal = 17;

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
              <h2 className="text-base font-semibold text-[var(--primary)]">Progreso General Net Zero</h2>
              <span className="text-2xl font-bold text-[var(--accent)]">{progresoTotal}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-[var(--gray-light)] overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
                style={{ width: `${progresoTotal}%` }}
              />
            </div>
          </div>

          {/* KPIs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1 */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-5">
              <p className="text-sm text-[var(--foreground-muted)] mb-2">Emisiones CO2</p>
              <p className="text-3xl font-bold text-[var(--primary)]">520</p>
              <p className="text-lg text-[var(--foreground-muted)]">kgCO2/t</p>
              <div className="flex items-center gap-1 mt-3">
                <ArrowDown className="h-4 w-4 text-[var(--success)]" />
                <span className="text-[var(--success)] text-sm font-medium">2.5% vs año anterior</span>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-5">
              <p className="text-sm text-[var(--foreground-muted)] mb-2">Factor Clinker</p>
              <p className="text-3xl font-bold text-[var(--primary)]">0.72</p>
              <div className="flex items-center gap-1 mt-3">
                <ArrowDown className="h-4 w-4 text-[var(--success)]" />
                <span className="text-[var(--success)] text-sm font-medium">1.8% vs año anterior</span>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-5">
              <p className="text-sm text-[var(--foreground-muted)] mb-2">Consumo Térmico</p>
              <p className="text-3xl font-bold text-[var(--primary)]">3.4</p>
              <p className="text-lg text-[var(--foreground-muted)]">GJ/t</p>
              <div className="flex items-center gap-1 mt-3">
                <ArrowUp className="h-4 w-4 text-[var(--error)]" />
                <span className="text-[var(--error)] text-sm font-medium">0.5% vs año anterior</span>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-5">
              <p className="text-sm text-[var(--foreground-muted)] mb-2">Sustitución Comb.</p>
              <p className="text-3xl font-bold text-[var(--primary)]">15%</p>
              <div className="flex items-center gap-1 mt-3">
                <ArrowUp className="h-4 w-4 text-[var(--success)]" />
                <span className="text-[var(--success)] text-sm font-medium">3.1% vs año anterior</span>
              </div>
            </div>
          </div>

          {/* Gráfico y Ejes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico de Barras */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-[var(--border)] p-6">
              <h2 className="text-base font-semibold text-[var(--primary)] mb-6">
                Reducción Anual de Emisiones (kt CO2)
              </h2>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reduccionAnualData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis
                      dataKey="year"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value}%`, "Reducción"]}
                    />
                    <Bar
                      dataKey="reduccion"
                      fill="#5B9BD5"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={50}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Ejes de Descarbonización */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-6">
              <h2 className="text-base font-semibold text-[var(--primary)] mb-6">
                Ejes de Descarbonización
              </h2>
              <div className="space-y-5">
                {ejesDescarbonizacion.map((eje) => (
                  <div key={eje.nombre}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[var(--foreground-muted)]">{eje.nombre}</span>
                      <span className="text-sm font-semibold text-[var(--accent)]">{eje.progreso}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[var(--gray-light)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
                        style={{ width: `${eje.progreso}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
