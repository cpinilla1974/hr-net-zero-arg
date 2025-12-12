# Página Seguimiento - Roles y Flujo de Trabajo

**Fecha**: 11 de Diciembre 2024
**Basado en**: Sistema 4c-ficem-core adaptado para HR Argentina

---

## Roles del Sistema

| # | Rol | Valor BD | Quién | Organización | Acceso en `/seguimiento` |
|---|-----|----------|-------|--------------|-------------------------|
| 1 | **Informante Empresa** | `INFORMANTE_EMPRESA` | Empleado operativo | Holcim, Loma Negra, Avellaneda, PCR | Cargar datos anuales (Excel/formulario) |
| 2 | **Supervisor Empresa** | `SUPERVISOR_EMPRESA` | Jefe/Gerente | Holcim, Loma Negra, Avellaneda, PCR | Aprobar datos de su empresa antes de enviar |
| 3 | **Visor Empresa** | `VISOR_EMPRESA` | Empleado consultor | Holcim, Loma Negra, Avellaneda, PCR | Solo visualizar datos de su empresa |
| 4 | **Coordinador AFCP** | `COORDINADOR_PAIS` | Staff AFCP | **AFCP** (dueño del proyecto) | Ver todas las empresas, enviar recordatorios, monitorear |
| 5 | **Admin FICEM** | `ADMIN_PROCESO` | Staff FICEM | **FICEM** (coordinador técnico) | Aprobar datos finales, ejecutar agregación nacional, publicar |

---

## Flujo de Trabajo Anual

### Paso 1: Carga de Datos (Empresa)
```
INFORMANTE_EMPRESA (ej: Holcim)
  ↓ Carga datos año 2024
  → Excel upload o Formulario manual
  → Estado: BORRADOR
```

**Datos a cargar**:
- Producción de cemento (Mt)
- Emisiones totales (MtCO₂)
- Factor clínker (%)
- Coprocesamiento (%)
- Biomasa (%)
- Eficiencia térmica (MJ/tCk)
- Consumo eléctrico (kWh)

---

### Paso 2: Envío a Revisión Interna
```
INFORMANTE_EMPRESA
  ↓ Envía a supervisor
  → Estado: ENVIADO
  → Notificación a SUPERVISOR_EMPRESA
```

---

### Paso 3: Aprobación Empresa
```
SUPERVISOR_EMPRESA (Holcim)
  ↓ Revisa datos
  → ✅ Aprueba → Estado: APROBADO_EMPRESA
  → ❌ Rechaza → Estado: RECHAZADO_EMPRESA
                  (vuelve a BORRADOR)
```

**Notificaciones**:
- Si aprueba → Notifica a COORDINADOR_PAIS (AFCP)
- Si rechaza → Notifica a INFORMANTE_EMPRESA

---

### Paso 4: Monitoreo AFCP
```
COORDINADOR_PAIS (AFCP)
  ↓ Revisa progreso
  → Ve estado de las 4 empresas:
     - Holcim: APROBADO_EMPRESA ✅
     - Loma Negra: ENVIADO ⏳
     - Avellaneda: BORRADOR 📝
     - PCR: APROBADO_EMPRESA ✅
  → Puede enviar recordatorios
  → NO APRUEBA (solo monitorea)
```

---

### Paso 5: Aprobación Final FICEM
```
ADMIN_PROCESO (FICEM)
  ↓ Revisa datos técnicos
  ↓ Valida coherencia
  → ✅ Aprueba → Estado: APROBADO_FICEM
  → ❌ Rechaza → Estado: RECHAZADO_FICEM
                  (vuelve a APROBADO_EMPRESA)
```

---

### Paso 6: Agregación Nacional
```
ADMIN_PROCESO (FICEM)
  ↓ Cuando 4 empresas = APROBADO_FICEM
  ↓ Ejecuta "Agregar Datos Nacionales 2024"
  → Calcula:
     - Producción total Argentina = Σ(empresas)
     - Emisiones promedio ponderado
     - Factor clínker promedio ponderado
     - Coprocesamiento promedio
     - Biomasa promedio
  → Estado: AGREGADO_NACIONAL
```

**Cálculo ejemplo**:
```
Emisiones Argentina 2024 =
  (Emisiones_Holcim * Producción_Holcim +
   Emisiones_LomaNegra * Producción_LomaNegra +
   Emisiones_Avellaneda * Producción_Avellaneda +
   Emisiones_PCR * Producción_PCR)
  / Producción_Total
```

---

### Paso 7: Publicación
```
ADMIN_PROCESO (FICEM)
  ↓ Revisa agregado nacional
  ↓ Genera reporte PDF
  → Publica
  → Estado: PUBLICADO
  → Se actualizan gráficos en /seguimiento
```

**Actualización automática**:
- Gráficos de trayectoria se actualizan con punto 2024
- Alertas de desviación se recalculan
- Reporte anual disponible para descarga

---

## Estados de Submission

| Estado | Descripción | Quién lo cambia |
|--------|-------------|-----------------|
| `BORRADOR` | Informante trabajando | Sistema (inicial) |
| `ENVIADO` | Enviado a supervisor empresa | Informante |
| `RECHAZADO_EMPRESA` | Supervisor rechazó | Supervisor Empresa |
| `APROBADO_EMPRESA` | Supervisor aprobó | Supervisor Empresa |
| `EN_REVISION_FICEM` | FICEM revisando | Admin FICEM |
| `RECHAZADO_FICEM` | FICEM rechazó | Admin FICEM |
| `APROBADO_FICEM` | FICEM aprobó | Admin FICEM |
| `AGREGADO_NACIONAL` | Agregación ejecutada | Admin FICEM (automático) |
| `PUBLICADO` | Visible en gráficos públicos | Admin FICEM |
| `ARCHIVADO` | Histórico | Admin FICEM |

---

## Permisos por Vista

### Vista: Mis Datos (Empresa)
**Acceso**: `INFORMANTE_EMPRESA`, `SUPERVISOR_EMPRESA`, `VISOR_EMPRESA`

| Rol | Ver | Crear | Editar | Eliminar | Enviar | Aprobar |
|-----|-----|-------|--------|----------|--------|---------|
| Informante | ✅ | ✅ | ✅ (BORRADOR) | ✅ | ✅ | ❌ |
| Supervisor | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Visor | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

### Vista: Revisar Submissions (AFCP)
**Acceso**: `COORDINADOR_PAIS`

| Acción | Disponible |
|--------|-----------|
| Ver todas las empresas | ✅ |
| Ver estado de cada submission | ✅ |
| Enviar recordatorios | ✅ |
| Aprobar/Rechazar | ❌ |
| Exportar datos | ✅ |

---

### Vista: Administrar (FICEM)
**Acceso**: `ADMIN_PROCESO`

| Acción | Disponible |
|--------|-----------|
| Ver todas las empresas | ✅ |
| Aprobar/Rechazar submissions | ✅ |
| Ejecutar agregación nacional | ✅ |
| Publicar reportes | ✅ |
| Editar datos (correcciones) | ✅ |
| Archivar años | ✅ |

---

### Vista: Trayectorias (Todos)
**Acceso**: Todos los roles autenticados

| Rol | Ve datos empresa | Ve agregado nacional |
|-----|------------------|---------------------|
| Informante/Supervisor/Visor | ✅ Solo su empresa | ❌ |
| Coordinador AFCP | ✅ Todas | ✅ |
| Admin FICEM | ✅ Todas | ✅ |

---

## Estructura de Tabs en `/seguimiento`

### INFORMANTE_EMPRESA / VISOR_EMPRESA
```
┌─────────────────────────────────────────┐
│ 📤 Mis Datos │ 📊 Mis Resultados         │
└─────────────────────────────────────────┘
```

### SUPERVISOR_EMPRESA
```
┌─────────────────────────────────────────┐
│ ✅ Aprobar │ 📊 Resultados Empresa       │
└─────────────────────────────────────────┘
```

### COORDINADOR_PAIS (AFCP)
```
┌─────────────────────────────────────────────────┐
│ 📋 Monitoreo │ 📊 Trayectorias │ 📄 Reportes    │
└─────────────────────────────────────────────────┘
```

### ADMIN_PROCESO (FICEM)
```
┌──────────────────────────────────────────────────────────────┐
│ 📥 Revisar │ ⚙️ Agregar Nacional │ 📊 Trayectorias │ 📄 Reportes │
└──────────────────────────────────────────────────────────────┘
```

---

## Validaciones

### Al cargar datos (INFORMANTE)
- ✅ Producción > 0
- ✅ Emisiones >= 0
- ✅ Factor clínker entre 50-80%
- ✅ Coprocesamiento entre 0-30%
- ✅ Biomasa entre 0-20%
- ✅ Año no duplicado
- ⚠️ Warning si desviación >10% vs año anterior

### Al aprobar (SUPERVISOR)
- ✅ Revisión manual
- ✅ Comentarios obligatorios si rechaza

### Al aprobar (ADMIN_FICEM)
- ✅ Coherencia con histórico
- ✅ Comparación con otras empresas
- ✅ Validación vs metas Hoja de Ruta

### Al agregar (ADMIN_FICEM)
- ✅ Las 4 empresas en APROBADO_FICEM
- ✅ Mismo año
- ✅ Sin agregación previa para ese año

---

## Integración con 4c-ficem-core API

### Endpoints Requeridos

```typescript
// Autenticación
POST   /api/auth/login
GET    /api/auth/me

// Submissions
GET    /api/submissions                    // Listar (filtrado por rol)
POST   /api/submissions                    // Crear
GET    /api/submissions/{id}               // Obtener
PUT    /api/submissions/{id}               // Editar (BORRADOR)
DELETE /api/submissions/{id}               // Eliminar (BORRADOR)
POST   /api/submissions/{id}/submit        // Enviar a supervisor
POST   /api/submissions/{id}/approve       // Aprobar (SUPERVISOR o ADMIN)
POST   /api/submissions/{id}/reject        // Rechazar
POST   /api/submissions/upload-excel       // Upload Excel

// Agregación
POST   /api/aggregation/{year}/execute     // Ejecutar agregación (ADMIN)
GET    /api/aggregation/{year}             // Ver agregado nacional
POST   /api/aggregation/{year}/publish     // Publicar

// Reportes
GET    /api/reports                        // Listar reportes
GET    /api/reports/{year}/download        // Descargar PDF

// Trayectorias
GET    /api/trajectories/national          // Trayectoria nacional
GET    /api/trajectories/company/{id}      // Trayectoria empresa
```

---

## Próximos Pasos

1. ✅ Definir roles y flujo (HECHO)
2. ⏭️ Actualizar AuthContext con nuevos roles
3. ⏭️ Crear esquema de base de datos (submissions, aggregations)
4. ⏭️ Implementar tabs por rol en `/seguimiento`
5. ⏭️ Crear formulario de carga manual
6. ⏭️ Implementar upload de Excel
7. ⏭️ Crear componente de validación
8. ⏭️ Implementar flujo de aprobación
9. ⏭️ Crear lógica de agregación nacional
10. ⏭️ Integrar con API 4c-ficem-core

---

*Documento elaborado: 11 de Diciembre 2024*
*Basado en: USUARIOS_Y_PERMISOS.md de 4c-ficem-core*