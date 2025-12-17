/**
 * API Service for Submissions
 * Handles all submission-related API calls
 */

import { apiClient } from "./client";
import type {
  Submission,
  CreateSubmissionRequest,
  SubmissionReviewRequest,
  SubmissionListResponse,
} from "@/types/submission";

export const submissionsAPI = {
  /**
   * Listar submissions de un proceso
   * GET /api/v1/procesos/{proceso_id}/submissions
   */
  list: async (procesoId: string): Promise<Submission[]> => {
    const response = await apiClient.get<SubmissionListResponse>(
      `/procesos/${procesoId}/submissions`
    );
    return response.submissions;
  },

  /**
   * Crear nueva submission
   * POST /api/v1/procesos/{proceso_id}/submissions
   */
  create: async (
    procesoId: string,
    data: CreateSubmissionRequest
  ): Promise<Submission> => {
    return apiClient.post(`/procesos/${procesoId}/submissions`, data);
  },

  /**
   * Obtener detalle de una submission
   * GET /api/v1/submissions/{id}
   */
  get: async (id: string): Promise<Submission> => {
    return apiClient.get(`/submissions/${id}`);
  },

  /**
   * Subir archivo Excel
   * POST /api/v1/submissions/{id}/upload
   */
  uploadFile: async (id: string, file: File): Promise<Submission> => {
    const formData = new FormData();
    formData.append("archivo", file);

    // Para FormData, necesitamos hacer el fetch manualmente
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/submissions/${id}/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Validar archivo subido
   * POST /api/v1/submissions/{id}/validate
   */
  validate: async (id: string): Promise<Submission> => {
    return apiClient.post(`/submissions/${id}/validate`);
  },

  /**
   * Enviar para revisión
   * POST /api/v1/submissions/{id}/submit
   */
  submit: async (id: string): Promise<Submission> => {
    return apiClient.post(`/submissions/${id}/submit`);
  },

  /**
   * Aprobar/rechazar a nivel empresa (SUPERVISOR)
   * POST /api/v1/submissions/{id}/aprobar-empresa
   */
  aprobarEmpresa: async (
    id: string,
    data: SubmissionReviewRequest
  ): Promise<Submission> => {
    return apiClient.post(`/submissions/${id}/aprobar-empresa`, data);
  },

  /**
   * Aprobar/rechazar a nivel FICEM (ADMIN)
   * POST /api/v1/submissions/{id}/aprobar-ficem
   */
  aprobarFicem: async (
    id: string,
    data: SubmissionReviewRequest
  ): Promise<Submission> => {
    return apiClient.post(`/submissions/${id}/aprobar-ficem`, data);
  },

  /**
   * Agregar comentario
   * POST /api/v1/submissions/{id}/comentarios
   */
  addComment: async (
    id: string,
    comentario: string
  ): Promise<Submission> => {
    return apiClient.post(`/submissions/${id}/comentarios`, { texto: comentario });
  },

  /**
   * Obtener resultados (solo si APROBADO_FICEM)
   * GET /api/v1/submissions/{id}/results
   */
  getResults: async (id: string): Promise<any> => {
    return apiClient.get(`/submissions/${id}/results`);
  },
};
