# Estado de Implementación - HR-ARG
> Fecha: 2025-12-17

## Resumen Ejecutivo

El frontend **HR-ARG** está integrado con la API **4c-ficem-core** y tiene una base sólida implementada:
- ✅ Autenticación JWT funcional
- ✅ 11 usuarios de prueba creados (4 empresas argentinas)
- ✅ Proceso MRV "hr-argentina-2024" activo
- ✅ Sistema de roles implementado
- ⚠️ **Falta**: Protección de rutas, interfaz para submissions, workflow de aprobación

---

## 1. Infraestructura y Autenticación

### ✅ Implementado

| Componente | Ubicación | Estado |
|------------|-----------|---------|
| API Client | [src/lib/api/client.ts](../app/src/lib/api/client.ts) | ✅ Completo |
| Auth Service | [src/lib/api/auth.ts](../app/src/lib/api/auth.ts) | ✅ Completo |
| Auth Context | [src/contexts/AuthContext.tsx](../app/src/contexts/AuthContext.tsx) | ✅ Completo |
| Login Page | [src/app/login/page.tsx](../app/src/app/login/page.tsx) | ✅ Completo |

**Características**:
- JWT almacenado en localStorage
- Refresh automático del token en cada request
- Estado de autenticación global con React Context
- Login page con usuarios de prueba visibles en desarrollo

---

## 2. Usuarios y Roles

### ✅ Usuarios de Prueba Creados

| Empresa | Informante | Supervisor | Visor |
|---------|-----------|-----------|-------|
| **Holcim Argentina** | informante@holcim.com.ar | supervisor@holcim.com.ar | visor@holcim.com.ar |
| **Loma Negra** | informante@lomanegra.com | supervisor@lomanegra.com | visor@lomanegra.com |
| **Avellaneda** | informante@avellaneda.com | supervisor@avellaneda.com | - |
| **PCR** | informante@pcr.com.ar | supervisor@pcr.com.ar | - |

**Roles administrativos**:
- `coordinador@afcp.org.ar` - COORDINADOR_PAIS
- `ficem@ficem.org` - ADMIN_PROCESO (contraseña: `ficem123`)

**Todos los usuarios** usan la contraseña: `demo123`

Ver detalles en: [docs/USUARIOS_PRUEBA.md](./USUARIOS_PRUEBA.md)

### ✅ Roles Implementados

```typescript
type UserRole =
  | "ROOT"
  | "ADMIN_PROCESO"
  | "EJECUTIVO_FICEM"
  | "AMIGO_FICEM"
  | "COORDINADOR_PAIS"
  | "SUPERVISOR_EMPRESA"
  | "INFORMANTE_EMPRESA"
  | "VISOR_EMPRESA";
```

**Sincronizado con la API** en [4c-ficem-core/database/models.py:16-30](../../4c-ficem-core/database/models.py#L16-L30)

---

## 3. Proceso MRV de Argentina

### ✅ Proceso Activo en la API

```json
{
  "id": "hr-argentina-2024",
  "nombre": "Hoja de Ruta Net Zero Argentina 2050",
  "pais_iso": "AR",
  "tipo": "MRV_HR",
  "estado": "ACTIVO",
  "ciclo": "2024"
}
```

**Endpoint**: `GET /api/v1/procesos/hr-argentina-2024`

Este proceso está listo para recibir submissions de las empresas argentinas.

---

## 4. Permisos y Navegación

### ✅ Control de Visibilidad en Sidebar

Implementado en: [src/components/navigation/Sidebar.tsx](../app/src/components/navigation/Sidebar.tsx)

**Páginas públicas** (sin autenticación):
- `/` - Home
- `/2030` - Trayectoria 2030
- `/2050` - Trayectoria 2050
- `/sobre` - Sobre
- `/benchmarking` - Comparativa Global

**Páginas con autenticación**:
- `/calculadora` - Cualquier usuario autenticado
- `/seguimiento` - Cualquier usuario autenticado (landing)
- `/seguimiento/submit-data` - Solo `INFORMANTE_EMPRESA`
- `/seguimiento/process` - Solo `ADMIN_PROCESO`
- `/seguimiento/results` - `INFORMANTE_EMPRESA`, `ADMIN_PROCESO`
- `/admin` - Solo `ADMIN_PROCESO`

### ⚠️ Vulnerabilidad Crítica

**Las rutas NO están protegidas**, solo se ocultan los enlaces del menú.

Un usuario puede acceder a cualquier página escribiendo la URL directamente, independientemente de su rol.

**Documentación completa**: [docs/MATRIZ_PERMISOS_FRONTEND.md](./MATRIZ_PERMISOS_FRONTEND.md)

---

## 5. Componentes Disponibles pero NO Utilizados

| Componente | Ubicación | Estado |
|------------|-----------|---------|
| ProtectedRoute | [src/components/auth/ProtectedRoute.tsx](../app/src/components/auth/ProtectedRoute.tsx) | ✅ Implementado ❌ NO USADO |

Este componente permite proteger rutas por rol, pero **no se ha aplicado** a ninguna página todavía.

---

## 6. Endpoints de la API Disponibles

Según la documentación de la API ([4c-ficem-core/docs/USUARIOS_Y_PERMISOS.md](../../4c-ficem-core/docs/USUARIOS_Y_PERMISOS.md)):

### Procesos

| Método | Endpoint | Rol requerido |
|--------|----------|---------------|
| GET | `/api/v1/procesos` | Autenticado |
| GET | `/api/v1/procesos/{id}` | Autenticado |
| POST | `/api/v1/procesos` | ROOT, ADMIN_PROCESO |
| PUT | `/api/v1/procesos/{id}` | ROOT, ADMIN_PROCESO |

### Submissions (NO CONECTADAS TODAVÍA)

| Método | Endpoint | Rol requerido |
|--------|----------|---------------|
| POST | `/api/v1/procesos/{proceso_id}/submissions` | INFORMANTE_EMPRESA, SUPERVISOR_EMPRESA |
| GET | `/api/v1/procesos/{proceso_id}/submissions` | Según visibilidad |
| GET | `/api/v1/submissions/{id}` | Según visibilidad |
| POST | `/api/v1/submissions/{id}/upload` | INFORMANTE_EMPRESA |
| POST | `/api/v1/submissions/{id}/validate` | Autenticado |
| POST | `/api/v1/submissions/{id}/submit` | INFORMANTE_EMPRESA, SUPERVISOR_EMPRESA |
| POST | `/api/v1/submissions/{id}/aprobar-empresa` | SUPERVISOR_EMPRESA |
| POST | `/api/v1/submissions/{id}/aprobar-ficem` | ROOT, ADMIN_PROCESO |

---

## 7. Workflow de Aprobación (API)

```
┌─────────────────────────────────────────────────────────┐
│                  FLUJO DE APROBACIÓN                    │
└─────────────────────────────────────────────────────────┘

1. INFORMANTE_EMPRESA carga datos
   ↓
   Estado: BORRADOR
   ↓
2. INFORMANTE_EMPRESA envía
   ↓
   Estado: ENVIADO
   ↓
3. SUPERVISOR_EMPRESA aprueba/rechaza
   ↓
   Estado: APROBADO_EMPRESA / RECHAZADO_EMPRESA
   ↓
4. ADMIN_PROCESO revisa
   ↓
   Estado: EN_REVISION_FICEM
   ↓
5. ADMIN_PROCESO aprueba/rechaza
   ↓
   Estado: APROBADO_FICEM / RECHAZADO_FICEM

COORDINADOR_PAIS: Observa todo el flujo (no aprueba)
```

**Estados disponibles**:
- `BORRADOR` - Informante trabajando
- `ENVIADO` - Informante envió a supervisor
- `APROBADO_EMPRESA` - Supervisor empresa aprobó
- `EN_REVISION_FICEM` - Admin FICEM revisando
- `APROBADO_FICEM` - Admin FICEM aprobó (final)
- `RECHAZADO_EMPRESA` - Supervisor rechazó
- `RECHAZADO_FICEM` - Admin FICEM rechazó
- `PUBLICADO` - Visible públicamente
- `ARCHIVADO` - Histórico

---

## Próximos Pasos Recomendados

### 🔴 Urgente (P0) - Seguridad

#### 1. Implementar protección de rutas

**Objetivo**: Prevenir acceso no autorizado a páginas protegidas.

**Implementación**:
```typescript
// En cada página protegida
export default function SubmitDataPage() {
  return (
    <ProtectedRoute allowedRoles={["INFORMANTE_EMPRESA"]}>
      <SubmitDataContent />
    </ProtectedRoute>
  );
}
```

**Páginas a proteger**:
- `/seguimiento/submit-data` → `["INFORMANTE_EMPRESA"]`
- `/seguimiento/process` → `["ADMIN_PROCESO"]`
- `/seguimiento/results` → `["INFORMANTE_EMPRESA", "ADMIN_PROCESO"]`
- `/admin` → `["ADMIN_PROCESO"]`

**Archivos a modificar**:
- [app/src/app/seguimiento/submit-data/page.tsx](../app/src/app/seguimiento/submit-data/page.tsx)
- [app/src/app/seguimiento/process/page.tsx](../app/src/app/seguimiento/process/page.tsx)
- [app/src/app/seguimiento/results/page.tsx](../app/src/app/seguimiento/results/page.tsx)
- [app/src/app/admin/page.tsx](../app/src/app/admin/page.tsx)

**Tiempo estimado**: 1-2 horas

---

### 🟠 Alta (P1) - Funcionalidad Core

#### 2. Crear servicio de Submissions en el frontend

**Objetivo**: Conectar el frontend con los endpoints de submissions de la API.

**Implementación**:
```typescript
// app/src/lib/api/submissions.ts
export const submissionsAPI = {
  // Listar submissions de un proceso
  list: (procesoId: string) =>
    apiClient.get(`/procesos/${procesoId}/submissions`),

  // Crear nueva submission
  create: (procesoId: string, data: {empresa_id: number, planta_id?: number}) =>
    apiClient.post(`/procesos/${procesoId}/submissions`, data),

  // Obtener detalle de submission
  get: (id: string) =>
    apiClient.get(`/submissions/${id}`),

  // Subir archivo Excel
  uploadFile: (id: string, file: File) => {
    const formData = new FormData();
    formData.append('archivo', file);
    return apiClient.post(`/submissions/${id}/upload`, formData);
  },

  // Enviar para revisión
  submit: (id: string) =>
    apiClient.post(`/submissions/${id}/submit`),

  // Aprobar a nivel empresa (SUPERVISOR)
  aprobarEmpresa: (id: string, accion: 'aprobar' | 'rechazar', comentario?: string) =>
    apiClient.post(`/submissions/${id}/aprobar-empresa`, { accion, comentario }),

  // Aprobar a nivel FICEM (ADMIN)
  aprobarFicem: (id: string, accion: 'aprobar' | 'rechazar' | 'en_revision', comentario?: string) =>
    apiClient.post(`/submissions/${id}/aprobar-ficem`, { accion, comentario }),
};
```

**Archivos a crear**:
- `app/src/lib/api/submissions.ts`
- `app/src/types/submission.ts` (TypeScript interfaces)

**Tiempo estimado**: 2-3 horas

---

#### 3. Implementar página "Enviar Datos" (`/seguimiento/submit-data`)

**Objetivo**: Permitir a INFORMANTE_EMPRESA crear submissions y subir archivos Excel.

**Funcionalidades**:
- Ver mis submissions existentes (tabla con estado)
- Crear nueva submission
- Subir archivo Excel (.xlsx)
- Validar archivo
- Enviar para aprobación del supervisor
- Ver comentarios y estado

**Componentes a crear**:
- `SubmissionsTable` - Tabla de mis submissions
- `CreateSubmissionModal` - Modal para crear nueva submission
- `FileUploadZone` - Zona de drag & drop para archivos Excel
- `SubmissionDetail` - Vista detallada de una submission

**Tiempo estimado**: 8-12 horas

---

#### 4. Implementar página "Procesar Reportes" (`/seguimiento/process`)

**Objetivo**: Permitir a ADMIN_PROCESO revisar y aprobar submissions.

**Funcionalidades**:
- Ver todas las submissions pendientes de revisión
- Filtrar por empresa, fecha, estado
- Revisar detalles de submission
- Ver archivo Excel subido
- Ver validaciones
- Aprobar/rechazar con comentarios
- Ver historial de aprobaciones

**Componentes a crear**:
- `AdminSubmissionsTable` - Tabla de todas las submissions
- `SubmissionReviewPanel` - Panel de revisión detallada
- `ApprovalActions` - Botones de aprobar/rechazar
- `ValidationResults` - Resultados de validaciones

**Tiempo estimado**: 8-12 horas

---

#### 5. Implementar página "Resultados" (`/seguimiento/results`)

**Objetivo**: Mostrar resultados de submissions aprobadas.

**Funcionalidades**:
- Ver mis submissions aprobadas (empresa)
- Ver todas las submissions aprobadas (admin)
- Visualizar resultados de cálculos
- Exportar resultados
- Gráficos y benchmarking

**Componentes a crear**:
- `ResultsTable` - Tabla de resultados
- `ResultsCharts` - Gráficos de resultados
- `ExportButton` - Exportar a Excel/CSV

**Tiempo estimado**: 6-8 horas

---

### 🟡 Media (P2) - Mejoras

#### 6. Implementar página de administración (`/admin`)

**Objetivo**: Panel de administración para ADMIN_PROCESO.

**Funcionalidades**:
- Gestionar usuarios
- Gestionar empresas
- Gestionar procesos MRV
- Ver estadísticas del sistema

**Tiempo estimado**: 12-16 horas

---

#### 7. Agregar notificaciones y comentarios

**Objetivo**: Sistema de notificaciones para alertar a usuarios sobre cambios de estado.

**Funcionalidades**:
- Notificaciones en tiempo real (WebSocket o polling)
- Sistema de comentarios en submissions
- Alertas visuales en el UI

**Tiempo estimado**: 6-8 horas

---

#### 8. Mejorar UX de navegación por roles

**Objetivo**: Adaptar la interfaz según el rol del usuario.

**Funcionalidades**:
- Dashboard personalizado por rol
- Onboarding para nuevos usuarios
- Ayuda contextual

**Tiempo estimado**: 4-6 horas

---

## Stack Técnico Actual

✅ **Implementado**:
- Next.js 16.0.7 (App Router)
- TypeScript
- Tailwind CSS v4
- React Context API (autenticación)
- JWT authentication
- Recharts (gráficos)
- Lucide React (iconos)

❌ **No implementado pero recomendado**:
- React Query / TanStack Query (cache de API)
- Zod (validación de formularios)
- react-hook-form (manejo de formularios)
- shadcn/ui (componentes UI)

---

## Estimación Total de Trabajo Pendiente

| Prioridad | Tareas | Tiempo estimado |
|-----------|--------|-----------------|
| P0 - Urgente | Protección de rutas | 1-2 horas |
| P1 - Alta | Servicio API + 3 páginas principales | 26-35 horas |
| P2 - Media | Admin + Notificaciones + UX | 22-30 horas |
| **TOTAL** | | **49-67 horas** |

---

## Recomendación de Prioridades

### Fase 1: Seguridad (1 día)
1. ✅ Implementar ProtectedRoute en todas las páginas sensibles
2. ✅ Verificar que los usuarios solo acceden a lo permitido

### Fase 2: MVP del Workflow (1-2 semanas)
1. ✅ Crear servicio de submissions
2. ✅ Implementar página "Enviar Datos" (INFORMANTE)
3. ✅ Implementar página "Procesar Reportes" (ADMIN)
4. ✅ Implementar página "Resultados"

### Fase 3: Administración (1 semana)
1. ✅ Implementar panel de administración
2. ✅ Gestión de usuarios y empresas

### Fase 4: Polish (3-5 días)
1. ✅ Sistema de notificaciones
2. ✅ Mejoras de UX
3. ✅ Tests E2E

---

## Archivos Clave de Referencia

### Frontend (hr-arg)
- [MATRIZ_PERMISOS_FRONTEND.md](./MATRIZ_PERMISOS_FRONTEND.md) - Permisos implementados
- [USUARIOS_PRUEBA.md](./USUARIOS_PRUEBA.md) - Usuarios de prueba
- [src/contexts/AuthContext.tsx](../app/src/contexts/AuthContext.tsx) - Contexto de autenticación
- [src/lib/api/client.ts](../app/src/lib/api/client.ts) - Cliente API
- [src/components/navigation/Sidebar.tsx](../app/src/components/navigation/Sidebar.tsx) - Navegación

### API (4c-ficem-core)
- [docs/USUARIOS_Y_PERMISOS.md](../../4c-ficem-core/docs/USUARIOS_Y_PERMISOS.md) - Especificación completa de permisos
- [database/models.py](../../4c-ficem-core/database/models.py) - Modelos de datos
- [scripts/seed_argentina_users.py](../../4c-ficem-core/scripts/seed_argentina_users.py) - Script de usuarios de prueba

---

**Última actualización**: 2025-12-17
**Autor**: Documentación de estado del proyecto
