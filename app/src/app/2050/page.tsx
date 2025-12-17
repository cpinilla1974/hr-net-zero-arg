"use client";

import { useState } from "react";
import {
  Rocket,
  TrendingDown,
  ChevronDown,
  ChevronRight,
  Zap,
  Leaf,
  Globe,
  Beaker,
  X,
  Target,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  kpiData,
  gruposDescarbonizacion,
  ejesDescarbonizacion,
} from "@/lib/data";
import CascadaInteractiva from "@/components/charts/CascadaInteractiva";

// Timeline data - alineado con documento HR
const timelineData = [
  {
    año: 2023,
    titulo: "Línea Base",
    emisiones: "507 kgCO₂/tcem",
    descripcion: "Argentina ya presenta niveles cercanos a la meta 2030 global",
    indicadores: ["Factor Clínker: 67%", "Coprocesamiento: 7%", "Producción: 12.6 Mt"],
    contexto: "18% por debajo de 1990",
  },
  {
    año: 2030,
    titulo: "Meta Intermedia",
    emisiones: "<500 kgCO₂/tcem",
    descripcion: "Alineada con objetivos GCCA y FICEM",
    indicadores: ["Factor Clínker: 65%", "Coprocesamiento: 10%", "Producción: 14.8 Mt"],
    contexto: "Condicionada a marcos regulatorios",
  },
  {
    año: 2040,
    titulo: "Transición Acelerada",
    emisiones: "~300 kgCO₂/tcem",
    descripcion: "Implementación de tecnologías de captura",
    indicadores: ["Factor Clínker: 63%", "Coprocesamiento: 14%", "Inicio CCUS"],
    contexto: "Requiere inversión significativa",
  },
  {
    año: 2050,
    titulo: "Net Zero",
    emisiones: "0 kgCO₂/tcem netas",
    descripcion: "Neutralidad de carbono en el sector cemento y hormigón",
    indicadores: ["Factor Clínker: 61%", "Coprocesamiento: 18%", "CCUS: 45%"],
    contexto: "Alineado con Acuerdo de París",
  },
];

// Datos comparativos internacionales
const comparativaFactorClinker = [
  { pais: "Argentina", lb: 67, m2030: 65, m2050: 61 },
  { pais: "Chile", lb: 71, m2030: 70, m2050: 61 },
  { pais: "Colombia", lb: 68, m2030: 69, m2050: 63 },
  { pais: "Peru", lb: 76, m2030: 71, m2050: 55 },
  { pais: "USA", lb: 95, m2030: 89, m2050: 78 },
  { pais: "EU", lb: 77, m2030: 75, m2050: 65 },
];

const comparativaCoprocesamiento = [
  { pais: "Argentina", lb: 7, m2030: 10, m2050: 18 },
  { pais: "Chile", lb: 15, m2030: 30, m2050: 68 },
  { pais: "Colombia", lb: 8, m2030: 18, m2050: 50 },
  { pais: "EU", lb: 46, m2030: 60, m2050: 90 },
  { pais: "USA", lb: 8, m2030: 25, m2050: 52 },
];

export default function Trayectoria2050Page() {
  const [expandedGlobal, setExpandedGlobal] = useState(false);
  const [activeTab, setActiveTab] = useState<"clinker" | "coprocesamiento">("clinker");
  const [selectedEje, setSelectedEje] = useState<typeof ejesDescarbonizacion[0] | null>(null);
  const [heroExpanded, setHeroExpanded] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SECCIÓN 1: HERO - El Objetivo - COLAPSABLE */}
      <section className="relative bg-gradient-to-br from-[#1B3A5F] via-[#2E5A8B] to-[#1B3A5F] text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-[#5B9BD5]/30 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-8">
          {/* Header Compacto - Siempre visible */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                <Rocket className="h-6 w-6 text-[#5B9BD5]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Hoja de Ruta Net Zero 2050
                </h2>
                <p className="text-sm text-white/60">
                  6.7 MtCO₂ → 0 MtCO₂ • Neutralidad de carbono al 2050
                </p>
              </div>
            </div>

            <button
              onClick={() => setHeroExpanded(!heroExpanded)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 transition-colors text-sm font-medium"
            >
              {heroExpanded ? "Ocultar objetivo" : "Ver objetivo"}
              <ChevronDown className={`h-4 w-4 transition-transform ${heroExpanded ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Contenido expandible */}
          {heroExpanded && (
            <div className="animate-in slide-in-from-top duration-300 text-center">
              {/* El gran CERO animado */}
              <div className="relative inline-block mb-8">
                <div className="text-[180px] md:text-[240px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 animate-pulse">
                  0
                </div>
                <div className="absolute inset-0 text-[180px] md:text-[240px] font-black leading-none text-[#5B9BD5]/20 blur-2xl">
                  0
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Emisiones Netas de CO₂
              </h1>
              <p className="text-xl text-white/80 mb-4">
                Neutralidad de carbono en cemento y hormigón
              </p>
              <p className="text-sm text-white/60 max-w-2xl mx-auto mb-8">
                Alineada con los objetivos del Acuerdo de París para limitar el aumento de temperatura a 1.5°C
              </p>

              {/* Indicador de transición */}
              <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 mb-8">
                <div className="text-right">
                  <div className="text-2xl font-bold">{kpiData.emisionesTotales.actual}</div>
                  <div className="text-sm text-white/60">MtCO₂ hoy</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full" />
                  <TrendingDown className="h-6 w-6 text-green-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">{kpiData.emisionesTotales.meta2050}</div>
                  <div className="text-sm text-white/60">MtCO₂ en 2050</div>
                </div>
              </div>

              {/* Contexto institucional */}
              <div className="text-xs text-white/50">
                Elaborada por AFCP en conjunto con FICEM, GCCA y ONUDI
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECCIÓN 2: CASCADA INTERACTIVA - Elemento Central */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          {/* Cascada Interactiva */}
          <CascadaInteractiva onEjeSelect={setSelectedEje} />

          {/* Tabla de Metas por Grupo */}
          <div className="mt-12 bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Metas de Reducción por Grupo</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3 text-left">Grupo</th>
                    <th className="px-4 py-3 text-center">Aporte Total</th>
                    <th className="px-4 py-3 text-center">Ejes</th>
                    <th className="px-4 py-3 text-center">Horizonte</th>
                    <th className="px-4 py-3 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {gruposDescarbonizacion.map((grupo) => (
                    <tr key={grupo.grupo} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-8 rounded-full"
                            style={{ backgroundColor: grupo.color }}
                          />
                          <div>
                            <div className="font-medium text-gray-900">{grupo.nombre}</div>
                            <div className="text-xs text-gray-500">Grupo {grupo.grupo}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span
                          className="inline-flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-lg"
                          style={{ backgroundColor: grupo.color }}
                        >
                          {grupo.aporte}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-wrap justify-center gap-1">
                          {grupo.ejes.map((eje) => (
                            <span
                              key={eje}
                              className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600"
                            >
                              {eje}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-gray-600">
                        {grupo.grupo === "C" ? "2030-2050" : "2023-2050"}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                          grupo.grupo === "C"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                          {grupo.grupo === "C" ? "En desarrollo" : "En progreso"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-[#1B3A5F] text-white">
                    <td className="px-6 py-4 font-semibold">Total Reducción</td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-2xl font-black">100%</span>
                    </td>
                    <td className="px-4 py-4 text-center text-sm">11 ejes</td>
                    <td className="px-4 py-4 text-center text-sm">2050</td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/20">
                        Net Zero
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: EL CAMINO - Timeline */}
      <section className="py-20 px-6 bg-[#1B3A5F] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Una Transición de 27 Años</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              El camino hacia Net Zero es gradual, con hitos claros y medibles en cada etapa.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Línea horizontal */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full" />

            <div className="grid md:grid-cols-4 gap-6">
              {timelineData.map((item, index) => (
                <div key={item.año} className="relative">
                  {/* Punto en timeline */}
                  <div className="hidden md:flex absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white items-center justify-center shadow-lg">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        index === 0
                          ? "bg-red-500"
                          : index === 3
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    />
                  </div>

                  <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-colors">
                    <div className="text-4xl font-black text-[#5B9BD5] mb-2">
                      {item.año}
                    </div>
                    <div className="text-lg font-semibold mb-1">{item.titulo}</div>
                    <div className="text-2xl font-bold text-green-400 mb-3">
                      {item.emisiones}
                    </div>
                    <p className="text-sm text-white/60 mb-4">{item.descripcion}</p>
                    <div className="space-y-1">
                      {item.indicadores.map((ind, i) => (
                        <div
                          key={i}
                          className="text-xs bg-white/5 rounded px-2 py-1 inline-block mr-1"
                        >
                          {ind}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: EL PROTAGONISTA - CCUS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-[#5B9BD5] to-[#1B3A5F] rounded-3xl p-8 md:p-12 text-white overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <Beaker className="h-8 w-8" />
                <span className="text-sm font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                  Tecnología Clave
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                CCUS: Captura y Almacenamiento de CO₂
              </h2>

              {/* Gran porcentaje */}
              <div className="flex items-end gap-4 mb-8">
                <div className="text-8xl md:text-9xl font-black">45</div>
                <div className="text-4xl font-bold mb-4">%</div>
                <div className="text-lg text-white/70 mb-6 ml-4">
                  del esfuerzo<br />de reducción
                </div>
              </div>

              {/* Barra de progreso visual */}
              <div className="w-full h-4 bg-white/20 rounded-full mb-8 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-300 rounded-full"
                  style={{ width: "45%" }}
                />
              </div>

              {/* Info */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="text-sm uppercase tracking-wider text-white/50 mb-2">
                    Estado
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                    <span className="font-medium">En desarrollo</span>
                  </div>
                  <div className="text-sm text-white/60 mt-1">
                    Disponibilidad comercial: 2030-2040
                  </div>
                </div>

                <div>
                  <div className="text-sm uppercase tracking-wider text-white/50 mb-2">
                    Tecnologías incluidas
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-green-400" />
                      Captura post-combustión
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-green-400" />
                      Almacenamiento geológico
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-green-400" />
                      Uso de CO₂ en productos
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-green-400" />
                      Soluciones basadas en naturaleza
                    </li>
                  </ul>
                </div>
              </div>

              {/* Badge */}
              <div className="mt-8 inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-200 px-4 py-2 rounded-full text-sm">
                <Zap className="h-4 w-4" />
                <span>Tecnología crítica - Requiere desarrollo e inversión significativa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 6: CONTEXTO GLOBAL - Comparativas (Colapsable) */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setExpandedGlobal(!expandedGlobal)}
            className="w-full flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <Globe className="h-8 w-8 text-[#5B9BD5]" />
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900">Contexto Global</h2>
                <p className="text-gray-600">Argentina en comparación internacional</p>
              </div>
            </div>
            <ChevronDown
              className={`h-6 w-6 text-gray-400 transition-transform ${
                expandedGlobal ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedGlobal && (
            <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6 animate-in fade-in duration-300">
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveTab("clinker")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === "clinker"
                      ? "bg-[#5B9BD5] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Factor Clínker
                </button>
                <button
                  onClick={() => setActiveTab("coprocesamiento")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === "coprocesamiento"
                      ? "bg-[#5B9BD5] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Coprocesamiento
                </button>
              </div>

              {/* Gráfico comparativo */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={
                      activeTab === "clinker"
                        ? [
                            { periodo: "LB", ...Object.fromEntries(comparativaFactorClinker.map(p => [p.pais, p.lb])) },
                            { periodo: "2030", ...Object.fromEntries(comparativaFactorClinker.map(p => [p.pais, p.m2030])) },
                            { periodo: "2050", ...Object.fromEntries(comparativaFactorClinker.map(p => [p.pais, p.m2050])) },
                          ]
                        : [
                            { periodo: "LB", ...Object.fromEntries(comparativaCoprocesamiento.map(p => [p.pais, p.lb])) },
                            { periodo: "2030", ...Object.fromEntries(comparativaCoprocesamiento.map(p => [p.pais, p.m2030])) },
                            { periodo: "2050", ...Object.fromEntries(comparativaCoprocesamiento.map(p => [p.pais, p.m2050])) },
                          ]
                    }
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="periodo" tick={{ fill: "#6B7280" }} />
                    <YAxis tick={{ fill: "#6B7280" }} unit="%" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    {(activeTab === "clinker" ? comparativaFactorClinker : comparativaCoprocesamiento).map(
                      (pais, index) => (
                        <Line
                          key={pais.pais}
                          type="monotone"
                          dataKey={pais.pais}
                          stroke={
                            pais.pais === "Argentina"
                              ? "#5B9BD5"
                              : ["#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"][index % 5]
                          }
                          strokeWidth={pais.pais === "Argentina" ? 3 : 1.5}
                          dot={{ r: pais.pais === "Argentina" ? 6 : 3 }}
                        />
                      )
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <p className="text-sm text-gray-500 text-center mt-4">
                {activeTab === "clinker"
                  ? "Factor clínker: porcentaje de clínker en el cemento. Menor es mejor."
                  : "Coprocesamiento: porcentaje de combustibles alternativos. Mayor es mejor."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SECCIÓN 7: LOS 11 EJES - Tabla de Metas */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trayectoria de los 11 Ejes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Metas específicas para cada eje desde la línea base hasta 2050.
              <br />
              <span className="text-sm text-gray-500">Haz clic en cualquier fila para ver más detalles.</span>
            </p>
          </div>

          {/* Tabla de Metas por Eje */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#1B3A5F] text-white text-sm">
                    <th className="px-4 py-4 text-left font-semibold">Eje</th>
                    <th className="px-3 py-4 text-center font-semibold">Indicador</th>
                    <th className="px-3 py-4 text-center font-semibold bg-gray-700/30">LB</th>
                    <th className="px-3 py-4 text-center font-semibold">2030</th>
                    <th className="px-3 py-4 text-center font-semibold">2040</th>
                    <th className="px-3 py-4 text-center font-semibold bg-green-600/30">2050</th>
                    <th className="px-3 py-4 text-center font-semibold">Aporte</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ejesDescarbonizacion.map((eje) => {
                    const grupo = gruposDescarbonizacion.find((g) => g.grupo === eje.grupo);
                    return (
                      <tr
                        key={eje.id}
                        onClick={() => setSelectedEje(eje)}
                        className="hover:bg-blue-50 cursor-pointer transition-colors group"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span
                              className="text-xs font-bold px-2 py-1 rounded text-white whitespace-nowrap"
                              style={{ backgroundColor: grupo?.color }}
                            >
                              {eje.codigo}
                            </span>
                            <div>
                              <div className="font-medium text-gray-900 group-hover:text-[#5B9BD5]">
                                {eje.nombre}
                              </div>
                              <div className="text-xs text-gray-500 hidden sm:block">
                                Grupo {eje.grupo}: {eje.grupoNombre}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {eje.indicador}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-center bg-gray-50/50">
                          <span className="font-medium text-gray-700">{eje.valorActual}</span>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span className="text-gray-600">
                            {(eje as { meta2030?: string }).meta2030 || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span className="text-gray-600">-</span>
                        </td>
                        <td className="px-3 py-3 text-center bg-green-50/50">
                          <span className="font-semibold text-green-700">{eje.meta2050}</span>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-sm"
                            style={{ backgroundColor: grupo?.color }}
                          >
                            {eje.aporte}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-[#1B3A5F] text-white font-semibold">
                    <td className="px-4 py-4" colSpan={2}>Total Reducción</td>
                    <td className="px-3 py-4 text-center">100%</td>
                    <td className="px-3 py-4 text-center">-</td>
                    <td className="px-3 py-4 text-center">-</td>
                    <td className="px-3 py-4 text-center bg-green-600/30">0%</td>
                    <td className="px-3 py-4 text-center">
                      <span className="text-xl font-black">100%</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Grid de tarjetas (versión compacta) */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vista rápida por eje</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {ejesDescarbonizacion.map((eje) => {
                const grupo = gruposDescarbonizacion.find((g) => g.grupo === eje.grupo);
                return (
                  <button
                    key={eje.id}
                    onClick={() => setSelectedEje(eje)}
                    className="text-left p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className="text-xs font-bold px-2 py-1 rounded text-white"
                        style={{ backgroundColor: grupo?.color }}
                      >
                        {eje.codigo}
                      </span>
                      <span className="text-lg font-bold text-gray-400 group-hover:text-[#5B9BD5]">
                        {eje.aporte}%
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#5B9BD5]">
                      {eje.nombre}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{eje.descripcion}</p>
                    <div className="mt-3 flex items-center text-xs text-gray-400">
                      <span>{eje.indicador}: {eje.valorActual} → {eje.meta2050}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Modal de detalle de eje */}
      {selectedEje && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-bold px-2 py-1 rounded text-white"
                    style={{
                      backgroundColor: gruposDescarbonizacion.find(
                        (g) => g.grupo === selectedEje.grupo
                      )?.color,
                    }}
                  >
                    {selectedEje.codigo}
                  </span>
                  <span className="text-sm text-gray-500">
                    Grupo {selectedEje.grupo}: {selectedEje.grupoNombre}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedEje.nombre}</h3>
              </div>
              <button
                onClick={() => setSelectedEje(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {/* Aporte */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl font-black text-[#5B9BD5]">{selectedEje.aporte}%</div>
                <div className="text-gray-600">
                  de contribución<br />a Net Zero
                </div>
              </div>

              {/* Descripción */}
              <p className="text-gray-700 mb-6">{selectedEje.descripcion}</p>

              {/* Indicadores */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Indicador: {selectedEje.indicador}</h4>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Actual</div>
                    <div className="text-xl font-bold text-gray-900">{selectedEje.valorActual}</div>
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full relative">
                    <div
                      className="absolute left-0 top-0 h-full bg-[#5B9BD5] rounded-full"
                      style={{ width: "30%" }}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Meta 2050</div>
                    <div className="text-xl font-bold text-green-600">{selectedEje.meta2050}</div>
                  </div>
                </div>
              </div>

              {/* Medidas */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Medidas específicas</h4>
                <ul className="space-y-2">
                  {selectedEje.medidas.map((medida, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <ChevronRight className="h-5 w-5 text-[#5B9BD5] flex-shrink-0 mt-0.5" />
                      {medida}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 8: FOOTER - Metodología y Fuentes */}
      <section className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-3 text-white/80">Alineación</h3>
              <ul className="space-y-1 text-sm text-white/60">
                <li>Acuerdo de París (1.5°C)</li>
                <li>NDC Argentina</li>
                <li>Ley 27.520 Cambio Climático</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-white/80">Metodología</h3>
              <ul className="space-y-1 text-sm text-white/60">
                <li>GCCA Roadmap Template</li>
                <li>ECRA Technology Papers</li>
                <li>Hoja de Ruta FICEM</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-white/80">Fuentes de Datos</h3>
              <ul className="space-y-1 text-sm text-white/60">
                <li>GNR Database 2023</li>
                <li>AFCP Argentina</li>
                <li>Inventario Nacional GEI</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-xs text-white/40 text-center">
              Las metas presentadas están condicionadas a la disponibilidad de marcos regulatorios favorables,
              financiamiento climático y desarrollo de tecnologías como CCUS. Los valores son proyecciones
              basadas en escenarios técnicamente factibles.
            </p>
          </div>

          {/* Logos */}
          <div className="flex items-center justify-center gap-8 mt-8 opacity-60">
            <Leaf className="h-6 w-6" />
            <span className="text-sm">AFCP</span>
            <span className="text-sm">FICEM</span>
            <span className="text-sm">GCCA</span>
            <span className="text-sm">ONUDI</span>
          </div>
        </div>
      </section>
    </div>
  );
}