# Contenidos de la Aplicación - Net Zero Argentina 2050

**Objetivo**: Calculadora/herramienta web para seguimiento de la Hoja de Ruta
**Fuentes**: PDF Hoja de Ruta + 4 Excel (principal: `GCCA_FICEM Argentina_Taller 3_Agosto2025_1.xlsx`)

## Diferencia Clave

**2030** (simple): 4 KPIs medibles, tecnología disponible, brecha pequeña (7 kg)
**2050** (complejo): 11 ejes, tecnologías no disponibles (CCUS), brecha grande (507 kg)

---

## Estructura de la Aplicación (según ARQUITECTURA_PAGINAS_V2.md)

### 1. HOME (/)
**Estado**: ✅ Implementada (rediseñada 11/dic)

**Contenido**:
- Hero destacando liderazgo de Argentina (495 vs 598 kgCO₂/tcem)
- Compromiso dual visualizado: +55% producción / -100% emisiones
- 4 tarjetas de navegación (2030, 2050, Benchmarking, Calculadora)
- Timeline visual 2023→2030→2040→2050

---

### 2. TRAYECTORIA 2030 (/2030)
**Estado**: ✅ Implementada

**Enfoque**: Metas de corto plazo con indicadores medibles HOY

**Contenido clave**:

#### Meta Principal 2030
- **<500 kgCO₂/tcem** (emisiones netas)
- Brecha pequeña: de 507 (2023) a <500 = solo 7 kg de diferencia
- Contexto histórico: 612 (1990) → 507 (2023) = -17%

#### 4 KPIs Principales con Progreso Actual

| Indicador | Actual (2023) | Meta 2030 | Progreso |
|-----------|---------------|-----------|----------|
| **Emisiones netas** | 507 kgCO₂/t | <500 | 98% ✓ |
| **Factor clínker** | 67% | 65% | 67% 🔶 |
| **Coprocesamiento** | 7% | 10% | 70% 🔶 |
| **Biomasa** | 4% | 5% | 80% ✓ |

#### Desafíos 2030
1. Reducir factor clínker a 67.5% (actualmente 67%)
2. Alcanzar 10% coprocesamiento (actualmente 7%)
3. Implementar sistemas MRV (Medición, Reporte, Verificación)

#### Medidas Habilitantes Requeridas
- Normas técnicas para aumentar adiciones en cemento
- Compras públicas que incentiven cemento bajo en carbono
- Marcos regulatorios para coprocesamiento de residuos

#### Benchmarking Internacional
- Argentina: 507 kgCO₂/tcem 🥇
- LAC (promedio): 589 kgCO₂/tcem
- Global (promedio): 624 kgCO₂/tcem

**Datos fuente**: Hoja "2030" + "LB" del Excel GCCA_FICEM

---

### 3. TRAYECTORIA 2050 (/2050)
**Estado**: ✅ Implementada (narrativa completa 10/dic)

**Enfoque**: Visión transformacional de largo plazo hacia Net Zero

**Contenido clave**:

#### Meta Principal 2050
- **Net Zero** = 0 kgCO₂/tcem (emisiones netas)
- Reducción total: de 507 → 0 kgCO₂/t

#### El Desafío: Escenario BAU vs Net Zero

| Escenario | Producción 2050 | Emisiones 2050 |
|-----------|----------------|----------------|
| **BAU** (Business as Usual) | 19.5 Mt (+55%) | 10.4 MtCO₂ 🔴 |
| **Net Zero** | 19.5 Mt (+55%) | 0 MtCO₂ ✅ |

**Paradoja**: Producir 55% MÁS cemento mientras se eliminan el 100% de las emisiones

---

#### Los 5 Pilares de Descarbonización

Análisis de la hoja "Resumen Ejes de Reduccion" del Excel:

**Pilar A - Eficiencia en Diseño y Construcción (13% de reducción)**
- Eje 2: D&C (Diseño y Construcción)
- Eje 3: Concreto (Eficiencia en producción de hormigón)

**Pilar B - Clínker y Cemento (24%)**
- Eje 4: Cem&Adic (Cementos con adiciones, arcillas calcinadas)
- Eje 5: Efic. Term (Eficiencia térmica en hornos)

**Pilar C - Combustibles Alternativos (13%)**
- Eje 6: Fosil Conv (Combustibles fósiles convencionales optimizados)
- Eje 7: Fosil Alt (Combustibles fósiles alternativos, coprocesamiento)
- Eje 8: Biomasa
- Eje 11: Metano evitado (captura de metano de biomasa)

**Pilar D - Tecnologías Emergentes (28%)**
- Eje 9: H2V (Hidrógeno verde)
- Eje 10: **CCUS** (Captura y almacenamiento de carbono) - **21% del total** 🔑
- Eje 12: Electr (Electricidad carbono neutral)

**Pilar E - Compensaciones Naturales (21%)**
- Eje 13: Recarb (Recarbonatación del hormigón)
- Eje 14: SbN (Soluciones basadas en la Naturaleza)

**Total**: 11 ejes organizados en 5 pilares → 100% reducción

---

#### Detalle por Eje (del Excel "Resumen Ejes de Reduccion")

| # | Eje | Aporte | Indicador 2023 | Meta 2050 | Criticidad |
|---|-----|--------|----------------|-----------|-----------|
| 2 | D&C | 13% | - | - | Media |
| 3 | Concreto | 7% | - | - | Media |
| 4 | Cem&Adic | 7% | Factor clínker 67% | 61% | Alta ⚠️ |
| 5 | Efic. Term | 2% | 3425 MJ/tCk | 3300 | Media |
| 6 | Fosil Conv | 3% | - | - | Baja |
| 7 | Fosil Alt | 2% | - | - | Baja |
| 8 | Biomasa | 5% | 4% | 10% | Media |
| 9 | H2V | 0.5% | 0% | 5% | Alta ⚠️ (tecnología inmadura) |
| 10 | **CCUS** | **21%** | 0% | Captura de 2.27 MtCO₂ | **Crítica** 🔴 |
| 11 | Metano | 5% | - | - | Media |
| 12 | Electr | 7% | Grid 272 gCO₂/kWh | 14 gCO₂/kWh | Alta ⚠️ |
| 13 | Recarb | 12% | Factor 20% | 20% (sostenido) | Media |
| 14 | SbN | 21% | - | - | Media |

**Nota crítica**: CCUS (Eje 10) es la tecnología más importante pero **aún no está disponible comercialmente** en Argentina.

---

#### Matriz de Combustibles 2050

| Combustible | 2023 | 2030 | 2050 | Cambio |
|-------------|------|------|------|--------|
| Gas natural | 82% | ~80% | 75% | -7% |
| Petcoke | 11% | ~10% | 2% | -9% ⬇️ |
| CDR fósil | 3% | ~5% | 8% | +5% |
| **Biomasa** | 4% | 5% | **10%** | +6% ⬆️ |
| **Hidrógeno** | 0% | 0% | **5%** | +5% ⬆️ (nuevo) |

---

#### Indicadores Clave 2050

**Producción y Consumo**:
- Producción cemento: 12.55 Mt (2023) → 19.5 Mt (2050) = +55%
- Consumo concreto: 32.9 Mm³ (2023) → 50.5 Mm³ (2050) = +53%
- Cemento en concreto: 381 kg/m³ → 335 kg/m³ = -12% (eficiencia)

**Emisiones**:
- Emisiones directas (calcinación + combustión): 6.31 Mt (2023) → 9.44 Mt (2050) proyección BAU
- Emisiones residuales **antes de CCUS**: 5.53 Mt
- Captura CCUS: -2.27 Mt
- Recarbonatación: -1.09 Mt
- **Emisiones netas finales: 0 Mt** ✅

**Electricidad**:
- Factor eléctrico grid: 272 gCO₂/kWh (2023) → 14 gCO₂/kWh (2050) = -95%
- Consumo eléctrico: 1.55 TWh (2023) → 3.71 TWh (2050) = +140% (por CCUS)

**Datos fuente**: Hoja "Resumen Ejes de Reduccion" del Excel GCCA_FICEM

---

### 4. BENCHMARKING (/benchmarking)
**Estado**: ✅ Implementada

**Contenido**:
- Comparativa Argentina vs 8 países/regiones
- Gráfico de emisiones específicas (kgCO₂/tcem)
- Ranking de mejores prácticas
- Evolución histórica 1990-2023

**Datos fuente**: Hoja "Benchmarking" + archivo "Comparativo GNR Argentina 2023_27-03-25.xlsx"

---

### 5. CALCULADORA (/calculadora)
**Estado**: ✅ Implementada (solo miembros)

**Propósito**: Simulador de escenarios personalizados

**Inputs ajustables**:
- Producción de cemento (Mt/año)
- Factor clínker (%)
- Eficiencia térmica (MJ/tCk)
- Matriz de combustibles (gas, petcoke, biomasa, H2, CDR)
- Electricidad (consumo y factor de emisión)

**Outputs calculados**:
- Emisiones totales (MtCO₂)
- Emisiones específicas (kgCO₂/tcem)
- Brecha vs meta 2030 (<500)
- Brecha vs meta 2050 (0)
- Desglose por proceso (calcinación, combustión, electricidad)

**Escenarios predefinidos**:
- Línea Base 2023
- Meta 2030
- Meta 2050
- BAU (Business as Usual) 2050

**Datos fuente**: Hojas "Combustibles", factores de emisión, lógica de cálculo del modelo

---

### 6. DASHBOARD (/dashboard)
**Estado**: ✅ Implementada

**Contenido**:
- Panel de KPIs con gauges visuales
- Gráficos de evolución temporal 2020-2050
- Comparativa Real vs Trayectoria Planificada
- Progreso por cada uno de los 11 ejes
- Semáforo de cumplimiento (verde/amarillo/rojo)

---

### 7. Páginas Pendientes

#### CONTEXTO / LA INDUSTRIA (/contexto) - **PENDIENTE** ⚠️
**Propósito**: Explicar la industria del cemento en Argentina

**Contenido planificado**:
- 4 empresas (Holcim, Loma Negra, Cementos Avellaneda, PCR)
- 16 plantas en total
- Capacidad instalada: 18 Mt/año
- Producción actual: 12.55 Mt/año
- Consumo per cápita: 268 kg/hab vs 305 global
- Mapa de plantas
- Por qué es "hard to abate"
- Contribución al NDC de Argentina

#### SOBRE (/sobre) - **PENDIENTE** ⚠️
**Propósito**: Información institucional

**Contenido planificado**:
- Qué es la Hoja de Ruta
- Actores: AFCP, FICEM, GCCA, ONUDI
- Metodología
- Contacto
- Descarga del PDF

---

## Diferencias Clave: 2030 vs 2050

| Aspecto | TRAYECTORIA 2030 | TRAYECTORIA 2050 |
|---------|------------------|------------------|
| **Enfoque** | Indicadores medibles HOY | Transformación tecnológica |
| **Complejidad** | Simple: 4 KPIs principales | Compleja: 11 ejes en 5 pilares |
| **Tecnologías** | Disponibles comercialmente | Incluye tecnologías inmaduras (CCUS, H2) |
| **Meta** | <500 kgCO₂/t (-1.4%) | 0 kgCO₂/t (-100%) |
| **Brecha actual** | Pequeña (7 kg) ✓ | Grande (507 kg) ⚠️ |
| **Dependencias** | Normativas y mercado | Desarrollo tecnológico + inversión masiva |
| **Certidumbre** | Alta ✅ | Media-Baja 🔶 |
| **Timeline** | 6 años | 27 años |

---

## Datos Críticos por Fuente Excel

### Excel: "Copia de GCCA_FICEM Argentina_Taller 3_Agosto2025_1.xlsx"

**Hoja "LB" (Línea Base)**:
- Emisiones específicas 2023: 507 kgCO₂/t cemento
- Factor clínker: 67%
- Producción: 12.55 Mt

**Hoja "2030"**:
- Meta emisiones: <500 kgCO₂/t
- Meta coprocesamiento: 10%
- Meta biomasa: 5%

**Hoja "Resumen Ejes de Reduccion"** (⭐ MÁS IMPORTANTE):
- 11 ejes detallados con contribución individual
- Escenario BAU 2050: 10.4 MtCO₂
- Emisiones residuales antes de CCUS: 5.53 Mt
- Captura CCUS requerida: 2.27 Mt (21% del total)
- Recarbonatación: 1.09 Mt (12%)
- Matriz de combustibles proyectada
- Factor eléctrico proyectado: 14 gCO₂/kWh

**Hoja "CCUS"**:
- Análisis detallado de tecnologías de captura
- Costos estimados
- Consumo energético adicional: 200 kWh/tCk

**Hojas "Eje 1-1" a "Eje 9-10-11"**:
- Detalle técnico de cada eje
- Medidas específicas
- Barreras y oportunidades

**Hoja "Graficos"**:
- Datos para visualizaciones (waterfall, stacked areas, etc.)

---

### Excel: "Comparativo GNR Argentina 2023_27-03-25.xlsx"
- Benchmarking internacional detallado
- Comparativa con 30+ países
- Evolución histórica 1990-2023

---

### Excel: "00 HR Argentina Taller Cierre_25-11-25.xlsx"
**Estado**: Pendiente de integrar
- Validación final de metas
- Ajustes post-taller de noviembre 2025

---

### Excel: "Rep Sostenibilidad CONSOLIDADO 15.5.25.xlsx"
**Estado**: Pendiente de integrar
- Datos de plantas individuales
- Indicadores de sostenibilidad adicionales

---

## Tecnologías Críticas que Determinan el Éxito 2050

### 1. **CCUS** (21% de reducción) 🔴 CRÍTICA
- **Estado actual**: No disponible comercialmente en Argentina
- **Requerimiento**: Capturar 2.27 MtCO₂/año en 2050
- **Desafío**: Inversión masiva (~US$500M+ estimado)
- **Riesgo**: Alto - tecnología inmadura

### 2. **Hidrógeno Verde** (0.5% de reducción) 🔶 ALTA
- **Estado actual**: 0% en 2023
- **Meta**: 5% del mix energético en 2050
- **Desafío**: Infraestructura inexistente
- **Riesgo**: Medio-Alto - depende de costo de H2

### 3. **Grid Eléctrico Descarbonizado** (7% de reducción) 🔶 ALTA
- **Estado actual**: 272 gCO₂/kWh
- **Meta**: 14 gCO₂/kWh (-95%)
- **Desafío**: Depende de política energética nacional
- **Riesgo**: Medio - fuera del control del sector

### 4. **Reducción Factor Clínker** (7% de reducción) 🟡 MEDIA
- **Estado actual**: 67%
- **Meta**: 61% (-6 puntos)
- **Desafío**: Normas técnicas y aceptación del mercado
- **Riesgo**: Bajo-Medio - tecnología disponible

### 5. **Recarbonatación** (12% de reducción) 🟢 BAJA
- **Estado actual**: 20% (proceso natural)
- **Meta**: Mantener 20% a escala masiva
- **Desafío**: Medir y verificar
- **Riesgo**: Bajo - proceso natural comprobado

---

## Próximos Pasos Sugeridos

### 1. Integrar Datos Faltantes
- [ ] Analizar Excel "00 HR Argentina Taller Cierre" (noviembre 2025)
- [ ] Extraer datos de "Rep Sostenibilidad CONSOLIDADO"
- [ ] Validar todos los números contra PDF oficial

### 2. Completar Páginas Pendientes
- [ ] Crear página `/contexto` con info de la industria
- [ ] Crear página `/sobre` con info institucional
- [ ] Agregar sección de metodología

### 3. Mejorar Visualizaciones 2050
- [ ] Gráfico waterfall de reducción por eje
- [ ] Sankey diagram del flujo de emisiones
- [ ] Timeline interactiva de disponibilidad tecnológica
- [ ] Mapa de riesgo: impacto vs madurez tecnológica

### 4. Calculadora Avanzada
- [ ] Agregar sensibilidad de costos
- [ ] Simular fallo de CCUS (plan B)
- [ ] Exportar resultados a PDF

### 5. Documentación
- [ ] Crear glosario técnico
- [ ] Agregar FAQs
- [ ] Metodología de cálculo transparente

---

## Conclusiones Clave

1. **2030 es alcanzable** ✅: Brecha pequeña (7 kg), tecnologías disponibles, depende de marcos regulatorios

2. **2050 es muy desafiante** ⚠️:
   - Requiere 21% de CCUS (tecnología no disponible)
   - Depende de grid eléctrico nacional (-95% emisiones)
   - Necesita H2 verde a escala (0% → 5%)
   - Inversión estimada: miles de millones USD

3. **Sin CCUS, Net Zero 2050 es imposible**: La tecnología más crítica representa 21% de la reducción

4. **La app debe comunicar**:
   - ✅ El liderazgo actual de Argentina (495 vs 598)
   - ⚠️ La magnitud del desafío 2050
   - 🔴 Las dependencias tecnológicas críticas
   - 📊 El progreso medible y transparente

---

*Documento elaborado: 11 de Diciembre 2024*
*Fuentes: Arquitectura v2.0, Excel GCCA_FICEM "Resumen Ejes de Reduccion", PDF Hoja de Ruta*