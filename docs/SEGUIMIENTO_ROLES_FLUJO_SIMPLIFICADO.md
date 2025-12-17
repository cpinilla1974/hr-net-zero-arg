# Sistema de Seguimiento - Flujo Simplificado

**Fecha**: 16 de Diciembre 2024
**Cambio**: Eliminación de aprobaciones intermedias

---

## Roles del Sistema (Simplificado)

| # | Rol | Valor BD | Quién | Organización | Acceso en `/seguimiento` |
|---|-----|----------|-------|--------------|-------------------------|
| 1 | **Informante Empresa** | `INFORMANTE_EMPRESA` | Empleado operativo | Holcim, Loma Negra, Avellaneda, PCR | Cargar datos anuales (archivos Excel) |
| 2 | **Admin FICEM** | `ADMIN_PROCESO` | Staff FICEM | **FICEM** (coordinador técnico) | Procesar datos, ejecutar agregación nacional, publicar |

---

## Flujo de Trabajo Simplificado

```
INFORMANTE_EMPRESA
  ↓ Carga archivos GNR + Adicionales 2030 + Adicionales 2050 (opcional)
  ↓ Estado: BORRADOR
  ↓ Envía a FICEM
  ↓ Estado: ENVIADO

ADMIN_PROCESO (FICEM)
  ↓ Recibe reportes de todas las empresas
  ↓ Estado: EN_PROCESO
  ↓ Procesa datos (validación, agregación)
  ↓ Estado: COMPLETADO
  ↓ Publica resultados
```

---

## Estados de Reporte

| Estado | Descripción | Quién lo cambia |
|--------|-------------|-----------------|
| `BORRADOR` | Informante trabajando | Sistema (inicial) |
| `ENVIADO` | Enviado a FICEM | Informante |
| `EN_PROCESO` | FICEM procesando | Admin FICEM |
| `COMPLETADO` | Procesamiento finalizado | Admin FICEM |

---

## Archivos a Cargar

### 1. GNR (Obligatorio)
- **Granularidad**: Por planta
- **Formato**: Excel (.xlsm)
- **Plantilla**: GCCA_ProtokolV3_1_final.xlsm
- **Indicadores**:
  - Emisiones netas (kgCO₂/tcem)
  - Factor clínker (%)
  - Eficiencia térmica (kcal/kg)
  - Combustibles convencionales
  - Consumo eléctrico (kWh/t)
  - Coprocesamiento (%)

### 2. Adicionales 2030 (Obligatorio)
- **Granularidad**: Por planta
- **Formato**: Excel (.xlsx)
- **Indicadores**:
  - Hidrógeno (% uso - meta 1%)
  - Combustibles de bajo carbono emergentes
  - Otros indicadores específicos 2030

### 3. Adicionales 2050 (Opcional)
- **Granularidad**: Por empresa (consolidado)
- **Formato**: Excel (.xlsx)
- **Indicadores**:
  - CCUS - Captura de carbono (% captura)
  - Soluciones basadas en naturaleza (SbN)
  - Recarbonatación
  - Indicadores técnicos de ejes emergentes

---

## Navegación por Rol

### INFORMANTE_EMPRESA
```
Seguimiento
  ├── Enviar Datos
  └── Resultados
```

### ADMIN_PROCESO
```
Seguimiento
  ├── Procesar Reportes
  └── Resultados
```

---

## Validaciones

### Al cargar datos (INFORMANTE)
- ✅ Archivos obligatorios: GNR + Adicionales 2030
- ✅ Formatos correctos (.xlsm para GNR, .xlsx para adicionales)
- ✅ Año no duplicado
- ⚠️ Warning si faltan campos obligatorios

### Al procesar (ADMIN_FICEM)
- ✅ Validación técnica de datos
- ✅ Coherencia con histórico
- ✅ Comparación entre empresas
- ✅ Validación vs metas Hoja de Ruta

---

## Integración con API

### Endpoints Requeridos (Simplificados)

```typescript
// Autenticación
POST   /api/auth/login
GET    /api/auth/me

// Reportes
GET    /api/submissions                    // Listar (filtrado por rol)
POST   /api/submissions                    // Crear reporte
GET    /api/submissions/{id}               // Obtener
PUT    /api/submissions/{id}               // Editar (BORRADOR)
DELETE /api/submissions/{id}               // Eliminar (BORRADOR)
POST   /api/submissions/{id}/submit        // Enviar a FICEM
POST   /api/submissions/{id}/process       // Procesar (ADMIN)
POST   /api/submissions/{id}/complete      // Marcar completado (ADMIN)
POST   /api/submissions/upload             // Upload archivos Excel

// Agregación
POST   /api/aggregation/{year}/execute     // Ejecutar agregación (ADMIN)
GET    /api/aggregation/{year}             // Ver agregado nacional
POST   /api/aggregation/{year}/publish     // Publicar

// Resultados
GET    /api/results/national               // Resultados nacionales
GET    /api/results/company/{id}           // Resultados por empresa
```

---

## Diferencias vs Flujo Anterior

| Aspecto | Flujo Anterior | Flujo Simplificado |
|---------|---------------|-------------------|
| **Roles** | 5 roles | 2 roles |
| **Estados** | 10 estados | 4 estados |
| **Aprobaciones** | 2 niveles (Supervisor Empresa + FICEM) | 0 niveles (directo a procesamiento) |
| **Páginas** | 4 páginas | 2 páginas |
| **Tiempo de ciclo** | ~2-3 semanas | ~1 semana |

---

## Beneficios del Flujo Simplificado

1. ✅ **Más rápido**: Sin cuellos de botella de aprobaciones intermedias
2. ✅ **Más simple**: Menos roles, menos estados, menos confusión
3. ✅ **Más directo**: Informante → FICEM
4. ✅ **Menos mantenimiento**: Menos código, menos bugs potenciales
5. ✅ **Confianza en las empresas**: Las empresas son responsables de sus datos

---

*Documento actualizado: 16 de Diciembre 2024*
