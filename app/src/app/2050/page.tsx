"use client";

import { useState } from "react";
import {
  Rocket,
  Factory,
  TrendingDown,
  ChevronDown,
  ChevronRight,
  Zap,
  Leaf,
  Globe,
  Beaker,
  X,
} from "lucide-react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  kpiData,
  gruposDescarbonizacion,
  ejesDescarbonizacion,
} from "@/lib/data";

// Datos para gráfico de escenarios
const escenarioData = [
  { año: 2023, produccion: 12.6, bau: 6.7, netZero: 6.7 },
  { año: 2030, produccion: 14.8, bau: 7.8, netZero: 5.8 },
  { año: 2040, produccion: 17.0, bau: 9.1, netZero: 3.5 },
  { año: 2050, produccion: 19.5, bau: 10.4, netZero: 0 },
];

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

  // Preparar datos del PieChart para los grupos
  const gruposPieData = gruposDescarbonizacion.map((g) => ({
    name: g.nombre,
    value: g.aporte,
    color: g.color,
    grupo: g.grupo,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SECCIÓN 1: HERO - El Objetivo */}
      <section className="relative bg-gradient-to-br from-[#1B3A5F] via-[#2E5A8B] to-[#1B3A5F] text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-[#5B9BD5]/30 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Rocket className="h-8 w-8 text-[#5B9BD5]" />
            <span className="text-sm font-medium uppercase tracking-wider text-white/70">
              Hoja de Ruta Net Zero 2050
            </span>
          </div>

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
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4">
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
          <div className="mt-8 text-xs text-white/50">
            Elaborada por AFCP en conjunto con FICEM, GCCA y ONUDI
          </div>

          {/* Scroll indicator */}
          <div className="mt-12 animate-bounce">
            <ChevronDown className="h-8 w-8 mx-auto text-white/50" />
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: EL DESAFÍO - Escenario de Emisiones */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">El Desafío de Descarbonización</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              La industria del cemento es fundamental para el desarrollo de infraestructura del país.
              El desafío es compatibilizar el crecimiento esperado de la demanda con la descarbonización del sector.
            </p>
          </div>

          {/* Cards de estadísticas */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 text-center border border-emerald-200">
              <Factory className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <div className="text-5xl font-black text-emerald-700 mb-2">+55%</div>
              <div className="text-lg font-medium text-emerald-800">Crecimiento de producción</div>
              <div className="text-sm text-emerald-600 mt-2">
                {kpiData.produccionCemento.actual} Mt → {kpiData.produccionCemento.meta2050} Mt
              </div>
              <p className="text-xs text-emerald-600/70 mt-3">
                Para cerrar el déficit de construcción e infraestructura
              </p>
            </div>

            <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-2xl p-8 text-center border border-sky-200">
              <TrendingDown className="h-12 w-12 text-sky-600 mx-auto mb-4" />
              <div className="text-5xl font-black text-sky-700 mb-2">-100%</div>
              <div className="text-lg font-medium text-sky-800">Reducción de emisiones</div>
              <div className="text-sm text-sky-600 mt-2">
                {kpiData.emisionesTotales.actual} MtCO₂ → 0 MtCO₂ netas
              </div>
              <p className="text-xs text-sky-600/70 mt-3">
                Alineado con el Acuerdo de París
              </p>
            </div>
          </div>

          {/* Gráfico de escenarios BAU vs Net Zero */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">
              Escenario de Emisiones: BAU vs Net Zero
            </h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              Sin acción (BAU) las emisiones crecerían a 10.4 MtCO₂. La trayectoria Net Zero las lleva a cero.
            </p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={escenarioData}>
                  <defs>
                    <linearGradient id="colorBAU" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorNetZero" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="año" tick={{ fill: "#6B7280" }} />
                  <YAxis tick={{ fill: "#6B7280" }} unit=" Mt" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value} MtCO₂`]}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="bau"
                    name="Escenario BAU"
                    stroke="#EF4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fill="url(#colorBAU)"
                  />
                  <Area
                    type="monotone"
                    dataKey="netZero"
                    name="Trayectoria Net Zero"
                    stroke="#10B981"
                    strokeWidth={3}
                    fill="url(#colorNetZero)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-400 text-center mt-4">
              BAU = Business as Usual (producir bajo las mismas condiciones actuales)
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: LOS 5 PILARES - La Estrategia */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cinco Caminos hacia Net Zero</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              La descarbonización se logra a través de 5 grupos de estrategias complementarias,
              cada una con su contribución específica al objetivo final.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* PieChart de grupos */}
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gruposPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={140}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                  >
                    {gruposPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Lista de grupos */}
            <div className="space-y-4">
              {gruposDescarbonizacion.map((grupo) => (
                <div
                  key={grupo.grupo}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-4 h-12 rounded-full"
                    style={{ backgroundColor: grupo.color }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400">
                        GRUPO {grupo.grupo}
                      </span>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: grupo.color }}
                      >
                        {grupo.aporte}%
                      </span>
                    </div>
                    <div className="font-semibold text-gray-900">{grupo.nombre}</div>
                  </div>
                </div>
              ))}
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

      {/* SECCIÓN 7: LOS 11 EJES - Explorador Técnico */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Los 11 Ejes de Descarbonización</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Detalle técnico de cada eje de acción para profesionales del sector.
            </p>
          </div>

          {/* Grid de ejes */}
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