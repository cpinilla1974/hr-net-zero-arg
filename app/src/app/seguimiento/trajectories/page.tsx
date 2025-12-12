"use client";

import { useState } from "react";
import { Upload, TrendingDown, TrendingUp, AlertTriangle, FileSpreadsheet, Download } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Datos de trayectoria planificada (del Excel)
const trayectoriaPlanificada = [
  { año: 2020, emisionesNetas: 495, factorClinker: 67.5, coprocesamiento: 7, biomasa: 4 },
  { año: 2023, emisionesNetas: 507, factorClinker: 67, coprocesamiento: 7, biomasa: 4 },
  { año: 2025, emisionesNetas: 503, factorClinker: 66.5, coprocesamiento: 8, biomasa: 4.3 },
  { año: 2030, emisionesNetas: 477, factorClinker: 65.4, coprocesamiento: 10, biomasa: 5 },
  { año: 2035, emisionesNetas: 400, factorClinker: 63, coprocesamiento: 12, biomasa: 6 },
  { año: 2040, emisionesNetas: 300, factorClinker: 62, coprocesamiento: 15, biomasa: 8 },
  { año: 2045, emisionesNetas: 150, factorClinker: 61.5, coprocesamiento: 17, biomasa: 9 },
  { año: 2050, emisionesNetas: 0, factorClinker: 61.2, coprocesamiento: 18, biomasa: 10 },
];

export default function SeguimientoPage() {
  const [datosReales, setDatosReales] = useState<any[]>([]);
  const [archivoSubido, setArchivoSubido] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArchivoSubido(file.name);
      // TODO: Parsear Excel con librería como xlsx
      // Por ahora simulamos datos
      setDatosReales([
        { año: 2023, emisionesNetas: 507, factorClinker: 67, coprocesamiento: 7, biomasa: 4 },
        { año: 2024, emisionesNetas: 505, factorClinker: 66.8, coprocesamiento: 7.5, biomasa: 4.2 },
      ]);
    }
  };

  const calcularDesviacion = (indicador: string) => {
    if (datosReales.length === 0) return null;

    const ultimoReal = datosReales[datosReales.length - 1];
    const planificadoMismoAño = trayectoriaPlanificada.find(t => t.año === ultimoReal.año);

    if (!planificadoMismoAño) return null;

    const real = ultimoReal[indicador as keyof typeof ultimoReal];
    const planificado = planificadoMismoAño[indicador as keyof typeof planificadoMismoAño];
    const desviacion = ((real - planificado) / planificado) * 100;

    return {
      valor: desviacion,
      enMeta: Math.abs(desviacion) <= 5, // Tolerancia 5%
    };
  };

  return (
    <main className="flex-1 p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Seguimiento de Trayectorias</h1>
          <p className="text-gray-600">
            Carga datos anuales para comparar el progreso real vs la trayectoria planificada
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <FileSpreadsheet className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">Cargar Datos</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <label className="flex-1 cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary hover:bg-blue-50 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Haz clic para subir archivo Excel
                </p>
                <p className="text-xs text-gray-500">
                  Formato: .xlsx con columnas: Año, Emisiones, Factor Clínker, Coprocesamiento, Biomasa
                </p>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </label>

            {archivoSubido && (
              <div className="flex-1 bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <FileSpreadsheet className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{archivoSubido}</p>
                    <p className="text-sm text-gray-600">{datosReales.length} años cargados</p>
                  </div>
                </div>
                <button className="text-sm text-green-700 font-semibold hover:text-green-800 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Descargar plantilla Excel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Alertas de Desviación */}
        {datosReales.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {["emisionesNetas", "factorClinker", "coprocesamiento", "biomasa"].map((indicador) => {
              const desviacion = calcularDesviacion(indicador);
              if (!desviacion) return null;

              const labels: Record<string, string> = {
                emisionesNetas: "Emisiones Netas",
                factorClinker: "Factor Clínker",
                coprocesamiento: "Coprocesamiento",
                biomasa: "Biomasa",
              };

              return (
                <div
                  key={indicador}
                  className={`p-4 rounded-lg border ${
                    desviacion.enMeta
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">{labels[indicador]}</p>
                    {desviacion.enMeta ? (
                      <TrendingDown className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <p
                    className={`text-2xl font-bold ${
                      desviacion.enMeta ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {desviacion.valor > 0 ? "+" : ""}
                    {desviacion.valor.toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {desviacion.enMeta ? "Dentro de la meta" : "Fuera de la meta"}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Gráficos de Trayectoria */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Emisiones Netas */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Emisiones Netas (kgCO₂/tcem)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="año"
                  type="number"
                  domain={[2020, 2050]}
                  ticks={[2020, 2025, 2030, 2035, 2040, 2045, 2050]}
                />
                <YAxis domain={[0, 550]} />
                <Tooltip />
                <Legend />
                <Line
                  data={trayectoriaPlanificada}
                  type="monotone"
                  dataKey="emisionesNetas"
                  stroke="#5B9BD5"
                  strokeWidth={2}
                  name="Planificado"
                  dot={{ r: 4 }}
                />
                {datosReales.length > 0 && (
                  <Line
                    data={datosReales}
                    type="monotone"
                    dataKey="emisionesNetas"
                    stroke="#10B981"
                    strokeWidth={3}
                    name="Real"
                    dot={{ r: 6, fill: "#10B981" }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Factor Clínker */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Factor Clínker (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="año"
                  type="number"
                  domain={[2020, 2050]}
                  ticks={[2020, 2025, 2030, 2035, 2040, 2045, 2050]}
                />
                <YAxis domain={[60, 70]} />
                <Tooltip />
                <Legend />
                <Line
                  data={trayectoriaPlanificada}
                  type="monotone"
                  dataKey="factorClinker"
                  stroke="#5B9BD5"
                  strokeWidth={2}
                  name="Planificado"
                  dot={{ r: 4 }}
                />
                {datosReales.length > 0 && (
                  <Line
                    data={datosReales}
                    type="monotone"
                    dataKey="factorClinker"
                    stroke="#10B981"
                    strokeWidth={3}
                    name="Real"
                    dot={{ r: 6, fill: "#10B981" }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Coprocesamiento */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Coprocesamiento (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="año"
                  type="number"
                  domain={[2020, 2050]}
                  ticks={[2020, 2025, 2030, 2035, 2040, 2045, 2050]}
                />
                <YAxis domain={[0, 20]} />
                <Tooltip />
                <Legend />
                <Line
                  data={trayectoriaPlanificada}
                  type="monotone"
                  dataKey="coprocesamiento"
                  stroke="#5B9BD5"
                  strokeWidth={2}
                  name="Planificado"
                  dot={{ r: 4 }}
                />
                {datosReales.length > 0 && (
                  <Line
                    data={datosReales}
                    type="monotone"
                    dataKey="coprocesamiento"
                    stroke="#10B981"
                    strokeWidth={3}
                    name="Real"
                    dot={{ r: 6, fill: "#10B981" }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Biomasa */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Biomasa (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="año"
                  type="number"
                  domain={[2020, 2050]}
                  ticks={[2020, 2025, 2030, 2035, 2040, 2045, 2050]}
                />
                <YAxis domain={[0, 12]} />
                <Tooltip />
                <Legend />
                <Line
                  data={trayectoriaPlanificada}
                  type="monotone"
                  dataKey="biomasa"
                  stroke="#5B9BD5"
                  strokeWidth={2}
                  name="Planificado"
                  dot={{ r: 4 }}
                />
                {datosReales.length > 0 && (
                  <Line
                    data={datosReales}
                    type="monotone"
                    dataKey="biomasa"
                    stroke="#10B981"
                    strokeWidth={3}
                    name="Real"
                    dot={{ r: 6, fill: "#10B981" }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabla de Datos */}
        {datosReales.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Datos Cargados</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Año
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Emisiones Netas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Factor Clínker
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Coprocesamiento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Biomasa
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {datosReales.map((dato, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {dato.año}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {dato.emisionesNetas} kgCO₂/t
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {dato.factorClinker}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {dato.coprocesamiento}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {dato.biomasa}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Estado vacío */}
        {datosReales.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FileSpreadsheet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No hay datos cargados
            </h3>
            <p className="text-gray-600 mb-6">
              Sube un archivo Excel para comenzar a visualizar las trayectorias
            </p>
            <button className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
              <Download className="w-5 h-5" />
              Descargar plantilla Excel
            </button>
          </div>
        )}
      </div>
    </main>
  );
}