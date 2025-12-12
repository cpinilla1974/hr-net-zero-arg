# Especificación de Página: Trayectoria 2050

## Net Zero Argentina 2050 - Cemento y Hormigón

**Fecha**: 10 de Diciembre 2024
**Versión**: 2.0 - Diseño Narrativo
**Propósito**: Definir contenidos, comportamiento e interactividad de la página /2050

---

## 1. FILOSOFÍA DE DISEÑO

### Concepto Central
Esta página **NO es un dashboard**, es un **relato visual**. Cuenta la historia de cómo Argentina planea llevar las emisiones de 6.7 MtCO₂ a cero mientras la producción crece 55%.

### Principios
1. **Narrativa primero**: El usuario debe entender el "qué" y "por qué" antes de los números
2. **Progressive disclosure**: Mostrar lo esencial, revelar detalles bajo demanda
3. **Impacto visual**: Cada sección debe tener un elemento visual memorable
4. **Jerarquía clara**: De lo macro (meta) a lo micro (ejes técnicos)

---

## 2. ESTRUCTURA NARRATIVA (8 SECCIONES)

### SECCIÓN 1: HERO - El Objetivo
**Concepto**: Número "0" gigante animado como destino final
**Mensaje**: "Hacia cero emisiones netas"

Elementos:
- Número 0 grande, prominente, con animación sutil (glow/pulse)
- Subtítulo: "Meta 2050: Neutralidad de carbono en cemento y hormigón"
- Indicador: De 6.7 MtCO₂ hoy → 0 MtCO₂ en 2050
- Botón/scroll indicator para continuar

---

### SECCIÓN 2: LA PARADOJA - El Desafío
**Concepto**: Mostrar que producción SUBE mientras emisiones BAJAN
**Mensaje**: "Más producción, cero emisiones"

Layout visual:
```
┌─────────────────────────────────────────────┐
│   PRODUCCIÓN          EMISIONES             │
│       ↗                   ↘                 │
│   +55%                 -100%                │
│   12.6 → 19.5 Mt       6.7 → 0 MtCO₂       │
│                                             │
│   [Gráfico de áreas cruzadas]               │
│   Línea producción sube / Área emisiones baja│
└─────────────────────────────────────────────┘
```

Texto de apoyo: "La industria del cemento crecerá para satisfacer la demanda de infraestructura, pero con tecnologías y procesos que eliminan las emisiones de carbono."

---

### SECCIÓN 3: LOS 5 PILARES - La Estrategia
**Concepto**: Diagrama radial/petal interactivo con 5 grupos
**Mensaje**: "Cinco caminos hacia Net Zero"

Visualización:
- Diagrama tipo pétalo/radial con 5 secciones
- Cada pétalo proporcional a su aporte (%)
- Hover: destaca el grupo y muestra descripción
- Click: navega a detalle del grupo (Sección 7)

```
         Grupo A (18%)
        Diseño y Hormigón
              ╱╲
             ╱  ╲
    Grupo E ╱    ╲ Grupo B
    (13%)  ╱  ○   ╲ (19%)
   Recarb.╱   ↓    ╲Factor Clínker
          ╲        ╱
           ╲      ╱
    Grupo D ╲    ╱ Grupo C
     (5%)    ╲  ╱   (45%)
    Electric. ╲╱  CCUS
```

Colores por grupo:
- Grupo A: Verde claro `#10B981`
- Grupo B: Azul verdoso `#14B8A6`
- Grupo C: Azul principal `#5B9BD5` (destacado)
- Grupo D: Amarillo `#F59E0B`
- Grupo E: Gris azulado `#64748B`

---

### SECCIÓN 4: EL CAMINO - Timeline
**Concepto**: Línea de tiempo visual con hitos principales
**Mensaje**: "Una transición de 27 años"

```
2023 ────────── 2030 ────────── 2040 ────────── 2050
 │               │               │               │
507 kgCO₂/t    500 kgCO₂/t    ~300 kgCO₂/t     0 kgCO₂/t
Línea Base     Meta Intermedia  Aceleración     Net Zero
```

Cards por hito con indicadores clave:
- 2023: Situación actual
- 2030: Primeras reducciones (F.Clínker 65%, Coproc 10%)
- 2040: Inicio CCUS, electricidad renovable
- 2050: Net Zero logrado

---

### SECCIÓN 5: EL PROTAGONISTA - CCUS
**Concepto**: Destacar que CCUS aporta el 45% de la reducción
**Mensaje**: "La tecnología clave: Captura de carbono"

Layout especial (card destacada):
```
┌─────────────────────────────────────────────┐
│  ⚡ CCUS: CAPTURA Y ALMACENAMIENTO DE CO₂   │
│                                             │
│         ████████████████████░░░░░           │
│                  45%                        │
│         del esfuerzo de reducción           │
│                                             │
│  Estado: En desarrollo                      │
│  Disponibilidad comercial: 2030-2040        │
│                                             │
│  • Captura post-combustión                  │
│  • Almacenamiento geológico                 │
│  • Uso de CO₂ en productos                  │
│  • Soluciones basadas en naturaleza         │
│                                             │
│  [Badge: Tecnología crítica]                │
└─────────────────────────────────────────────┘
```

Badge visual que indica "tecnología aún no disponible comercialmente"

---

### SECCIÓN 6: CONTEXTO GLOBAL - Comparativas (Colapsable)
**Concepto**: Argentina en contexto internacional
**Mensaje**: "Alineados con el mundo"

Inicialmente colapsado, expande para mostrar:
- Tab 1: Factor Clínker por país (líneas temporales)
- Tab 2: Coprocesamiento por país
- Tab 3: Canales de distribución

Datos internacionales:
| País | Factor Clínker 2050 | Coprocesamiento 2050 |
|------|---------------------|----------------------|
| Argentina | 61% | 18% |
| Chile | 61% | 68% |
| Colombia | 63% | 50% |
| EU | 65% | 90% |
| USA | 78% | 52% |

---

### SECCIÓN 7: LOS 11 EJES - Explorador Técnico
**Concepto**: Grid de cards con los 11 ejes de descarbonización
**Mensaje**: "Detalle técnico para especialistas"

Layout: Grid 3x4 (11 cards + 1 resumen)
Cada card muestra:
- Código (E01-E11)
- Nombre del eje
- Aporte (%)
- Indicador principal
- Color del grupo al que pertenece

Click en card: expande modal/panel con:
- Descripción completa
- Medidas específicas
- Valores: Actual → 2030 → 2050
- Desafíos y oportunidades

---

### SECCIÓN 8: FOOTER - Metodología y Fuentes
**Concepto**: Credibilidad y transparencia
**Mensaje**: "Metodología rigurosa, compromiso verificable"

Contenido:
- Alineación: Acuerdo de París, NDC Argentina
- Metodología: GCCA Roadmap Template, ECRA, FICEM
- Fuentes: GNR 2023, AFCP, datos sectoriales
- Disclaimer: Metas condicionadas a marcos regulatorios y financiamiento
- Logos de socios: AFCP, FICEM, GCCA, ONUDI

---

## 3. ESTRUCTURA TÉCNICA ANTERIOR (Referencia)

### 3.1 HERO / RESUMEN EJECUTIVO (Always visible)

**Meta Principal**
```
NET ZERO 2050
De 6.7 MtCO₂ → 0 MtCO₂
(mientras producción crece 55%)
```

**KPIs Resumen** (4 cards)
| KPI | Valor LB | Valor 2050 | Icono |
|-----|----------|------------|-------|
| Producción Cemento | 12.6 Mt | 19.5 Mt | Factory |
| Factor Clínker | 67% | 61% | Layers |
| Coprocesamiento | 7% | 18% | Recycle |
| Emisiones Netas | 507 kgCO₂/t | 0 | TrendingDown |

---

### 2.2 GRÁFICO CENTRAL: CASCADA DE DESCARBONIZACIÓN

**Tipo**: Waterfall Chart interactivo
**Concepto**: Mostrar cómo se va reduciendo desde BAU 2050 (10.4 MtCO₂) hasta Net Zero (0)

```
[BAU 2050: 10.4 MtCO₂]
    ↓ -18% Grupo A (Diseño y Hormigón)
    ↓ -19% Grupo B (Factor Clínker y Coprocesamiento)
    ↓ -45% Grupo C (CCUS y SBN)
    ↓ -5%  Grupo D (Electricidad)
    ↓ -13% Grupo E (Recarbonatación)
[NET ZERO: 0 MtCO₂]
```

**Interactividad**:
- Hover sobre cada bloque → muestra tooltip con detalle
- Click en bloque → scroll a sección del grupo correspondiente

---

### 2.3 LOS 5 GRUPOS Y 11 EJES (Sección expandible)

**Layout**: Acordeón de grupos, cada uno expandible para mostrar sus ejes

#### GRUPO A: Diseño, Construcción y Hormigón (18%)

| Eje | Nombre | Aporte | Indicador | LB → 2050 |
|-----|--------|--------|-----------|-----------|
| E01 | Diseño y Construcción | 11% | Reducción CO₂ D&C | 0% → 11% |
| E02 | Eficiencia Producción Hormigón | 7% | kg cem/m³ | 382 → 335 |

**Contenido expandible de cada eje**:
- Descripción técnica (1 párrafo)
- Medidas específicas (lista)
- Desafíos
- Oportunidades
- Medidas habilitantes

#### GRUPO B: Factor Clínker y Coprocesamiento (19%)

| Eje | Nombre | Aporte | Indicador | LB → 2050 |
|-----|--------|--------|-----------|-----------|
| E03 | Cemento y Adiciones | 7% | Factor Clínker | 67% → 61% |
| E04 | Eficiencia Térmica | 1% | MJ/tCk | 3,425 → 3,300 |
| E05 | Combustibles Fósiles | 2% | % Fósiles | 93% → 77% |
| E06 | CDR Fósiles | 2% | % CDR | 3% → 8% |
| E07 | Biomasa y Metano | 5% | % Biomasa | 4% → 10% |
| E08 | Hidrógeno | 1% | % H₂ | 0% → 5% |

#### GRUPO C: Capturas Tecnológicas (45%)

| Eje | Nombre | Aporte | Indicador | LB → 2050 |
|-----|--------|--------|-----------|-----------|
| E09 | CCUS y SBN | 45% | % Captura | 0% → 45% |

**Nota especial**: Este es el eje más crítico y depende de tecnologías aún no disponibles comercialmente. Debe destacarse visualmente.

#### GRUPO D: Electricidad Carbono Neutral (5%)

| Eje | Nombre | Aporte | Indicador | LB → 2050 |
|-----|--------|--------|-----------|-----------|
| E10 | Electricidad Baja en Carbono | 5% | Factor eléctrico | 272 → 14 gCO₂/kWh |

#### GRUPO E: Recarbonatación (13%)

| Eje | Nombre | Aporte | Indicador | LB → 2050 |
|-----|--------|--------|-----------|-----------|
| E11 | Recarbonatación del Hormigón | 13% | % Recarb. | 0% → 13% |

---

### 2.4 VISUALIZACIONES COMPARATIVAS (Tabs o Carousel)

#### Tab 1: Escenario BAU vs Net Zero
**Tipo**: Gráfico de áreas o líneas
**Datos**:
| Año | BAU (MtCO₂) | Net Zero (MtCO₂) |
|-----|-------------|------------------|
| 2023 | 6.7 | 6.7 |
| 2030 | 7.8 | 5.8 |
| 2040 | 9.1 | 3.5 |
| 2050 | 10.4 | 0 |

#### Tab 2: Factor Clínker Comparativo
**Tipo**: Line chart con múltiples series (países)
**Datos** (de imagen "canales 2050 2"):
| País/Región | LB | 2030 | 2050 |
|-------------|-----|------|------|
| Argentina | 67% | 65% | 61% |
| Colombia | 68% | 69% | 63% |
| Chile | 71% | 70% | 61% |
| Perú | 76% | 71% | 55% |
| USA | 95% | 89% | 78% |
| EU | 77% | 75% | 65% |
| India | 75% | 77% | 60% |
| China | 63% | 65% | 54% |
| FICEM | 67% | 65% | 60% |
| GCCA | 75% | 65% | 54% |

#### Tab 3: Coprocesamiento Comparativo
**Tipo**: Line chart con múltiples series
**Datos** (de imagen "tecncias 2050 2"):
| País/Región | LB | 2030 | 2050 |
|-------------|-----|------|------|
| Argentina | 7% | 10% | 18% |
| Chile | 15% | 30% | 68% |
| Colombia | 8% | 18% | 50% |
| Perú | 0% | 8% | 45% |
| EU | 46% | 60% | 90% |
| USA | 8% | 25% | 52% |
| India | 6% | 15% | 28% |
| China | 2% | 8% | 25% |
| FICEM | 11% | 22% | 50% |
| GCCA | 8% | 25% | 43% |

#### Tab 4: Canales de Distribución
**Tipo**: Stacked area chart
**Datos** (de imagen "canales distribucion"):

**Participación por Canal (%)**:
| Canal | LB | 2030 | 2040 | 2050 |
|-------|-----|------|------|------|
| Sacos | 64% | 59% | 50% | 40% |
| Readymix | 28% | 33% | 39% | 45% |
| Precast | 5% | 5% | 7% | 10% |
| Silos | 3% | 3% | 4% | 5% |

**Factor Clínker por Canal (%)**:
| Canal | LB | 2030 | 2040 | 2050 |
|-------|-----|------|------|------|
| Sacos | 60% | 60% | 55% | 50% |
| Readymix | 80% | 75% | 73% | 66% |
| Precast | 80% | 75% | 73% | 65% |
| Silos | 80% | 75% | 73% | 70% |

---

### 2.5 MATRIZ DE COMBUSTIBLES (Sección visual)

**Tipo**: Stacked bar chart o Sankey diagram
**Muestra evolución**: LB → 2030 → 2040 → 2050

| Combustible | LB (2023) | 2030 | 2040 | 2050 |
|-------------|-----------|------|------|------|
| Gas Natural | 82% | 82% | 79% | 75% |
| Petcoke | 11% | 8% | 5% | 2% |
| CDR Fósil | 3% | 5% | 6% | 8% |
| Biomasa | 4% | 5% | 8% | 10% |
| Hidrógeno | 0% | 0% | 2% | 5% |

**Total Fósiles**: 93% → 90% → 84% → 77%
**Total Coprocesamiento**: 7% → 10% → 14% → 18%

---

### 2.6 COMPOSICIÓN DEL CEMENTO (Visualización tipo donut/pie)

**Tipo**: Donut chart comparativo (LB vs 2050)

| Componente | LB | 2030 | 2040 | 2050 |
|------------|-----|------|------|------|
| Clínker | 67% | 65% | 63% | 61% |
| Yeso | 5% | 5% | 5% | 5% |
| Caliza | 17% | 15% | 18% | 20% |
| Escoria | 5% | 4% | 5% | 5% |
| Cenizas Volantes | 0% | 2% | 1% | 0% |
| Puzolana | 5% | 5% | 4% | 3% |
| Arcillas Calcinadas | 1% | 3% | 5% | 5% |
| Otras | 0% | 1% | 1% | 1% |

---

### 2.7 TECNOLOGÍAS CLAVE (Cards destacadas)

5 cards con tecnologías transformacionales:

1. **CCUS** (Captura y Almacenamiento de CO₂)
   - Aporte: 45%
   - Estado: En desarrollo
   - Disponibilidad comercial: 2030-2040

2. **Hidrógeno Verde**
   - Aporte: 1%
   - Estado: Pilotos
   - Disponibilidad comercial: 2035+

3. **Arcillas Calcinadas**
   - Aporte: Parte del 7% Factor Clínker
   - Estado: Disponible
   - Aplicación: En expansión

4. **Electricidad Renovable**
   - Aporte: 5%
   - Estado: Disponible
   - Factor: 272 → 14 gCO₂/kWh

5. **Recarbonatación**
   - Aporte: 13%
   - Estado: En cuantificación
   - Tipo: Proceso natural del hormigón

---

### 2.8 INDICADORES DE SEGUIMIENTO (Tabla resumen)

**Propósito**: Mostrar qué se medirá año a año

| Indicador | Unidad | LB 2023 | 2030 | 2040 | 2050 |
|-----------|--------|---------|------|------|------|
| Producción Cemento | Mt | 12.6 | 14.8 | 17.0 | 19.5 |
| Producción Clínker | Mt | 8.5 | 9.7 | 10.7 | 13.1 |
| Factor Clínker | % | 67% | 65% | 63% | 61% |
| Emisiones Brutas | kgCO₂/t | 503 | 491 | 486 | 485 |
| Emisiones Netas | kgCO₂/t | 495 | 477 | 464 | 0 |
| Coprocesamiento | % | 7% | 10% | 14% | 18% |
| Biomasa | % | 4% | 5% | 8% | 10% |
| Consumo Térmico | MJ/tCk | 3,425 | 3,400 | 3,350 | 3,300 |
| Factor Eléctrico | gCO₂/kWh | 272 | 200 | 100 | 14 |
| Consumo Hormigón | Mm³ | 33 | 37 | 44 | 50 |
| Cemento en Hormigón | kg/m³ | 382 | 377 | 356 | 335 |

**Nota**: La carga de datos anuales se realizará desde el panel de Administración (fuera del alcance de esta página).

---

### 2.9 NOTA METODOLÓGICA (Footer section)

Contenido:
- Alineación con Acuerdo de París y NDC Argentina
- Metodología: GCCA Roadmap Template, ECRA, Hoja de Ruta FICEM
- Fuentes: GNR 2023, AFCP, FICEM
- Disclaimer: Metas condicionadas a marcos regulatorios y financiamiento

---

## 3. COMPORTAMIENTO E INTERACTIVIDAD

### 3.1 Navegación Principal
- **Scroll suave** entre secciones
- **Navegación lateral** (dots o mini-nav) para saltar entre secciones
- **Back to top** button

### 3.2 Interactividad del Waterfall Chart
- **Hover**: Tooltip con datos del grupo
- **Click**: Scroll animado a la sección del grupo
- **Estado activo**: Highlight del bloque correspondiente a sección visible

### 3.3 Acordeón de Grupos y Ejes
- **Estado inicial**: Todos los grupos colapsados, mostrando solo título + % aporte
- **Expandir grupo**: Muestra tabla de ejes del grupo
- **Expandir eje**: Modal o panel lateral con detalle completo
- **Indicador visual**: Chevron o +/- para indicar expandibilidad

### 3.4 Tabs de Visualizaciones
- **Navegación por tabs**: Click para cambiar entre gráficos
- **Animación**: Transición suave entre tabs
- **Responsive**: En mobile, convertir a carousel swipeable

### 3.5 Tooltips en Gráficos
- **Hover en líneas/barras**: Mostrar valor exacto
- **Formato consistente**: Año, Indicador, Valor, Unidad

### 3.6 Cards de Tecnologías
- **Hover**: Elevación y highlight
- **Click**: Expande con más información o abre modal

---

## 4. JERARQUÍA VISUAL

### 4.1 Orden de Importancia
1. **Meta Net Zero** (más destacado)
2. **Waterfall de descarbonización** (cuenta la historia)
3. **5 Grupos con sus ejes** (el detalle técnico)
4. **Visualizaciones comparativas** (contexto internacional)
5. **Indicadores de seguimiento** (para tracking futuro)

### 4.2 Colores Sugeridos por Grupo
- **Grupo A** (Diseño y Hormigón): Verde claro `#10B981`
- **Grupo B** (Factor Clínker): Azul verdoso `#14B8A6`
- **Grupo C** (CCUS): Azul principal `#5B9BD5`
- **Grupo D** (Electricidad): Amarillo `#F59E0B`
- **Grupo E** (Recarbonatación): Gris azulado `#64748B`

### 4.3 Destacados Especiales
- **CCUS (45%)**: Debe tener tratamiento visual especial por ser el eje más crítico
- **Tecnologías no disponibles**: Indicador visual (badge "En desarrollo")

---

## 5. CONSIDERACIONES TÉCNICAS

### 5.1 Datos
- Todos los datos provienen de `data.ts`
- Estructura ya existente: `ejesDescarbonizacion`, `gruposDescarbonizacion`, `matrizCombustibles`, `evolucionCombustibles`, `composicionCemento`
- Datos adicionales a agregar: comparativas internacionales, canales de distribución

### 5.2 Componentes Reutilizables
- KPI Card (ya existe en 2030)
- Progress indicator
- Collapsible/Accordion
- Tabs component
- Tooltip component

### 5.3 Gráficos (Recharts)
- LineChart para evoluciones temporales
- BarChart para comparativas
- AreaChart para escenarios BAU vs NZ
- ComposedChart para waterfall (simulado)
- PieChart/DonutChart para composición

### 5.4 Responsive
- Desktop: Layout completo con sidebar de navegación
- Tablet: Layout simplificado, tabs en lugar de grid
- Mobile: Stack vertical, carousels para gráficos múltiples

---

## 6. WIREFRAME CONCEPTUAL

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: Trayectoria 2050                                   │
│  Subtítulo: Visión de largo plazo hacia Net Zero            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  META NET ZERO 2050                                  │   │
│  │  ═══════════════                                     │   │
│  │  De 6.7 MtCO₂ → 0 MtCO₂                             │   │
│  │  [====================100%=================>]        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐                   │
│  │ Prod. │ │Factor │ │Coproc.│ │Emis.  │   4 KPI Cards     │
│  │ 19.5Mt│ │ 61%   │ │ 18%   │ │ 0     │                   │
│  └───────┘ └───────┘ └───────┘ └───────┘                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  WATERFALL: Cascada de Descarbonización                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ BAU ████████████████████████████████████ 10.4        │  │
│  │     ├─ Grupo A ████░░░░░░░░░░░░░░░░░░░░░ -18%       │  │
│  │     ├─ Grupo B █████░░░░░░░░░░░░░░░░░░░░ -19%       │  │
│  │     ├─ Grupo C █████████████████░░░░░░░░ -45%       │  │
│  │     ├─ Grupo D █░░░░░░░░░░░░░░░░░░░░░░░░ -5%        │  │
│  │     └─ Grupo E ████░░░░░░░░░░░░░░░░░░░░░ -13%       │  │
│  │ NZ  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 0         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  LOS 11 EJES DE DESCARBONIZACIÓN                           │
│                                                             │
│  ▼ GRUPO A: Diseño, Construcción y Hormigón (18%)          │
│    ├─ E01 Diseño y Construcción          11%  [→]          │
│    └─ E02 Eficiencia Producción Hormigón  7%  [→]          │
│                                                             │
│  ▶ GRUPO B: Factor Clínker y Coproc. (19%)     [click]     │
│  ▶ GRUPO C: Capturas Tecnológicas (45%)        [click]     │
│  ▶ GRUPO D: Electricidad Carbono Neutral (5%)  [click]     │
│  ▶ GRUPO E: Recarbonatación (13%)              [click]     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  VISUALIZACIONES                                            │
│  ┌────────┬────────┬────────┬────────┐                     │
│  │BAU vs NZ│F.Clínker│Coproc. │Canales │  ← Tabs           │
│  └────────┴────────┴────────┴────────┘                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                      │  │
│  │              [GRÁFICO ACTIVO]                        │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  MATRIZ DE COMBUSTIBLES                                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 2023  █████████████████████░░░░░░░░░░░░░░░░░░░░░░░  │  │
│  │ 2030  █████████████████████░░░░░░░░░░░░░░░░░░░░░░░  │  │
│  │ 2040  ██████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░  │  │
│  │ 2050  ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  │
│  │       [Gas][Petcoke][CDR][Biomasa][H2]              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  TECNOLOGÍAS CLAVE                                          │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐        │
│  │ CCUS  │ │  H2   │ │Arcilla│ │Electr.│ │Recarb.│        │
│  │ 45%   │ │  1%   │ │Calcin.│ │  5%   │ │ 13%   │        │
│  └───────┘ └───────┘ └───────┘ └───────┘ └───────┘        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  INDICADORES DE SEGUIMIENTO                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Indicador      │ LB   │ 2030 │ 2040 │ 2050 │        │  │
│  │ Factor Clínker │ 67%  │ 65%  │ 63%  │ 61%  │        │  │
│  │ Coprocesamiento│  7%  │ 10%  │ 14%  │ 18%  │        │  │
│  │ ...            │ ...  │ ...  │ ...  │ ...  │        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  NOTA METODOLÓGICA                                          │
│  Alineación con Acuerdo de París • Metodología GCCA/FICEM  │
│  Fuentes: GNR 2023, AFCP • Metas condicionadas             │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. PRÓXIMOS PASOS

1. [ ] Validar esta especificación con stakeholders
2. [ ] Crear mockup visual en herramienta de diseño
3. [ ] Agregar datos faltantes a `data.ts` (comparativas internacionales, canales)
4. [ ] Implementar componentes base (Accordion, Tabs mejorados)
5. [ ] Desarrollar página por secciones
6. [ ] Testing de interactividad y responsive

---

*Documento de especificación v1.0 - 10 de Diciembre 2024*
