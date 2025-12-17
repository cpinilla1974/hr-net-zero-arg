/**
 * Types for Submissions (envíos de datos)
 */

export type EstadoSubmission =
  | "BORRADOR"
  | "ENVIADO"
  | "APROBADO_EMPRESA"
  | "EN_REVISION_FICEM"
  | "APROBADO_FICEM"
  | "RECHAZADO_EMPRESA"
  | "RECHAZADO_FICEM"
  | "PUBLICADO"
  | "ARCHIVADO";

export interface Submission {
  id: string;
  proceso_id: string;
  empresa_id: number;
  empresa_nombre?: string;
  planta_id?: number;
  planta_nombre?: string;
  usuario_id: number;
  estado_actual: EstadoSubmission;

  // Archivo Excel
  archivo_excel?: {
    url: string;
    filename: string;
    uploaded_at: string;
  };

  // Validaciones
  validaciones?: Array<{
    tipo: string;
    campo: string;
    mensaje: string;
    nivel: "error" | "warning" | "info";
  }>;

  // Comentarios
  comentarios?: Array<{
    id: string;
    usuario_nombre: string;
    texto: string;
    created_at: string;
  }>;

  // Workflow history
  workflow_history?: Array<{
    estado: EstadoSubmission;
    usuario_nombre: string;
    comentario?: string;
    created_at: string;
  }>;

  // Timestamps
  created_at: string;
  submitted_at?: string;
  reviewed_at?: string;
  approved_at?: string;
}

export interface CreateSubmissionRequest {
  empresa_id: number;
  planta_id?: number;
}

export interface SubmissionReviewRequest {
  accion: "aprobar" | "rechazar" | "en_revision";
  comentario?: string;
}

export interface SubmissionListResponse {
  submissions: Submission[];
  total: number;
}
