"use client";

import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { escenarioBAU } from "@/lib/data";

export function TrayectoriaChart() {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={escenarioBAU} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTrayectoria" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5B9BD5" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#5B9BD5" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="año"
            stroke="#6B7280"
            tick={{ fill: "#6B7280", fontSize: 12 }}
            axisLine={{ stroke: "#E5E7EB" }}
          />
          <YAxis
            stroke="#6B7280"
            tick={{ fill: "#6B7280", fontSize: 12 }}
            axisLine={{ stroke: "#E5E7EB" }}
            label={{
              value: "kgCO₂-eq/t cemento",
              angle: -90,
              position: "insideLeft",
              fill: "#6B7280",
              fontSize: 12,
              offset: 10,
            }}
            domain={[0, 700]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            labelStyle={{ color: "#1B3A5F", fontWeight: 600 }}
            itemStyle={{ color: "#6B7280" }}
          />
          <ReferenceLine y={0} stroke="#10B981" strokeWidth={2} />
          <Area
            type="monotone"
            dataKey="trayectoria"
            name="Trayectoria Net Zero"
            stroke="#5B9BD5"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorTrayectoria)"
          />
          <Line
            type="monotone"
            dataKey="bau"
            name="BAU (Business as Usual)"
            stroke="#9CA3AF"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
