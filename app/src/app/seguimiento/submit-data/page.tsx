"use client";

import { useState, useEffect } from "react";
import {
  Upload,
  FileSpreadsheet,
  Download,
  Send,
  CheckCircle2,
  X,
  Check,
  Loader2,
} from "lucide-react";
import { plantillasArchivos, type TipoArchivo } from "@/types/seguimiento";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { submissionsAPI } from "@/lib/api/submissions";
import type { Submission } from "@/types/submission";

function SubmitDataContent() {
  const { user } = useAuth();
  const [año, setAño] = useState(new Date().getFullYear());
  const [archivos, setArchivos] = useState<{
    GNR?: File;
    ADICIONALES_2030?: File;
    ADICIONALES_2050?: File;
  }>({});
  const [observaciones, setObservaciones] = useState("");
  const [isDragging, setIsDragging] = useState<TipoArchivo | null>(null);

  // Estado para la API
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Cargar submissions del proceso al montar el componente
  useEffect(() => {
    const loadSubmission = async () => {
      if (!user?.empresa_id) {
        setError("No se pudo determinar tu empresa");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const procesoId = "hr-argentina-2024"; // TODO: Obtener dinámicamente

        // Listar submissions del proceso
        const submissions = await submissionsAPI.list(procesoId);

        // Buscar submission del usuario para el año seleccionado
        const userSubmission = submissions.find(
          (s) => s.empresa_id === user.empresa_id
        );

        if (userSubmission) {
          setSubmission(userSubmission);
        } else {
          // Si no existe, crear una nueva submission en estado BORRADOR
          const newSubmission = await submissionsAPI.create(procesoId, {
            empresa_id: user.empresa_id,
          });
          setSubmission(newSubmission);
        }
      } catch (err) {
        console.error("Error cargando submission:", err);
        setError("Error al cargar la información del reporte");
      } finally {
        setIsLoading(false);
      }
    };

    loadSubmission();
  }, [user, año]);

  const handleFileSelect = async (tipo: TipoArchivo, file: File | null) => {
    if (file) {
      // Guardar archivo en estado local
      setArchivos((prev) => ({ ...prev, [tipo]: file }));

      // Si hay una submission, subir el archivo al backend
      if (submission) {
        try {
          setError(null);
          setSuccessMessage(null);

          // Subir archivo
          const updatedSubmission = await submissionsAPI.uploadFile(submission.id, file);
          setSubmission(updatedSubmission);

          setSuccessMessage(`Archivo ${file.name} subido exitosamente`);
          setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
          console.error("Error subiendo archivo:", err);
          setError(`Error al subir el archivo ${file.name}`);
        }
      }
    } else {
      setArchivos((prev) => {
        const { [tipo]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleDragOver = (e: React.DragEvent, tipo: TipoArchivo) => {
    e.preventDefault();
    setIsDragging(tipo);
  };

  const handleDragLeave = () => {
    setIsDragging(null);
  };

  const handleDrop = (e: React.DragEvent, tipo: TipoArchivo) => {
    e.preventDefault();
    setIsDragging(null);
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith(".xlsx") || file.name.endsWith(".xls"))) {
      handleFileSelect(tipo, file);
    }
  };

  const handleSendToSupervisor = async () => {
    if (!submission) return;

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      // Agregar comentario si hay observaciones
      if (observaciones.trim()) {
        await submissionsAPI.addComment(submission.id, observaciones);
      }

      // Enviar para revisión
      const updatedSubmission = await submissionsAPI.submit(submission.id);
      setSubmission(updatedSubmission);

      setSuccessMessage("¡Reporte enviado exitosamente a FICEM para procesamiento!");
    } catch (err) {
      console.error("Error enviando reporte:", err);
      setError("Error al enviar el reporte. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const allRequiredFilesUploaded = archivos.GNR && archivos.ADICIONALES_2030;
  const currentStatus = submission?.estado_actual || "BORRADOR";

  // Timeline steps (Flujo Simplificado basado en la API)
  const statusSteps = [
    { label: "Borrador", status: "BORRADOR", description: "Aún no has enviado tu reporte" },
    { label: "Enviado", status: "ENVIADO", description: "Enviado a FICEM para procesamiento" },
    { label: "En Revisión", status: "EN_REVISION_FICEM", description: "FICEM está procesando los datos" },
    { label: "Aprobado", status: "APROBADO_FICEM", description: "Reporte aprobado exitosamente" },
  ];

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex((step) => step.status === currentStatus);
  };

  const currentStepIndex = getCurrentStepIndex();

  // Mostrar loading mientras carga
  if (isLoading) {
    return (
      <main className="flex-1 p-8 bg-gray-50">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-[#5B9BD5] mx-auto mb-4" />
            <p className="text-gray-600">Cargando información del reporte...</p>
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
          <h1 className="text-4xl font-black text-gray-900 mb-2">Mi Envío: Reporte Anual {año}</h1>
          <p className="text-[#5B9BD5] text-base">
            Gestiona la subida de tu reporte de huella de carbono.
          </p>
        </div>

        {/* Mensajes de error y éxito */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Error</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 mb-1">Éxito</h3>
              <p className="text-green-700 text-sm">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Year Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Año del Reporte
              </label>
              <select
                value={año}
                onChange={(e) => setAño(parseInt(e.target.value))}
                className="w-full max-w-xs px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B9BD5] focus:border-transparent bg-white"
              >
                <option value={2024}>2024</option>
                <option value={2023}>2023</option>
                <option value={2022}>2022</option>
                <option value={2021}>2021</option>
              </select>
            </div>

            {/* Step 1: Download Templates */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#5B9BD5] text-white font-bold flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Descargar y completar plantillas
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Descarga las plantillas de Excel, completa todos los campos requeridos y guarda los archivos para subirlos.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {plantillasArchivos.map((plantilla) => (
                      <a
                        key={plantilla.tipo}
                        href={plantilla.urlDescarga}
                        download
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span className="truncate">{plantilla.nombre.replace("Plantilla ", "")}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Upload Files */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#5B9BD5] text-white font-bold flex-shrink-0">
                  2
                </div>
                <div className="flex-1 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      Cargar archivos
                    </h2>
                    <p className="text-gray-600">
                      Arrastra y suelta tus archivos completados o haz clic para seleccionarlos.
                    </p>
                  </div>

                  {/* Upload Cards */}
                  {plantillasArchivos.map((plantilla) => {
                    const archivoActual = archivos[plantilla.tipo];
                    const isUploaded = !!archivoActual;

                    return (
                      <div
                        key={plantilla.tipo}
                        className={`border-2 rounded-xl transition-all ${
                          isDragging === plantilla.tipo
                            ? "border-[#5B9BD5] bg-blue-50"
                            : isUploaded
                            ? "border-green-200 bg-green-50/50"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div
                                className="p-2 rounded-lg"
                                style={{ backgroundColor: `${plantilla.iconColor}15` }}
                              >
                                <FileSpreadsheet
                                  className="w-5 h-5"
                                  style={{ color: plantilla.iconColor }}
                                />
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900 text-sm">
                                  {plantilla.nombre.replace("Plantilla ", "")}
                                </h3>
                                <p className="text-xs text-gray-500">{plantilla.granularidad}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {plantilla.obligatorio && (
                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                                  Obligatorio
                                </span>
                              )}
                              {isUploaded && (
                                <div className="p-1.5 rounded-full bg-green-100">
                                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                                </div>
                              )}
                            </div>
                          </div>

                          {!isUploaded ? (
                            <div
                              onDragOver={(e) => handleDragOver(e, plantilla.tipo)}
                              onDragLeave={handleDragLeave}
                              onDrop={(e) => handleDrop(e, plantilla.tipo)}
                              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                                isDragging === plantilla.tipo
                                  ? "border-[#5B9BD5] bg-blue-50"
                                  : "border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                              <p className="text-sm font-medium text-gray-700 mb-1">
                                Arrastra tu archivo aquí
                              </p>
                              <p className="text-xs text-gray-500 mb-3">
                                o haz clic para seleccionar
                              </p>
                              <label
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg cursor-pointer transition-colors"
                                style={{ backgroundColor: plantilla.iconColor }}
                              >
                                Seleccionar archivo
                                <input
                                  type="file"
                                  accept=".xlsx,.xls"
                                  onChange={(e) =>
                                    handleFileSelect(plantilla.tipo, e.target.files?.[0] || null)
                                  }
                                  className="hidden"
                                />
                              </label>
                            </div>
                          ) : (
                            <div className="bg-white border border-green-200 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <FileSpreadsheet
                                    className="w-4 h-4 flex-shrink-0"
                                    style={{ color: plantilla.iconColor }}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {archivoActual.name}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                      {formatFileSize(archivoActual.size)}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleFileSelect(plantilla.tipo, null)}
                                  className="p-1.5 hover:bg-red-100 rounded-lg transition-colors ml-2"
                                >
                                  <X className="w-4 h-4 text-red-600" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Observations */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#5B9BD5] text-white font-bold flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Observaciones (Opcional)
                  </h2>
                  <textarea
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    placeholder="Agregue cualquier comentario o aclaración sobre los datos reportados..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B9BD5] focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSendToSupervisor}
                disabled={
                  !allRequiredFilesUploaded ||
                  isSubmitting ||
                  currentStatus !== "BORRADOR"
                }
                className="flex items-center gap-2 px-8 py-3 text-base font-bold text-white bg-[#5B9BD5] rounded-lg hover:bg-[#4A8BC4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : currentStatus !== "BORRADOR" ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Ya Enviado
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Reporte
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Estado del Envío
              </h2>

              {/* Current Status Badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm font-medium text-gray-600">Estado:</span>
                <span className="inline-flex items-center justify-center rounded-full bg-gray-200 px-3 py-1 text-sm font-bold text-gray-800">
                  {statusSteps[currentStepIndex].label}
                </span>
              </div>

              {/* Timeline */}
              <div className="relative pl-4">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                {statusSteps.map((step, index) => {
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div key={step.status} className={`relative ${index < statusSteps.length - 1 ? "mb-8" : ""}`}>
                      <div
                        className={`absolute -left-[26px] top-1 flex size-6 items-center justify-center rounded-full ${
                          isCompleted
                            ? "bg-[#5B9BD5] text-white"
                            : "border-2 border-gray-300 bg-white"
                        }`}
                      >
                        {isCompleted && <Check className="w-4 h-4" />}
                      </div>
                      <p
                        className={`font-bold ${
                          isCurrent
                            ? "text-[#5B9BD5]"
                            : isCompleted
                            ? "text-gray-700"
                            : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Comments Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Comentarios de FICEM
              </h2>
              {submission?.comentarios && submission.comentarios.length > 0 ? (
                <div className="space-y-4">
                  {submission.comentarios.map((comentario) => (
                    <div
                      key={comentario.id}
                      className="p-4 bg-blue-50 border border-blue-100 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-semibold text-gray-900 text-sm">
                          {comentario.usuario_nombre}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(comentario.created_at).toLocaleDateString("es-AR")}
                        </p>
                      </div>
                      <p className="text-gray-700 text-sm">{comentario.texto}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aún no hay comentarios de FICEM.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SubmitDataPage() {
  return (
    <ProtectedRoute allowedRoles={["INFORMANTE_EMPRESA"]}>
      <SubmitDataContent />
    </ProtectedRoute>
  );
}
