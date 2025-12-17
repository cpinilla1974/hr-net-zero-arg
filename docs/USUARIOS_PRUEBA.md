# Usuarios de Prueba - HR-ARG

Todos los usuarios tienen la contraseña: **`demo123`**

## Empresas Cementeras Argentinas

### Holcim Argentina

| Email | Nombre | Rol |
|-------|--------|-----|
| `informante@holcim.com.ar` | Juan Pérez - Informante Holcim | INFORMANTE_EMPRESA |
| `supervisor@holcim.com.ar` | María García - Supervisor Holcim | SUPERVISOR_EMPRESA |
| `visor@holcim.com.ar` | Carlos López - Visor Holcim | VISOR_EMPRESA |

### Loma Negra

| Email | Nombre | Rol |
|-------|--------|-----|
| `informante@lomanegra.com` | Ana Martínez - Informante Loma Negra | INFORMANTE_EMPRESA |
| `supervisor@lomanegra.com` | Roberto Sánchez - Supervisor Loma Negra | SUPERVISOR_EMPRESA |
| `visor@lomanegra.com` | Laura Fernández - Visor Loma Negra | VISOR_EMPRESA |

### Avellaneda

| Email | Nombre | Rol |
|-------|--------|-----|
| `informante@avellaneda.com` | Diego Torres - Informante Avellaneda | INFORMANTE_EMPRESA |
| `supervisor@avellaneda.com` | Patricia Romero - Supervisor Avellaneda | SUPERVISOR_EMPRESA |

### Petroquímica Comodoro Rivadavia (PCR)

| Email | Nombre | Rol |
|-------|--------|-----|
| `informante@pcr.com.ar` | Martín González - Informante PCR | INFORMANTE_EMPRESA |
| `supervisor@pcr.com.ar` | Silvia Ramírez - Supervisor PCR | SUPERVISOR_EMPRESA |

## Coordinación Nacional

| Email | Nombre | Rol |
|-------|--------|-----|
| `coordinador@afcp.org.ar` | Coordinador AFCP Argentina | COORDINADOR_PAIS |

## Administración FICEM

| Email | Nombre | Rol |
|-------|--------|-----|
| `ficem@ficem.org` | Operador FICEM | ADMIN_PROCESO |

---

## Descripción de Roles

### INFORMANTE_EMPRESA
- Puede cargar datos de su empresa
- Puede enviar reportes al supervisor
- Solo ve datos de su empresa

### SUPERVISOR_EMPRESA
- Aprueba o rechaza reportes del informante
- Puede enviar reportes a FICEM para aprobación final
- Solo ve datos de su empresa

### VISOR_EMPRESA
- Solo puede ver datos de su empresa
- No puede editar ni aprobar

### COORDINADOR_PAIS
- Ve todos los datos de Argentina
- Puede enviar recordatorios
- No aprueba reportes (solo observa el proceso)

### ADMIN_PROCESO
- Ve todo el sistema
- Aprueba reportes finales de todas las empresas
- Gestiona procesos MRV
- Puede exportar datos agregados

---

## Flujo de Trabajo

```
1. INFORMANTE carga datos → BORRADOR
2. INFORMANTE envía → ENVIADO
3. SUPERVISOR aprueba → APROBADO_EMPRESA
4. ADMIN_PROCESO revisa → EN_REVISION_FICEM
5. ADMIN_PROCESO aprueba → APROBADO_FICEM
```

**Nota:** El COORDINADOR_PAIS puede observar todo el flujo pero no interviene en las aprobaciones.
