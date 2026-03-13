"use client";

import { useState, useCallback } from "react";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Download,
  Loader2,
  Trash2,
  Calendar,
  Database,
} from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

interface IndicadorInput {
  campo: string;
  nombre: string;
  valor: string;
  unidad: string;
}

interface ResultadoCarga {
  ok: boolean;
  anio: number;
  indicadores_cargados: number;
  campos: string[];
  derivados: Record<string, number>;
  fuente: string;
  fecha_carga: string;
}

interface ErrorCarga {
  error: string;
  errores?: string[];
  esperados?: string[];
}

const INDICADORES_BASE: IndicadorInput[] = [
  { campo: "20", nombre: "Producción de cemento", valor: "", unidad: "t/año" },
  { campo: "8", nombre: "Producción de clínker", valor: "", unidad: "t/año" },
  { campo: "71", nombre: "Emisiones netas CO₂", valor: "", unidad: "t CO₂/año" },
  { campo: "25", nombre: "Consumo térmico total", valor: "", unidad: "TJ/año" },
  { campo: "26", nombre: "Fósiles convencionales", valor: "", unidad: "TJ/año" },
  { campo: "27", nombre: "Fósiles alternativos", valor: "", unidad: "TJ/año" },
  { campo: "28", nombre: "Biomasa", valor: "", unidad: "TJ/año" },
  { campo: "33", nombre: "Consumo eléctrico", valor: "", unidad: "MWh/año" },
];

function AdminCargarDatosContent() {
  const [modo, setModo] = useState<"manual" | "excel">("manual");
  const [anio, setAnio] = useState(new Date().getFullYear().toString());
  const [indicadores, setIndicadores] = useState<IndicadorInput[]>(
    INDICADORES_BASE.map((i) => ({ ...i }))
  );
  const [archivo, setArchivo] = useState<File | null>(null);
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState<ResultadoCarga | null>(null);
  const [error, setError] = useState<ErrorCarga | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleIndicadorChange = (index: number, valor: string) => {
    const updated = [...indicadores];
    updated[index] = { ...updated[index], valor };
    setIndicadores(updated);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.match(/\.(xlsx|xls|xlsm)$/)) {
        setArchivo(file);
        setError(null);
      } else {
        setError({ error: "Solo se aceptan archivos Excel (.xlsx, .xls, .xlsm)" });
      }
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArchivo(e.target.files[0]);
      setError(null);
    }
  };

  const descargarTemplate = () => {
    // Generar CSV template descargable
    const headers = "campoGNR,valor\n";
    const rows = INDICADORES_BASE.map(
      (i) => `${i.campo},0`
    ).join("\n");
    const comment = `# Indicadores consolidados Argentina\n# Columnas: campoGNR, valor\n# campoGNR corresponde al código GNR del indicador\n#\n# Indicadores:\n${INDICADORES_BASE.map((i) => `# ${i.campo} = ${i.nombre} (${i.unidad})`).join("\n")}\n#\n`;
    const blob = new Blob([comment + headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `template_indicadores_${anio}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const enviar = async () => {
    setCargando(true);
    setResultado(null);
    setError(null);

    try {
      let response: Response;

      if (modo === "excel" && archivo) {
        const formData = new FormData();
        formData.append("archivo", archivo);
        formData.append("anio", anio);
        response = await fetch("/api/indicadores", {
          method: "POST",
          body: formData,
        });
      } else {
        const datos: Record<string, number> = {};
        for (const ind of indicadores) {
          if (ind.valor.trim()) {
            const val = parseFloat(ind.valor.replace(/,/g, ""));
            if (!isNaN(val) && val > 0) {
              datos[ind.campo] = val;
            }
          }
        }

        if (Object.keys(datos).length === 0) {
          setError({ error: "Ingrese al menos un indicador con valor válido" });
          setCargando(false);
          return;
        }

        response = await fetch("/api/indicadores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ anio: parseInt(anio), datos, fuente: "Carga manual admin" }),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        setError(data as ErrorCarga);
      } else {
        setResultado(data as ResultadoCarga);
        // Reset form
        setIndicadores(INDICADORES_BASE.map((i) => ({ ...i })));
        setArchivo(null);
      }
    } catch (err) {
      setError({ error: `Error de conexión: ${String(err)}` });
    } finally {
      setCargando(false);
    }
  };

  const derivadoLabels: Record<string, string> = {
    factor_clinker: "Factor Clínker",
    emisiones_netas_tcem: "Emisiones netas (kgCO₂/t cem)",
    eficiencia_termica: "Eficiencia térmica (MJ/t ck)",
    tsr: "Coprocesamiento TSR",
    biomasa_pct: "Biomasa en mix térmico",
    produccion_cemento_mt: "Producción cemento (Mt)",
    co2_neto_mt: "CO₂ neto (Mt)",
  };

  return (
    <main className="flex-1 bg-[var(--background-secondary)] min-h-screen">
      <div className="bg-white px-6 py-8 lg:px-8">
        <div className="flex items-center gap-3 mb-2">
          <Database className="h-8 w-8 text-[#5B9BD5]" />
          <h1 className="text-3xl font-bold text-[var(--primary)] tracking-tight">
            Carga de Datos Consolidados
          </h1>
        </div>
        <p className="mt-1 text-[var(--foreground-muted)] max-w-3xl">
          Cargue los indicadores nacionales consolidados para un año.
          Los indicadores derivados se calculan automáticamente.
        </p>
      </div>

      <div className="px-6 py-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Año */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)] mb-3">
              <Calendar className="h-4 w-4" />
              Año del Reporte
            </label>
            <input
              type="number"
              min="2000"
              max="2100"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              className="w-32 px-4 py-2 border border-[var(--border)] rounded-lg text-lg font-bold text-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]"
            />
          </div>

          {/* Selector de modo */}
          <div className="flex gap-2">
            <button
              onClick={() => setModo("manual")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                modo === "manual"
                  ? "bg-[#5B9BD5] text-white"
                  : "bg-white border border-[var(--border)] text-[var(--foreground-muted)] hover:bg-gray-50"
              }`}
            >
              <FileSpreadsheet className="h-4 w-4" />
              Formulario Manual
            </button>
            <button
              onClick={() => setModo("excel")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                modo === "excel"
                  ? "bg-[#5B9BD5] text-white"
                  : "bg-white border border-[var(--border)] text-[var(--foreground-muted)] hover:bg-gray-50"
              }`}
            >
              <Upload className="h-4 w-4" />
              Subir Excel
            </button>
          </div>

          {/* Formulario manual */}
          {modo === "manual" && (
            <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden">
              <div className="px-6 py-4 border-b border-[var(--border)] bg-gray-50">
                <h2 className="text-base font-semibold text-[var(--primary)]">
                  Indicadores Base (8 indicadores GNR)
                </h2>
                <p className="text-xs text-[var(--foreground-muted)] mt-1">
                  Ingrese los valores consolidados nacionales. Los derivados se calculan automáticamente.
                </p>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {indicadores.map((ind, idx) => (
                  <div key={ind.campo} className="flex items-center px-6 py-3 gap-4 hover:bg-gray-50">
                    <span className="w-8 text-xs font-mono text-[var(--foreground-muted)] bg-gray-100 px-1.5 py-0.5 rounded text-center">
                      {ind.campo}
                    </span>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-[var(--primary)]">{ind.nombre}</span>
                    </div>
                    <input
                      type="text"
                      placeholder="0"
                      value={ind.valor}
                      onChange={(e) => handleIndicadorChange(idx, e.target.value)}
                      className="w-40 px-3 py-2 border border-[var(--border)] rounded-lg text-right font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]"
                    />
                    <span className="w-24 text-xs text-[var(--foreground-muted)]">{ind.unidad}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Excel */}
          {modo === "excel" && (
            <div className="space-y-4">
              <div
                className={`bg-white rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                  dragActive
                    ? "border-[#5B9BD5] bg-blue-50"
                    : "border-[var(--border)] hover:border-[#5B9BD5]"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {archivo ? (
                  <div className="flex items-center justify-center gap-4">
                    <FileSpreadsheet className="h-10 w-10 text-green-500" />
                    <div className="text-left">
                      <p className="font-medium text-[var(--primary)]">{archivo.name}</p>
                      <p className="text-sm text-[var(--foreground-muted)]">
                        {(archivo.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      onClick={() => setArchivo(null)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-[var(--foreground-muted)] mx-auto mb-4" />
                    <p className="text-[var(--primary)] font-medium mb-2">
                      Arrastre un archivo Excel aquí
                    </p>
                    <p className="text-sm text-[var(--foreground-muted)] mb-4">
                      o haga clic para seleccionar
                    </p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#5B9BD5] text-white rounded-lg cursor-pointer hover:bg-[#4A8AC4] transition-colors">
                      <FileSpreadsheet className="h-4 w-4" />
                      Seleccionar archivo
                      <input
                        type="file"
                        accept=".xlsx,.xls,.xlsm,.csv"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4 bg-blue-50 rounded-xl border border-blue-200 p-4">
                <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Formato esperado del Excel:</p>
                  <p>
                    Dos columnas: <code className="bg-blue-100 px-1 rounded">campoGNR</code> y{" "}
                    <code className="bg-blue-100 px-1 rounded">valor</code>. Cada fila es un indicador.
                  </p>
                </div>
              </div>

              <button
                onClick={descargarTemplate}
                className="flex items-center gap-2 text-sm text-[#5B9BD5] hover:underline"
              >
                <Download className="h-4 w-4" />
                Descargar template CSV
              </button>
            </div>
          )}

          {/* Botón enviar */}
          <button
            onClick={enviar}
            disabled={cargando || (modo === "excel" && !archivo)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#1B3A5F] text-white rounded-xl font-medium hover:bg-[#2E5A8B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {cargando ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                Cargar datos {anio}
              </>
            )}
          </button>

          {/* Error */}
          {error && (
            <div className="bg-red-50 rounded-xl border border-red-200 p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800">{error.error}</p>
                  {error.errores && (
                    <ul className="mt-2 space-y-1 text-sm text-red-700">
                      {error.errores.map((e, i) => (
                        <li key={i}>- {e}</li>
                      ))}
                    </ul>
                  )}
                  {error.esperados && (
                    <div className="mt-3">
                      <p className="text-sm text-red-700 font-medium mb-1">Indicadores esperados:</p>
                      <ul className="text-sm text-red-600 space-y-0.5">
                        {error.esperados.map((e, i) => (
                          <li key={i} className="font-mono text-xs">{e}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Resultado exitoso */}
          {resultado && (
            <div className="bg-green-50 rounded-xl border border-green-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-800 text-lg">
                    Datos {resultado.anio} cargados correctamente
                  </p>
                  <p className="text-sm text-green-700">
                    {resultado.indicadores_cargados} indicadores cargados desde {resultado.fuente}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {resultado.fecha_carga}
                  </p>
                </div>
              </div>

              {/* Indicadores derivados calculados */}
              <div className="mt-4 bg-white rounded-lg border border-green-200 overflow-hidden">
                <div className="px-4 py-3 bg-green-100 border-b border-green-200">
                  <h3 className="text-sm font-semibold text-green-800">
                    Indicadores Derivados (calculados automáticamente)
                  </h3>
                </div>
                <div className="divide-y divide-green-100">
                  {Object.entries(resultado.derivados).map(([key, value]) => (
                    <div key={key} className="flex justify-between px-4 py-2 text-sm">
                      <span className="text-gray-700">{derivadoLabels[key] || key}</span>
                      <span className="font-mono font-medium text-[var(--primary)]">
                        {typeof value === "number"
                          ? value > 100
                            ? Math.round(value).toLocaleString()
                            : (Math.round(value * 10) / 10).toString()
                          : value}
                        {key.includes("pct") || key === "factor_clinker" || key === "tsr" ? "%" : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Historial de cargas */}
          <HistorialCargas />
        </div>
      </div>
    </main>
  );
}

function HistorialCargas() {
  const [datos, setDatos] = useState<{ anio: number; campos: number; fecha: string }[] | null>(null);
  const [loading, setLoading] = useState(true);

  useState(() => {
    fetch("/api/indicadores?action=resumen")
      .then((r) => r.json())
      .then((data) => {
        if (data.datos) {
          const hist = Object.keys(data.datos)
            .map((a) => ({
              anio: parseInt(a),
              campos: Object.keys(data.datos[parseInt(a)]).length,
              fecha: "-",
            }))
            .sort((a, b) => b.anio - a.anio);
          setDatos(hist);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  });

  if (loading || !datos || datos.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--border)]">
        <h2 className="text-base font-semibold text-[var(--primary)]">Datos Cargados</h2>
      </div>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--foreground-muted)] uppercase">Año</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-[var(--foreground-muted)] uppercase">Indicadores</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-[var(--foreground-muted)] uppercase">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {datos.map((d) => (
            <tr key={d.anio} className="hover:bg-gray-50">
              <td className="px-6 py-3 font-bold text-[var(--primary)]">{d.anio}</td>
              <td className="px-6 py-3 text-center text-sm text-[var(--foreground-muted)]">{d.campos}</td>
              <td className="px-6 py-3 text-center">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  <CheckCircle2 className="h-3 w-3" />
                  Cargado
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminCargarDatosPage() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN_PROCESO", "COORDINADOR_PAIS"]}>
      <AdminCargarDatosContent />
    </ProtectedRoute>
  );
}
