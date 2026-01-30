# Factores de Emisión de Ecoinvent - Requeridos para Calculadoras FICEM

**Fecha de análisis**: 14 de enero de 2026
**Origen email**: Francisco Vidal (vidal@ecoinvent.org) - 18 de julio de 2025
**Archivo adjunto**: Database-Overview-for-ecoinvent-v3.10_29.04.24.xlsx (descargado en docs/source/)

---

## Resumen Ejecutivo

Las aplicaciones de cálculo de huella de carbono para cemento y concreto (calculadoras 2-c y 3-c) utilizan factores de emisión de Ecoinvent para materias primas, combustibles y transportes. Esta lista consolida los datasets necesarios basados en el análisis de los tres proyectos:

- **hr-arg**: Hoja de ruta Net Zero Argentina 2050 (visualización, no cálculo)
- **yura-2c**: Calculadora de CO2 para cemento (cemento y clinker)
- **calculadora-3c**: Calculadora de CO2 para concreto (cemento, clinker, concreto, hormigón)

---

## 1. Materias Primas para Clínker

### 1.1 Minerales principales
| Material | Process Name en Ecoinvent | Ubicación sugerida | Uso actual |
|----------|---------------------------|-------------------|------------|
| Caliza | `Limestone, crushed, for mill, market for` | GLO/RER/América Latina | ✓ Yura-2c |
| Arcilla | `Clay, market for` | GLO/RER | ✓ Yura-2c |
| Sílice activada | `Activated silica, market for` | GLO | Yura-2c |
| Óxido de hierro | `Iron ore, crude ore, 46% Fe, market for` | GLO | Yura-2c |
| Desulfurante | `SOx retained, in hard coal flue gas desulfurisation` | GLO/RER | Yura-2c |
| Puzolana natural | *No encontrado en Ecoinvent* | - | Pendiente |
| Fluorita | *A confirmar* | - | Yura-2c |

### 1.2 Adiciones cementantes
| Material | Process Name en Ecoinvent | Ubicación sugerida | Uso actual |
|----------|---------------------------|-------------------|------------|
| Escoria de alto horno | `Slag, from blast furnace, market for` | GLO/EUR | ✓ 3c |
| Ceniza volante | `Fly ash, market for` | GLO | ✓ 3c |
| Yeso | `Gypsum, mineral, market for` o `Gypsum plasterboard, production` | GLO/RER | ✓ Yura-2c |

---

## 2. Combustibles

### 2.1 Combustibles fósiles convencionales
| Combustible | Process Name en Ecoinvent | Ubicación | Uso actual |
|-------------|---------------------------|-----------|------------|
| Carbón bituminoso | `Hard coal, market for` | GLO/Americas | Yura-2c |
| Carbón antracita | `Anthracite, market for` | GLO | Yura-2c |
| Petcoke | `Petroleum coke, market for` | GLO/Americas | Yura-2c |
| Diesel | `Diesel, market for` | GLO/LAC | Yura-2c |
| Fuel oil pesado | `Heavy fuel oil, market for` | GLO | Yura-2c |
| Gas natural | `Natural gas, market for` | LAC/Argentina | Requerido |

### 2.2 Combustibles alternativos - CDR Fósiles (Eje E06)
| Combustible | Process Name en Ecoinvent | Ubicación | Uso actual |
|-------------|---------------------------|-----------|------------|
| Aceite usado (waste oil) | `Waste lubricating oil, market for` | RER/GLO | ✓ Yura-2c |
| Neumáticos (tyres) | `Tire, passenger car, end of life` | GLO | ✓ Yura-2c |
| RDF incluyendo plásticos | `Municipal solid waste, 22.9% water, to sanitary landfill` o similar | GLO/LAC | ✓ Yura-2c |
| Solventes | `Waste solvent mixture, market for waste treatment` | GLO | Yura-2c |
| Aserrín impregnado | *A confirmar* | GLO | Yura-2c |
| Residuos industriales mixtos | `Waste from electronics industry, market for` | GLO | Yura-2c |
| Otros residuos fósiles | *Varios según composición* | GLO | Yura-2c |

### 2.3 Biomasa (Eje E07) - Residuos orgánicos y agrícolas
| Combustible | Process Name en Ecoinvent | Ubicación | Uso actual |
|-------------|---------------------------|-----------|------------|
| Lodos de depuradora secos (dried sewage sludge) | `Sewage sludge, dried, market for` | GLO/RER | ✓ Yura-2c |
| Madera no impregnada / aserrín | `Wood chips, softwood, forest, u=70%, market for` | GLO/LAC | ✓ Yura-2c |
| Papel y cartón | `Waste paper, unsorted, market for waste paper` | GLO | ✓ Yura-2c |
| Harina animal (animal meal) | `Animal meal, market for` | GLO | Yura-2c |
| Harina de huesos | `Bone meal, market for` | GLO | Yura-2c |
| Grasa animal | `Animal fat, market for` | GLO | Yura-2c |
| Residuos agrícolas | `Rice straw, field` o similar | LAC/Asia | ✓ Requerido |
| Residuos forestales | `Wood chips, softwood, forest` | LAC | ✓ Requerido |
| RSU fracción orgánica | `Biowaste, market for` | GLO/LAC | ✓ Requerido |
| Pañales / residuos orgánicos / carbón vegetal | `Biowaste, to anaerobic digestion` | GLO | Yura-2c |
| Otras biomasas | *Varios según origen* | GLO | Yura-2c |

### 2.4 Hidrógeno (Eje E08) - Combustibles futuros
| Combustible | Process Name en Ecoinvent | Ubicación | Uso actual |
|-------------|---------------------------|-----------|------------|
| Hidrógeno verde | `Hydrogen, gaseous, 25 bar, from electrolysis, at H2 fuelling station` | GLO/LAC | Futuro |
| Hidrógeno azul | `Hydrogen, cryo, liquid, at plant, with CCS` | GLO | Futuro |

### 2.5 Créditos de emisión - Metano evitado (Eje E07)
| Concepto | Process Name en Ecoinvent | Uso | Notas |
|----------|---------------------------|-----|-------|
| Captura de metano de rellenos sanitarios | `Methane, from landfill gas` (avoided) | ✓ E07 | Crédito negativo por evitar metano a atmósfera |
| Digestión anaeróbica RSU | `Biogas, from biowaste, at anaerobic digestion plant` | ✓ E07 | Valorización energética con captura |

**Nota importante**: El metano evitado en rellenos sanitarios genera **créditos de carbono negativos** según la metodología de la Hoja de Ruta, ya que se evita la liberación de CH₄ (GWP = 28-30 veces CO₂).

---

## 3. Transporte

### 3.1 Transporte terrestre
| Modo | Process Name en Ecoinvent | Uso actual |
|------|---------------------------|------------|
| Camión >32t (EURO4) | `Transport, freight, lorry >32 metric ton, EURO4, market for` | ✓ Todos |
| Camión 16-32t | `Transport, freight, lorry 16-32 metric ton, EURO4` | Opcional |

### 3.2 Transporte marítimo
| Modo | Process Name en Ecoinvent | Uso actual |
|------|---------------------------|------------|
| Barco transoceánico | `Transport, freight, sea, transoceanic ship` | Importaciones |

---

## 4. Agregados para Concreto

### 4.1 Agregados naturales
| Material | Process Name en Ecoinvent | Uso actual |
|----------|---------------------------|------------|
| Arena natural | `Sand, market for` o similar | ✓ 3c |
| Grava | `Gravel, crushed, market for` | ✓ 3c |
| Gravilla | Similar a grava | ✓ 3c |

---

## 5. Energía y Utilidades

| Recurso | Process Name en Ecoinvent | Uso actual |
|---------|---------------------------|------------|
| Electricidad red Argentina | `Electricity, medium voltage, market for` (Argentina) | ✓ Todos |
| Electricidad red Chile | `Electricity, medium voltage, market for` (Chile) | ✓ 3c |
| Agua industrial | `Tap water, at user` | ✓ Todos |

---

## 6. Gestión de Residuos

| Tipo residuo | Process Name en Ecoinvent | Uso actual |
|--------------|---------------------------|------------|
| Residuos no peligrosos | `Waste treatment, municipal solid waste` | A3 proceso |
| Residuos peligrosos | `Waste treatment, hazardous waste` | A3 proceso |
| Aguas residuales | `Wastewater treatment, market for` | A3 proceso |

---

## 7. Resumen Cuantitativo

### Datasets prioritarios por categoría

| Categoría | Cantidad datasets | Prioridad | Eje HR Argentina |
|-----------|------------------|-----------|------------------|
| Minerales clínker | 7-9 | Alta | E03, E04 |
| Adiciones cementantes | 3 | Alta | E03 |
| Combustibles fósiles convencionales | 6 | Alta | E05 |
| CDR Fósiles (combustibles alternativos) | 7 | **Alta** | **E06** |
| Biomasa (residuos orgánicos) | 11 | **Alta** | **E07** |
| Hidrógeno | 2 | Media (futuro) | E08 |
| Transporte | 2-3 | Alta | E02 |
| Agregados concreto | 3 | Media (solo 3c) | E02 |
| Energía | 2-3 | Alta | E10 |
| Residuos proceso | 3 | Alta | A3 |

**Total estimado**: 48-55 datasets únicos

### Desglose por eje de descarbonización (Hoja de Ruta Argentina 2050):

| Eje | Nombre | Datasets requeridos | Criticidad |
|-----|--------|-------------------|------------|
| E03 | Cemento y Adiciones | 10-12 (minerales + adiciones) | Alta |
| E05 | Combustibles Fósiles Tradicionales | 6 | Alta |
| E06 | **CDR Fósiles (Coprocesamiento)** | **7** | **Muy Alta** |
| E07 | **Biomasa y Metano Evitado** | **11** | **Muy Alta** |
| E08 | Hidrógeno | 2 | Media (2040-2050) |
| E02 | Transporte y Agregados | 5-6 | Alta |
| E10 | Electricidad | 2-3 | Alta |
| A3 | Proceso (residuos) | 3 | Alta |

---

## 8. Estructura de Licencia Developer - Ecoinvent

Según el email de Francisco Vidal (17 julio 2025), la licencia Developer tiene un **cargo base anual** determinado por **3 parámetros obligatorios**:

### 8.1 Parámetros para Cotización

**1. Tool Users** - Usuarios activos de las calculadoras
> Definición Ecoinvent: "Named individuals who actively utilize the tool. For example, a business user working with the tool to calculate carbon footprints for their products."

- **Contexto FICEM**: Personal técnico de empresas cementeras que utilizarán las calculadoras 2-c y 3-c
- **Estimado inicial**: 50-80 usuarios
  - ~15-20 empresas cementeras FICEM
  - ~3-4 usuarios por empresa (ingenieros ambientales, técnicos de planta, gerentes de sostenibilidad)
- **Nota**: Se debe llevar registro de usuarios activos durante el contrato para facturación retroactiva si se excede

**2. Indicators** - Indicadores LCIA accesibles
> Definición Ecoinvent: "A single numerical value, such as GWP100 (Global Warming Potential over 100 years), determined by LCIA methods like 'IPCC 2013,' 'EF v3.0,' or 'ReCiPe.'"

- **Indicador principal requerido**: GWP100 (IPCC 2021)
- **Indicadores adicionales opcionales**: Ninguno en esta fase
- **Total solicitado**: 1 indicador (GWP100)
- **Justificación**: Las calculadoras solo requieren huella de carbono (CO2 equivalente)

**3. Datasets** - Factores de emisión accesibles
> Definición Ecoinvent: "A unit process of a human activity and its exchanges with the environment. For instance, 'Mango production in Brazil.'"

- **Total identificado en análisis**: 48-55 datasets únicos
- **Desglose por prioridad**:
  - **Críticos (40-45 datasets)**: Minerales, combustibles fósiles, CDR, biomasa, transporte, energía
  - **Opcionales (5-10 datasets)**: Hidrógeno (futuro), datasets regionales adicionales
- **Propuesta para cotización inicial**: 50 datasets
- **Cobertura geográfica**: GLO (Global), RER (Europa), LAC (América Latina), Argentina específicos

### 8.2 Sistema de Facturación

1. **Primera factura**: Basada en valores estimados de los 3 parámetros
2. **Durante el contrato**: Registro obligatorio de uso real (usuarios activos, indicadores, datasets utilizados)
3. **Final del ciclo**:
   - Reporte de números reales a Ecoinvent
   - **Facturación retroactiva** si se excedieron los valores estimados
   - Nueva factura del siguiente ciclo basada en uso real

### 8.3 Propuesta de Solicitud a Ecoinvent

**Valores iniciales para cotización:**
| Parámetro | Valor estimado | Notas |
|-----------|---------------|-------|
| Tool Users | 50-80 usuarios | Personal técnico empresas FICEM |
| Indicators | 1 indicador | GWP100 (IPCC 2021) únicamente |
| Datasets | 50 datasets | Ver lista detallada secciones 1-6 |

**Información del proyecto:**
- **Cliente final**: FICEM (Federación Interamericana del Cemento)
- **Región**: América Latina, con foco en Argentina
- **Aplicaciones**: Calculadoras de CO2 para cemento (2-c) y concreto (3-c)
- **Caso de uso**: EPDs, reportes GNR/GCCA, Hoja de Ruta Net Zero 2050
- **Duración**: Contrato anual renovable

### 8.4 Datasets Regionales Preferidos

- **Primera opción**: Argentina, LAC (Latin America), RoLA (Rest of Latin America)
- **Segunda opción**: RER (Europa), GLO (Global)
- **Justificación**: Mayor precisión para contexto regional argentino/latinoamericano

---

## 9. Datasets Faltantes / Por Definir

Los siguientes materiales **no tienen factor de Ecoinvent identificado**:

1. **Puzolana natural** - Actualmente con valor por defecto 0.00906 kg CO2/kg
2. **Fluorita** - Factor por defecto 50.89 kg CO2/kg (parece muy alto, revisar)
3. **Chamota** - Factor por defecto 0.011 kg CO2/kg
4. **Diatomita** - Factor por defecto 0.044 kg CO2/kg

**Acción**: Consultar con Ecoinvent datasets alternativos o usar proxy materials.

---

## 10. Siguiente Pasos

1. ✅ Email identificado con Database Overview de Ecoinvent v3.10
2. ✅ Análisis de factores utilizados en calculadoras 2-c y 3-c
3. ⏳ Validar lista con Francisco Vidal (vidal@ecoinvent.org)
4. ⏳ Solicitar cotización Developer License
5. ⏳ Definir número final de usuarios y datasets
6. ⏳ Negociar contrato anual

---

## Referencias

- **Email**: Francisco Vidal, 18 julio 2025, "RE: eduardo grossling portales ha reservado una reunión con: Johann Leopold"
- **Archivo**: [Database-Overview-ecoinvent-v3.10.xlsx](./source/Database-Overview-ecoinvent-v3.10.xlsx)
- **Código yura-2c**: `/home/cpinilla/projects/yura-2c/streamlit/services/const.py`
- **Código 3c**: `/home/cpinilla/projects/calculadora-3c/docs/domain/business-rules/factores-por-defecto-co2.md`