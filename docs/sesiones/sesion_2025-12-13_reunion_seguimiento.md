# Interpretación Reunión - Sistema de Seguimiento MRV

**Fecha**: 13 de Diciembre 2025
**Participantes**: Ricardo (jefe), Carlos (desarrollador), Eduardo, Jessica
**Fuente**: Transcripción de audio

---

## Hallazgo Principal: UN PROCESO CON CAPAS INCREMENTALES

No son dos procesos separados. Es un **único proceso de reporte anual** estructurado en capas:

### Capa Base: GNR (mayoría de indicadores)
Datos del protocolo GCCA "Getting the Numbers Right":
- Emisiones netas, Factor clínker, Eficiencia térmica
- Combustibles convencionales (gas, petcoke, biomasa, CDR)
- Consumo eléctrico, Coprocesamiento

### Capa Adicional 2030: Indicadores NO cubiertos por GNR
- **Hidrógeno** (1% meta 2030 - GNR no lo incluye)
- Otros indicadores emergentes que GNR no contempla

### Capa Adicional 2050: Indicadores de largo plazo
- CCUS (% captura)
- Soluciones basadas en naturaleza (SbN)
- Recarbonatación
- Indicadores técnicos de ejes emergentes

### Diferencia de Granularidad
| Capa | Nivel de reporte |
|------|------------------|
| GNR + adicionales 2030 | Por planta |
| Adicionales 2050 | Consolidado por empresa |

### Prioridades
- **2030**: Presión actual - empresas deben mostrar cumplimiento
- **2050**: Preparar plataforma, sin urgencia operativa inmediata

---

## Rediseño Propuesto

### Formulario Único Anual (por empresa)
```
Reporte Anual [Año]
├── Sección A: Datos GNR (por planta) ─────── Base común
├── Sección B: Indicadores 2030 no-GNR ────── Hidrógeno, etc.
└── Sección C: Indicadores 2050 (empresa) ─── CCUS, SbN, etc.
```

### Estructura de Navegación
```
/seguimiento
├── /submit-data          # Formulario unificado con secciones
├── /review-approve       # Supervisor revisa todo junto
├── /monitoring           # AFCP ve progreso
├── /aggregation          # FICEM agrega
└── /trajectories
    ├── Vista 2030 (KPIs principales)
    └── Vista 2050 (cascada + 11 ejes)
```

---

## Indicaciones sobre Páginas y Dashboards (citas textuales)

### Branding y Header
- "net 0 2050 no tenéis problema ponerla arriba Argentina... cosa que cuando porque como esa parte se queda fija para saber que uno está en la net 0 de Argentina" (líneas 657-670)
- "el logo nombre... lo tiráis ahí arriba y el resto lo dejan ahí abajo... cosa que no siempre sienta que está en la plataforma oficial" (líneas 679-691)
- **Acción**: Logo FICEM + "Net Zero 2050 Argentina" visible en parte fija (HECHO)

### Página 2050 - Necesita más trabajo
- "todavía falta trabajar especialmente este esta historia 2050... va a necesitar como subniveles aquí con más información" (líneas 402-412)
- "voy a necesitar aquí más más de un nivel probablemente o bien mucho más interactiva esta página" (líneas 1237-1244)
- **Acción**: Agregar subniveles de información, más interactividad

### Cascada - Elemento Central
- "al 2050 si le falta debería tener como parte central la cascada todo partir desde la cascada" (líneas 1104-1111)
- "la cascada tener acceso interactivo de seleccionar hay un eje y ahí te explica se despliega el eje" (líneas 1117-1127)
- "si tenés la cascada y tenés esas tablas que vienen en cada uno los ejes capaz que tú lo que debes es agregar una nueva tabla un seguimiento el año y te aparezca lo que está comprometido al 2030 al 40 al 50" (líneas 1129-1146)
- "la cascada como entrada total... la cascada la descripción de los ejes y las metas 2030 2050 y el avance" (líneas 1219-1234)
- "ahí al pinchar uno debería ver la cascada... debería aparecer la cascada grande la de los 5 ejes" (líneas 2108-2112)
- **Acción**: Cascada interactiva como entrada principal en 2050

### Cascada en Home
- "en el home debería estar la cascada también Carlos... quizá más estilizado mucho más estilizado" (líneas 1469-1479)
- **Acción**: Agregar cascada estilizada en página de inicio

### Benchmarking
- "el benchmarking igual me falta trabajarlo especialmente porque tú ese gráfico que tú querías ese tengo que incorporar" (líneas 440-448)
- "emisiones net por países... este es el que me gusta... tenía arriba los grandes indicadores Argentina perfecto global y después lo tenía ahí con el color de Argentina los otros grises" (líneas 456-484)
- "¿qué año estamos siguiendo? ¿cómo podemos saber el año ahí?... le falta más interactividad le falta poder seleccionar el año" (líneas 489-501)
- "aquí yo pensaba poner el gráfico tuyo... el horizontal que mezcla net gross factor clínico procesamiento... ese al centro" (líneas 505-519)
- **Acción**: Gráfico horizontal combinado, selector de año, Argentina destacada

### Trayectoria 11 Ejes
- "a la otra le llamáis trayectoria 11 ejes y lo dejáis arriba sí lo dejáis al comienzo" (líneas 2114-2116)
- "tendrías que caer en el orden de 1, 2, 3, 4... 1 de 11" (líneas 2127-2128)
- **Acción**: Ordenar ejes del 1 al 11

### Seguimiento - Página Principal
- "esta que sería como la página de inicio de la sección de seguimiento que explica el proceso y tiene como los principales indicadores y abajo faltan los logos pero ahí pueden ir los logos de las compañías" (líneas 1065-1079)
- **Acción**: Logos de compañías participantes (HECHO)

### Colores y Diseño
- "los colores me preocupé" (líneas 395-396)
- "quiero probarlo en blanco y negro o en todo en azul con fondo blanco" (líneas 2148-2150)

### Timeline de Entrega
- "relájate entrégalo la próxima semana y lo trabajamos en enero con ellos... hacemos la parte más ya de uso de usuario y lo trabajamos tranquilo el próximo año" (líneas 1246-1259)
- "los estructurales están por ejemplo la conexión con la app y el manejo de usuario y los dos servicios que son el de usuario y el de proceso" (líneas 1262-1269)

---

## Resumen de Acciones Pendientes

| Página | Acción | Prioridad | Estado |
|--------|--------|-----------|--------|
| Header/Sidebar | Logo FICEM + Argentina visible | Alta | HECHO |
| /seguimiento | Logos compañías participantes | Alta | HECHO |
| /2050 | Cascada interactiva como elemento central | Alta | HECHO |
| /2050 | Subniveles de información por eje | Alta | HECHO |
| /2050 | Tablas de metas (LB→2030→2040→2050→Actual) | Alta | HECHO |
| / (Home) | Cascada estilizada | Media | HECHO |
| /benchmarking | Selector de año | Media | Pendiente |
| /benchmarking | Argentina destacada, otros grises | Media | Pendiente |
| /benchmarking | Gráfico horizontal combinado (net, gross, factor clínker) | Media | Pendiente |
| /2050 | Ordenar ejes 1-11 | Baja | Pendiente |

---

## Implementación Realizada (13/dic/2025)

### Componente CascadaInteractiva
**Archivo**: `app/src/components/charts/CascadaInteractiva.tsx`

Nuevo componente de gráfico waterfall interactivo que muestra los 5 grupos de descarbonización:
- Barras que "caen" desde 100% (Línea Base) hasta 0% (Net Zero)
- Clic en cada grupo expande panel con sus ejes de acción
- Tooltips informativos con descripción de cada grupo
- Prop `onEjeSelect` para abrir modal de detalle
- Prop `compact` para versión reducida
- Leyenda de grupos interactiva

### Página /2050 Renovada
**Archivo**: `app/src/app/2050/page.tsx`

Cambios realizados:
1. **Cascada como elemento central** - Reemplazó el PieChart anterior
2. **Nueva sección "Cinco Caminos hacia Net Zero"** con:
   - Badge indicando "Elemento Central de la Hoja de Ruta"
   - Instrucciones de interactividad
   - Componente CascadaInteractiva integrado
3. **Tabla de metas por grupo** con columnas:
   - Grupo | Aporte Total | Ejes | Horizonte | Estado
4. **Tabla de metas por eje (11 ejes)** con columnas:
   - Eje | Indicador | LB | 2030 | 2040 | 2050 | Aporte
   - Filas clicables que abren modal de detalle
5. **Vista rápida por eje** - Grid de tarjetas compactas

Imports agregados:
- `Target` de lucide-react
- `CascadaInteractiva` componente

### Cascada Estilizada en Home
**Archivo**: `app/src/app/page.tsx`

Nueva sección "Estrategia de Descarbonización" entre las cards de navegación y el timeline:
- Visualización horizontal simplificada de la cascada
- Secuencia: Línea Base (100%) → Grupos de reducción → Net Zero (0%)
- Cada grupo con altura proporcional a su aporte
- Leyenda de colores por grupo
- Enlace directo a /2050 para ver más detalles

Import agregado:
- `gruposDescarbonizacion` de `@/lib/data`

### Archivos Modificados
| Archivo | Tipo | Descripción |
|---------|------|-------------|
| `app/src/components/charts/CascadaInteractiva.tsx` | Nuevo | Componente waterfall interactivo |
| `app/src/app/2050/page.tsx` | Modificado | Integración cascada + tablas de metas |
| `app/src/app/page.tsx` | Modificado | Cascada estilizada en Home |

### Datos Utilizados
**Archivo**: `app/src/lib/data.ts`

Estructuras de datos existentes aprovechadas:
- `gruposDescarbonizacion`: 5 grupos con nombre, aporte, color y ejes
- `ejesDescarbonizacion`: 11 ejes con indicadores, metas y medidas

---

## Próximos Pasos
1. Entregar próxima semana (estructura lista)
2. Enero: trabajar mejoras de UX con usuarios
3. Marcha blanca con empresas
4. Implementar mejoras de benchmarking (selector de año, Argentina destacada)

*Generado desde transcripción de reunión del 13/dic/2025*
*Actualizado con implementación del 13/dic/2025*
