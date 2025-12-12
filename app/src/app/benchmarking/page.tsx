"use client";

import { benchmarkingInternacional, benchmarkingResumen } from "@/lib/data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
  LineChart,
  Line,
  ComposedChart,
  Legend,
} from "recharts";
import { TrendingDown, Award, Globe, Leaf } from "lucide-react";

// Preparar datos ordenados por emisiones netas
const datosOrdenados = [...benchmarkingInternacional]
  .sort((a, b) => a.emisionesNetas - b.emisionesNetas)
  .slice(0, 18); // Top 18 para visualización

export default function BenchmarkingPage() {
  const argentina = benchmarkingInternacional.find((d) => d.pais === "Argentina");
  const global = benchmarkingInternacional.find((d) => d.pais === "Global");
  const latinoamerica = benchmarkingInternacional.find((d) => d.pais === "Latinoamérica");

  return (
    <main className="flex-1 bg-[var(--background-secondary)] min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-8 lg:px-8">
        <h1 className="text-3xl font-bold text-[var(--primary)] tracking-tight">
          Benchmarking Internacional
        </h1>
        <p className="mt-1 text-[var(--foreground-muted)]">
          Comparativa de emisiones netas de CO₂ por tonelada de cemento a nivel mundial (GNR 2023).
        </p>
      </div>

      <div className="px-6 py-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* KPIs destacados */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Argentina */}
            <div className="bg-white rounded-xl p-5 border-2 border-[var(--accent)]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-[var(--foreground-muted)] font-medium">Argentina</p>
                <Award className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <p className="text-4xl font-bold text-[var(--accent)]">{argentina?.emisionesNetas}</p>
              <p className="text-sm text-[var(--foreground-muted)]">kgCO₂/t cemento</p>
              <p className="text-xs text-[var(--success)] mt-1 font-medium">
                Entre los más bajos del mundo
              </p>
            </div>

            {/* vs Global */}
            <div className="bg-white rounded-xl p-5 border border-[var(--border)]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-[var(--foreground-muted)] font-medium">vs Global</p>
                <Globe className="h-5 w-5 text-[var(--primary)]" />
              </div>
              <p className="text-4xl font-bold text-[var(--primary)]">{global?.emisionesNetas}</p>
              <p className="text-sm text-[var(--foreground-muted)]">kgCO₂/t cemento</p>
              <p className="text-xs text-[var(--success)] mt-1">
                Argentina -{benchmarkingResumen.argentina.vsGlobal}% menor
              </p>
            </div>

            {/* vs Latinoamérica */}
            <div className="bg-white rounded-xl p-5 border border-[var(--border)]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-[var(--foreground-muted)] font-medium">vs Latinoamérica</p>
                <Leaf className="h-5 w-5 text-[var(--success)]" />
              </div>
              <p className="text-4xl font-bold text-[var(--primary)]">{latinoamerica?.emisionesNetas}</p>
              <p className="text-sm text-[var(--foreground-muted)]">kgCO₂/t cemento</p>
              <p className="text-xs text-[var(--success)] mt-1">
                Argentina -{benchmarkingResumen.argentina.vsLatinoamerica}% menor
              </p>
            </div>

            {/* Factor Clínker */}
            <div className="bg-white rounded-xl p-5 border border-[var(--border)]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-[var(--foreground-muted)] font-medium">Factor Clínker ARG</p>
                <TrendingDown className="h-5 w-5 text-[var(--success)]" />
              </div>
              <p className="text-4xl font-bold text-[var(--primary)]">{argentina?.factorClinker}%</p>
              <p className="text-sm text-[var(--foreground-muted)]">vs global {global?.factorClinker}%</p>
              <p className="text-xs text-[var(--success)] mt-1">
                -{(global?.factorClinker || 0) - (argentina?.factorClinker || 0)}% menor
              </p>
            </div>
          </div>

          {/* Gráfico principal de barras */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <h2 className="text-lg font-semibold text-[var(--primary)] mb-2">
              Emisiones Netas por País/Región
            </h2>
            <p className="text-sm text-[var(--foreground-muted)] mb-6">
              kgCO₂ por tonelada de material cementicio (GNR 2023)
            </p>
            <div className="h-[500px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={datosOrdenados}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
                >
                  <XAxis type="number" domain={[0, 750]} tick={{ fontSize: 12 }} />
                  <YAxis
                    dataKey="pais"
                    type="category"
                    tick={{ fontSize: 12 }}
                    width={95}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-[var(--border)]">
                            <p className="font-semibold text-[var(--primary)]">{data.pais}</p>
                            <p className="text-sm">Emisiones Netas: <span className="font-medium">{data.emisionesNetas} kgCO₂/t</span></p>
                            <p className="text-sm">Coprocesamiento: <span className="font-medium">{data.cooprocesamientoPct}%</span></p>
                            <p className="text-sm">Factor Clínker: <span className="font-medium">{data.factorClinker}%</span></p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="emisionesNetas" name="Emisiones Netas" radius={[0, 4, 4, 0]}>
                    {datosOrdenados.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.pais === "Argentina" ? "#5B9BD5" : entry.pais === "Global" || entry.pais === "Latinoamérica" ? "#1B3A5F" : "#94A3B8"}
                      />
                    ))}
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#5B9BD5]"></div>
                <span className="text-[var(--foreground-muted)]">Argentina</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#1B3A5F]"></div>
                <span className="text-[var(--foreground-muted)]">Promedios regionales</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#94A3B8]"></div>
                <span className="text-[var(--foreground-muted)]">Otros países</span>
              </div>
            </div>
          </div>

          {/* Segunda fila: Factor Clínker y Coprocesamiento */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Factor Clínker por país */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-base font-semibold text-[var(--primary)] mb-4">
                Factor Clínker por País
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={datosOrdenados.slice(0, 12)}
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: 80, bottom: 5 }}
                  >
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                    <YAxis dataKey="pais" type="category" tick={{ fontSize: 11 }} width={75} />
                    <Tooltip formatter={(value: number) => [`${value}%`, "Factor Clínker"]} />
                    <Bar dataKey="factorClinker" name="Factor Clínker" radius={[0, 4, 4, 0]}>
                      {datosOrdenados.slice(0, 12).map((entry, index) => (
                        <Cell
                          key={`cell-clinker-${index}`}
                          fill={entry.pais === "Argentina" ? "#5B9BD5" : "#E2E8F0"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-[var(--foreground-muted)] mt-2 text-center">
                Menor factor clínker = menor contenido de clínker = menores emisiones
              </p>
            </div>

            {/* Coprocesamiento por país */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-base font-semibold text-[var(--primary)] mb-4">
                Coprocesamiento (TSR) por País
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[...datosOrdenados].sort((a, b) => b.cooprocesamientoPct - a.cooprocesamientoPct).slice(0, 12)}
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: 80, bottom: 5 }}
                  >
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                    <YAxis dataKey="pais" type="category" tick={{ fontSize: 11 }} width={75} />
                    <Tooltip formatter={(value: number) => [`${value}%`, "Coprocesamiento"]} />
                    <Bar dataKey="cooprocesamientoPct" name="Coprocesamiento" radius={[0, 4, 4, 0]}>
                      {[...datosOrdenados].sort((a, b) => b.cooprocesamientoPct - a.cooprocesamientoPct).slice(0, 12).map((entry, index) => (
                        <Cell
                          key={`cell-copro-${index}`}
                          fill={entry.pais === "Argentina" ? "#5B9BD5" : "#10B981"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-[var(--foreground-muted)] mt-2 text-center">
                Mayor coprocesamiento = uso de combustibles alternativos = economía circular
              </p>
            </div>
          </div>

          {/* Tabla comparativa */}
          <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--border)]">
              <h3 className="text-base font-semibold text-[var(--primary)]">
                Detalle por País/Región
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--background-secondary)]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--foreground-muted)] uppercase">
                      País/Región
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[var(--foreground-muted)] uppercase">
                      Emisiones Netas
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[var(--foreground-muted)] uppercase">
                      Factor Clínker
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[var(--foreground-muted)] uppercase">
                      Coprocesamiento
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[var(--foreground-muted)] uppercase">
                      Año
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {datosOrdenados.map((item) => (
                    <tr
                      key={item.pais}
                      className={item.pais === "Argentina" ? "bg-[#5B9BD5]/10" : "hover:bg-[var(--background-secondary)]/50"}
                    >
                      <td className="px-4 py-3">
                        <span className={`font-medium ${item.pais === "Argentina" ? "text-[#5B9BD5]" : "text-[var(--primary)]"}`}>
                          {item.pais}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        {item.emisionesNetas} <span className="text-[var(--foreground-muted)] font-normal text-xs">kgCO₂/t</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {item.factorClinker}%
                      </td>
                      <td className="px-4 py-3 text-right">
                        {item.cooprocesamientoPct}%
                      </td>
                      <td className="px-4 py-3 text-right text-[var(--foreground-muted)]">
                        {item.año}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Nota metodológica */}
          <div className="bg-[var(--primary)] rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">Metodología</h3>
            <p className="text-sm text-white/80">
              Los datos provienen del sistema GNR (Getting the Numbers Right) de la GCCA,
              complementados con información de las Hojas de Ruta regionales de FICEM.
              Las emisiones netas incluyen emisiones directas de proceso y combustión,
              descontando créditos por coprocesamiento de biomasa.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs">
              <span className="bg-white/20 px-3 py-1 rounded-full">Fuente: GNR 2023</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">GCCA</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">FICEM</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
