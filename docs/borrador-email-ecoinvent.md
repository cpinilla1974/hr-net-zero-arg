# Borrador Email - Solicitud Cotización Ecoinvent Developer License

**Para**: Francisco Vidal <vidal@ecoinvent.org>
**Asunto**: RE: Developer License Request - FICEM Carbon Calculators (LAC Region)
**Idioma**: Inglés (según comunicación previa)

---

## Email en Inglés

Dear Francisco,

Thank you for the detailed information regarding the ecoinvent Developer License structure. Following our previous conversation with Johann Leopold, I am writing to formally request a quotation for implementing ecoinvent emission factors in FICEM's carbon footprint calculators.

### Project Context

**Client**: FICEM (Federación Interamericana del Cemento / Inter-American Cement Federation)
**Region**: Latin America, with primary focus on Argentina
**Objective**: Implement standardized CO2 calculation tools for cement and concrete industries aligned with GCCA GNR Protocol and Argentina's Net Zero Roadmap 2050

**Applications**:
- **Calculator 2-c**: CO2 emissions for cement and clinker (EPD compliance)
- **Calculator 3-c**: CO2 emissions for concrete and ready-mix products

### License Parameters for Quotation

Based on your email of July 17th, 2025, we provide the following estimated parameters:

#### 1. Tool Users
**Estimated: 50-80 active users**

- Target audience: Technical personnel from FICEM member cement companies
- User profile: Environmental engineers, plant technicians, sustainability managers
- Distribution: ~15-20 cement companies × 3-4 users per company
- Geographic scope: Argentina, Chile, Colombia, Peru, Ecuador, and other LAC countries

#### 2. LCIA Indicators
**Required: 1 indicator**

- **GWP100** (Global Warming Potential, 100 years) according to **IPCC 2021**
- Rationale: The calculators focus exclusively on carbon footprint (CO2 equivalent emissions)
- No additional indicators required at this stage

#### 3. Datasets
**Required: 50 datasets**

We have conducted a detailed analysis of both calculator applications and identified the following dataset requirements aligned with Argentina's decarbonization roadmap:

**Priority Breakdown:**

| Category | Datasets | Roadmap Axis | Priority |
|----------|----------|--------------|----------|
| Clinker raw materials | 7-9 | E03, E04 | High |
| Cementitious additions | 3 | E03 | High |
| Conventional fossil fuels | 6 | E05 | High |
| Alternative fossil fuels (CDR) | 7 | E06 | **Very High** |
| Biomass & organic waste | 11 | E07 | **Very High** |
| Hydrogen (future) | 2 | E08 | Medium |
| Transportation | 2-3 | E02 | High |
| Concrete aggregates | 3 | E02 | Medium |
| Electricity & utilities | 2-3 | E10 | High |
| Process waste treatment | 3 | A3 | High |

**Total: 48-55 unique datasets** (we request access to 50 for initial contract)

#### Geographic Coverage Priority
1. **Primary**: Argentina, LAC (Latin America), RoLA (Rest of Latin America)
2. **Secondary**: GLO (Global), RER (Europe) as fallback

### Detailed Dataset List

I have attached a comprehensive document (in Spanish) listing all required datasets with:
- Specific ecoinvent process names (e.g., "Limestone, crushed, for mill, market for")
- Suggested geographic locations
- Current usage in our calculator applications
- Alignment with Argentina's 11 decarbonization axes

**Key materials include:**
- Raw materials: limestone, clay, activated silica, iron ore
- Cementitious additions: blast furnace slag, fly ash, gypsum
- Fossil fuels: hard coal, anthracite, petcoke, natural gas, diesel, heavy fuel oil
- **Alternative fuels (waste-derived)**: waste oil, tyres, RDF, solvents, industrial residues
- **Biomass**: sewage sludge, wood chips, waste paper, animal meal, agricultural residues, MSW organic fraction
- Transportation: lorry >32t, transoceanic ship
- Energy: electricity (Argentina, Chile), tap water

### Open Questions

1. **Missing datasets**: We identified 4 materials without clear ecoinvent equivalents:
   - Natural pozzolan (currently using default 0.00906 kg CO2/kg)
   - Fluorite (default 50.89 kg CO2/kg - seems unusually high)
   - Chamotte (default 0.011 kg CO2/kg)
   - Diatomite (default 0.044 kg CO2/kg)

   Could you suggest proxy materials or alternative datasets from the ecoinvent v3.10 database?

2. **Avoided methane credits**: For landfill gas utilization and anaerobic digestion of organic waste (Argentina's E07 axis), should we use "Methane, from landfill gas" as a negative credit? This is critical for co-processing scenarios.

3. **Regional availability**: For key materials (limestone, natural gas, electricity), what LAC-specific datasets are available vs. GLO fallbacks?

4. **Data format**: We plan to integrate via API (ecoQuery platform). Does the Developer License include programmatic access, or should we consider the XLS export format?

### Contract Terms

- **Duration**: Annual contract, renewable
- **Use case**: Integration into web-based carbon calculators (Next.js/React applications)
- **Data storage**: Emission factors stored in PostgreSQL database, no redistribution of raw ecoinvent data
- **Reporting**: We commit to tracking active users and actual dataset usage for end-of-cycle reconciliation

### Next Steps

Could you please provide:
1. Formal quotation based on the parameters above (50-80 users, 1 indicator, 50 datasets)
2. Confirmation of regional dataset availability for LAC context
3. Information on API access vs. XLS download workflows
4. Timeline for license activation after contract signature

I am available for a call to discuss any technical details or clarify our use case further.

Thank you for your support in advancing sustainable cement production practices across Latin America.

Best regards,

---

## Email en Español (Traducción de Referencia)

Estimado Francisco,

Gracias por la información detallada sobre la estructura de la Licencia Developer de ecoinvent. Siguiendo nuestra conversación previa con Johann Leopold, escribo para solicitar formalmente una cotización para implementar factores de emisión de ecoinvent en las calculadoras de huella de carbono de FICEM.

### Contexto del Proyecto

**Cliente**: FICEM (Federación Interamericana del Cemento)
**Región**: América Latina, con foco principal en Argentina
**Objetivo**: Implementar herramientas estandarizadas de cálculo de CO2 para industrias de cemento y concreto, alineadas con el Protocolo GNR de GCCA y la Hoja de Ruta Net Zero Argentina 2050

### Parámetros de Licencia para Cotización

#### 1. Tool Users (Usuarios activos)
**Estimado: 50-80 usuarios activos**

- Perfil: Personal técnico de empresas cementeras miembros de FICEM
- Rol: Ingenieros ambientales, técnicos de planta, gerentes de sostenibilidad
- Distribución: ~15-20 empresas × 3-4 usuarios por empresa

#### 2. LCIA Indicators (Indicadores)
**Requerido: 1 indicador**

- **GWP100** (Potencial de Calentamiento Global a 100 años) según **IPCC 2021**
- Justificación: Las calculadoras se enfocan exclusivamente en huella de carbono

#### 3. Datasets (Factores de emisión)
**Requerido: 50 datasets**

Hemos identificado 48-55 datasets únicos necesarios, categorizados según los ejes de descarbonización de Argentina:

- Materias primas para clínker: 7-9 datasets
- Adiciones cementantes: 3 datasets
- Combustibles fósiles convencionales: 6 datasets
- **Combustibles alternativos (CDR Fósiles)**: 7 datasets - Prioridad Muy Alta
- **Biomasa y residuos orgánicos**: 11 datasets - Prioridad Muy Alta
- Hidrógeno (futuro): 2 datasets
- Transporte: 2-3 datasets
- Agregados concreto: 3 datasets
- Electricidad y utilidades: 2-3 datasets
- Tratamiento de residuos: 3 datasets

**Cobertura geográfica prioritaria:**
1. Argentina, LAC, RoLA
2. GLO, RER (como respaldo)

### Preguntas Abiertas

1. **Datasets faltantes**: Identificamos 4 materiales sin equivalente claro en ecoinvent (puzolana natural, fluorita, chamota, diatomita). ¿Podrían sugerir materiales proxy?

2. **Créditos de metano evitado**: Para valorización de gas de rellenos sanitarios (eje E07 Argentina), ¿usamos "Methane, from landfill gas" como crédito negativo?

3. **Disponibilidad regional**: ¿Qué datasets LAC específicos están disponibles vs. fallbacks GLO?

4. **Formato de datos**: Planeamos integración vía API. ¿La licencia Developer incluye acceso programático?

### Próximos Pasos

¿Podrían proporcionar:
1. Cotización formal (50-80 usuarios, 1 indicador, 50 datasets)
2. Confirmación de disponibilidad regional LAC
3. Información sobre acceso API vs. XLS
4. Timeline de activación tras firma de contrato

Quedo disponible para una llamada para discutir detalles técnicos.

Gracias por su apoyo en avanzar las prácticas sustentables de producción de cemento en América Latina.

Saludos cordiales,

---

## Archivos Adjuntos Sugeridos

1. **factores-emision-ecoinvent-requeridos.md** (documento detallado con lista completa de datasets)
2. Opcional: Diagrama de flujo de las calculadoras mostrando dónde se usan los factores

## Notas Importantes

- **Idioma**: Mantener email en inglés (comunicación previa fue en inglés)
- **Tono**: Profesional, técnico, enfocado en caso de uso concreto
- **Claridad en números**: Especificar rangos cuando hay incertidumbre (50-80 usuarios)
- **Compromiso de reporte**: Mencionar que se llevará registro de uso real para facturación retroactiva
- **No mencionar precios**: Dejar que ellos coticen primero