// Tipos para el sistema de seguimiento MRV (Flujo Simplificado)

export type RolUsuario =
  | "INFORMANTE_EMPRESA"
  | "ADMIN_PROCESO";

export type EstadoReporte =
  | "BORRADOR"
  | "ENVIADO"
  | "EN_PROCESO"
  | "COMPLETADO";

export type TipoArchivo = "GNR" | "ADICIONALES_2030" | "ADICIONALES_2050";

export interface ArchivoReporte {
  id: string;
  tipo: TipoArchivo;
  nombreArchivo: string;
  tamañoBytes: number;
  fechaCarga: Date;
  urlDescarga?: string;
  estado: "PENDIENTE" | "VALIDADO" | "ERROR";
  erroresValidacion?: string[];
}

export interface ReporteAnual {
  id: string;
  empresaId: string;
  empresaNombre: string;
  año: number;
  estado: EstadoReporte;
  fechaCreacion: Date;
  fechaUltimaModificacion: Date;

  // Archivos cargados
  archivoGNR?: ArchivoReporte;
  archivoAdicionales2030?: ArchivoReporte;
  archivoAdicionales2050?: ArchivoReporte;

  // Metadata
  informante?: {
    id: string;
    nombre: string;
    email: string;
  };
  adminProceso?: {
    id: string;
    nombre: string;
    email: string;
    fechaAprobacion?: Date;
  };
  observaciones?: string;
  comentariosAdmin?: string;
}

export interface PlantillaArchivo {
  tipo: TipoArchivo;
  nombre: string;
  descripcion: string;
  urlDescarga: string;
  formatoEsperado: string;
  iconColor: string;
  indicadores: string[];
  granularidad: "Por planta" | "Por empresa";
  obligatorio: boolean;
}

// Plantillas disponibles para descarga
export const plantillasArchivos: PlantillaArchivo[] = [
  {
    tipo: "GNR",
    nombre: "Plantilla GNR (Getting the Numbers Right)",
    descripcion: "Datos del protocolo GCCA para emisiones, factor clínker, eficiencia térmica, combustibles y coprocesamiento",
    urlDescarga: "/docs/source/GCCA_ProtokolV3_1_final.xlsm",
    formatoEsperado: "Excel (.xlsm)",
    iconColor: "#3B82F6", // blue
    granularidad: "Por planta",
    obligatorio: true,
    indicadores: [
      "Emisiones netas (kgCO₂/tcem)",
      "Factor clínker (%)",
      "Eficiencia térmica (kcal/kg)",
      "Combustibles convencionales (gas, petcoke, biomasa, CDR)",
      "Consumo eléctrico (kWh/t)",
      "Coprocesamiento (%)",
    ],
  },
  {
    tipo: "ADICIONALES_2030",
    nombre: "Plantilla Indicadores 2030",
    descripcion: "Indicadores emergentes no cubiertos por GNR, con foco en metas 2030",
    urlDescarga: "/plantillas/plantilla_2030.xlsx",
    formatoEsperado: "Excel (.xlsx)",
    iconColor: "#F59E0B", // amber
    granularidad: "Por planta",
    obligatorio: true,
    indicadores: [
      "Hidrógeno (% uso - meta 1%)",
      "Combustibles de bajo carbono emergentes",
      "Otros indicadores específicos 2030",
    ],
  },
  {
    tipo: "ADICIONALES_2050",
    nombre: "Plantilla Indicadores 2050",
    descripcion: "Indicadores de largo plazo consolidados a nivel empresa",
    urlDescarga: "/plantillas/plantilla_2050.xlsx",
    formatoEsperado: "Excel (.xlsx)",
    iconColor: "#10B981", // green
    granularidad: "Por empresa",
    obligatorio: false,
    indicadores: [
      "CCUS - Captura de carbono (% captura)",
      "Soluciones basadas en naturaleza (SbN)",
      "Recarbonatación",
      "Indicadores técnicos de ejes emergentes",
    ],
  },
];
