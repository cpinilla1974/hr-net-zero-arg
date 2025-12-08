import { ejesDescarbonizacion } from "@/lib/data";

const grupos = [
  { id: "A", nombre: "Grupo A: Diseño y Construcción", aporte: 18, ejes: ["E01", "E02"] },
  { id: "B", nombre: "Grupo B: Clínker y Coprocesamiento", aporte: 19, ejes: ["E03", "E06"] },
  { id: "C", nombre: "Grupo C: CCUS", aporte: 45, ejes: ["E09"] },
  { id: "D", nombre: "Grupo D: Electricidad", aporte: 5, ejes: ["E10"] },
  { id: "E", nombre: "Grupo E: Recarbonatación", aporte: 13, ejes: ["E11"] },
];

const contribuciones = [
  { grupo: "Grupo A: Diseño y Construcción", porcentaje: 18 },
  { grupo: "Grupo B: Clínker y Coprocesamiento", porcentaje: 19 },
  { grupo: "Grupo C: Capturas Tecnológicas CCUS", porcentaje: 45 },
  { grupo: "Grupo D: Electricidad Baja en Carbono", porcentaje: 5 },
  { grupo: "Grupo E: Recarbonatación", porcentaje: 13 },
];

export default function HojaDeRutaPage() {
  const progresoActual = 17;

  return (
    <main className="flex-1 bg-[var(--background-secondary)] min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-8 lg:px-8">
        <h1 className="text-3xl font-bold text-[var(--primary)] tracking-tight">
          Net Zero 2050 - Cemento Argentino
        </h1>
        <p className="mt-1 text-[var(--foreground-muted)]">
          Monitoreo y simulación de la hoja de ruta para la descarbonización del sector.
        </p>
      </div>

      <div className="px-6 py-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna principal - Ejes */}
            <div className="lg:col-span-2 space-y-6">
              {/* Grupo A */}
              <div>
                <h2 className="text-lg font-semibold text-[var(--primary)] mb-4">
                  Grupo A: Diseño y Construcción <span className="text-[var(--accent)]">18%</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EjeCardSimple
                    codigo="Eje 01"
                    nombre="Diseño y Construcción"
                    descripcion="Innovaciones en el diseño de mezclas y procesos constructivos."
                    aporte={8}
                  />
                  <EjeCardSimple
                    codigo="Eje 02"
                    nombre="Eficiencia Producción Hormigón"
                    descripcion="Optimización en la producción para reducir el consumo energético."
                    aporte={10}
                  />
                </div>
              </div>

              {/* Grupo B */}
              <div>
                <h2 className="text-lg font-semibold text-[var(--primary)] mb-4">
                  Grupo B: Clínker y Coprocesamiento <span className="text-[var(--accent)]">19%</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EjeCardSimple
                    codigo="Eje 03"
                    nombre="Cemento y Adiciones"
                    descripcion="Uso de adiciones cementicias suplementarias para reducir el factor clínker."
                    aporte={12}
                  />
                  <EjeCardSimple
                    codigo="Eje 06"
                    nombre="Coprocesamiento"
                    descripcion="Aprovechamiento de residuos como combustible y materia prima."
                    aporte={7}
                  />
                </div>
              </div>

              {/* Grupos C, D, E */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Grupo C */}
                <div>
                  <h3 className="text-base font-semibold text-[var(--primary)] mb-3">
                    Grupo C: CCUS <span className="text-[var(--accent)]">45%</span>
                  </h3>
                  <EjeCardSimple
                    codigo="Eje 09"
                    nombre="Capturas Tecnológicas"
                    descripcion="Implementación de tecnologías de captura y almacenamiento de carbono."
                    aporte={45}
                  />
                </div>

                {/* Grupo D */}
                <div>
                  <h3 className="text-base font-semibold text-[var(--primary)] mb-3">
                    Grupo D: Electricidad <span className="text-[var(--accent)]">5%</span>
                  </h3>
                  <EjeCardSimple
                    codigo="Eje 10"
                    nombre="Consumo Eléctrico"
                    descripcion="Transición a fuentes de energía renovable para el consumo eléctrico."
                    aporte={5}
                  />
                </div>

                {/* Grupo E */}
                <div>
                  <h3 className="text-base font-semibold text-[var(--primary)] mb-3">
                    Grupo E: Recarbonatación <span className="text-[var(--accent)]">13%</span>
                  </h3>
                  <EjeCardSimple
                    codigo="Eje 11"
                    nombre="Recarbonatación"
                    descripcion="Absorción natural de CO2 por el hormigón a lo largo de su vida útil."
                    aporte={13}
                  />
                </div>
              </div>
            </div>

            {/* Columna lateral - Progreso y Resumen */}
            <div className="space-y-6">
              {/* Progress Ring */}
              <div className="bg-white rounded-xl border border-[var(--border)] p-6 text-center">
                <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">Progreso Total</h3>
                <div className="relative w-40 h-40 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${progresoActual * 2.51} 251`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-[var(--success)]">{progresoActual}%</span>
                  </div>
                </div>
                <p className="text-sm text-[var(--foreground-muted)]">Completado</p>
              </div>

              {/* Contribución por Grupo */}
              <div className="bg-white rounded-xl border border-[var(--border)] p-6">
                <h3 className="text-base font-semibold text-[var(--primary)] mb-4">Contribución por Grupo</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                    <span className="text-sm font-medium text-[var(--primary)]">Contribución por Grupo</span>
                    <span className="text-sm font-medium text-[var(--primary)]">%</span>
                  </div>
                  {contribuciones.map((item) => (
                    <div key={item.grupo} className="flex items-center justify-between py-1">
                      <span className="text-sm text-[var(--foreground-muted)]">{item.grupo}</span>
                      <span className="text-sm font-semibold text-[var(--foreground)]">{item.porcentaje}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function EjeCardSimple({
  codigo,
  nombre,
  descripcion,
  aporte,
}: {
  codigo: string;
  nombre: string;
  descripcion: string;
  aporte: number;
}) {
  return (
    <div className="bg-white rounded-xl border border-[var(--border)] p-5 hover:border-[var(--accent)] transition-colors">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-semibold text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-1 rounded">
          {codigo}
        </span>
      </div>
      <h4 className="font-semibold text-[var(--primary)] mb-2">{nombre}</h4>
      <p className="text-sm text-[var(--foreground-muted)] mb-3">{descripcion}</p>
      <p className="text-2xl font-bold text-[var(--accent)]">{aporte}%</p>
    </div>
  );
}
