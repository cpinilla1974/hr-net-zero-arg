// Datos extraídos de la Hoja de Ruta Net Zero Argentina 2050
// Fuente: AFCP, FICEM, GCCA, ONUDI
// Actualizado con datos del Excel: GCCA_FICEM Argentina_Taller 3_Agosto2025

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
// BENCHMARKING INTERNACIONAL (GNR 2023)
// Datos de la imagen del taller de cierre
// ============================================
export const benchmarkingInternacional = [
  // Ordenado por emisiones netas (menor a mayor)
  { pais: "Austria", año: 2023, emisionesNetas: 514, coprocesamiento: 122, factorClinker: 69, cooprocesamientoPct: 25 },
  { pais: "Alemania", año: 2023, emisionesNetas: 530, coprocesamiento: 105, factorClinker: 74, cooprocesamientoPct: 76 },
  { pais: "Polonia", año: 2023, emisionesNetas: 549, coprocesamiento: 114, factorClinker: 71, cooprocesamientoPct: 79 },
  { pais: "Argentina", año: 2023, emisionesNetas: 495, coprocesamiento: 114, factorClinker: 70, cooprocesamientoPct: 9, destacado: true },
  { pais: "Francia", año: 2023, emisionesNetas: 584, coprocesamiento: 70, factorClinker: 77, cooprocesamientoPct: 56 },
  { pais: "India", año: 2023, emisionesNetas: 582, coprocesamiento: 59, factorClinker: 73, cooprocesamientoPct: 9 },
  { pais: "México", año: 2023, emisionesNetas: 582, coprocesamiento: 59, factorClinker: 68, cooprocesamientoPct: 30 },
  { pais: "Filipinas", año: 2023, emisionesNetas: 561, coprocesamiento: 29, factorClinker: 70, cooprocesamientoPct: 24 },
  { pais: "Reino Unido", año: 2024, emisionesNetas: 610, coprocesamiento: 76, factorClinker: 72, cooprocesamientoPct: 57 },
  { pais: "Asia (n.e.c.)/Oceania", año: 2023, emisionesNetas: 555, coprocesamiento: 47, factorClinker: 86, cooprocesamientoPct: 15 },
  { pais: "Central America", año: 2023, emisionesNetas: 593, coprocesamiento: 47, factorClinker: 69, cooprocesamientoPct: 24 },
  { pais: "SOBOCE", año: 2023, emisionesNetas: 547, coprocesamiento: 0, factorClinker: 75, cooprocesamientoPct: 0 },
  { pais: "Brasil", año: 2023, emisionesNetas: 578, coprocesamiento: 29, factorClinker: 71, cooprocesamientoPct: 31 },
  { pais: "Latinoamérica", año: 2023, emisionesNetas: 581, coprocesamiento: 31, factorClinker: 70, cooprocesamientoPct: 22 },
  { pais: "Global", año: 2023, emisionesNetas: 598, coprocesamiento: 23, factorClinker: 76, cooprocesamientoPct: 19 },
  { pais: "Colombia", año: 2023, emisionesNetas: 605, coprocesamiento: 23, factorClinker: 68, cooprocesamientoPct: 8 },
  { pais: "Perú HR", año: 2023, emisionesNetas: 587, coprocesamiento: 0, factorClinker: 74, cooprocesamientoPct: 0 },
  { pais: "España", año: 2022, emisionesNetas: 641, coprocesamiento: 53, factorClinker: 79, cooprocesamientoPct: 40 },
  { pais: "Chile HR", año: 2022, emisionesNetas: 626, coprocesamiento: 36, factorClinker: 70, cooprocesamientoPct: 17 },
  { pais: "R. Dominicana HR", año: 2019, emisionesNetas: 620, coprocesamiento: 0, factorClinker: 70, cooprocesamientoPct: 1 },
  { pais: "Egipto", año: 2023, emisionesNetas: 660, coprocesamiento: 27, factorClinker: 72, cooprocesamientoPct: 24 },
  { pais: "Norte América", año: 2023, emisionesNetas: 671, coprocesamiento: 30, factorClinker: 85, cooprocesamientoPct: 16 },
  { pais: "Middle East", año: 2023, emisionesNetas: 675, coprocesamiento: 29, factorClinker: 83, cooprocesamientoPct: 18 },
];

// Resumen para destacar Argentina
export const benchmarkingResumen = {
  argentina: {
    posicion: 1, // Entre los más bajos del mundo
    emisionesNetas: 495,
    vsGlobal: -17, // % menor que global (598)
    vsLatinoamerica: -15, // % menor que LAC (581)
    factorClinker: 70,
    coprocesamiento: 9,
  },
  mejoresPracticas: [
    { pais: "Austria", indicador: "coprocesamiento", valor: "25%" },
    { pais: "Alemania", indicador: "coprocesamiento", valor: "76%" },
    { pais: "Argentina", indicador: "emisiones netas", valor: "495 kgCO₂/t" },
  ],
};

// ============================================
// HITOS DEL PROYECTO
// ============================================
export const hitosProyecto = [
  { año: 2023, titulo: "Lanzamiento Hoja de Ruta", descripcion: "Presentación oficial y compromiso del sector", estado: "completado" },
  { año: 2025, titulo: "Primeras Implementaciones", descripcion: "Inicio de proyectos piloto con tecnologías de bajas emisiones", estado: "proximo" },
  { año: 2030, titulo: "Meta Intermedia", descripcion: "500 kgCO₂/tcem, 10% coprocesamiento, 65% factor clínker", estado: "futuro" },
  { año: 2050, titulo: "Net Zero", descripcion: "Neutralidad de carbono en la industria del cemento y hormigón", estado: "futuro" },
];

// ============================================
// TRAYECTORIA 2030 - DATOS ESPECÍFICOS
// ============================================

// Metas 2030
export const metas2030 = {
  emisionesNetas: { valor: 500, unidad: "kgCO₂/tcem", actual: 507, progreso: 93 },
  factorClinker: { valor: 65, unidad: "%", actual: 67, progreso: 67 },
  coprocesamiento: { valor: 10, unidad: "%", actual: 7, progreso: 70 },
  biomasa: { valor: 5, unidad: "%", actual: 4, progreso: 80 },
  cdrFosil: { valor: 5, unidad: "%", actual: 3, progreso: 60 },
  eficienciaTermica: { valor: 3400, unidad: "MJ/tCk", actual: 3425, progreso: 80 },
  contenidoCemento: { valor: 377, unidad: "kg/m³", actual: 382, progreso: 85 },
};

// Trayectorias 2023-2030 para cada indicador clave
// meta: trayectoria planificada (interpolación lineal)
// real: datos reales reportados (null = aún no disponible)

export const trayectoriaEmisiones2030 = [
  { año: 2023, meta: 507, real: 507 },
  { año: 2024, meta: 506, real: null },
  { año: 2025, meta: 505, real: null },
  { año: 2026, meta: 504, real: null },
  { año: 2027, meta: 503, real: null },
  { año: 2028, meta: 502, real: null },
  { año: 2029, meta: 501, real: null },
  { año: 2030, meta: 500, real: null },
];

export const trayectoriaFactorClinker2030 = [
  { año: 2023, meta: 67, real: 67 },
  { año: 2024, meta: 66.7, real: null },
  { año: 2025, meta: 66.4, real: null },
  { año: 2026, meta: 66.1, real: null },
  { año: 2027, meta: 65.9, real: null },
  { año: 2028, meta: 65.6, real: null },
  { año: 2029, meta: 65.3, real: null },
  { año: 2030, meta: 65, real: null },
];

export const trayectoriaCoprocesamiento2030 = [
  { año: 2023, meta: 7, real: 7 },
  { año: 2024, meta: 7.4, real: null },
  { año: 2025, meta: 7.9, real: null },
  { año: 2026, meta: 8.3, real: null },
  { año: 2027, meta: 8.7, real: null },
  { año: 2028, meta: 9.1, real: null },
  { año: 2029, meta: 9.6, real: null },
  { año: 2030, meta: 10, real: null },
];

export const trayectoriaBiomasa2030 = [
  { año: 2023, meta: 4, real: 4 },
  { año: 2024, meta: 4.1, real: null },
  { año: 2025, meta: 4.3, real: null },
  { año: 2026, meta: 4.4, real: null },
  { año: 2027, meta: 4.6, real: null },
  { año: 2028, meta: 4.7, real: null },
  { año: 2029, meta: 4.9, real: null },
  { año: 2030, meta: 5, real: null },
];

export const trayectoriaEficienciaTermica2030 = [
  { año: 2023, meta: 3425, real: 3425 },
  { año: 2024, meta: 3421, real: null },
  { año: 2025, meta: 3418, real: null },
  { año: 2026, meta: 3414, real: null },
  { año: 2027, meta: 3411, real: null },
  { año: 2028, meta: 3407, real: null },
  { año: 2029, meta: 3404, real: null },
  { año: 2030, meta: 3400, real: null },
];

// Alias para compatibilidad
export const serieHistoricaEmisiones = trayectoriaEmisiones2030;

// Desafíos 2030
export const desafios2030 = [
  {
    id: 1,
    titulo: "Reducir el factor clínker",
    descripcion: "Pasar del 67% actual al 65% requiere mayor disponibilidad de materiales suplementarios y adecuación de normas técnicas.",
    icono: "factory",
  },
  {
    id: 2,
    titulo: "Aumentar coprocesamiento al 10%",
    descripcion: "Requiere marcos regulatorios favorables y desarrollo de cadenas de suministro de combustibles alternativos.",
    icono: "recycle",
  },
  {
    id: 3,
    titulo: "Implementar sistemas MRV",
    descripcion: "Establecer sistemas robustos de Medición, Reporte y Verificación para transparentar el progreso.",
    icono: "chartBar",
  },
  {
    id: 4,
    titulo: "Desarrollo de mercado para productos bajos en carbono",
    descripcion: "Generar demanda de cementos y hormigones con menor huella de carbono.",
    icono: "leaf",
  },
];

// Oportunidades 2030
export const oportunidades2030 = [
  {
    id: 1,
    titulo: "Liderazgo en mitigación",
    descripcion: "Argentina puede liderar la agenda de mitigación climática en el sector industrial con las menores emisiones de la región.",
    impacto: "alto",
  },
  {
    id: 2,
    titulo: "Modernización de plantas",
    descripcion: "Oportunidad de actualizar tecnología de hornos y sistemas de combustión con eficiencia energética.",
    impacto: "medio",
  },
  {
    id: 3,
    titulo: "Productos diferenciados",
    descripcion: "Desarrollar cementos bajos en carbono como ventaja competitiva para construcción sustentable.",
    impacto: "alto",
  },
  {
    id: 4,
    titulo: "Economía circular",
    descripcion: "Aprovechar residuos industriales y urbanos como combustibles alternativos y materias primas.",
    impacto: "medio",
  },
];

// Medidas habilitantes 2030
export const medidasHabilitantes2030 = [
  {
    categoria: "Normas y Estándares",
    medidas: [
      "Actualización de normas IRAM para aumentar contenido de adiciones en cemento",
      "Especificaciones técnicas para hormigones bajos en carbono",
      "Normas de resistencia a 56 y 90 días",
    ],
  },
  {
    categoria: "Políticas Públicas",
    medidas: [
      "Compras públicas que incentiven cemento bajo en carbono",
      "Marcos regulatorios claros para coprocesamiento de residuos",
      "Incentivos fiscales para inversiones en tecnología limpia",
    ],
  },
  {
    categoria: "Mercado y Financiamiento",
    medidas: [
      "Acceso a financiamiento verde para proyectos de descarbonización",
      "Desarrollo de etiquetado de huella de carbono en productos",
      "Creación de mercados de carbono sectoriales",
    ],
  },
  {
    categoria: "Capacitación y Conocimiento",
    medidas: [
      "Programas de formación técnica en tecnologías de bajas emisiones",
      "Transferencia de conocimiento desde países líderes",
      "Investigación y desarrollo en materiales alternativos",
    ],
  },
];

// Acciones y compromisos del sector para 2030
export const accionesCompromisos2030 = [
  {
    area: "Emisiones",
    compromiso: "Mantener emisiones específicas por debajo de 500 kgCO₂/tcem",
    estado: "en_progreso",
    avance: 93,
  },
  {
    area: "Factor Clínker",
    compromiso: "Reducir factor clínker al 65% mediante mayor uso de adiciones",
    estado: "en_progreso",
    avance: 67,
  },
  {
    area: "Combustibles Alternativos",
    compromiso: "Alcanzar 10% de coprocesamiento (5% biomasa + 5% CDR)",
    estado: "en_progreso",
    avance: 70,
  },
  {
    area: "Eficiencia Energética",
    compromiso: "Mejorar eficiencia térmica a 3,400 MJ/tCk",
    estado: "en_progreso",
    avance: 80,
  },
  {
    area: "Hormigón",
    compromiso: "Reducir contenido de cemento en hormigón a 377 kg/m³",
    estado: "en_progreso",
    avance: 85,
  },
  {
    area: "Transparencia",
    compromiso: "Reportar anualmente indicadores según metodología GCCA",
    estado: "completado",
    avance: 100,
  },
];
