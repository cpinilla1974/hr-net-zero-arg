# Matriz de Permisos - Frontend HR-ARG

> Documentación de permisos hardcodeados en el frontend Next.js
> Fecha: 2025-12-17

## Resumen Ejecutivo

El frontend **NO tiene protección de rutas implementada**. Solo controla la **visibilidad de enlaces** en el menú de navegación basado en roles.

⚠️ **Vulnerabilidad crítica**: Un usuario puede acceder a cualquier ruta escribiendo la URL directamente, independientemente de su rol.

---

## Roles Implementados en el Frontend

Definidos en: [src/contexts/AuthContext.tsx:5-14](../app/src/contexts/AuthContext.tsx#L5-L14)

```typescript
export type UserRole =
  | "public"
  | "ROOT"
  | "ADMIN_PROCESO"
  | "EJECUTIVO_FICEM"
  | "AMIGO_FICEM"
  | "COORDINADOR_PAIS"
  | "SUPERVISOR_EMPRESA"
  | "INFORMANTE_EMPRESA"
  | "VISOR_EMPRESA";
```

---

## Matriz de Permisos Actual (Solo Navegación)

### Ubicación: [src/components/navigation/Sidebar.tsx](../app/src/components/navigation/Sidebar.tsx)

| Ruta/Página | Rol(es) Permitido(s) | Ubicación Código | Tipo Control |
|-------------|---------------------|------------------|--------------|
| `/` (Home) | Todos | N/A | Público |
| `/2030` (Trayectoria 2030) | Todos | N/A | Público |
| `/2050` (Trayectoria 2050) | Todos | N/A | Público |
| `/sobre` (Sobre) | Todos | N/A | Público |
| `/benchmarking` | Todos | N/A | Público |
| `/calculadora` | Autenticados | Sidebar.tsx:48-52 | requiresAuth |
| `/seguimiento` | Autenticados | Sidebar.tsx:221 | requiresAuth |
| `/seguimiento/submit-data` | `INFORMANTE_EMPRESA` | Sidebar.tsx:58-62 | roles array |
| `/seguimiento/process` | `ADMIN_PROCESO` | Sidebar.tsx:64-68 | roles array |
| `/seguimiento/results` | `INFORMANTE_EMPRESA`, `ADMIN_PROCESO` | Sidebar.tsx:70-74 | roles array |
| `/admin` | `ADMIN_PROCESO` | Sidebar.tsx:284 | role check |
| `/perfil` | Autenticados | Sidebar.tsx:344-351 | En menú usuario |
| `/configuracion` | Autenticados | Sidebar.tsx:352-359 | En menú usuario |

---

## Lógica de Control Implementada

### 1. Control de Visibilidad en Navegación (Sidebar.tsx)

**Para items de seguimiento (líneas 254-256):**
```typescript
const hasPermission = user && subItem.roles.includes(user.role);
if (!hasPermission) return null;  // Oculta el link
```

**Para admin (línea 284):**
```typescript
{user?.role === "ADMIN_PROCESO" && (
  <Link href="/admin">Administración</Link>
)}
```

**Para items con autenticación (línea 126):**
```typescript
const isDisabled = item.requiresAuth && !isAuthenticated;
```

### 2. Control en AuthContext

**Helpers de roles (líneas 175-186):**
```typescript
isAuthenticated: !!user,
isInformante: user?.role === "INFORMANTE_EMPRESA",
isSupervisor: user?.role === "SUPERVISOR_EMPRESA",
isVisor: user?.role === "VISOR_EMPRESA",
isCoordinador: user?.role === "COORDINADOR_PAIS",
isAdminFicem: user?.role === "ADMIN_PROCESO",
```

---

## Roles Definidos pero NO Utilizados

Los siguientes roles existen en el sistema pero **NO tienen permisos específicos** asignados en el frontend:

- ❌ `ROOT` - Sin permisos específicos
- ❌ `EJECUTIVO_FICEM` - Sin permisos específicos
- ❌ `AMIGO_FICEM` - Sin permisos específicos
- ❌ `SUPERVISOR_EMPRESA` - Definido pero no usado en navegación
- ❌ `VISOR_EMPRESA` - Definido pero no usado en navegación
- ⚠️ `COORDINADOR_PAIS` - Definido pero solo ve lo mismo que usuarios autenticados

---

## Páginas Sin Protección

Las siguientes páginas existen pero **NO tienen guards de protección**:

```
/seguimiento/submit-data/page.tsx     ❌ Sin ProtectedRoute
/seguimiento/process/page.tsx         ❌ Sin ProtectedRoute
/seguimiento/results/page.tsx         ❌ Sin ProtectedRoute
/admin/page.tsx                       ❌ Sin ProtectedRoute
```

**Riesgo**: Cualquier usuario autenticado puede acceder escribiendo la URL directamente.

---

## Componente ProtectedRoute

Existe en: [src/components/auth/ProtectedRoute.tsx](../app/src/components/auth/ProtectedRoute.tsx)

**Estado**: ✅ Implementado pero ❌ **NO UTILIZADO** en ninguna página

**Funcionalidad**:
- Verifica autenticación
- Permite especificar roles requeridos
- Redirige a login si no está autenticado
- Muestra "No autorizado" si no tiene el rol

**Ejemplo de uso (NO implementado actualmente):**
```typescript
export default function ProtectedPage() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN_PROCESO"]}>
      <AdminContent />
    </ProtectedRoute>
  );
}
```

---

## Propuesta de Matriz de Permisos Completa

### Para Implementar en la API

| Recurso/Acción | ROOT | ADMIN | EJECUTIVO | COORDINADOR | SUPERVISOR | INFORMANTE | VISOR |
|----------------|------|-------|-----------|-------------|------------|------------|-------|
| **Navegación** |
| Ver Home | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Ver Trayectorias | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Ver Benchmarking | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Seguimiento** |
| Ver seguimiento | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Subir datos | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Procesar reportes | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Ver resultados | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Aprobaciones** |
| Aprobar empresa | ✓ | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ |
| Rechazar empresa | ✓ | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ |
| Aprobar FICEM | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Rechazar FICEM | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| **Administración** |
| Panel admin | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Gestionar usuarios | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Gestionar procesos | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Ver logs sistema | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| **Coordinación** |
| Ver todo el país | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| Enviar recordatorios | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ |
| **Visibilidad Datos** |
| Datos públicos | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Datos amigos FICEM | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Datos su país | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| Datos su empresa | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Datos todas empresas | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |

---

## Flujo de Aprobación Implementado

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUJO DE APROBACIÓN                      │
└─────────────────────────────────────────────────────────────┘

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

---

## Estados de Submission

Definidos en la API: [4c-ficem-core/docs/USUARIOS_Y_PERMISOS.md](../../4c-ficem-core/docs/USUARIOS_Y_PERMISOS.md)

| Estado | Descripción |
|--------|-------------|
| `BORRADOR` | Informante trabajando |
| `ENVIADO` | Informante envió a supervisor |
| `APROBADO_EMPRESA` | Supervisor empresa aprobó |
| `EN_REVISION_FICEM` | Admin FICEM revisando |
| `APROBADO_FICEM` | Admin FICEM aprobó (final) |
| `RECHAZADO_EMPRESA` | Supervisor rechazó |
| `RECHAZADO_FICEM` | Admin FICEM rechazó |
| `PUBLICADO` | Visible públicamente |
| `ARCHIVADO` | Histórico |

---

## Recomendaciones para Implementación

### Urgente (P0)

1. **Implementar guards en todas las páginas protegidas**
   - Usar `ProtectedRoute` en `/seguimiento/*`
   - Usar `ProtectedRoute` en `/admin`
   - Verificar roles en cada página

2. **Sincronizar roles con la API**
   - Validar que todos los roles existan en ambos lados
   - Implementar endpoint `/api/permissions` en la API

### Alta (P1)

3. **Agregar permisos granulares por acción**
   - Crear hook `usePermissions` para validar acciones
   - Implementar checks en botones/acciones (aprobar, rechazar, etc.)

4. **Implementar filtros de datos por rol**
   - VISOR_EMPRESA solo ve su empresa
   - COORDINADOR_PAIS ve todo su país
   - SUPERVISOR_EMPRESA ve y aprueba su empresa

### Media (P2)

5. **Documentar permisos en código**
   - Agregar comentarios en `ProtectedRoute`
   - Crear constantes de permisos centralizadas

6. **Testing de permisos**
   - Tests E2E por rol
   - Verificar que cada rol solo accede a lo permitido

---

## Archivos Relacionados

- [src/contexts/AuthContext.tsx](../app/src/contexts/AuthContext.tsx) - Definición de roles
- [src/components/navigation/Sidebar.tsx](../app/src/components/navigation/Sidebar.tsx) - Control de navegación
- [src/components/auth/ProtectedRoute.tsx](../app/src/components/auth/ProtectedRoute.tsx) - Componente de protección (no usado)
- [docs/USUARIOS_PRUEBA.md](./USUARIOS_PRUEBA.md) - Usuarios de prueba
- [4c-ficem-core/docs/USUARIOS_Y_PERMISOS.md](../../4c-ficem-core/docs/USUARIOS_Y_PERMISOS.md) - Especificación de roles en API

---

**Última actualización**: 2025-12-17
**Autor**: Documentación generada para coordinación con equipo API
