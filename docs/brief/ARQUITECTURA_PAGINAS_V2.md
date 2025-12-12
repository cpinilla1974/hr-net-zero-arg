# Arquitectura de Páginas v2.0
## Net Zero Argentina 2050 - Cemento y Hormigón

**Fecha**: 9 de Diciembre 2024
**Motivo**: Redefinición de páginas para separar claramente Trayectoria 2030 y Trayectoria 2050, según estructura del documento oficial de la Hoja de Ruta.

---

## Cambios Principales

| Antes | Ahora | Razón |
|-------|-------|-------|
| Hoja de Ruta (única) | Trayectoria 2030 + Trayectoria 2050 | Son capítulos distintos con enfoques diferentes |
| Dashboard genérico | Dashboard (estado actual) | Foco en monitoreo presente |
| - | Contexto/Industria (nueva) | Falta explicar la industria |

---

## Nueva Estructura de Navegación

```
├── Home (/)
├── Contexto (/contexto)           [NUEVA]
├── Trayectoria 2030 (/2030)       [RENOMBRAR hoja-de-ruta]
├── Trayectoria 2050 (/2050)       [NUEVA]
├── Dashboard (/dashboard)
├── Calculadora (/calculadora)     [Solo miembros]
├── Sobre (/sobre)
├── Admin (/admin)                 [Solo admin]
└── Login/Perfil
```

---

## 1. HOME (/)

**Propósito**: Impacto visual + resumen ejecutivo + navegación

**Contenido**:
- Hero con mensaje principal
- 4 KPIs destacados (emisiones, factor clínker, coprocesamiento, eficiencia)
- Gráfico síntesis de trayectoria completa (2023→2050)
- Cards de acceso rápido a 2030 y 2050
- Progreso general hacia Net Zero

**Datos**: `kpiData`, `trayectoriaData`, `datosIndustria`

---

## 2. CONTEXTO / LA INDUSTRIA (/contexto) [NUEVA]

**Propósito**: Explicar la industria y su importancia en Argentina

**Contenido**:
- ¿Qué es el cemento y hormigón?
- La industria en Argentina:
  - 4 empresas (Holcim, Loma Negra, Cementos Avellaneda, PCR)
  - 16 plantas
  - Capacidad: 18 Mt/año
  - Producción actual: 12.55 Mt/año
  - Consumo per cápita: 268 kg/hab
- Mapa de plantas en Argentina
- Por qué es un sector "hard to abate"
- Comparativa emisiones: Argentina vs LAC vs Global (gráfico)
- Contribución al NDC de Argentina

**Datos**: `datosIndustria`, `comparativaEmisiones`, empresas

---

## 3. TRAYECTORIA 2030 (/2030)

**Propósito**: Metas de corto plazo, situación actual, primeras acciones

**Características distintivas**:
- Enfoque en **indicadores medibles hoy**
- Metas **condicionadas** a marcos regulatorios
- Acciones **concretas y alcanzables**
- Comparativa con benchmark internacional

**Contenido**:

### 3.1 Meta Principal
- **500 kgCO₂/tcem** (emisiones netas)
- Contexto: ya en 507 (2023), solo 7 kg de brecha
- Comparación histórica: 612 (1990) → 507 (2023) = -17%

### 3.2 KPIs 2030 con Progreso
| Indicador | Actual (2023) | Meta 2030 | Progreso |
|-----------|---------------|-----------|----------|
| Emisiones netas | 507 kgCO₂/t | <500 | 98% |
| Factor clínker | 67% | 65% | 67% |
| Coprocesamiento | 7% | 10% | 70% |
| Biomasa | 4% | 5% | 80% |

### 3.3 Desafíos 2030
- Reducir factor clínker a 67.5%
- Alcanzar 10% coprocesamiento
- Implementar sistemas MRV (medición, reporte, verificación)

### 3.4 Oportunidades
- Liderar agenda de mitigación en Argentina
- Modernizar plantas con tecnología eficiente
- Productos bajos en carbono para construcción

### 3.5 Medidas Habilitantes
- Normas para aumentar adiciones en cemento
- Compras públicas que incentiven cemento bajo en carbono
- Marcos regulatorios para coprocesamiento

### 3.6 Benchmarking
Gráfico comparativo:
- Argentina: 507 kgCO₂/tcem
- LAC: 589 kgCO₂/tcem
- Global: 624 kgCO₂/tcem

**Datos**: `kpiData`, `metas2030`, `comparativaEmisiones`, `desafios2030`

---

## 4. TRAYECTORIA 2050 (/2050)

**Propósito**: Visión de largo plazo hacia Net Zero, tecnologías transformacionales

**Características distintivas**:
- Enfoque en **transformación tecnológica**
- Incluye tecnologías **aún no disponibles** comercialmente
- 11 ejes de descarbonización organizados en 5 grupos
- Escenarios BAU vs Net Zero

**Contenido**:

### 4.1 Meta Principal
- **Net Zero** (neutralidad de carbono)
- Reducción de 507 → 0 kgCO₂/tcem

### 4.2 Escenario de Emisiones
| Escenario | Emisiones 2050 |
|-----------|----------------|
| BAU (Business as Usual) | 10.4 MtCO₂ (+55%) |
| Net Zero | 0 MtCO₂ |

Producción proyectada: 19.5 Mt cemento (+55% vs 2023)

### 4.3 Los 11 Ejes de Descarbonización

**Grupo A - Diseño y Construcción (6%)**
| Eje | Nombre | Aporte |
|-----|--------|--------|
| 01 | Diseño y Construcción | 3% |
| 02 | Eficiencia Producción Hormigón | 3% |

**Grupo B - Clínker y Cemento (24%)**
| Eje | Nombre | Aporte |
|-----|--------|--------|
| 03 | Cementos y Adiciones | 17% |
| 04 | Eficiencia Térmica | 7% |

**Grupo C - Combustibles (8%)**
| Eje | Nombre | Aporte |
|-----|--------|--------|
| 05 | Combustibles Fósiles Tradicionales | 2% |
| 06 | Coprocesamiento Residuos Fósiles | 2% |
| 07 | Biomasa y Metano Evitado | 4% |

**Grupo D - Tecnologías Emergentes (45%)**
| Eje | Nombre | Aporte |
|-----|--------|--------|
| 08 | Hidrógeno (H₂) | 1% |
| 09 | Capturas Tecnológicas (CCUS) | 39% |
| 10 | Electricidad Carbono Neutral | 5% |

**Grupo E - Compensaciones (17%)**
| Eje | Nombre | Aporte |
|-----|--------|--------|
| 11 | Recarbonatación del Hormigón | 17% |

### 4.4 Detalle por Eje
Cards expandibles con:
- Descripción técnica
- Indicador actual → Meta 2050
- Medidas habilitantes
- Desafíos y oportunidades

### 4.5 Matriz de Combustibles 2050
| Combustible | 2023 | 2050 |
|-------------|------|------|
| Gas natural | 82% | 75% |
| Petcoke | 11% | 2% |
| CDR fósil | 3% | 8% |
| Biomasa | 4% | 10% |
| Hidrógeno | 0% | 5% |

### 4.6 Tecnologías Clave
- CCUS (Captura y almacenamiento de carbono)
- Hidrógeno verde
- Electricidad renovable
- Arcillas calcinadas
- Recarbonatación

**Datos**: `ejesDescarbonizacion`, `gruposDescarbonizacion`, `matrizCombustibles`, `escenarioBAU`, `tecnologias2050`

---

## 5. DASHBOARD (/dashboard)

**Propósito**: Monitoreo del estado actual y progreso

**Contenido**:
- Panel de KPIs principales con gauges
- Gráficos de evolución temporal
- Comparativa: Real vs Trayectoria planificada
- Semáforo de cumplimiento por indicador
- Filtros por año

**Datos**: `kpiData`, `trayectoriaData`, `comparativaEmisiones`

---

## 6. CALCULADORA (/calculadora)

**Propósito**: Simulador de escenarios
**Acceso**: Solo miembros registrados

**Contenido**:
- Inputs: producción, factor clínker, matriz combustibles
- Outputs: emisiones calculadas, brecha vs metas
- Escenarios predefinidos (BAU, 2030, 2050)
- Visualización de impacto

**Datos**: `emisionesDetalladas`, `matrizCombustibles`, factores de emisión

---

## 7. SOBRE (/sobre)

**Propósito**: Información institucional

**Contenido**:
- Qué es la Hoja de Ruta
- Actores: AFCP, FICEM, GCCA, ONUDI
- Empresas: Holcim, Loma Negra, Cementos Avellaneda, PCR
- Metodología
- Contacto
- Descarga PDF

---

## Mapeo de Datos por Página

| Página | Datos de `data.ts` |
|--------|-------------------|
| Home | `kpiData`, `trayectoriaData`, `datosIndustria` |
| Contexto | `datosIndustria`, `comparativaEmisiones`, `empresas` |
| 2030 | `kpiData`, `metas2030`, `desafios2030`, `comparativaEmisiones` |
| 2050 | `ejesDescarbonizacion`, `gruposDescarbonizacion`, `matrizCombustibles`, `escenarioBAU` |
| Dashboard | `kpiData`, `trayectoriaData`, `gruposDescarbonizacion` |
| Calculadora | `emisionesDetalladas`, `matrizCombustibles` |
| Sobre | `hitosProyecto`, actores |

---

## Nuevos Datos Requeridos en `data.ts`

```typescript
// Metas específicas 2030
export const metas2030 = {
  emisionesNetas: 500,
  factorClinker: 65,
  coprocesamiento: 10,
  biomasa: 5,
};

// Desafíos 2030
export const desafios2030 = [
  "Reducir factor clínker a 67.5%",
  "Alcanzar 10% coprocesamiento",
  "Implementar sistemas MRV",
];

// Escenario BAU 2050
export const escenarioBAU = {
  produccion2050: 19.5, // Mt
  emisiones2050: 10.4, // MtCO2
  incrementoProduccion: 55, // %
};

// Empresas del sector
export const empresas = [
  { nombre: "Holcim Argentina", plantas: 4 },
  { nombre: "Loma Negra", plantas: 6 },
  { nombre: "Cementos Avellaneda", plantas: 4 },
  { nombre: "PCR", plantas: 2 },
];
```

---

## Próximos Pasos

1. [ ] Aprobar esta arquitectura
2. [ ] Actualizar `data.ts` con nuevos datos
3. [ ] Crear página `/contexto`
4. [ ] Renombrar `/hoja-de-ruta` a `/2030`
5. [ ] Crear página `/2050`
6. [ ] Actualizar navegación en Sidebar
7. [ ] Revisar Home para incluir accesos a 2030/2050
8. [ ] Integrar datos de los Excel nuevos

---

*Documento de arquitectura v2.0 - 9 de Diciembre 2024*