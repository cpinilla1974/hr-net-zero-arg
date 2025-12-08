import { ChevronDown, Globe } from "lucide-react";
import Link from "next/link";

const actoresClave = [
  { nombre: "AFCP", sigla: "AFCP" },
  { nombre: "Holcim", sigla: "Holcim" },
  { nombre: "Loma Negra", sigla: "Loma Negra" },
  { nombre: "ONUDI", sigla: "ONUDI" },
];

const hitos = [
  {
    year: "2023",
    titulo: "Lanzamiento de la Hoja de Ruta",
    descripcion: "Presentación oficial de la iniciativa y compromiso del sector.",
    estado: "completado",
  },
  {
    year: "2025",
    titulo: "Primeras Implementaciones",
    descripcion: "Inicio de proyectos piloto con tecnologías de bajas emisiones.",
    estado: "proximo",
  },
  {
    year: "2030",
    titulo: "Meta Intermedia de Reducción",
    descripcion: "Lograr una reducción significativa de emisiones a nivel sectorial.",
    estado: "futuro",
  },
  {
    year: "2050",
    titulo: "Objetivo Net Zero",
    descripcion: "Alcanzar la neutralidad de carbono en la industria del cemento y hormigón.",
    estado: "futuro",
  },
];

export default function SobrePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section
        className="relative min-h-[40vh] lg:min-h-[50vh] w-full bg-cover bg-center bg-no-repeat text-white flex items-end"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(16, 34, 24, 0.95) 100%), url('/hero-field.jpg')`,
          backgroundColor: 'var(--background-secondary)'
        }}
      >
        <div className="container mx-auto px-4 pb-10 lg:pb-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl lg:text-5xl font-black leading-tight tracking-tight">
              Construyendo un Futuro Sostenible
            </h1>
            <p className="mt-3 text-base lg:text-lg text-gray-300">
              La Hoja de Ruta Net Zero Argentina 2050
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Descripción */}
        <section className="mb-10 lg:mb-16 max-w-3xl">
          <p className="text-base lg:text-lg text-[var(--foreground-muted)] leading-relaxed">
            La Hoja de Ruta Net Zero 2050 es una iniciativa pionera en Argentina para guiar a la industria del cemento y hormigón hacia un futuro con cero emisiones netas. Este proyecto colaborativo busca implementar tecnologías innovadoras y prácticas sostenibles para reducir significativamente la huella de carbono del sector.
          </p>
        </section>

        {/* Acordeones */}
        <section className="mb-10 lg:mb-16 max-w-3xl">
          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-white">
                <span className="font-medium">Nuestra Misión y Visión</span>
                <ChevronDown className="h-5 w-5 text-[var(--foreground-muted)] transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="pt-4 text-sm text-[var(--foreground-muted)] space-y-3">
                <p><strong className="text-white">Misión:</strong> Liderar la transición hacia una industria del cemento y hormigón carbono neutral en Argentina, mediante la implementación de tecnologías limpias y prácticas sostenibles.</p>
                <p><strong className="text-white">Visión:</strong> Ser referentes en América Latina en descarbonización industrial, demostrando que es posible producir cemento de alta calidad con impacto ambiental mínimo.</p>
              </div>
            </details>
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-white">
                <span className="font-medium">Preguntas Frecuentes</span>
                <ChevronDown className="h-5 w-5 text-[var(--foreground-muted)] transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="pt-4 text-sm text-[var(--foreground-muted)] space-y-4">
                <div>
                  <p className="text-white font-medium mb-1">¿Qué es Net Zero?</p>
                  <p>Net Zero significa alcanzar un equilibrio entre las emisiones de gases de efecto invernadero producidas y las removidas de la atmósfera.</p>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">¿Por qué 2050?</p>
                  <p>2050 es la fecha establecida por el Acuerdo de París para limitar el calentamiento global a 1.5°C, requiriendo que todas las industrias alcancen la neutralidad de carbono.</p>
                </div>
              </div>
            </details>
          </div>
        </section>

        {/* Actores Clave */}
        <section className="mb-10 lg:mb-16">
          <h2 className="text-xl lg:text-2xl font-bold mb-6">Actores Clave</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {actoresClave.map((actor, index) => (
              <div
                key={index}
                className="flex h-24 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4 hover:border-[var(--primary)]/50 transition-colors"
              >
                <span className="text-lg font-bold text-white">{actor.sigla}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Hitos del Proyecto - Timeline */}
        <section className="mb-10 lg:mb-16">
          <h2 className="text-xl lg:text-2xl font-bold mb-6">Hitos del Proyecto</h2>
          <div className="space-y-0">
            {hitos.map((hito, index) => (
              <div key={index} className="flex gap-4 lg:gap-6">
                {/* Timeline indicator */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      hito.estado === "completado"
                        ? "bg-[var(--primary)]"
                        : "bg-[var(--border)]"
                    }`}
                  />
                  {index < hitos.length - 1 && (
                    <div className="w-0.5 flex-1 bg-[var(--border)] min-h-[80px]" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-8">
                  <span className="text-sm text-[var(--foreground-muted)]">{hito.year}</span>
                  <h3 className="font-semibold text-white mt-1">{hito.titulo}</h3>
                  <p className="text-sm text-[var(--foreground-muted)] mt-1">{hito.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Liderazgo Regional Card */}
        <section className="mb-10 lg:mb-16">
          <div className="rounded-xl bg-[var(--background-card)] border border-[var(--border)] p-6 lg:p-8">
            <Globe className="h-10 w-10 text-[var(--primary)] mb-4" />
            <h3 className="text-xl font-bold mb-3">Liderazgo Regional</h3>
            <p className="text-[var(--foreground-muted)] leading-relaxed">
              Argentina se posiciona como pionera en la descarbonización de la industria del cemento en América Latina, estableciendo un modelo a seguir para la región.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-8 py-4 text-base font-bold text-[var(--background)] hover:opacity-90 transition-opacity"
          >
            Explora el Dashboard
          </Link>
        </section>
      </div>
    </main>
  );
}
