import { ChevronDown, Globe, Building2 } from "lucide-react";

const actoresClave = [
  { nombre: "AFCP", descripcion: "Coordinador de la industria del cemento." },
  { nombre: "Holcim", descripcion: "Líder en soluciones de construcción innovadoras." },
  { nombre: "Loma Negra", descripcion: "Productor clave en el mercado argentino." },
  { nombre: "ONUDI", descripcion: "Soporte técnico y desarrollo industrial." },
];

const hitos = [
  { year: "2023", titulo: "Lanzamiento", estado: "completado" },
  { year: "2025", titulo: "Revisión Inicial", estado: "proximo" },
  { year: "2030", titulo: "Meta Intermedia", estado: "futuro" },
  { year: "2050", titulo: "Neutralidad", estado: "futuro" },
];

export default function SobrePage() {
  return (
    <main className="flex-1 bg-[var(--background-secondary)] min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-8 lg:px-8">
        <h1 className="text-3xl font-bold text-[var(--primary)] tracking-tight">
          Sobre la Iniciativa
        </h1>
        <p className="mt-2 text-[var(--foreground-muted)] max-w-3xl">
          Una plataforma colaborativa para el monitoreo y simulación de la Hoja de Ruta Net Zero 2050 para el sector del cemento y hormigón en Argentina. Nuestro objetivo es proporcionar herramientas transparentes y basadas en datos para acelerar la transición hacia una industria de la construcción sostenible y con cero emisiones netas.
        </p>
      </div>

      <div className="px-6 py-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Acordeones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Misión y Visión */}
            <div className="bg-white rounded-xl border border-[var(--border)]">
              <details className="group" open>
                <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-[var(--primary)] font-semibold">
                  <span>Misión y Visión</span>
                  <ChevronDown className="h-5 w-5 text-[var(--foreground-muted)] transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-sm text-[var(--foreground-muted)] leading-relaxed">
                  Nuestra misión es facilitar la descarbonización del sector del cemento argentino a través de la colaboración, la innovación tecnológica y la política pública informada. Visualizamos una industria resiliente, competitiva y líder en sostenibilidad a nivel global para 2050.
                </div>
              </details>
            </div>

            {/* Preguntas Frecuentes */}
            <div className="bg-white rounded-xl border border-[var(--border)]">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-[var(--primary)] font-semibold">
                  <span>Preguntas Frecuentes (FAQ)</span>
                  <ChevronDown className="h-5 w-5 text-[var(--foreground-muted)] transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-sm text-[var(--foreground-muted)] space-y-4">
                  <div>
                    <p className="text-[var(--primary)] font-medium mb-1">¿Qué es Net Zero?</p>
                    <p>Un balance entre emisiones producidas y removidas de la atmósfera.</p>
                  </div>
                  <div>
                    <p className="text-[var(--primary)] font-medium mb-1">¿Por qué 2050?</p>
                    <p>Fecha establecida por el Acuerdo de París para limitar el calentamiento a 1.5°C.</p>
                  </div>
                </div>
              </details>
            </div>
          </div>

          {/* Actores Clave */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--primary)] mb-4 text-center">Actores Clave</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {actoresClave.map((actor) => (
                <div
                  key={actor.nombre}
                  className="bg-[var(--background-secondary)] rounded-xl p-5 text-center hover:bg-[var(--gray-light)] transition-colors"
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-[var(--primary)] mb-1">{actor.nombre}</h3>
                  <p className="text-xs text-[var(--foreground-muted)]">{actor.descripcion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hitos de la Hoja de Ruta */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--primary)] mb-4 text-center">Hitos de la Hoja de Ruta</h2>
            <div className="flex items-center justify-center gap-4 lg:gap-8 flex-wrap">
              {hitos.map((hito, index) => (
                <div key={hito.year} className="flex items-center gap-4">
                  <div className="text-center">
                    <div
                      className={`w-6 h-6 mx-auto mb-2 rounded-full flex items-center justify-center ${
                        hito.estado === "completado"
                          ? "bg-[var(--success)]"
                          : hito.estado === "proximo"
                          ? "bg-[var(--accent)]"
                          : "bg-[var(--gray-medium)]"
                      }`}
                    >
                      {hito.estado === "completado" && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-lg font-bold text-[var(--primary)]">{hito.year}</p>
                    <p className="text-xs text-[var(--foreground-muted)]">{hito.titulo}</p>
                  </div>
                  {index < hitos.length - 1 && (
                    <div className="hidden lg:block w-16 h-0.5 bg-[var(--border)]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Liderazgo Regional */}
          <div className="bg-[var(--background-secondary)] rounded-xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-[var(--accent)] rounded-lg flex items-center justify-center flex-shrink-0">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--primary)] mb-2">Liderazgo Regional</h3>
              <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                Argentina se posiciona como un pionero en la región al establecer una hoja de ruta concreta y cuantificable para la descarbonización del cemento. Esta iniciativa no solo impulsa la sostenibilidad local, sino que también establece un modelo para otras economías emergentes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
