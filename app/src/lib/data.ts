// Datos extraídos de la Hoja de Ruta Net Zero Argentina 2050

export const currentYear = 2023;

// Indicadores principales
export const kpiData = {
  emisionesEspecificas: {
    actual: 507,
    meta2030: 500,
    meta2050: 0,
    unidad: "kgCO₂/tcem",
    label: "Emisiones Específicas",
  },
  factorClinker: {
    actual: 67,
    meta2030: 65,
    meta2050: 61,
    unidad: "%",
    label: "Factor Clínker",
  },
  eficienciaTermica: {
    actual: 3425,
    meta2030: 3400,
    meta2050: 3300,
    unidad: "MJ/tCk",
    label: "Eficiencia Térmica",
  },
  coprocesamiento: {
    actual: 7,
    meta2030: 10,
    meta2050: 18,
    unidad: "%",
    label: "Coprocesamiento",
  },
  produccionCemento: {
    actual: 12.6,
    meta2030: null,
    meta2050: 19.5,
    unidad: "Mt",
    label: "Producción Cemento",
  },
  emisionesTotales: {
    actual: 6.7,
    meta2030: null,
    meta2050: 0,
    unidad: "MtCO₂",
    label: "Emisiones Totales",
  },
};

// Comparativa internacional
export const comparativaEmisiones = [
  { año: 1990, argentina: 612, lac: 709, global: 756 },
  { año: 2000, argentina: 601, lac: 652, global: 711 },
  { año: 2010, argentina: 570, lac: 603, global: 634 },
  { año: 2020, argentina: 507, lac: 589, global: 624 },
  { año: 2030, argentina: 500, lac: null, global: null },
  { año: 2050, argentina: 0, lac: null, global: null },
];

// Trayectoria de emisiones
export const trayectoriaEmisiones = [
  { año: 2023, emisiones: 6.7, tipo: "real" },
  { año: 2030, emisiones: 5.8, tipo: "proyectado" },
  { año: 2040, emisiones: 3.5, tipo: "proyectado" },
  { año: 2050, emisiones: 0, tipo: "proyectado" },
];

// BAU vs Trayectoria
export const escenarioBAU = [
  { año: 2023, bau: 6.7, trayectoria: 6.7 },
  { año: 2030, bau: 7.8, trayectoria: 5.8 },
  { año: 2040, bau: 9.1, trayectoria: 3.5 },
  { año: 2050, bau: 10.4, trayectoria: 0 },
];

// 11 Ejes de descarbonización
export const ejesDescarbonizacion = [
  {
    id: 1,
    nombre: "Diseño y Construcción",
    codigo: "E01",
    aporte: 11,
    icon: "building",
    descripcion: "Optimización de diseños, uso de BIM, extensión de vida útil de estructuras.",
    indicador: "Reducción CO₂ D&C",
    valorActual: "0%",
    meta2050: "11%",
    grupo: "A",
  },
  {
    id: 2,
    nombre: "Eficiencia Producción Hormigón",
    codigo: "E02",
    aporte: 7,
    icon: "factory",
    descripcion: "Reducción del contenido de cemento por m³ de hormigón.",
    indicador: "kg cem/m³",
    valorActual: "382",
    meta2050: "335",
    grupo: "A",
  },
  {
    id: 3,
    nombre: "Cemento y Adiciones",
    codigo: "E03",
    aporte: 7,
    icon: "layers",
    descripcion: "Reducción del factor clínker mediante uso de adiciones minerales.",
    indicador: "Factor Clínker",
    valorActual: "67%",
    meta2050: "61%",
    grupo: "B",
  },
  {
    id: 4,
    nombre: "Eficiencia Térmica",
    codigo: "E04",
    aporte: 1,
    icon: "flame",
    descripcion: "Mejora en la eficiencia energética de los hornos de clínker.",
    indicador: "MJ/tClínker",
    valorActual: "3425",
    meta2050: "3300",
    grupo: "B",
  },
  {
    id: 5,
    nombre: "Combustibles Fósiles Tradicionales",
    codigo: "E05",
    aporte: 2,
    icon: "fuel",
    descripcion: "Reducción de petcoke y mantenimiento de gas natural.",
    indicador: "% Fósiles",
    valorActual: "93%",
    meta2050: "77%",
    grupo: "B",
  },
  {
    id: 6,
    nombre: "Coprocesamiento Residuos Fósiles",
    codigo: "E06",
    aporte: 2,
    icon: "recycle",
    descripcion: "Uso de neumáticos, plásticos y otros residuos como combustible.",
    indicador: "% CDR Fósil",
    valorActual: "3%",
    meta2050: "8%",
    grupo: "B",
  },
  {
    id: 7,
    nombre: "Biomasa y Metano Evitado",
    codigo: "E07",
    aporte: 6,
    icon: "leaf",
    descripcion: "Uso de biomasa y reducción de metano en rellenos sanitarios.",
    indicador: "% Biomasa",
    valorActual: "4%",
    meta2050: "10%",
    grupo: "B",
  },
  {
    id: 8,
    nombre: "Hidrógeno (H₂)",
    codigo: "E08",
    aporte: 1,
    icon: "zap",
    descripcion: "Incorporación de hidrógeno bajo en carbono como combustible.",
    indicador: "% H₂",
    valorActual: "0%",
    meta2050: "5%",
    grupo: "B",
  },
  {
    id: 9,
    nombre: "Capturas Tecnológicas (CCUS)",
    codigo: "E09",
    aporte: 45,
    icon: "cloud",
    descripcion: "Captura, uso y almacenamiento de CO₂ + soluciones basadas en naturaleza.",
    indicador: "% Captura",
    valorActual: "0%",
    meta2050: "45%",
    grupo: "C",
  },
  {
    id: 10,
    nombre: "Electricidad Baja en Carbono",
    codigo: "E10",
    aporte: 5,
    icon: "bolt",
    descripcion: "Uso de energía eléctrica de fuentes renovables.",
    indicador: "% Renovable",
    valorActual: "Variable",
    meta2050: "100%",
    grupo: "D",
  },
  {
    id: 11,
    nombre: "Recarbonatación del Hormigón",
    codigo: "E11",
    aporte: 13,
    icon: "refresh",
    descripcion: "Absorción natural de CO₂ por el hormigón durante su vida útil.",
    indicador: "% Recarb.",
    valorActual: "Variable",
    meta2050: "13%",
    grupo: "E",
  },
];

// Matriz de combustibles
export const matrizCombustibles = {
  lineaBase: {
    gasNatural: 82,
    petcoke: 11,
    cdrFosil: 3,
    biomasa: 4,
    hidrogeno: 0,
  },
  meta2030: {
    gasNatural: 82,
    petcoke: 8,
    cdrFosil: 5,
    biomasa: 5,
    hidrogeno: 0,
  },
  meta2050: {
    gasNatural: 75,
    petcoke: 2,
    cdrFosil: 8,
    biomasa: 10,
    hidrogeno: 5,
  },
};

// Composición del cemento
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
    puzolana: 5,
    arcillasCalcinadas: 3,
    otras: 1,
  },
  meta2050: {
    clinker: 61,
    yeso: 5,
    caliza: 20,
    escoria: 5,
    puzolana: 3,
    arcillasCalcinadas: 5,
    otras: 1,
  },
};

// Datos de la industria
export const datosIndustria = {
  empresas: ["Cementos Avellaneda", "Holcim Argentina", "Loma Negra", "PCR"],
  plantas: 16,
  capacidadInstalada: 18, // Mt
  produccionActual: 12.6, // Mt
  consumoPerCapita: 268, // kg/hab
  consumoGlobal: 540, // kg/hab (promedio mundial)
  despachoBolsas: 53, // %
  despachoGranel: 47, // %
};
