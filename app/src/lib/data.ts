// Datos extraídos de la Hoja de Ruta Net Zero Argentina 2050
// Fuente: AFCP, FICEM, GCCA, ONUDI - Noviembre 2024

export const currentYear = 2023;

// ============================================
// INDICADORES PRINCIPALES (KPIs)
// ============================================
export const kpiData = {
  emisionesEspecificas: {
    actual: 507,
    base1990: 612,
    meta2030: 500,
    meta2050: 0,
    unidad: "kgCO₂/tcem",
    label: "Emisiones Específicas Netas",
    reduccionVs1990: 17, // (612-507)/612 = 17%
  },
  factorClinker: {
    actual: 67,
    meta2030: 65,
    meta2040: 63,
    meta2050: 61,
    global: 75, // Promedio global GNR 2023
    unidad: "%",
    label: "Factor Clínker",
  },
  eficienciaTermica: {
    actual: 3425,
    meta2030: 3400,
    meta2050: 3300,
    global: 3504, // Promedio global GNR 2023
    unidad: "MJ/tCk",
    label: "Eficiencia Térmica",
  },
  coprocesamiento: {
    actual: 7,
    meta2030: 10,
    meta2050: 18,
    unidad: "%",
    label: "Coprocesamiento (TSR)",
  },
  produccionCemento: {
    actual: 12.6,
    meta2050: 19.5, // Proyección BAU (+55%)
    unidad: "Mt",
    label: "Producción Cemento",
  },
  emisionesTotales: {
    actual: 6.7, // Directas + Indirectas
    directas: 6.3,
    indirectas: 0.4, // Energía eléctrica
    bau2050: 10.4,
    meta2050: 0,
    unidad: "MtCO₂",
    label: "Emisiones Totales",
  },
  consumoPerCapita: {
    argentina: 268,
    global: 540,
    unidad: "kg/hab",
    label: "Consumo Per Cápita",
  },
  contenidoCementoHormigon: {
    actual: 382,
    meta2030: 377,
    meta2050: 335,
    unidad: "kg cem/m³",
    label: "Contenido Cemento en Hormigón",
  },
};

// ============================================
// COMPARATIVA INTERNACIONAL
// ============================================
export const comparativaEmisiones = [
  { año: 1990, argentina: 612, lac: 709, global: 756 },
  { año: 2000, argentina: 601, lac: 652, global: 711 },
  { año: 2010, argentina: 570, lac: 603, global: 634 },
  { año: 2020, argentina: 507, lac: 589, global: 624 },
  { año: 2030, argentina: 500, lac: null, global: null },
  { año: 2050, argentina: 0, lac: null, global: null },
];

// ============================================
// TRAYECTORIA DE EMISIONES (Net Zero vs BAU)
// ============================================
export const trayectoriaEmisiones = [
  { año: 2023, netZero: 6.7, bau: 6.7, tipo: "base" },
  { año: 2030, netZero: 5.8, bau: 7.8, tipo: "proyectado" },
  { año: 2040, netZero: 3.5, bau: 9.1, tipo: "proyectado" },
  { año: 2050, netZero: 0, bau: 10.4, tipo: "proyectado" },
];

// Alias para compatibilidad
export const escenarioBAU = trayectoriaEmisiones.map(d => ({
  año: d.año,
  bau: d.bau,
  trayectoria: d.netZero,
}));

// ============================================
// 11 EJES DE DESCARBONIZACIÓN
// ============================================
export const ejesDescarbonizacion = [
  {
    id: 1,
    nombre: "Diseño y Construcción",
    codigo: "E01",
    aporte: 11,
    grupo: "A",
    grupoNombre: "Diseño, Construcción y Hormigón",
    descripcion: "Optimización de diseños, uso de BIM, extensión de vida útil de estructuras.",
    indicador: "Reducción CO₂ D&C",
    valorActual: "0%",
    meta2050: "11%",
    medidas: [
      "Diseño para larga vida en servicio",
      "Uso de Lean Design, BIM e IA",
      "Especificar resistencia a 56 o 90 días",
      "Prefabricación e industrialización",
      "Análisis de Ciclo de Vida",
    ],
  },
  {
    id: 2,
    nombre: "Eficiencia Producción Hormigón",
    codigo: "E02",
    aporte: 7,
    grupo: "A",
    grupoNombre: "Diseño, Construcción y Hormigón",
    descripcion: "Reducción del contenido de cemento por m³ de hormigón.",
    indicador: "kg cem/m³",
    valorActual: "382",
    meta2030: "377",
    meta2050: "335",
    medidas: [
      "Mayor uso de aditivos químicos",
      "Contabilidad de huella CO₂",
      "Mejora calidad de agregados",
      "Diseño optimizado de mezclas",
      "Sustitución de mezclas manuales por hormigón elaborado",
    ],
  },
  {
    id: 3,
    nombre: "Cemento y Adiciones",
    codigo: "E03",
    aporte: 7,
    grupo: "B",
    grupoNombre: "Factor Clínker y Coprocesamiento",
    descripcion: "Reducción del factor clínker mediante uso de adiciones minerales.",
    indicador: "Factor Clínker",
    valorActual: "67%",
    meta2030: "65%",
    meta2050: "61%",
    medidas: [
      "Incorporación de arcillas calcinadas",
      "Uso de caliza como adición",
      "Escorias de alto horno",
      "Puzolanas naturales",
      "Finos de hormigón reciclado",
    ],
  },
  {
    id: 4,
    nombre: "Eficiencia Térmica",
    codigo: "E04",
    aporte: 1,
    grupo: "B",
    grupoNombre: "Factor Clínker y Coprocesamiento",
    descripcion: "Mejora en la eficiencia energética de los hornos de clínker.",
    indicador: "MJ/tClínker",
    valorActual: "3425",
    meta2030: "3400",
    meta2050: "3300",
    medidas: [
      "Modernización de hornos con precalcinador",
      "Enfriadores de clínker de alta eficiencia",
      "Optimización de quemadores",
      "Sistemas de cogeneración",
    ],
  },
  {
    id: 5,
    nombre: "Combustibles Fósiles Tradicionales",
    codigo: "E05",
    aporte: 2,
    grupo: "B",
    grupoNombre: "Factor Clínker y Coprocesamiento",
    descripcion: "Reducción de petcoke y mantenimiento de gas natural como combustible principal.",
    indicador: "% Fósiles",
    valorActual: "93%",
    meta2030: "90%",
    meta2050: "77%",
    medidas: [
      "Mantener alta participación gas natural (75%)",
      "Reducción gradual de petcoke (11% → 2%)",
      "Eficiencia en combustión",
    ],
  },
  {
    id: 6,
    nombre: "CDR Fósiles (Coprocesamiento)",
    codigo: "E06",
    aporte: 2,
    grupo: "B",
    grupoNombre: "Factor Clínker y Coprocesamiento",
    descripcion: "Uso de neumáticos, plásticos y otros residuos como combustible derivado de residuos.",
    indicador: "% CDR Fósil",
    valorActual: "3%",
    meta2030: "5%",
    meta2050: "8%",
    medidas: [
      "Valorización de neumáticos fuera de uso",
      "Coprocesamiento de plásticos no reciclables",
      "Aceites usados",
      "Residuos industriales",
    ],
  },
  {
    id: 7,
    nombre: "Biomasa y Metano Evitado",
    codigo: "E07",
    aporte: 6,
    grupo: "B",
    grupoNombre: "Factor Clínker y Coprocesamiento",
    descripcion: "Uso de biomasa y reducción de metano en rellenos sanitarios.",
    indicador: "% Biomasa",
    valorActual: "4%",
    meta2030: "5%",
    meta2050: "10%",
    medidas: [
      "Residuos agrícolas y forestales",
      "Lodos de depuradoras",
      "RSU fracción orgánica",
      "Captura de metano evitado en rellenos",
    ],
  },
  {
    id: 8,
    nombre: "Hidrógeno (H₂)",
    codigo: "E08",
    aporte: 1,
    grupo: "B",
    grupoNombre: "Factor Clínker y Coprocesamiento",
    descripcion: "Incorporación de hidrógeno bajo en carbono como combustible alternativo.",
    indicador: "% H₂",
    valorActual: "0%",
    meta2030: "0%",
    meta2050: "5%",
    medidas: [
      "Pilotos de hidrógeno verde/azul",
      "Infraestructura de suministro",
      "Adaptación de quemadores",
    ],
  },
  {
    id: 9,
    nombre: "CCUS y Soluciones Basadas en Naturaleza",
    codigo: "E09",
    aporte: 45,
    grupo: "C",
    grupoNombre: "Capturas Tecnológicas",
    descripcion: "Captura, uso y almacenamiento de CO₂ + soluciones basadas en naturaleza (SBN).",
    indicador: "% Captura",
    valorActual: "0%",
    meta2030: "0%",
    meta2050: "45%",
    medidas: [
      "Captura post-combustión",
      "Captura oxi-combustión",
      "Almacenamiento geológico",
      "Uso de CO₂ en productos",
      "Forestación y reforestación",
    ],
  },
  {
    id: 10,
    nombre: "Electricidad Baja en Carbono",
    codigo: "E10",
    aporte: 5,
    grupo: "D",
    grupoNombre: "Electricidad Carbono Neutral",
    descripcion: "Uso de energía eléctrica de fuentes renovables.",
    indicador: "% Renovable",
    valorActual: "Variable",
    meta2050: "100%",
    medidas: [
      "PPAs con energía renovable",
      "Generación on-site solar/eólica",
      "Certificados de energía limpia",
    ],
  },
  {
    id: 11,
    nombre: "Recarbonatación del Hormigón",
    codigo: "E11",
    aporte: 13,
    grupo: "E",
    grupoNombre: "Recarbonatación",
    descripcion: "Absorción natural de CO₂ por el hormigón durante su vida útil.",
    indicador: "% Recarb.",
    valorActual: "Variable",
    meta2050: "13%",
    medidas: [
      "Cuantificación científica del fenómeno",
      "Inclusión en inventarios nacionales",
      "Promoción de hormigón expuesto",
    ],
  },
];

// Resumen por grupos
export const gruposDescarbonizacion = [
  { grupo: "A", nombre: "Diseño, Construcción y Hormigón", aporte: 18, ejes: ["E01", "E02"], color: "#11d462" },
  { grupo: "B", nombre: "Factor Clínker y Coprocesamiento", aporte: 19, ejes: ["E03", "E04", "E05", "E06", "E07", "E08"], color: "#20C997" },
  { grupo: "C", nombre: "Capturas Tecnológicas (CCUS)", aporte: 45, ejes: ["E09"], color: "#007BFF" },
  { grupo: "D", nombre: "Electricidad Carbono Neutral", aporte: 5, ejes: ["E10"], color: "#FFC107" },
  { grupo: "E", nombre: "Recarbonatación", aporte: 13, ejes: ["E11"], color: "#6C757D" },
];

// ============================================
// MATRIZ DE COMBUSTIBLES
// ============================================
export const matrizCombustibles = {
  lineaBase: {
    gasNatural: 82,
    petcoke: 11,
    cdrFosil: 3,
    biomasa: 4,
    hidrogeno: 0,
    totalFosiles: 93,
    totalCoprocesamiento: 7,
  },
  meta2030: {
    gasNatural: 82,
    petcoke: 8,
    cdrFosil: 5,
    biomasa: 5,
    hidrogeno: 0,
    totalFosiles: 90,
    totalCoprocesamiento: 10,
  },
  meta2040: {
    gasNatural: 79,
    petcoke: 5,
    cdrFosil: 6,
    biomasa: 8,
    hidrogeno: 2,
    totalFosiles: 84,
    totalCoprocesamiento: 14,
  },
  meta2050: {
    gasNatural: 75,
    petcoke: 2,
    cdrFosil: 8,
    biomasa: 10,
    hidrogeno: 5,
    totalFosiles: 77,
    totalCoprocesamiento: 18,
  },
};

// Para gráficos de evolución de combustibles
export const evolucionCombustibles = [
  { año: "2023", gasNatural: 82, petcoke: 11, cdrFosil: 3, biomasa: 4, hidrogeno: 0 },
  { año: "2030", gasNatural: 82, petcoke: 8, cdrFosil: 5, biomasa: 5, hidrogeno: 0 },
  { año: "2040", gasNatural: 79, petcoke: 5, cdrFosil: 6, biomasa: 8, hidrogeno: 2 },
  { año: "2050", gasNatural: 75, petcoke: 2, cdrFosil: 8, biomasa: 10, hidrogeno: 5 },
];

// ============================================
// COMPOSICIÓN DEL CEMENTO
// ============================================
export const composicionCemento = {
  lineaBase: {
    clinker: 67,
    yeso: 5,
    caliza: 17,
    escoria: 5,
    puzolana: 5,
    arcillasCalcinadas: 1,
    otras: 0,
  },
  meta2030: {
    clinker: 65,
    yeso: 5,
    caliza: 15,
    escoria: 4,
    cenizasVolantes: 2,
    puzolana: 5,
    arcillasCalcinadas: 3,
    otras: 1,
  },
  meta2040: {
    clinker: 63,
    yeso: 5,
    caliza: 18,
    escoria: 5,
    cenizasVolantes: 1,
    puzolana: 4,
    arcillasCalcinadas: 5,
    otras: 1,
  },
  meta2050: {
    clinker: 61,
    yeso: 5,
    caliza: 20,
    escoria: 5,
    cenizasVolantes: 0,
    puzolana: 3,
    arcillasCalcinadas: 5,
    otras: 1,
  },
};

// Para gráficos de evolución de composición
export const evolucionComposicion = [
  { año: "2023", clinker: 67, yeso: 5, caliza: 17, escoria: 5, puzolana: 5, arcillas: 1, otras: 0 },
  { año: "2030", clinker: 65, yeso: 5, caliza: 15, escoria: 4, puzolana: 5, arcillas: 3, otras: 1 },
  { año: "2040", clinker: 63, yeso: 5, caliza: 18, escoria: 5, puzolana: 4, arcillas: 5, otras: 1 },
  { año: "2050", clinker: 61, yeso: 5, caliza: 20, escoria: 5, puzolana: 3, arcillas: 5, otras: 1 },
];

// ============================================
// DATOS DE LA INDUSTRIA
// ============================================
export const datosIndustria = {
  empresas: [
    { nombre: "Cementos Avellaneda", sigla: "CA" },
    { nombre: "Holcim Argentina", sigla: "Holcim" },
    { nombre: "Loma Negra", sigla: "LN" },
    { nombre: "PCR", sigla: "PCR" },
  ],
  plantas: 16,
  capacidadInstalada: 18, // Mt
  produccionActual: 12.6, // Mt
  consumoPerCapita: 268, // kg/hab
  consumoGlobal: 540, // kg/hab (promedio mundial)
  participacionEmisionesNacionales: 2, // % del total de GEI Argentina (según BUR 2021)
};

// Canales de distribución
export const canalesDistribucion = {
  lineaBase: { sacos: 53, readymix: 35, proyectosEspeciales: 7, precast: 5 },
  meta2050: { sacos: 43, readymix: 42, proyectosEspeciales: 7, precast: 8 },
};

// Para gráficos
export const evolucionCanales = [
  { año: "2023", sacos: 53, readymix: 35, proyectos: 7, precast: 5 },
  { año: "2050", sacos: 43, readymix: 42, proyectos: 7, precast: 8 },
];

// ============================================
// DATOS DE HORNOS
// ============================================
export const tecnologiaHornos = {
  conPrecalentadorYPrecalcinador: 53, // % de hornos
  soloPrecalentador: 47, // % de hornos
  eficienciaPromedio: 3425, // MJ/tCk
  rangoEficiencia: { min: 3390, max: 3556 },
};

// ============================================
// EMISIONES DETALLADAS (Línea Base)
// ============================================
export const emisionesDetalladas = {
  calcinacion: 525, // kgCO₂/tCk
  toc: 11, // kgCO₂/tCk (Total Organic Carbon)
  combustiblesFosiles: 201, // kgCO₂/tCk
  cdrFosilNeutral: 8, // kgCO₂/tCk
  biomasaNeutral: 14, // kgCO₂/tCk
  factorEmisionClinker: 737, // kgCO₂/tCk (total BAU)
  clinkerProducido: 8.5, // Mt
  cementoProducido: 12.6, // Mt
};

// ============================================
// NDC Y CONTEXTO NACIONAL
// ============================================
export const contextoNacional = {
  metaNDC2030: 349, // MtCO₂e máximo para toda Argentina
  emisionesNacionales2018: 366, // MtCO₂e
  distribucionEmisiones: {
    energia: 51,
    afolu: 39,
    procesosIndustriales: 6,
    residuos: 4,
  },
  acuerdoParis: {
    metaTemperatura: 1.5, // °C
    añoBase: "era preindustrial",
  },
  ley: "Ley 27.520 - Presupuestos Mínimos Adaptación y Mitigación al Cambio Climático",
};

// ============================================
// SOCIOS Y ORGANIZACIONES
// ============================================
export const organizaciones = [
  { nombre: "AFCP", tipo: "nacional", descripcion: "Asociación de Fabricantes de Cemento Portland" },
  { nombre: "FICEM", tipo: "regional", descripcion: "Federación Interamericana de Cemento" },
  { nombre: "GCCA", tipo: "global", descripcion: "Global Cement and Concrete Association" },
  { nombre: "ONUDI", tipo: "internacional", descripcion: "Organización de las Naciones Unidas para el Desarrollo Industrial" },
];

// ============================================
// HITOS DEL PROYECTO
// ============================================
export const hitosProyecto = [
  { año: 2023, titulo: "Lanzamiento Hoja de Ruta", descripcion: "Presentación oficial y compromiso del sector", estado: "completado" },
  { año: 2025, titulo: "Primeras Implementaciones", descripcion: "Inicio de proyectos piloto con tecnologías de bajas emisiones", estado: "proximo" },
  { año: 2030, titulo: "Meta Intermedia", descripcion: "500 kgCO₂/tcem, 10% coprocesamiento, 65% factor clínker", estado: "futuro" },
  { año: 2050, titulo: "Net Zero", descripcion: "Neutralidad de carbono en la industria del cemento y hormigón", estado: "futuro" },
];
