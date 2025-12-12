# Fuentes de Datos - Net Zero Argentina 2050

Este documento describe los archivos fuente utilizados para poblar los datos de la aplicación.

---

## Archivos Excel (en `docs/source/`)

### 1. GCCA_FICEM Argentina_Taller 3_Agosto2025_1.xlsx
**Fuente principal de datos para la aplicación**

| Hoja | Contenido | Uso en la app |
|------|-----------|---------------|
| `GNR` | Datos GNR (Getting the Numbers Right) Argentina 2023 | KPIs principales, emisiones específicas |
| `Trayectoria` | Proyecciones 2023-2050 | Gráfico de trayectoria Net Zero |
| `Ejes` | 11 ejes de descarbonización con contribuciones | Hoja de Ruta, grupos A-E |
| `Combustibles` | Matriz de combustibles línea base y metas | Calculadora |
| `Benchmarking` | Comparativa Argentina vs LAC vs Global | Dashboard comparativo |

**Datos clave extraídos:**
- Emisiones específicas: 507 kgCO₂/t cemento (2023)
- Factor clínker: 67%
- Eficiencia térmica: 3,425 MJ/tCk
- Coprocesamiento: 7%
- Producción: 12.55 Mt/año

---

### 2. Comparativo GNR Argentina 2023_27-03-25.xlsx
**Comparativa internacional GNR**

| Contenido | Uso |
|-----------|-----|
| Benchmarking emisiones por región | Gráfico comparativo Dashboard |
| Factores de emisión por proceso | Validación de cálculos |

---

### 3. 00 HR Argentina Taller Cierre_25-11-25.xlsx
**Taller de cierre - Noviembre 2025**

| Contenido | Uso |
|-----------|-----|
| Validación de metas finales | Pendiente de integrar |
| Ajustes a trayectorias | Pendiente de integrar |

---

### 4. Rep Sostenibilidad CONSOLIDADO 15.5.25.xlsx
**Reporte de sostenibilidad consolidado**

| Contenido | Uso |
|-----------|-----|
| Indicadores de sostenibilidad | Pendiente de integrar |
| Datos de plantas individuales | Pendiente de integrar |

---

## Documento PDF Principal

### HR NET ZERO ARGENTINA 2050_23 nov.pdf
**Hoja de Ruta oficial (496 MB, 58 páginas)**

| Contenido | Uso |
|-----------|-----|
| Paleta de colores oficial | Variables CSS del tema |
| Logos institucionales | Sidebar (extraídos con `extract_logos.py`) |
| Contenido textual | Sección "Sobre" |
| Gráficos de referencia | Diseño de visualizaciones |

**Archivo de texto extraído:** `HR_NET_ZERO_ARGENTINA_2050.txt`

---

## Imágenes de Referencia (capturas de pantalla)

| Archivo | Contenido |
|---------|-----------|
| `grtafico bencjhmarking - Captura de pantalla 2025-12-09 105937.png` | Gráfico comparativo de emisiones |
| `canales distribucion - Captura de pantalla 2025-12-09 110007.png` | Canales de distribución de reducción |
| `canales 2050 2 - Captura de pantalla 2025-12-09 110102.png` | Canales de distribución meta 2050 |
| `tecncias 2050 2 - Captura de pantalla 2025-12-09 110102.png` | Técnicas de reducción 2050 |

---

## Mapeo Datos → Código

### `app/src/lib/data.ts`

El archivo centralizado de datos contiene:

```typescript
// Fuente: GCCA_FICEM Argentina_Taller 3_Agosto2025_1.xlsx
export const kpiData = { ... }           // KPIs principales
export const gruposDescarbonizacion      // Grupos A-E con aportes
export const ejesDescarbonizacion        // 11 ejes detallados
export const trayectoriaData             // Proyección 2023-2050
export const comparativaEmisiones        // Argentina vs LAC vs Global
export const emisionesDetalladas         // Desglose por proceso
export const matrizCombustibles          // Mix energético
```

---

## Notas

1. **Archivos en `.gitignore`**: Los archivos Excel y PDF no se suben al repositorio por su tamaño
2. **Actualización**: Al recibir nuevos datos, actualizar este documento y `data.ts`
3. **Validación**: Los datos de `data.ts` fueron validados contra los Excel en la sesión del 9 de diciembre 2024

---

*Última actualización: 9 de Diciembre 2024*
