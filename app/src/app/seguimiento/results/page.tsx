"use client";

import { useState } from "react";
import {
  TrendingDown,
  TrendingUp,
  Building2,
  Calendar,
  Download,
  Filter,
  BarChart3,
  LineChart as LineChartIcon,
  FileText,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Mock data - TODO: Replace with API call
const mockCompanyResults = {
  empresaNombre: "Holcim Argentina",
  año: 2024,
  indicadores: {
    emisionesNetas: 612,
    factorClinker: 0.72,
    eficienciaTermica: 750,
    consumoElectrico: 95,
    coprocesamiento: 15.3,
    hidrogenoUso: 0.8,
    capturaCArbono: 5.2,
  },
  historico: [
    { año: 2020, emisionesNetas: 650, factorClinker: 0.78, coprocesamiento: 10 },
    { año: 2021, emisionesNetas: 640, factorClinker: 0.76, coprocesamiento: 11.5 },
    { año: 2022, emisionesNetas: 630, factorClinker: 0.74, coprocesamiento: 13 },
    { año: 2023, emisionesNetas: 620, factorClinker: 0.73, coprocesamiento: 14 },
    { año: 2024, emisionesNetas: 612, factorClinker: 0.72, coprocesamiento: 15.3 },
  ],
  meta2030: 550,
  meta2050: 0,
};

const mockNationalResults = [
  {
    empresa: "Holcim Argentina",
    emisionesNetas: 612,
    factorClinker: 0.72,
    coprocesamiento: 15.3,
    tendencia: "down",
  },
  {
    empresa: "Loma Negra",
    emisionesNetas: 625,
    factorClinker: 0.74,
    coprocesamiento: 14.8,
    tendencia: "down",
  },
  {
    empresa: "Avellaneda",
    emisionesNetas: 638,
    factorClinker: 0.76,
    coprocesamiento: 13.5,
    tendencia: "down",
  },
  {
    empresa: "PCR",
    emisionesNetas: 645,
    factorClinker: 0.77,
    coprocesamiento: 12.2,
    tendencia: "down",
  },
];

const mockNationalAverage = {
  emisionesNetas: 630,
  factorClinker: 0.75,
  coprocesamiento: 14.0,
  historico: [
    { año: 2020, emisionesNetas: 670, factorClinker: 0.80, meta2030: 550, meta2050: 0 },
    { año: 2021, emisionesNetas: 660, factorClinker: 0.79, meta2030: 550, meta2050: 0 },
    { año: 2022, emisionesNetas: 650, factorClinker: 0.77, meta2030: 550, meta2050: 0 },
    { año: 2023, emisionesNetas: 640, factorClinker: 0.76, meta2030: 550, meta2050: 0 },
    { año: 2024, emisionesNetas: 630, factorClinker: 0.75, meta2030: 550, meta2050: 0 },
    { año: 2025, emisionesNetas: 620, factorClinker: 0.74, meta2030: 550, meta2050: 0 },
    { año: 2026, emisionesNetas: 605, factorClinker: 0.73, meta2030: 550, meta2050: 0 },
    { año: 2027, emisionesNetas: 590, factorClinker: 0.72, meta2030: 550, meta2050: 0 },
    { año: 2028, emisionesNetas: 575, factorClinker: 0.71, meta2030: 550, meta2050: 0 },
    { año: 2029, emisionesNetas: 562, factorClinker: 0.70, meta2030: 550, meta2050: 0 },
    { año: 2030, emisionesNetas: 550, factorClinker: 0.69, meta2030: 550, meta2050: 0 },
  ],
};

function ResultsContent() {
  const { user } = useAuth();
  const [selectedYear, setSelectedYear] = useState(2024);
  const [viewMode, setViewMode] = useState<"company" | "national">(
    user?.role === "ADMIN_PROCESO" ? "national" : "company"
  );

  const isAdmin = user?.role === "ADMIN_PROCESO";

  return (
    <main className="flex-1 p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Resultados y Trayectorias</h1>
          <p className="text-[#5B9BD5] text-base">
            {isAdmin
              ? "Visualiza los resultados nacionales y por empresa de la Hoja de Ruta"
              : "Visualiza los resultados de tu empresa y el progreso hacia las metas"}
          </p>
        </div>

        {/* View Mode Selector (Admin Only) */}
        {isAdmin && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Vista:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("national")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === "national"
                      ? "bg-[#5B9BD5] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Agregado Nacional
                </button>
                <button
                  onClick={() => setViewMode("company")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === "company"
                      ? "bg-[#5B9BD5] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Por Empresa
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Year Selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Año:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B9BD5] focus:border-transparent bg-white"
            >
              <option value={2024}>2024</option>
              <option value={2023}>2023</option>
              <option value={2022}>2022</option>
              <option value={2021}>2021</option>
              <option value={2020}>2020</option>
            </select>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#5B9BD5] rounded-lg hover:bg-[#4A8BC4] transition-colors">
            <Download className="w-4 h-4" />
            Exportar Reporte
          </button>
        </div>

        {viewMode === "national" ? (
          <>
            {/* National Average Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm font-medium">Emisiones Netas Promedio</span>
                  <TrendingDown className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{mockNationalAverage.emisionesNetas}</p>
                <p className="text-sm text-gray-500 mt-1">kgCO₂/tcem</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm font-medium">Factor Clínker Promedio</span>
                  <TrendingDown className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{mockNationalAverage.factorClinker}</p>
                <p className="text-sm text-gray-500 mt-1">ratio</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm font-medium">Coprocesamiento Promedio</span>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{mockNationalAverage.coprocesamiento}%</p>
                <p className="text-sm text-gray-500 mt-1">sustitución térmica</p>
              </div>
            </div>

            {/* National Trajectory Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Trayectoria Nacional de Emisiones</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={mockNationalAverage.historico}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="año" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="emisionesNetas"
                    stroke="#5B9BD5"
                    strokeWidth={3}
                    name="Emisiones Netas (kgCO₂/tcem)"
                  />
                  <Line
                    type="monotone"
                    dataKey="meta2030"
                    stroke="#FFA500"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Meta 2030"
                  />
                  <Line
                    type="monotone"
                    dataKey="meta2050"
                    stroke="#10B981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Meta 2050"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Company Comparison Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Comparación por Empresa</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Empresa</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                        Emisiones Netas
                        <span className="block text-xs font-normal text-gray-500">kgCO₂/tcem</span>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                        Factor Clínker
                        <span className="block text-xs font-normal text-gray-500">ratio</span>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                        Coprocesamiento
                        <span className="block text-xs font-normal text-gray-500">% sustitución</span>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Tendencia</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockNationalResults.map((company) => (
                      <tr key={company.empresa} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-bold text-gray-900">{company.empresa}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{company.emisionesNetas}</td>
                        <td className="px-6 py-4 text-gray-700">{company.factorClinker}</td>
                        <td className="px-6 py-4 text-gray-700">{company.coprocesamiento}%</td>
                        <td className="px-6 py-4">
                          {company.tendencia === "down" ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <TrendingDown className="w-4 h-4" />
                              <span className="text-sm font-medium">Mejorando</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-red-600">
                              <TrendingUp className="w-4 h-4" />
                              <span className="text-sm font-medium">Aumentando</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Company Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm font-medium">Emisiones Netas</span>
                  <TrendingDown className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{mockCompanyResults.indicadores.emisionesNetas}</p>
                <p className="text-sm text-gray-500 mt-1">kgCO₂/tcem</p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600">
                    Meta 2030: <span className="font-medium">{mockCompanyResults.meta2030} kgCO₂/tcem</span>
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm font-medium">Factor Clínker</span>
                  <TrendingDown className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{mockCompanyResults.indicadores.factorClinker}</p>
                <p className="text-sm text-gray-500 mt-1">ratio</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm font-medium">Coprocesamiento</span>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{mockCompanyResults.indicadores.coprocesamiento}%</p>
                <p className="text-sm text-gray-500 mt-1">sustitución térmica</p>
              </div>
            </div>

            {/* Company Trajectory Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Trayectoria de Emisiones - {mockCompanyResults.empresaNombre}
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={mockCompanyResults.historico}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="año" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="emisionesNetas"
                    stroke="#5B9BD5"
                    strokeWidth={3}
                    name="Emisiones Netas (kgCO₂/tcem)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Additional Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 2030 Indicators */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-amber-100">
                    <FileText className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Indicadores 2030</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Hidrógeno (uso)</span>
                    <span className="text-sm font-bold text-gray-900">
                      {mockCompanyResults.indicadores.hidrogenoUso}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Eficiencia Térmica</span>
                    <span className="text-sm font-bold text-gray-900">
                      {mockCompanyResults.indicadores.eficienciaTermica} kcal/kg
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Consumo Eléctrico</span>
                    <span className="text-sm font-bold text-gray-900">
                      {mockCompanyResults.indicadores.consumoElectrico} kWh/t
                    </span>
                  </div>
                </div>
              </div>

              {/* 2050 Indicators */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-green-100">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Indicadores 2050</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">CCUS - Captura de Carbono</span>
                    <span className="text-sm font-bold text-gray-900">
                      {mockCompanyResults.indicadores.capturaCArbono}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Soluciones Basadas en Naturaleza</span>
                    <span className="text-sm font-bold text-gray-900">En desarrollo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Recarbonatación</span>
                    <span className="text-sm font-bold text-gray-900">En desarrollo</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <ProtectedRoute allowedRoles={["INFORMANTE_EMPRESA", "ADMIN_PROCESO"]}>
      <ResultsContent />
    </ProtectedRoute>
  );
}
