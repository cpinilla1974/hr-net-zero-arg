import { TrayectoriaChart } from "@/components/charts/TrayectoriaChart";
import { kpiData } from "@/lib/data";
import Link from "next/link";
import { TrendingDown, Layers, Recycle, Trees } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 bg-[var(--background-secondary)]">
      {/* Header */}
      <section className="bg-white px-6 py-8 lg:px-8 lg:py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-[var(--primary)] tracking-tight">
            Construyendo un Futuro Sostenible
          </h1>
          <p className="mt-2 text-base text-[var(--foreground-muted)] max-w-3xl">
            Monitoreo y simulación de la Hoja de Ruta Net Zero 2050 para el sector cementero argentino.
          </p>
        </div>
      </section>

      {/* KPIs */}
      <section className="px-6 py-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1: Reducción de Emisiones */}
            <div className="bg-white rounded-xl p-5 border border-[var(--border)]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-[var(--foreground-muted)] font-medium">Reducción de Emisiones</p>
                <TrendingDown className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <p className="text-4xl font-bold text-[var(--primary)]">17%</p>
            </div>

            {/* KPI 2: Factor Clínker */}
            <div className="bg-white rounded-xl p-5 border border-[var(--border)]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-[var(--foreground-muted)] font-medium">Factor Clinker</p>
                <Layers className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <p className="text-4xl font-bold text-[var(--primary)]">{kpiData.factorClinker.actual}%</p>
            </div>

            {/* KPI 3: Coprocesamiento */}
            <div className="bg-white rounded-xl p-5 border border-[var(--border)]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-[var(--foreground-muted)] font-medium">Coprocesamiento</p>
                <Recycle className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <p className="text-4xl font-bold text-[var(--primary)]">{kpiData.coprocesamiento.actual}%</p>
            </div>

            {/* KPI 4: Captura de Carbono */}
            <div className="bg-white rounded-xl p-5 border border-[var(--border)]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-[var(--foreground-muted)] font-medium">Captura de Carbono</p>
                <Trees className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <p className="text-4xl font-bold text-[var(--primary)]">0%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gráfico de Trayectoria */}
      <section className="px-6 py-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <h2 className="text-lg font-semibold text-[var(--primary)]">
                Trayectoria de Emisiones Netas 2023-2050
              </h2>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-[var(--accent)]"></div>
                  <span className="text-sm text-[var(--foreground-muted)]">Trayectoria Net Zero</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-gray-400 border-dashed border-t-2 border-gray-400"></div>
                  <span className="text-sm text-[var(--foreground-muted)]">Trayectoria BAU (Business as Usual)</span>
                </div>
              </div>
            </div>
            <div className="h-80 lg:h-96 w-full">
              <TrayectoriaChart />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--foreground-muted)]">
              © 2024 Net Zero 2050 Argentina. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/sobre" className="text-sm text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors">
                Sobre el Proyecto
              </Link>
              <Link href="/hoja-de-ruta" className="text-sm text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors">
                Metodología
              </Link>
              <Link href="/sobre" className="text-sm text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-colors">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
