# Metodología de Trabajo - HR-ARG (Net Zero Argentina 2050)

## Iniciar la Aplicación

Cuando el usuario diga "**inicia la aplicación**" o similar:

1. Verificar que el servidor de desarrollo no esté ya corriendo
2. Navegar a la carpeta `app/`
3. Ejecutar `npm run dev` en segundo plano
4. Confirmar la URL de acceso (generalmente http://localhost:3000)

---

## Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Gráficos**: Recharts
- **Iconos**: Lucide React

---

## Estructura del Proyecto

```
hr-arg/
├── app/                    # Aplicación Next.js
│   ├── public/logos/       # Logos institucionales
│   └── src/
│       ├── app/            # Páginas (App Router)
│       ├── components/     # Componentes React
│       └── lib/            # Datos y utilidades
├── docs/
│   ├── brief/              # Documentación de diseño
│   ├── sesiones/           # Registro de sesiones de trabajo
│   └── source/             # Archivos fuente (PDF, imágenes) - gitignored
└── venv/                   # Entorno virtual Python
```

---

## Política de Comunicación

- NUNCA usar jerga argentina o regionalismos
- SIEMPRE usar español neutro profesional

## Política de Commits

- NUNCA incluir a Claude como autor del commit
- NO usar las líneas "🤖 Generated with Claude Code" ni "Co-Authored-By: Claude"
- Los commits deben aparecer como del usuario únicamente

---

## Sesiones de Trabajo

- `/ultima-sesion` - Leer última sesión documentada
- `/documentar-sesion` - Documentar trabajo de la sesión actual

---

## Archivos Ignorados (Git)

Los siguientes archivos/carpetas están en `.gitignore` y no se suben al repositorio:

- `*.pdf` - Documentos PDF pesados
- `docs/source/images/` - Imágenes generadas del PDF
- `docs/source/*.py` - Scripts de procesamiento
- `docs/design/mockups*/` - Mockups de diseño
- `venv/` - Entorno virtual Python
