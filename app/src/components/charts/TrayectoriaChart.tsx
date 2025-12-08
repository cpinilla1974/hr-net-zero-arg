"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { escenarioBAU } from "@/lib/data";

export function TrayectoriaChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={escenarioBAU} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="año"
            stroke="rgba(255,255,255,0.6)"
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
          />
          <YAxis
            stroke="rgba(255,255,255,0.6)"
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
            label={{
              value: "MtCO₂",
              angle: -90,
              position: "insideLeft",
              fill: "rgba(255,255,255,0.6)",
              fontSize: 12,
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#102215",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "white" }}
          />
          <Legend
            wrapperStyle={{ paddingTop: "10px" }}
            formatter={(value) => <span style={{ color: "rgba(255,255,255,0.8)" }}>{value}</span>}
          />
          <ReferenceLine y={0} stroke="rgba(19, 236, 73, 0.5)" strokeDasharray="5 5" />
          <Line
            type="monotone"
            dataKey="bau"
            name="Business as Usual"
            stroke="#7D8A81"
            strokeWidth={2}
            dot={{ fill: "#7D8A81", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="trayectoria"
            name="Trayectoria Net Zero"
            stroke="#13ec49"
            strokeWidth={3}
            dot={{ fill: "#13ec49", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
