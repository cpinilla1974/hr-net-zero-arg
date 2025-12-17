"use client";

import { useState, useEffect } from "react";
import {
  FileSpreadsheet,
  Download,
  Check,
  X,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { plantillasArchivos, type EstadoReporte } from "@/types/seguimiento";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { submissionsAPI } from "@/lib/api/submissions";
import type { Submission, EstadoSubmission } from "@/types/submission";

// Mapeo de estados de API a estados de UI
const mapAPIStateToUI = (estado: EstadoSubmission): EstadoReporte => {
  switch (estado) {
    case "BORRADOR":
      return "BORRADOR";
    case "ENVIADO":
    case "EN_REVISION_FICEM":
      return "ENVIADO";
    case "APROBADO_FICEM":
    case "PUBLICADO":
      return "COMPLETADO";
    default:
      return "ENVIADO";
  }
};

// Mock data - TODO: Replace with API call
const mockReports = [
  {
    id: "1",
    empresaNombre: "Holcim Argentina",
    año: 2024,
    estado: "ENVIADO" as EstadoReporte,
    fechaEnvio: new Date("2024-12-15"),
    archivos: {
      GNR: true,
      ADICIONALES_2030: true,
      ADICIONALES_2050: false,
    },
    informante: {
      nombre: "Juan Pérez",
      email: "jperez@holcim.com",
    },
  },
  {
    id: "2",
    empresaNombre: "Loma Negra",
    año: 2024,
    estado: "EN_PROCESO" as EstadoReporte,
    fechaEnvio: new Date("2024-12-10"),
    archivos: {
      GNR: true,
      ADICIONALES_2030: true,
      ADICIONALES_2050: true,
    },
    informante: {
      nombre: "María González",
      email: "mgonzalez@lomanegra.com",
    },
  },
  {
    id: "3",
    empresaNombre: "Avellaneda",
    año: 2024,
    estado: "COMPLETADO" as EstadoReporte,
    fechaEnvio: new Date("2024-12-01"),
    fechaProcesamiento: new Date("2024-12-05"),
    archivos: {
      GNR: true,
      ADICIONALES_2030: true,
      ADICIONALES_2050: false,
    },
    informante: {
      nombre: "Carlos López",
      email: "clopez@avellaneda.com",
    },
  },
  {
    id: "4",
    empresaNombre: "PCR",
    año: 2024,
    estado: "ENVIADO" as EstadoReporte,
    fechaEnvio: new Date("2024-12-12"),
    archivos: {
      GNR: true,
      ADICIONALES_2030: true,
      ADICIONALES_2050: true,
    },
    informante: {
      nombre: "Ana Martínez",
      email: "amartinez@pcr.com",
    },
  },
];

function ProcessContent() {
  const [filter, setFilter] = useState<EstadoReporte | "ALL">("ALL");
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  // Cargar submissions al montar
  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        setIsLoading(true);
        const procesoId = "hr-argentina-2024";
        const data = await submissionsAPI.list(procesoId);
        setSubmissions(data);
      } catch (err) {
        console.error("Error cargando submissions:", err);
        setError("Error al cargar los reportes");
      } finally {
        setIsLoading(false);
      }
    };

    loadSubmissions();
  }, []);

  // Filtrar submissions
  const filteredReports = filter === "ALL"
    ? submissions
    : submissions.filter(s => mapAPIStateToUI(s.estado_actual) === filter);

  const getStatusBadge = (estado: EstadoReporte) => {
    const badges = {
      ENVIADO: { bg: "bg-blue-100", text: "text-blue-800", icon: Clock, label: "Enviado" },
      EN_PROCESO: { bg: "bg-yellow-100", text: "text-yellow-800", icon: AlertCircle, label: "En Proceso" },
      COMPLETADO: { bg: "bg-green-100", text: "text-green-800", icon: CheckCircle, label: "Completado" },
      BORRADOR: { bg: "bg-gray-100", text: "text-gray-800", icon: Clock, label: "Borrador" },
    };
    const badge = badges[estado];
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}>
        <Icon className="w-4 h-4" />
        {badge.label}
      </span>
    );
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const handleStartProcessing = async (submissionId: string) => {
    try {
      setIsProcessing(submissionId);
      await submissionsAPI.aprobarFicem(submissionId, {
        accion: "en_revision",
        comentario: "Iniciando procesamiento de datos",
      });

      // Recargar submissions
      const procesoId = "hr-argentina-2024";
      const data = await submissionsAPI.list(procesoId);
      setSubmissions(data);
    } catch (err) {
      console.error("Error procesando submission:", err);
      setError("Error al iniciar procesamiento");
    } finally {
      setIsProcessing(null);
    }
  };

  const handleCompleteProcessing = async (submissionId: string) => {
    try {
      setIsProcessing(submissionId);
      await submissionsAPI.aprobarFicem(submissionId, {
        accion: "aprobar",
        comentario: "Procesamiento completado exitosamente",
      });

      // Recargar submissions
      const procesoId = "hr-argentina-2024";
      const data = await submissionsAPI.list(procesoId);
      setSubmissions(data);
    } catch (err) {
      console.error("Error completando submission:", err);
      setError("Error al completar procesamiento");
    } finally {
      setIsProcessing(null);
    }
  };

  // Mostrar loading
  if (isLoading) {
    return (
      <main className="flex-1 p-8 bg-gray-50">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-[#5B9BD5] mx-auto mb-4" />
            <p className="text-gray-600">Cargando reportes...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Procesar Reportes</h1>
          <p className="text-[#5B9BD5] text-base">
            Revisar, validar y procesar los reportes enviados por las empresas
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Error</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Reportes</span>
              <FileSpreadsheet className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{submissions.length}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Enviados</span>
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {submissions.filter(s => s.estado_actual === "ENVIADO").length}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">En Revisión</span>
              <AlertCircle className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-yellow-600">
              {submissions.filter(s => s.estado_actual === "EN_REVISION_FICEM").length}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Completados</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-600">
              {submissions.filter(s => s.estado_actual === "APROBADO_FICEM").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Filtrar por estado:</span>
            <div className="flex gap-2">
              {[
                { value: "ALL", label: "Todos" },
                { value: "ENVIADO", label: "Enviados" },
                { value: "EN_PROCESO", label: "En Proceso" },
                { value: "COMPLETADO", label: "Completados" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === option.value
                      ? "bg-[#5B9BD5] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Empresa</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Año</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Informante</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Fecha Envío</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Archivos</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Estado</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No hay reportes para mostrar
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((submission) => {
                    const uiState = mapAPIStateToUI(submission.estado_actual);
                    const hasArchivo = !!submission.archivo_excel;

                    return (
                      <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-bold text-gray-900">
                            {submission.empresa_nombre || `Empresa ${submission.empresa_id}`}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">2024</td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">Usuario {submission.usuario_id}</p>
                            <p className="text-gray-500">—</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700 text-sm">
                          {formatDate(submission.submitted_at || submission.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {hasArchivo ? (
                              <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center" title={submission.archivo_excel?.filename}>
                                <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">Sin archivos</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(uiState)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setSelectedReport(submission.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Ver Detalle"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            {submission.estado_actual === "ENVIADO" && (
                              <>
                                <button
                                  onClick={() => handleStartProcessing(submission.id)}
                                  disabled={isProcessing === submission.id}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  title="Iniciar Procesamiento"
                                >
                                  {isProcessing === submission.id ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                  ) : (
                                    <Check className="w-5 h-5" />
                                  )}
                                </button>
                                <button
                                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                  title="Agregar Comentario"
                                >
                                  <MessageSquare className="w-5 h-5" />
                                </button>
                              </>
                            )}
                            {submission.estado_actual === "EN_REVISION_FICEM" && (
                              <button
                                onClick={() => handleCompleteProcessing(submission.id)}
                                disabled={isProcessing === submission.id}
                                className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                title="Aprobar y Completar"
                              >
                                {isProcessing === submission.id ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Procesando...
                                  </>
                                ) : (
                                  "Completar"
                                )}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ProcessPage() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN_PROCESO"]}>
      <ProcessContent />
    </ProtectedRoute>
  );
}
