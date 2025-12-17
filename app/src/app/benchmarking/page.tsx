"use client";

import { useEffect, useState } from "react";
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
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { TrendingDown, Award, Globe, Leaf, Clock, Zap, Flame, Factory, Calendar } from "lucide-react";

// Tipos para datos de la API
interface TimeSeriesData {
  year: number;
  value: number;
}

interface TimeSeriesResponse {
  indicator: string;
  unit: string;
  series: Record<string, TimeSeriesData[]>;
}

// Preparar datos ordenados por emisiones netas (datos estáticos existentes)
const datosOrdenados = [...benchmarkingInternacional]
  .sort((a, b) => a.emisionesNetas - b.emisionesNetas)
  .slice(0, 18);

// Colores para las series
const COLORS = {
  Argentina: "#5B9BD5",
  World: "#1B3A5F",
  FICEM: "#00A651",
  South_Latin_America: "#F59E0B",
  Brazil: "#10B981",
  Germany: "#8B5CF6",
  Austria: "#EC4899",
  India: "#F97316",
};

// Indicadores disponibles
const INDICATORS = [
  {
    id: "net_co2_kg_cement",
    name: "Emisiones Netas",
    unit: "kgCO₂/t",
    icon: TrendingDown,
    color: "#5B9BD5",
    multiplier: 1,
  },
  {
    id: "clinker_cement_ratio",
    name: "Factor Clínker",
    unit: "%",
    icon: Factory,
    color: "#1B3A5F",
    multiplier: 100,
  },
  {
    id: "thermal_energy_mj_clinker",
    name: "Energía Térmica",
    unit: "MJ/t",
    icon: Flame,
    color: "#F59E0B",
    multiplier: 1,
  },
  {
    id: "electric_kwh_cement",
    name: "Consumo Eléctrico",
    unit: "kWh/t",
    icon: Zap,
    color: "#8B5CF6",
    multiplier: 1,
  },
  {
    id: "alternative_fuel_rate",
    name: "Combustibles Alternativos",
    unit: "%",
    icon: Leaf,
    color: "#10B981",
    multiplier: 100,
  },
  {
    id: "biomass_rate",
    name: "Biomasa",
    unit: "%",
    icon: Globe,
    color: "#EC4899",
    multiplier: 100,
  },
];

export default function BenchmarkingPage() {
  const argentina = benchmarkingInternacional.find((d) => d.pais === "Argentina");
  const global = benchmarkingInternacional.find((d) => d.pais === "Global");
  const latinoamerica = benchmarkingInternacional.find((d) => d.pais === "Latinoamérica");

  // Estados para datos dinámicos
  const [emissionsSeries, setEmissionsSeries] = useState<TimeSeriesData[] | null>(null);
  const [clinkerRatioSeries, setClinkerRatioSeries] = useState<TimeSeriesData[] | null>(null);
  const [thermalEnergySeries, setThermalEnergySeries] = useState<TimeSeriesData[] | null>(null);
  const [electricSeries, setElectricSeries] = useState<TimeSeriesData[] | null>(null);
  const [loading, setLoading] = useState(true);

  // Estado para selector de año GLOBAL (aplica a toda la página)
  const [selectedYear, setSelectedYear] = useState(2023);
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  // Estado para indicador seleccionado y datos del gráfico principal
  const [selectedIndicator, setSelectedIndicator] = useState(INDICATORS[0].id);
  const [indicatorComparison, setIndicatorComparison] = useState<{ region: string; value: number }[] | null>(null);
  const [argentinaValues, setArgentinaValues] = useState<Record<string, number>>({});

  // Estado para selector de año en gráficos de comparación inferiores
  const [comparisonData, setComparisonData] = useState<{ region: string; clinkerRatio: number; altFuelRate: number }[] | null>(null);

  // Cargar datos de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar series temporales para múltiples indicadores
        const regions = "Argentina,World,FICEM,South_Latin_America,Brazil,Germany";

        const [emissionsRes, clinkerRes, thermalRes, electricRes] = await Promise.all([
          fetch(`/api/benchmarking?action=time_series&indicator=net_co2_kg_cement&regions=${regions}`),
          fetch(`/api/benchmarking?action=time_series&indicator=clinker_cement_ratio&regions=${regions}`),
          fetch(`/api/benchmarking?action=time_series&indicator=thermal_energy_mj_clinker&regions=${regions}`),
          fetch(`/api/benchmarking?action=time_series&indicator=electric_kwh_cement&regions=${regions}`),
        ]);

        if (emissionsRes.ok) {
          const data: TimeSeriesResponse = await emissionsRes.json();
          // Transformar datos para el gráfico
          const years = new Set<number>();
          Object.values(data.series).forEach(series =>
            series.forEach(d => years.add(d.year))
          );

          const chartData = Array.from(years).sort().map(year => {
            const row: Record<string, number> = { year };
            Object.entries(data.series).forEach(([region, series]) => {
              const point = series.find(d => d.year === year);
              if (point) row[region] = point.value;
            });
            return row;
          });
          setEmissionsSeries(chartData as unknown as TimeSeriesData[]);
        }

        if (clinkerRes.ok) {
          const data: TimeSeriesResponse = await clinkerRes.json();
          const years = new Set<number>();
          Object.values(data.series).forEach(series =>
            series.forEach(d => years.add(d.year))
          );
          const chartData = Array.from(years).sort().map(year => {
            const row: Record<string, number> = { year };
            Object.entries(data.series).forEach(([region, series]) => {
              const point = series.find(d => d.year === year);
              if (point) row[region] = point.value * 100; // Convertir a porcentaje
            });
            return row;
          });
          setClinkerRatioSeries(chartData as unknown as TimeSeriesData[]);
        }

        if (thermalRes.ok) {
          const data: TimeSeriesResponse = await thermalRes.json();
          const years = new Set<number>();
          Object.values(data.series).forEach(series =>
            series.forEach(d => years.add(d.year))
          );
          const chartData = Array.from(years).sort().map(year => {
            const row: Record<string, number> = { year };
            Object.entries(data.series).forEach(([region, series]) => {
              const point = series.find(d => d.year === year);
              if (point) row[region] = point.value;
            });
            return row;
          });
          setThermalEnergySeries(chartData as unknown as TimeSeriesData[]);
        }

        if (electricRes.ok) {
          const data: TimeSeriesResponse = await electricRes.json();
          const years = new Set<number>();
          Object.values(data.series).forEach(series =>
            series.forEach(d => years.add(d.year))
          );
          const chartData = Array.from(years).sort().map(year => {
            const row: Record<string, number> = { year };
            Object.entries(data.series).forEach(([region, series]) => {
              const point = series.find(d => d.year === year);
              if (point) row[region] = point.value;
            });
            return row;
          });
          setElectricSeries(chartData as unknown as TimeSeriesData[]);
        }

      } catch (error) {
        console.error("Error fetching benchmarking data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Cargar años disponibles desde Argentina
  useEffect(() => {
    const fetchAvailableYears = async () => {
      try {
        const res = await fetch('/api/benchmarking?action=time_series&indicator=net_co2_kg_cement&regions=Argentina');
        if (res.ok) {
          const data = await res.json();
          const argentinaData = data.series?.Argentina || [];
          const years = argentinaData.map((d: { year: number }) => d.year).sort((a: number, b: number) => b - a);
          setAvailableYears(years);
        }
      } catch (error) {
        console.error("Error fetching available years:", error);
      }
    };

    fetchAvailableYears();
  }, []);

  // Cargar datos del indicador seleccionado y valores de Argentina
  useEffect(() => {
    const fetchIndicatorData = async () => {
      try {
        // Construir lista de todos los indicadores separados por comas
        const indicatorsList = INDICATORS.map(ind => ind.id).join(',');

        const res = await fetch(`/api/benchmarking?action=comparison&year=${selectedYear}&indicators=${indicatorsList}`);
        if (res.ok) {
          const data = await res.json();

          // Guardar valores de Argentina para cada indicador
          const argValues: Record<string, number> = {};
          INDICATORS.forEach(indicator => {
            const indicatorData = data.comparison?.[indicator.id] || [];
            const argData = indicatorData.find((d: { region: string; value: number }) => d.region === 'Argentina');
            if (argData) {
              argValues[indicator.id] = argData.value * indicator.multiplier;
            }
          });
          setArgentinaValues(argValues);

          // Cargar datos de comparación para el indicador seleccionado
          const selectedData = data.comparison?.[selectedIndicator] || [];
          const regions = selectedData.map((d: { region: string; value: number }) => {
            const indicator = INDICATORS.find(ind => ind.id === selectedIndicator);
            return {
              region: d.region,
              value: d.value * (indicator?.multiplier || 1)
            };
          });
          setIndicatorComparison(regions);
        }
      } catch (error) {
        console.error("Error fetching indicator data:", error);
      }
    };

    fetchIndicatorData();
  }, [selectedYear, selectedIndicator]);

  // Cargar datos de comparación para gráficos inferiores (factor clínker y combustibles alternativos)
  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        const res = await fetch(`/api/benchmarking?action=comparison&year=${selectedYear}&indicators=clinker_cement_ratio,alternative_fuel_rate`);
        if (res.ok) {
          const data = await res.json();

          // Transformar datos de comparación
          const clinkerData = data.comparison?.clinker_cement_ratio || [];
          const altFuelData = data.comparison?.alternative_fuel_rate || [];

          const regions = new Set([
            ...clinkerData.map((d: { region: string }) => d.region),
            ...altFuelData.map((d: { region: string }) => d.region)
          ]);

          const combined = Array.from(regions).map(region => {
            const clinker = clinkerData.find((d: { region: string; value: number }) => d.region === region);
            const altFuel = altFuelData.find((d: { region: string; value: number }) => d.region === region);
            return {
              region: region as string,
              clinkerRatio: clinker ? clinker.value * 100 : 0,
              altFuelRate: altFuel ? altFuel.value * 100 : 0
            };
          });

          setComparisonData(combined);
        }
      } catch (error) {
        console.error("Error fetching comparison data:", error);
      }
    };

    fetchComparisonData();
  }, [selectedYear]);

  // Componente para leyenda de series históricas
  const SeriesLegend = () => (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs">
      {Object.entries(COLORS).slice(0, 6).map(([name, color]) => (
        <div key={name} className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
          <span className="text-[var(--foreground-muted)]">
            {name === "South_Latin_America" ? "Latam" : name}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <main className="flex-1 bg-[var(--background-secondary)] min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-8 lg:px-8">
        <h1 className="text-3xl font-bold text-[var(--primary)] tracking-tight">
          Benchmarking Internacional
        </h1>
        <p className="mt-1 text-[var(--foreground-muted)]">
          Comparativa de indicadores de la industria cementera a nivel mundial (GNR 1990-2023).
        </p>
      </div>

      <div className="px-6 py-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Selector de Año Global */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-[var(--primary)]" />
                <span className="font-medium text-[var(--primary)]">Año de Comparación:</span>
              </div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="border border-[var(--border)] rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent font-medium"
              >
                {availableYears.length > 0 ? (
                  availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))
                ) : (
                  [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010].map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* Tarjetas Interactivas de Indicadores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INDICATORS.map((indicator) => {
              const Icon = indicator.icon;
              const isSelected = selectedIndicator === indicator.id;
              const value = argentinaValues[indicator.id];

              return (
                <button
                  key={indicator.id}
                  onClick={() => setSelectedIndicator(indicator.id)}
                  className={`bg-white rounded-xl p-5 border-2 transition-all text-left hover:shadow-lg ${
                    isSelected
                      ? 'border-[var(--accent)] shadow-md'
                      : 'border-[var(--border)] hover:border-[var(--accent)]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium" style={{ color: indicator.color }}>
                      {indicator.name}
                    </p>
                    <Icon className="h-5 w-5" style={{ color: indicator.color }} />
                  </div>
                  <p className="text-3xl font-bold text-[var(--primary)]">
                    {value !== undefined ? value.toFixed(indicator.unit.includes('%') ? 1 : 0) : '—'}
                  </p>
                  <p className="text-sm text-[var(--foreground-muted)] mt-1">{indicator.unit}</p>
                  <p className="text-xs text-[var(--foreground-muted)] mt-2">
                    Argentina {selectedYear}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Gráfico principal dinámico */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-[var(--primary)] mb-2">
                Comparación por País/Región - {INDICATORS.find(i => i.id === selectedIndicator)?.name}
              </h2>
              <p className="text-sm text-[var(--foreground-muted)]">
                {INDICATORS.find(i => i.id === selectedIndicator)?.unit} ({selectedYear})
              </p>
            </div>
            <div className="h-[500px] w-full">
              {indicatorComparison && indicatorComparison.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={indicatorComparison
                      .map(d => ({
                        pais: d.region === 'South_Latin_America' ? 'Latinoamérica' : d.region,
                        value: d.value
                      }))
                      .sort((a, b) => b.value - a.value)}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
                  >
                    <XAxis type="number" tick={{ fontSize: 12 }} />
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
                          const indicator = INDICATORS.find(i => i.id === selectedIndicator);
                          return (
                            <div className="bg-white p-3 rounded-lg shadow-lg border border-[var(--border)]">
                              <p className="font-semibold text-[var(--primary)]">{data.pais}</p>
                              <p className="text-sm">
                                {indicator?.name}: <span className="font-medium">{data.value.toFixed(1)} {indicator?.unit}</span>
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="value" name={INDICATORS.find(i => i.id === selectedIndicator)?.name} radius={[0, 4, 4, 0]}>
                      {indicatorComparison
                        .map(d => ({
                          pais: d.region === 'South_Latin_America' ? 'Latinoamérica' : d.region,
                          value: d.value
                        }))
                        .sort((a, b) => b.value - a.value)
                        .map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.pais === "Argentina" ? "#5B9BD5" : entry.pais === "Global" || entry.pais === "Latinoamérica" ? "#1B3A5F" : "#94A3B8"}
                          />
                        ))}
                    </Bar>
                  </ComposedChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-[var(--foreground-muted)]">
                  Cargando datos de comparación...
                </div>
              )}
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

          {/* NUEVAS SECCIONES: Series Históricas */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-[var(--primary)]" />
              <h2 className="text-lg font-semibold text-[var(--primary)]">
                Evolución Histórica de Emisiones Netas (1990-2023)
              </h2>
            </div>
            <p className="text-sm text-[var(--foreground-muted)] mb-6">
              Comparativa de emisiones de CO₂ por tonelada de cemento a lo largo del tiempo
            </p>
            <div className="h-[400px] w-full">
              {loading ? (
                <div className="h-full flex items-center justify-center text-[var(--foreground-muted)]">
                  Cargando datos históricos...
                </div>
              ) : emissionsSeries ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={emissionsSeries} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis domain={[400, 750]} tick={{ fontSize: 11 }} unit=" kg" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "white", border: "1px solid #E5E7EB", borderRadius: "8px" }}
                      formatter={(value: number) => [`${Math.round(value)} kgCO₂/t`, ""]}
                    />
                    <Line type="monotone" dataKey="Argentina" stroke={COLORS.Argentina} strokeWidth={3} dot={{ r: 2 }} />
                    <Line type="monotone" dataKey="World" stroke={COLORS.World} strokeWidth={2} dot={{ r: 1 }} />
                    <Line type="monotone" dataKey="FICEM" stroke={COLORS.FICEM} strokeWidth={2} dot={{ r: 1 }} />
                    <Line type="monotone" dataKey="South_Latin_America" stroke={COLORS.South_Latin_America} strokeWidth={2} dot={{ r: 1 }} />
                    <Line type="monotone" dataKey="Brazil" stroke={COLORS.Brazil} strokeWidth={2} dot={{ r: 1 }} />
                    <Line type="monotone" dataKey="Germany" stroke={COLORS.Germany} strokeWidth={2} dot={{ r: 1 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-[var(--foreground-muted)]">
                  No hay datos disponibles
                </div>
              )}
            </div>
            <SeriesLegend />
          </div>

          {/* Grid de 2 gráficos de series históricas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Factor Clínker histórico */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-center gap-3 mb-2">
                <Factory className="h-5 w-5 text-[var(--primary)]" />
                <h3 className="text-base font-semibold text-[var(--primary)]">
                  Evolución Factor Clínker
                </h3>
              </div>
              <p className="text-xs text-[var(--foreground-muted)] mb-4">
                Ratio clínker/cemento (%) - Menor es mejor
              </p>
              <div className="h-64">
                {loading ? (
                  <div className="h-full flex items-center justify-center text-[var(--foreground-muted)] text-sm">
                    Cargando...
                  </div>
                ) : clinkerRatioSeries ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={clinkerRatioSeries} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                      <YAxis domain={[60, 90]} tick={{ fontSize: 10 }} unit="%" />
                      <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, ""]} />
                      <Area type="monotone" dataKey="Argentina" stroke={COLORS.Argentina} fill={COLORS.Argentina} fillOpacity={0.2} strokeWidth={2} />
                      <Area type="monotone" dataKey="World" stroke={COLORS.World} fill={COLORS.World} fillOpacity={0.1} strokeWidth={1} />
                      <Area type="monotone" dataKey="Germany" stroke={COLORS.Germany} fill={COLORS.Germany} fillOpacity={0.1} strokeWidth={1} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-[var(--foreground-muted)] text-sm">
                    No hay datos
                  </div>
                )}
              </div>
            </div>

            {/* Eficiencia Térmica histórica */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-center gap-3 mb-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <h3 className="text-base font-semibold text-[var(--primary)]">
                  Evolución Eficiencia Térmica
                </h3>
              </div>
              <p className="text-xs text-[var(--foreground-muted)] mb-4">
                MJ por tonelada de clínker - Menor es mejor
              </p>
              <div className="h-64">
                {loading ? (
                  <div className="h-full flex items-center justify-center text-[var(--foreground-muted)] text-sm">
                    Cargando...
                  </div>
                ) : thermalEnergySeries ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={thermalEnergySeries} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                      <YAxis domain={[3000, 4500]} tick={{ fontSize: 10 }} />
                      <Tooltip formatter={(value: number) => [`${Math.round(value)} MJ/t`, ""]} />
                      <Line type="monotone" dataKey="Argentina" stroke={COLORS.Argentina} strokeWidth={2} dot={{ r: 1 }} />
                      <Line type="monotone" dataKey="World" stroke={COLORS.World} strokeWidth={2} dot={{ r: 1 }} />
                      <Line type="monotone" dataKey="India" stroke={COLORS.India} strokeWidth={2} dot={{ r: 1 }} />
                      <Line type="monotone" dataKey="Germany" stroke={COLORS.Germany} strokeWidth={2} dot={{ r: 1 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-[var(--foreground-muted)] text-sm">
                    No hay datos
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Eficiencia Eléctrica */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-[var(--primary)]">
                Evolución Consumo Eléctrico (1990-2023)
              </h2>
            </div>
            <p className="text-sm text-[var(--foreground-muted)] mb-6">
              kWh por tonelada de cemento
            </p>
            <div className="h-[300px] w-full">
              {loading ? (
                <div className="h-full flex items-center justify-center text-[var(--foreground-muted)]">
                  Cargando datos históricos...
                </div>
              ) : electricSeries ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={electricSeries} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis domain={[80, 150]} tick={{ fontSize: 11 }} unit=" kWh" />
                    <Tooltip formatter={(value: number) => [`${Math.round(value)} kWh/t`, ""]} />
                    <Line type="monotone" dataKey="Argentina" stroke={COLORS.Argentina} strokeWidth={3} dot={{ r: 2 }} />
                    <Line type="monotone" dataKey="World" stroke={COLORS.World} strokeWidth={2} dot={{ r: 1 }} />
                    <Line type="monotone" dataKey="FICEM" stroke={COLORS.FICEM} strokeWidth={2} dot={{ r: 1 }} />
                    <Line type="monotone" dataKey="Brazil" stroke={COLORS.Brazil} strokeWidth={2} dot={{ r: 1 }} />
                    <Line type="monotone" dataKey="Germany" stroke={COLORS.Germany} strokeWidth={2} dot={{ r: 1 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-[var(--foreground-muted)]">
                  No hay datos disponibles
                </div>
              )}
            </div>
            <SeriesLegend />
          </div>

          {/* Segunda fila: Factor Clínker y Coprocesamiento (comparación por año) */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-[var(--primary)]">
                  Comparación por País/Región
                </h2>
                <p className="text-sm text-[var(--foreground-muted)]">
                  Factor clínker y tasa de combustibles alternativos
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[var(--foreground-muted)]" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="border border-[var(--border)] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                >
                  {availableYears.length > 0 ? (
                    availableYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))
                  ) : (
                    [2010, 2015, 2018, 2019, 2020, 2021, 2022, 2023].map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Factor Clínker por país */}
              <div>
                <h3 className="text-sm font-medium text-[var(--primary)] mb-3">
                  Factor Clínker ({selectedYear})
                </h3>
                <div className="h-72">
                  {comparisonData && comparisonData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[...comparisonData].sort((a, b) => a.clinkerRatio - b.clinkerRatio).filter(d => d.clinkerRatio > 0)}
                        layout="vertical"
                        margin={{ top: 5, right: 20, left: 100, bottom: 5 }}
                      >
                        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                        <YAxis dataKey="region" type="category" tick={{ fontSize: 10 }} width={95} />
                        <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, "Factor Clínker"]} />
                        <Bar dataKey="clinkerRatio" name="Factor Clínker" radius={[0, 4, 4, 0]}>
                          {[...comparisonData].sort((a, b) => a.clinkerRatio - b.clinkerRatio).filter(d => d.clinkerRatio > 0).map((entry, index) => (
                            <Cell
                              key={`cell-clinker-${index}`}
                              fill={entry.region === "Argentina" ? "#5B9BD5" : "#E2E8F0"}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
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
                  )}
                </div>
                <p className="text-xs text-[var(--foreground-muted)] mt-2 text-center">
                  Menor factor clínker = menores emisiones
                </p>
              </div>

              {/* Coprocesamiento por país */}
              <div>
                <h3 className="text-sm font-medium text-[var(--primary)] mb-3">
                  Combustibles Alternativos ({selectedYear})
                </h3>
                <div className="h-72">
                  {comparisonData && comparisonData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[...comparisonData].sort((a, b) => b.altFuelRate - a.altFuelRate).filter(d => d.altFuelRate > 0)}
                        layout="vertical"
                        margin={{ top: 5, right: 20, left: 100, bottom: 5 }}
                      >
                        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                        <YAxis dataKey="region" type="category" tick={{ fontSize: 10 }} width={95} />
                        <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, "Combustibles Alt."]} />
                        <Bar dataKey="altFuelRate" name="Combustibles Alternativos" radius={[0, 4, 4, 0]}>
                          {[...comparisonData].sort((a, b) => b.altFuelRate - a.altFuelRate).filter(d => d.altFuelRate > 0).map((entry, index) => (
                            <Cell
                              key={`cell-alt-${index}`}
                              fill={entry.region === "Argentina" ? "#5B9BD5" : "#10B981"}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
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
                  )}
                </div>
                <p className="text-xs text-[var(--foreground-muted)] mt-2 text-center">
                  Mayor coprocesamiento = economía circular
                </p>
              </div>
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
            <h3 className="text-lg font-semibold mb-3">Metodología y Fuentes de Datos</h3>
            <p className="text-sm text-white/80 mb-4">
              Los datos provienen del sistema GNR (Getting the Numbers Right) de la GCCA,
              con series históricas desde 1990 hasta 2023. Se incluyen datos de 16 países y regiones,
              con 9 indicadores clave de desempeño ambiental. La base de datos contiene más de 2,900
              registros históricos comparativos.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-xs">
              <span className="bg-white/20 px-3 py-1 rounded-full">GNR 2023</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">GCCA</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">FICEM</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">16 Países</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">33 años de datos</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">SQLite DB</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}