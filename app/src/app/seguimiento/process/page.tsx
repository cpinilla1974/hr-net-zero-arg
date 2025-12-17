"use client";

import { useState } from "react";
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
} from "lucide-react";
import { plantillasArchivos, type EstadoReporte } from "@/types/seguimiento";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

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

  const filteredReports = filter === "ALL"
    ? mockReports
    : mockReports.filter(r => r.estado === filter);

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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Reportes</span>
              <FileSpreadsheet className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{mockReports.length}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Enviados</span>
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {mockReports.filter(r => r.estado === "ENVIADO").length}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">En Proceso</span>
              <AlertCircle className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-yellow-600">
              {mockReports.filter(r => r.estado === "EN_PROCESO").length}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Completados</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-600">
              {mockReports.filter(r => r.estado === "COMPLETADO").length}
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
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-900">{report.empresaNombre}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{report.año}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">{report.informante.nombre}</p>
                        <p className="text-gray-500">{report.informante.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm">
                      {formatDate(report.fechaEnvio)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {report.archivos.GNR && (
                          <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center" title="GNR">
                            <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                          </div>
                        )}
                        {report.archivos.ADICIONALES_2030 && (
                          <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center" title="2030">
                            <FileSpreadsheet className="w-4 h-4 text-amber-600" />
                          </div>
                        )}
                        {report.archivos.ADICIONALES_2050 && (
                          <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center" title="2050">
                            <FileSpreadsheet className="w-4 h-4 text-green-600" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(report.estado)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedReport(report.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ver Detalle"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        {report.estado === "ENVIADO" && (
                          <>
                            <button
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Marcar En Proceso"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                            <button
                              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                              title="Agregar Comentario"
                            >
                              <MessageSquare className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        {report.estado === "EN_PROCESO" && (
                          <button
                            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                            title="Marcar Completado"
                          >
                            Completar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
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
