# Hoja de Ruta Net Zero Argentina 2050

Dashboard interactivo para visualizar y simular el progreso de la industria argentina del cemento y hormigón hacia la neutralidad de carbono.

## Descripción

Este proyecto implementa una plataforma web que permite:
- **Monitorear** indicadores clave de emisiones de CO₂
- **Visualizar** la trayectoria hacia Net Zero 2050
- **Simular** escenarios de descarbonización con calculadora interactiva
- **Comparar** el progreso real vs las metas establecidas

Basado en la Hoja de Ruta Net Zero Argentina 2050, elaborada por AFCP, FICEM, GCCA y ONUDI.

## Estructura del Proyecto

```
hr-arg/
├── app/                    # Aplicación Next.js + TypeScript
│   ├── src/
│   │   ├── app/           # Páginas (App Router)
│   │   ├── components/    # Componentes React
│   │   └── lib/           # Datos y utilidades
│   └── package.json
├── docs/
│   ├── brief/             # Documentación de diseño
│   ├── design/mockups/    # Mockups de referencia
│   └── source/            # Datos fuente extraídos
└── data/                   # Datos actualizables (futuro)
```

## Tecnologías

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Gráficos**: Recharts
- **Iconos**: Lucide React

## Instalación

```bash
cd app
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Home - KPIs principales y gráfico de trayectoria |
| `/hoja-de-ruta` | Los 11 ejes de descarbonización |
| `/dashboard` | Indicadores detallados y gráficos |
| `/calculadora` | Simulador interactivo de emisiones |
| `/sobre` | Información institucional |

## Datos Clave

- **Emisiones actuales**: 507 kgCO₂/tcem (2023)
- **Meta 2030**: < 500 kgCO₂/tcem
- **Meta 2050**: Net Zero (0 emisiones netas)
- **Factor clínker**: 67% → 61% (meta 2050)
- **Coprocesamiento**: 7% → 18% (meta 2050)

## Instituciones Participantes

- **AFCP** - Asociación de Fabricantes de Cemento Portland
- **FICEM** - Federación Interamericana del Cemento
- **GCCA** - Global Cement and Concrete Association
- **ONUDI** - Organización de las Naciones Unidas para el Desarrollo Industrial

### Empresas productoras en Argentina
- Cementos Avellaneda
- Holcim Argentina
- Loma Negra
- PCR

## Licencia

[Por definir]
