# Borrador Email - FICEM: Resumen Solicitud Ecoinvent

**Para**: Ricardo [apellido] <ricardo@ficem.org>, Eduardo Grossling <eduardo.grossling@ficem.org>
**CC**: [Tu email]
**Asunto**: Análisis Completo - Factores de Emisión Ecoinvent para Calculadoras FICEM
**Idioma**: Español

---

## Email

Estimados Ricardo y Eduardo,

Les comparto el análisis completo de los factores de emisión de Ecoinvent requeridos para las calculadoras de CO2 de cemento y concreto (2-c y 3-c), siguiendo la reunión coordinada con Johann Leopold y la información recibida de Francisco Vidal (ecoinvent).

### Resumen Ejecutivo

Hemos identificado los requerimientos técnicos y comerciales para adquirir la **Licencia Developer de Ecoinvent v3.10**, necesaria para incorporar factores de emisión estandarizados en las calculadoras FICEM.

#### Parámetros de Cotización

La estructura de licencia de Ecoinvent se basa en **3 parámetros obligatorios**:

| Parámetro | Valor Propuesto | Justificación |
|-----------|----------------|---------------|
| **Tool Users** | 50-80 usuarios | Personal técnico de ~15-20 empresas cementeras FICEM (~3-4 usuarios/empresa: ingenieros ambientales, técnicos de planta, gerentes de sostenibilidad) |
| **Indicators** | 1 indicador | GWP100 (IPCC 2021) - Las calculadoras solo requieren huella de carbono |
| **Datasets** | 50 factores | Ver desglose por categoría abajo |

#### Datasets Identificados: 48-55 factores de emisión

Basado en el análisis de las calculadoras 2-c (cemento) y 3-c (concreto), y alineado con los 11 ejes de descarbonización de la Hoja de Ruta Net Zero Argentina 2050:

| Categoría | Cantidad | Eje HR | Prioridad |
|-----------|----------|--------|-----------|
| Materias primas clínker | 7-9 | E03, E04 | Alta |
| Adiciones cementantes | 3 | E03 | Alta |
| Combustibles fósiles convencionales | 6 | E05 | Alta |
| **CDR Fósiles (coprocesamiento)** | **7** | **E06** | **Muy Alta** |
| **Biomasa y residuos orgánicos** | **11** | **E07** | **Muy Alta** |
| Hidrógeno (futuro 2040-2050) | 2 | E08 | Media |
| Transporte | 2-3 | E02 | Alta |
| Agregados concreto | 3 | E02 | Media |
| Electricidad y agua | 2-3 | E10 | Alta |
| Gestión residuos proceso | 3 | A3 | Alta |

**Total: 48-55 datasets únicos** → Propuesta: **50 datasets** para cotización inicial

#### Cobertura de Materiales Clave

**Combustibles alternativos (CDR Fósiles - Eje E06):**
- Aceite usado, neumáticos, RDF/plásticos, solventes, residuos industriales (7 datasets)

**Biomasa y economía circular (Eje E07):**
- Lodos de depuradora, madera/aserrín, papel/cartón, harinas animales, residuos agrícolas/forestales, RSU orgánico (11 datasets)
- **Créditos de metano evitado**: Captura de metano de rellenos sanitarios (crédito negativo por evitar CH₄)

**Materias primas y combustibles tradicionales:**
- Caliza, arcilla, sílice, escoria, ceniza volante, yeso
- Carbón, petcoke, gas natural, diesel, fuel oil

**Transporte y utilidades:**
- Camión >32t, barco transoceánico
- Electricidad Argentina/Chile, agua industrial

#### Cobertura Geográfica

**Prioridad 1**: Argentina, LAC (Latin America), RoLA (Rest of Latin America)
**Prioridad 2**: GLO (Global), RER (Europa) como respaldo

Esto garantiza precisión para el contexto regional latinoamericano.

### Sistema de Facturación Ecoinvent

**Importante** - Modelo de pago con ajuste retroactivo:

1. **Primera factura**: Basada en valores estimados (50-80 usuarios, 1 indicador, 50 datasets)
2. **Durante el contrato**: Se debe llevar **registro obligatorio** de:
   - Usuarios activos nominalmente identificados
   - Datasets efectivamente utilizados
   - Indicadores accedidos
3. **Final del año**: Reporte de uso real a Ecoinvent
   - Si se excedieron los valores estimados → **Facturación retroactiva**
   - Nueva cotización para el siguiente año basada en uso real

**Recomendación**: Comenzar con valores conservadores (50 usuarios, 50 datasets) y ajustar según uso real.

### Costos Estimados

⚠️ **Ecoinvent no provee precios públicos**. Según el email de Francisco Vidal:
- Estructura de precios basada en los 3 parámetros mencionados
- **No ofrecen descuentos** (confirmado por Johann Leopold)
- Pago anual anticipado
- Contrato renovable anualmente

Para obtener cotización formal, debemos enviar la solicitud con los parámetros especificados.

### Casos de Uso - Aplicaciones FICEM

**Calculadora 2-c (Cemento y Clínker)**:
- EPDs (Environmental Product Declarations)
- Reportes GNR/GCCA (Getting the Numbers Right)
- Certificaciones ambientales

**Calculadora 3-c (Concreto y Hormigón)**:
- Análisis de mezclas de concreto
- Comparación de formulaciones con diferentes agregados/aditivos
- Optimización de huella de carbono

**Hoja de Ruta Net Zero Argentina 2050 (Visualización)**:
- Datos de referencia para simulaciones de descarbonización
- Alineación con ejes E01-E11

### Materiales Sin Factor Ecoinvent Identificado

Identificamos **4 materiales** que requieren confirmación con Ecoinvent sobre datasets alternativos o proxies:

1. **Puzolana natural** (actualmente con factor por defecto 0.00906 kg CO2/kg)
2. **Fluorita** (factor por defecto 50.89 kg CO2/kg - valor parece excesivamente alto)
3. **Chamota** (factor por defecto 0.011 kg CO2/kg)
4. **Diatomita** (factor por defecto 0.044 kg CO2/kg)

Estos se consultarán en la solicitud a ecoinvent.

### Próximos Pasos Propuestos

1. **Revisión FICEM** (Esta semana):
   - Validar número de usuarios objetivo (¿50-80 es correcto?)
   - Confirmar lista de 50 datasets prioritarios
   - Aprobar borrador de email a ecoinvent

2. **Envío a Ecoinvent** (Próxima semana):
   - Email formal a Francisco Vidal solicitando cotización
   - Adjuntar documento técnico con lista completa de datasets
   - Preguntas específicas sobre datasets faltantes y disponibilidad LAC

3. **Evaluación de Cotización** (2-3 semanas):
   - Análisis de propuesta económica
   - Negociación si corresponde
   - Aprobación y firma de contrato

4. **Implementación** (1 mes):
   - Activación de licencia
   - Integración técnica en calculadoras 2-c y 3-c
   - Capacitación interna

### Archivos Adjuntos

1. **propuesta-respuesta-ecoinvent.docx** - Borrador de email formal a Francisco Vidal (en inglés) listo para enviar tras su aprobación
2. **propuesta-respuesta-ecoinvent.txt** - Versión texto plano del mismo email
3. **factores-emision-ecoinvent-requeridos.pdf** - Documento técnico completo con lista detallada de 50 datasets, nombres específicos de procesos Ecoinvent, y alineación con ejes de descarbonización

### Recomendaciones Finales

1. **Usuarios conservadores**: Proponer 50 usuarios inicialmente (vs. 80) para minimizar costo base y ajustar al año siguiente según uso real
2. **Datasets completos**: Mantener 50 datasets para cubrir todos los escenarios de las calculadoras, incluyendo coprocesamiento y biomasa
3. **Prioridad LAC**: Enfatizar en la solicitud la necesidad de datasets regionales para América Latina
4. **Cláusula de ajuste**: Asegurar que el contrato permita agregar datasets adicionales durante el año si se identifican necesidades

Quedo a disposición para coordinar una reunión si requieren discutir algún aspecto técnico o comercial antes de proceder con Ecoinvent.

Saludos cordiales,

---

## Notas Internas

- Email preparado para envío desde tu cuenta personal
- Archivos adjuntos generados en formatos Word (.docx) y texto plano (.txt)
- Documento técnico PDF como referencia completa
- Tono profesional pero accesible para audiencia técnica y gerencial