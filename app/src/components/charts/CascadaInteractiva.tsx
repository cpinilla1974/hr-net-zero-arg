"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { ChevronRight, X, Target, TrendingDown } from "lucide-react";
import { gruposDescarbonizacion, ejesDescarbonizacion } from "@/lib/data";

interface CascadaInteractivaProps {
  onEjeSelect?: (eje: typeof ejesDescarbonizacion[0] | null) => void;
  compact?: boolean;
}

// Datos para el gráfico waterfall
const cascadaData = [
  {
    name: "Línea Base",
    value: 100,
    displayValue: 100,
    isBase: true,
    grupo: null,
    color: "#EF4444",
    description: "Emisiones actuales (507 kgCO₂/tcem)",
  },
  ...gruposDescarbonizacion.map((g, index) => ({
    name: g.nombre.split(" ")[0], // Tomar primera palabra
    fullName: g.nombre,
    value: -g.aporte,
    displayValue: g.aporte,
    isBase: false,
    grupo: g.grupo,
    color: g.color,
    description: `${g.aporte}% de reducción`,
    ejes: g.ejes,
    acumulado: 100 - gruposDescarbonizacion.slice(0, index + 1).reduce((acc, curr) => acc + curr.aporte, 0),
  })),
  {
    name: "Net Zero",
    value: 0,
    displayValue: 0,
    isBase: true,
    grupo: null,
    color: "#10B981",
    description: "Meta 2050: 0 emisiones netas",
  },
];

// Calcular posiciones para waterfall
const waterfallData = cascadaData.map((item, index) => {
  if (index === 0) {
    return { ...item, start: 0, end: 100 };
  }
  if (index === cascadaData.length - 1) {
    return { ...item, start: 0, end: 0 };
  }

  const previousEnd = cascadaData
    .slice(1, index)
    .reduce((acc, curr) => acc + (curr.value || 0), 100);

  return {
    ...item,
    start: previousEnd,
    end: previousEnd + item.value,
  };
});

export default function CascadaInteractiva({ onEjeSelect, compact = false }: CascadaInteractivaProps) {
  const [selectedGrupo, setSelectedGrupo] = useState<string | null>(null);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const handleBarClick = (grupo: string | null) => {
    if (!grupo) return;
    setSelectedGrupo(selectedGrupo === grupo ? null : grupo);
  };

  const ejesDelGrupo = selectedGrupo
    ? ejesDescarbonizacion.filter((e) => e.grupo === selectedGrupo)
    : [];

  const grupoInfo = selectedGrupo
    ? gruposDescarbonizacion.find((g) => g.grupo === selectedGrupo)
    : null;

  // Custom bar shape for waterfall
  const CustomBar = (props: {
    x: number;
    y: number;
    width: number;
    height: number;
    payload: typeof waterfallData[0];
  }) => {
    const { x, y, width, height, payload } = props;
    const isHovered = hoveredBar === payload.name;
    const isSelected = selectedGrupo === payload.grupo;

    // Calculate actual bar position for waterfall effect
    const totalHeight = 300; // Match chart height
    const maxValue = 100;
    const pixelsPerUnit = totalHeight / maxValue;

    let barY, barHeight;

    if (payload.isBase && payload.value === 100) {
      // Línea Base - barra completa desde arriba
      barY = 0;
      barHeight = payload.value * pixelsPerUnit;
    } else if (payload.isBase && payload.value === 0) {
      // Net Zero - pequeña marca en el fondo
      barY = totalHeight - 4;
      barHeight = 4;
    } else {
      // Grupos - barras que "caen" desde la posición anterior
      barY = (100 - payload.start!) * pixelsPerUnit;
      barHeight = Math.abs(payload.value) * pixelsPerUnit;
    }

    return (
      <g>
        <rect
          x={x}
          y={barY}
          width={width}
          height={barHeight}
          fill={payload.color}
          opacity={isHovered || isSelected ? 1 : 0.85}
          rx={4}
          ry={4}
          style={{
            cursor: payload.grupo ? "pointer" : "default",
            transition: "all 0.2s ease",
            filter: isHovered ? "brightness(1.1)" : "none",
          }}
          stroke={isSelected ? "#1B3A5F" : "transparent"}
          strokeWidth={isSelected ? 3 : 0}
        />
        {/* Porcentaje dentro de la barra */}
        {barHeight > 30 && (
          <text
            x={x + width / 2}
            y={barY + barHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={compact ? 12 : 14}
            fontWeight="bold"
          >
            {payload.isBase ? "" : `-${payload.displayValue}%`}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className={`${compact ? "" : "bg-white rounded-2xl border border-gray-200 p-6"}`}>
      {!compact && (
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Cascada de Descarbonización
          </h3>
          <p className="text-sm text-gray-600">
            Haz clic en cada grupo para ver los ejes de acción
          </p>
        </div>
      )}

      <div className={`${compact ? "h-64" : "h-80"}`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={waterfallData}
            margin={{ top: 20, right: 20, left: 20, bottom: 60 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fill: "#6B7280", fontSize: compact ? 10 : 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#6B7280", fontSize: compact ? 10 : 12 }}
              tickFormatter={(v) => `${v}%`}
              width={45}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as typeof waterfallData[0];
                  return (
                    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                      <p className="font-semibold text-gray-900">
                        {data.fullName || data.name}
                      </p>
                      <p className="text-sm text-gray-600">{data.description}</p>
                      {data.grupo && (
                        <p className="text-xs text-[#5B9BD5] mt-1">
                          Clic para ver detalles →
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine y={0} stroke="#E5E7EB" />
            <Bar
              dataKey="displayValue"
              shape={(props: unknown) => <CustomBar {...(props as Parameters<typeof CustomBar>[0])} />}
              onMouseEnter={(data: typeof waterfallData[0]) => setHoveredBar(data.name)}
              onMouseLeave={() => setHoveredBar(null)}
              onClick={(data: typeof waterfallData[0]) => handleBarClick(data.grupo)}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Leyenda de grupos */}
      {!compact && (
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {gruposDescarbonizacion.map((g) => (
            <button
              key={g.grupo}
              onClick={() => handleBarClick(g.grupo)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${
                selectedGrupo === g.grupo
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: g.color }}
              />
              <span>Grupo {g.grupo}</span>
              <span className="font-bold">{g.aporte}%</span>
            </button>
          ))}
        </div>
      )}

      {/* Panel de detalle del grupo seleccionado */}
      {selectedGrupo && grupoInfo && (
        <div className="mt-6 bg-gray-50 rounded-xl p-6 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: grupoInfo.color }}
                />
                <span className="text-sm font-medium text-gray-500">
                  Grupo {grupoInfo.grupo}
                </span>
              </div>
              <h4 className="text-xl font-bold text-gray-900">{grupoInfo.nombre}</h4>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-3xl font-black" style={{ color: grupoInfo.color }}>
                  {grupoInfo.aporte}%
                </div>
                <div className="text-xs text-gray-500">de reducción total</div>
              </div>
              <button
                onClick={() => setSelectedGrupo(null)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Ejes del grupo */}
          <div className="grid gap-3">
            {ejesDelGrupo.map((eje) => (
              <button
                key={eje.id}
                onClick={() => onEjeSelect?.(eje)}
                className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all text-left group"
              >
                <span
                  className="text-xs font-bold px-2 py-1 rounded text-white"
                  style={{ backgroundColor: grupoInfo.color }}
                >
                  {eje.codigo}
                </span>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 group-hover:text-[#5B9BD5]">
                    {eje.nombre}
                  </div>
                  <div className="text-sm text-gray-500 line-clamp-1">
                    {eje.descripcion}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{eje.aporte}%</div>
                    <div className="text-xs text-gray-500">aporte</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#5B9BD5]" />
                </div>
              </button>
            ))}
          </div>

          {/* Resumen de metas del grupo */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Target className="h-4 w-4 text-[#5B9BD5]" />
              <span>
                Este grupo contribuye <strong>{grupoInfo.aporte}%</strong> de la reducción total necesaria para Net Zero
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Indicador de progreso total */}
      {!compact && !selectedGrupo && (
        <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500" />
            <span>100% emisiones actuales</span>
          </div>
          <TrendingDown className="h-5 w-5 text-gray-400" />
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span>0% Net Zero 2050</span>
          </div>
        </div>
      )}
    </div>
  );
}
