"use client";

import {
  metas2030,
  trayectoriaEmisiones2030,
  trayectoriaFactorClinker2030,
  trayectoriaCoprocesamiento2030,
  trayectoriaBiomasa2030,
  trayectoriaEficienciaTermica2030,
  desafios2030,
  oportunidades2030,
  medidasHabilitantes2030,
  accionesCompromisos2030,
} from "@/lib/data";
import { useTrayectoria, ultimoAnio } from "@/lib/useIndicadores";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  Target,
  Flame,
  Leaf,
  Factory,
  Recycle,
  BarChart3,
  Lightbulb,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileText,
  Users,
  Building2,
  GraduationCap,
} from "lucide-react";

// Componente de indicador con progreso
function KPICard({
  label,
  actual,
  meta,
  unidad,
  progreso,
  icon: Icon,
  color = "#5B9BD5",
}: {
  label: string;
  actual: number;
  meta: number;
  unidad: string;
  progreso: number;
  icon: React.ElementType;
  color?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-[var(--border)] p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-[var(--foreground-muted)] font-medium">{label}</p>
        <Icon className="h-5 w-5" style={{ color }} />
      </div>
      <div className="flex items-end gap-2 mb-2">
        <p className="text-3xl font-bold text-[var(--primary)]">{actual}</p>
        <p className="text-lg text-[var(--foreground-muted)] mb-1">→ {meta}</p>
        <p className="text-sm text-[var(--foreground-muted)] mb-1">{unidad}</p>
      </div>
      <div className="mt-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[var(--foreground-muted)]">Progreso</span>
          <span className="font-medium" style={{ color }}>{progreso}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progreso}%`, backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  );
}

// Componente de tarjeta de desafío/oportunidad
function InfoCard({
  titulo,
  descripcion,
  icon: Icon,
  tipo,
}: {
  titulo: string;
  descripcion: string;
  icon: React.ElementType;
  tipo: "desafio" | "oportunidad";
}) {
  const bgColor = tipo === "desafio" ? "bg-amber-50" : "bg-emerald-50";
  const iconColor = tipo === "desafio" ? "text-amber-600" : "text-emerald-600";
  const borderColor = tipo === "desafio" ? "border-amber-200" : "border-emerald-200";

  return (
    <div className={`${bgColor} rounded-xl border ${borderColor} p-5`}>
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${tipo === "desafio" ? "bg-amber-100" : "bg-emerald-100"}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div>
          <h4 className="font-semibold text-[var(--primary)] mb-1">{titulo}</h4>
          <p className="text-sm text-[var(--foreground-muted)]">{descripcion}</p>
        </div>
      </div>
    </div>
  );
}

// Iconos para las categorías de medidas habilitantes
const categoryIcons: Record<string, React.ElementType> = {
  "Normas y Estándares": FileText,
  "Políticas Públicas": Building2,
  "Mercado y Financiamiento": BarChart3,
  "Capacitación y Conocimiento": GraduationCap,
};

// Iconos para desafíos
const desafioIcons: Record<string, React.ElementType> = {
  factory: Factory,
  recycle: Recycle,
  chartBar: BarChart3,
  leaf: Leaf,
};

// Componente reutilizable para gráficos de trayectoria
function TrayectoriaChart({
  data,
  titulo,
  unidad,
  color,
  domainMin,
  domainMax,
  invertir = false,
}: {
  data: { año: number; meta: number; real: number | null }[];
  titulo: string;
  unidad: string;
  color: string;
  domainMin: number;
  domainMax: number;
  invertir?: boolean;
}) {
  return (
    <div className="bg-white rounded-xl border border-[var(--border)] p-4">
      <h3 className="text-sm font-semibold text-[var(--primary)] mb-1">{titulo}</h3>
      <p className="text-xs text-[var(--foreground-muted)] mb-3">
        {data[0]?.meta} → {data[data.length - 1]?.meta} {unidad}
      </p>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="año" tick={{ fontSize: 10 }} />
            <YAxis
              domain={[domainMin, domainMax]}
              tick={{ fontSize: 10 }}
              reversed={invertir}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-2 rounded-lg shadow-lg border border-[var(--border)] text-xs">
                      <p className="font-semibold text-[var(--primary)]">{label}</p>
                      {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }}>
                          {entry.name}: {entry.value !== null ? `${entry.value} ${unidad}` : "Pendiente"}
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="meta"
              name="Trayectoria"
              stroke={color}
              strokeWidth={2}
              dot={{ r: 2 }}
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="real"
              name="Real"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ r: 6, fill: "#10B981", strokeWidth: 2, stroke: "#fff" }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-4 h-0.5 border-t-2 border-dashed" style={{ borderColor: color }}></div>
          <span className="text-[var(--foreground-muted)]">Meta</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-0.5 bg-emerald-500"></div>
          <span className="text-[var(--foreground-muted)]">Real</span>
        </div>
      </div>
    </div>
  );
}

// Inyectar datos reales de la API en las trayectorias de data.ts
function enriquecerTrayectoria(
  trayectoria: { año: number; meta: number; real: number | null }[],
  valoresPorAnio: Map<number, number>,
): { año: number; meta: number; real: number | null }[] {
  return trayectoria.map((punto) => {
    const valorReal = valoresPorAnio.get(punto.año);
    return {
      ...punto,
      real: valorReal !== undefined ? valorReal : punto.real,
    };
  });
}

export default function Trayectoria2030Page() {
  const { serie } = useTrayectoria();

  // Construir mapas de valores reales por año para cada indicador
  const emisionesMap = new Map<number, number>();
  const factorClinkerMap = new Map<number, number>();
  const tsrMap = new Map<number, number>();
  const biomasaMap = new Map<number, number>();
  const eficienciaMap = new Map<number, number>();

  if (serie) {
    for (const s of serie) {
      emisionesMap.set(s.anio, s.emisiones_netas);
      factorClinkerMap.set(s.anio, s.factor_clinker);
      tsrMap.set(s.anio, s.tsr);
      biomasaMap.set(s.anio, s.biomasa_pct);
      eficienciaMap.set(s.anio, s.eficiencia_termica);
    }
  }

  // Trayectorias enriquecidas con datos reales de la BD
  const trayEmisiones = enriquecerTrayectoria(trayectoriaEmisiones2030, emisionesMap);
  const trayFactorClinker = enriquecerTrayectoria(trayectoriaFactorClinker2030, factorClinkerMap);
  const trayCoprocesamiento = enriquecerTrayectoria(trayectoriaCoprocesamiento2030, tsrMap);
  const trayBiomasa = enriquecerTrayectoria(trayectoriaBiomasa2030, biomasaMap);
  const trayEficiencia = enriquecerTrayectoria(trayectoriaEficienciaTermica2030, eficienciaMap);

  // KPIs con datos actuales de la API (fallback a data.ts)
  const ultimo = serie ? ultimoAnio(serie) : null;
  const kpiActual = {
    factorClinker: ultimo?.factor_clinker ?? metas2030.factorClinker.actual,
    coprocesamiento: ultimo?.tsr ?? metas2030.coprocesamiento.actual,
    biomasa: ultimo?.biomasa_pct ?? metas2030.biomasa.actual,
    eficienciaTermica: ultimo?.eficiencia_termica ?? metas2030.eficienciaTermica.actual,
    emisiones: ultimo?.emisiones_netas ?? metas2030.emisionesNetas.actual,
  };

  // Recalcular progreso basado en datos reales
  const calcProgreso = (actual: number, base: number, meta: number, invertir = false) => {
    if (invertir) {
      // Para indicadores donde menor es mejor (emisiones, factor clinker, eficiencia)
      if (base === meta) return 100;
      return Math.round(Math.min(100, Math.max(0, ((base - actual) / (base - meta)) * 100)));
    }
    // Para indicadores donde mayor es mejor (coprocesamiento, biomasa)
    if (meta === base) return 100;
    return Math.round(Math.min(100, Math.max(0, ((actual - base) / (meta - base)) * 100)));
  };

  // Datos para el gráfico de compromisos
  const datosCompromisos = accionesCompromisos2030.map((c) => ({
    area: c.area,
    avance: c.avance,
    pendiente: 100 - c.avance,
  }));

  return (
    <main className="flex-1 bg-[var(--background-secondary)] min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-8 lg:px-8">
        <div className="flex items-center gap-3 mb-2">
          <Target className="h-8 w-8 text-[#5B9BD5]" />
          <h1 className="text-3xl font-bold text-[var(--primary)] tracking-tight">
            Trayectoria 2030
          </h1>
        </div>
        <p className="mt-1 text-[var(--foreground-muted)] max-w-3xl">
          Metas de corto plazo para la industria del cemento y hormigón argentina.
          Enfoque en indicadores medibles, acciones concretas y resultados alcanzables.
        </p>
      </div>

      <div className="px-6 py-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Meta Principal Destacada */}
          <div className="bg-gradient-to-r from-[#1B3A5F] to-[#2E5A8B] rounded-xl p-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <p className="text-white/70 text-sm font-medium mb-2">META PRINCIPAL 2030</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-bold">&lt;500</span>
                  <span className="text-2xl text-white/80">kgCO₂/tcem</span>
                </div>
                <p className="mt-3 text-white/70">
                  Mantener las emisiones específicas netas por debajo de 500 kgCO₂ por tonelada de cemento,
                  consolidando el liderazgo regional de Argentina.
                </p>
                <div className="mt-4 flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-white/50">Actual ({ultimo?.anio ?? 2023}):</span>
                    <span className="ml-2 font-semibold">{kpiActual.emisiones} kgCO₂/t</span>
                  </div>
                  <div>
                    <span className="text-white/50">Brecha:</span>
                    <span className="ml-2 font-semibold text-emerald-300">{kpiActual.emisiones - 500 <= 0 ? kpiActual.emisiones - 500 : `+${kpiActual.emisiones - 500}`} kgCO₂/t</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-32 h-32">
                  {(() => {
                    const progEmisiones = calcProgreso(kpiActual.emisiones, 612, 500, true);
                    return (
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="12"
                          fill="none"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#10B981"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${(progEmisiones / 100) * 351.86} 351.86`}
                          strokeLinecap="round"
                        />
                      </svg>
                    );
                  })()}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{calcProgreso(kpiActual.emisiones, 612, 500, true)}%</span>
                    <span className="text-xs text-white/70">completado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KPIs de Progreso */}
          <div>
            <h2 className="text-lg font-semibold text-[var(--primary)] mb-4">
              Indicadores Clave 2030
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard
                label="Factor Clínker"
                actual={kpiActual.factorClinker}
                meta={metas2030.factorClinker.valor}
                unidad="%"
                progreso={calcProgreso(kpiActual.factorClinker, 75, 65, true)}
                icon={Factory}
                color="#5B9BD5"
              />
              <KPICard
                label="Coprocesamiento"
                actual={kpiActual.coprocesamiento}
                meta={metas2030.coprocesamiento.valor}
                unidad="%"
                progreso={calcProgreso(kpiActual.coprocesamiento, 0, 10)}
                icon={Recycle}
                color="#10B981"
              />
              <KPICard
                label="Biomasa"
                actual={kpiActual.biomasa}
                meta={metas2030.biomasa.valor}
                unidad="%"
                progreso={calcProgreso(kpiActual.biomasa, 0, 5)}
                icon={Leaf}
                color="#22C55E"
              />
              <KPICard
                label="Eficiencia Térmica"
                actual={kpiActual.eficienciaTermica}
                meta={metas2030.eficienciaTermica.valor}
                unidad="MJ/tCk"
                progreso={calcProgreso(kpiActual.eficienciaTermica, 3622, 3400, true)}
                icon={Flame}
                color="#F59E0B"
              />
            </div>
          </div>

          {/* Gráficos de Trayectoria por Indicador */}
          <div>
            <h2 className="text-lg font-semibold text-[var(--primary)] mb-4">
              Trayectorias 2023 → 2030
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <TrayectoriaChart
                data={trayEmisiones}
                titulo="Emisiones Netas"
                unidad="kgCO₂/t"
                color="#EF4444"
                domainMin={498}
                domainMax={510}
                invertir={true}
              />
              <TrayectoriaChart
                data={trayFactorClinker}
                titulo="Factor Clínker"
                unidad="%"
                color="#5B9BD5"
                domainMin={64}
                domainMax={68}
                invertir={true}
              />
              <TrayectoriaChart
                data={trayCoprocesamiento}
                titulo="Coprocesamiento"
                unidad="%"
                color="#10B981"
                domainMin={6}
                domainMax={11}
              />
              <TrayectoriaChart
                data={trayBiomasa}
                titulo="Biomasa"
                unidad="%"
                color="#22C55E"
                domainMin={3}
                domainMax={6}
              />
            </div>
          </div>

          {/* Gráfico de Eficiencia Térmica (más ancho) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-[var(--border)] p-4">
              <h3 className="text-sm font-semibold text-[var(--primary)] mb-1">Eficiencia Térmica</h3>
              <p className="text-xs text-[var(--foreground-muted)] mb-3">
                3,425 → 3,400 MJ/tCk (menor es mejor)
              </p>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trayEficiencia} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="año" tick={{ fontSize: 10 }} />
                    <YAxis domain={[3390, 3430]} tick={{ fontSize: 10 }} reversed={true} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 rounded-lg shadow-lg border border-[var(--border)] text-xs">
                              <p className="font-semibold text-[var(--primary)]">{label}</p>
                              {payload.map((entry, index) => (
                                <p key={index} style={{ color: entry.color }}>
                                  {entry.name}: {entry.value !== null ? `${entry.value} MJ/tCk` : "Pendiente"}
                                </p>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="meta"
                      name="Trayectoria"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      dot={{ r: 2 }}
                      strokeDasharray="5 5"
                    />
                    <Line
                      type="monotone"
                      dataKey="real"
                      name="Real"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ r: 6, fill: "#10B981", strokeWidth: 2, stroke: "#fff" }}
                      connectNulls={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-0.5 border-t-2 border-dashed border-amber-500"></div>
                  <span className="text-[var(--foreground-muted)]">Meta</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-0.5 bg-emerald-500"></div>
                  <span className="text-[var(--foreground-muted)]">Real</span>
                </div>
              </div>
            </div>

            {/* Avance en Compromisos */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-4">
              <h3 className="text-sm font-semibold text-[var(--primary)] mb-1">
                Avance en Compromisos
              </h3>
              <p className="text-xs text-[var(--foreground-muted)] mb-3">
                Progreso por área de acción
              </p>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={datosCompromisos}
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: 70, bottom: 5 }}
                  >
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} unit="%" />
                    <YAxis dataKey="area" type="category" tick={{ fontSize: 9 }} width={65} />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${value}%`,
                        name === "avance" ? "Completado" : "Pendiente",
                      ]}
                    />
                    <Bar dataKey="avance" stackId="a" name="Completado" radius={[0, 0, 0, 0]}>
                      {datosCompromisos.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.avance === 100 ? "#10B981" : "#5B9BD5"}
                        />
                      ))}
                    </Bar>
                    <Bar
                      dataKey="pendiente"
                      stackId="a"
                      name="Pendiente"
                      fill="#E5E7EB"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  <span className="text-[var(--foreground-muted)]">Completado</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-[#5B9BD5]" />
                  <span className="text-[var(--foreground-muted)]">En progreso</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desafíos y Oportunidades */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Desafíos */}
            <div>
              <h2 className="text-lg font-semibold text-[var(--primary)] mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-amber-500" />
                Desafíos 2030
              </h2>
              <div className="space-y-3">
                {desafios2030.map((desafio) => (
                  <InfoCard
                    key={desafio.id}
                    titulo={desafio.titulo}
                    descripcion={desafio.descripcion}
                    icon={desafioIcons[desafio.icono] || Target}
                    tipo="desafio"
                  />
                ))}
              </div>
            </div>

            {/* Oportunidades */}
            <div>
              <h2 className="text-lg font-semibold text-[var(--primary)] mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-emerald-500" />
                Oportunidades
              </h2>
              <div className="space-y-3">
                {oportunidades2030.map((oportunidad) => (
                  <InfoCard
                    key={oportunidad.id}
                    titulo={oportunidad.titulo}
                    descripcion={oportunidad.descripcion}
                    icon={Lightbulb}
                    tipo="oportunidad"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Medidas Habilitantes */}
          <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--border)] bg-gradient-to-r from-[#F8FAFC] to-white">
              <h2 className="text-lg font-semibold text-[var(--primary)] flex items-center gap-2">
                <Users className="h-5 w-5 text-[#5B9BD5]" />
                Medidas Habilitantes
              </h2>
              <p className="text-sm text-[var(--foreground-muted)] mt-1">
                Condiciones necesarias para alcanzar las metas 2030
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
              {medidasHabilitantes2030.map((categoria) => {
                const Icon = categoryIcons[categoria.categoria] || FileText;
                return (
                  <div key={categoria.categoria} className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="h-5 w-5 text-[#5B9BD5]" />
                      <h3 className="font-semibold text-[var(--primary)] text-sm">
                        {categoria.categoria}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {categoria.medidas.map((medida, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[var(--foreground-muted)]">
                          <ArrowRight className="h-4 w-4 text-[#5B9BD5] flex-shrink-0 mt-0.5" />
                          <span>{medida}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tabla de Compromisos */}
          <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--border)]">
              <h2 className="text-lg font-semibold text-[var(--primary)]">
                Compromisos del Sector
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--background-secondary)]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--foreground-muted)] uppercase">
                      Área
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--foreground-muted)] uppercase">
                      Compromiso
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-[var(--foreground-muted)] uppercase">
                      Estado
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[var(--foreground-muted)] uppercase">
                      Avance
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {accionesCompromisos2030.map((compromiso) => (
                    <tr key={compromiso.area} className="hover:bg-[var(--background-secondary)]/50">
                      <td className="px-4 py-3 font-medium text-[var(--primary)]">
                        {compromiso.area}
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--foreground-muted)]">
                        {compromiso.compromiso}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {compromiso.estado === "completado" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                            <CheckCircle2 className="h-3 w-3" />
                            Completado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            <Clock className="h-3 w-3" />
                            En progreso
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${compromiso.avance}%`,
                                backgroundColor: compromiso.avance === 100 ? "#10B981" : "#5B9BD5",
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium w-10 text-right">{compromiso.avance}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Nota */}
          <div className="bg-[#1B3A5F] rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">Contexto 2030</h3>
            <p className="text-sm text-white/80">
              Las metas al 2030 son <strong>condicionadas</strong> a la implementación de marcos regulatorios
              favorables, financiamiento accesible y desarrollo de cadenas de suministro de materiales
              alternativos. La industria argentina parte con ventaja: las emisiones actuales ({kpiActual.emisiones} kgCO₂/tcem)
              ya están cerca de la meta y son significativamente menores que los promedios regional y global.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs">
              <span className="bg-white/20 px-3 py-1 rounded-full">Meta condicionada</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Metodología GCCA</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Línea base 2023</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
