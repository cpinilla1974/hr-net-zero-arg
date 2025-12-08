import { ProgressRing } from "@/components/ui/ProgressRing";
import { EjeCard } from "@/components/ui/EjeCard";
import { ejesDescarbonizacion } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function HojaDeRutaPage() {
  // Calcular progreso total (suma de aportes de todos los ejes que ya están en progreso)
  const progresoActual = 17; // Aproximado basado en avances actuales

  return (
    <main className="flex-1">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/80 p-4 backdrop-blur-sm">
        <Link href="/" className="flex h-10 w-10 items-center justify-center text-[var(--foreground-muted)]">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="flex-1 text-center text-lg font-bold tracking-tight">
          Hoja de Ruta Net Zero 2050
        </h1>
        <div className="h-10 w-10" />
      </header>

      <div className="px-4 py-6">
        {/* Hero Section */}
        <section className="mb-6 flex flex-col items-center text-center">
          <ProgressRing progress={progresoActual} sublabel="Completado" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight">Camino al 100%</h2>
          <p className="mt-2 max-w-sm text-base text-[var(--foreground-muted)]">
            Detalle de los 11 ejes de descarbonización con sus respectivas contribuciones porcentuales.
          </p>
        </section>

        {/* Grupos de Ejes */}
        <section className="mb-6">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-[var(--primary-muted)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
              Grupo A: Diseño y Hormigón (18%)
            </span>
            <span className="rounded-full bg-[var(--primary-muted)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
              Grupo B: Producción (19%)
            </span>
            <span className="rounded-full bg-[var(--primary-muted)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
              Grupo C: CCUS (45%)
            </span>
          </div>
        </section>

        {/* Lista de Ejes */}
        <div className="flex flex-col gap-4">
          {ejesDescarbonizacion.map((eje) => (
            <EjeCard
              key={eje.id}
              codigo={eje.codigo}
              nombre={eje.nombre}
              aporte={eje.aporte}
              descripcion={eje.descripcion}
              icon={eje.icon}
              indicador={eje.indicador}
              valorActual={eje.valorActual}
              meta2050={eje.meta2050}
            />
          ))}
        </div>

        {/* Resumen */}
        <section className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4">
          <h3 className="mb-4 text-lg font-bold">Resumen de Contribuciones</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[var(--foreground-muted)]">Diseño y Construcción (A)</span>
              <span className="font-bold text-[var(--primary)]">18%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--foreground-muted)]">Producción y Combustibles (B)</span>
              <span className="font-bold text-[var(--primary)]">19%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--foreground-muted)]">Captura de Carbono (C)</span>
              <span className="font-bold text-[var(--primary)]">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--foreground-muted)]">Electricidad (D)</span>
              <span className="font-bold text-[var(--primary)]">5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--foreground-muted)]">Recarbonatación (E)</span>
              <span className="font-bold text-[var(--primary)]">13%</span>
            </div>
            <div className="mt-2 border-t border-[var(--border)] pt-2">
              <div className="flex items-center justify-between">
                <span className="font-bold">Total</span>
                <span className="text-xl font-bold text-[var(--primary)]">100%</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
