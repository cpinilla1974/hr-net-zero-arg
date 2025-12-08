import { TrayectoriaChart } from "@/components/charts/TrayectoriaChart";
import { kpiData } from "@/lib/data";
import Link from "next/link";
import { ArrowUp, ArrowDown, Leaf, Flame, Trees, Factory } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section con imagen de fondo */}
      <section
        className="relative min-h-[50vh] lg:min-h-[60vh] w-full bg-cover bg-center bg-no-repeat text-white flex items-end"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(16, 34, 24, 0.95) 100%), url('/hero-cement.jpg')`,
          backgroundColor: 'var(--background-secondary)'
        }}
      >
        <div className="container mx-auto px-4 pb-12 lg:pb-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
              Construyendo un Futuro Sostenible
            </h1>
            <p className="mt-4 text-base lg:text-xl text-gray-300 max-w-2xl">
              Hoja de Ruta Net Zero Argentina 2050 para la industria del cemento y hormigón.
            </p>
            <Link
              href="/dashboard"
              className="mt-6 lg:mt-8 inline-flex items-center justify-center rounded-lg h-12 px-6 bg-[var(--primary)] text-[var(--background)] text-base font-bold hover:opacity-90 transition-opacity"
            >
              Explorar el Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Indicadores Clave */}
      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-left mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-4xl font-bold tracking-tight">Indicadores Clave de Progreso</h2>
            <p className="mt-2 text-base lg:text-lg text-[var(--foreground-muted)] max-w-3xl">
              Monitoreo del avance hacia nuestros objetivos de descarbonización.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* KPI 1: Reducción de Emisiones */}
            <div className="group flex flex-col gap-3 rounded-xl p-5 lg:p-6 border border-[var(--border)] bg-[var(--background-card)] hover:border-[var(--primary)]/50 transition-all duration-300">
              <div className="flex items-center justify-between">
                <p className="text-[var(--foreground-muted)] text-sm font-medium">Reducción de Emisiones</p>
                <Factory className="h-5 w-5 text-[var(--foreground-muted)] group-hover:text-[var(--primary)] transition-colors" />
              </div>
              <p className="text-3xl lg:text-4xl font-bold">17%</p>
              <div className="flex items-center gap-1 mt-auto">
                <ArrowUp className="h-4 w-4 text-green-500" />
                <p className="text-green-500 text-sm font-medium">vs 1990: -18%</p>
              </div>
            </div>

            {/* KPI 2: Factor Clínker */}
            <div className="group flex flex-col gap-3 rounded-xl p-5 lg:p-6 border border-[var(--border)] bg-[var(--background-card)] hover:border-[var(--primary)]/50 transition-all duration-300">
              <div className="flex items-center justify-between">
                <p className="text-[var(--foreground-muted)] text-sm font-medium">Factor Clínker</p>
                <Leaf className="h-5 w-5 text-[var(--foreground-muted)] group-hover:text-[var(--primary)] transition-colors" />
              </div>
              <p className="text-3xl lg:text-4xl font-bold">{kpiData.factorClinker.actual}%</p>
              <div className="flex items-center gap-1 mt-auto">
                <ArrowDown className="h-4 w-4 text-green-500" />
                <p className="text-green-500 text-sm font-medium">Meta 2050: {kpiData.factorClinker.meta2050}%</p>
              </div>
            </div>

            {/* KPI 3: Coprocesamiento */}
            <div className="group flex flex-col gap-3 rounded-xl p-5 lg:p-6 border border-[var(--border)] bg-[var(--background-card)] hover:border-[var(--primary)]/50 transition-all duration-300">
              <div className="flex items-center justify-between">
                <p className="text-[var(--foreground-muted)] text-sm font-medium">Coprocesamiento</p>
                <Flame className="h-5 w-5 text-[var(--foreground-muted)] group-hover:text-[var(--primary)] transition-colors" />
              </div>
              <p className="text-3xl lg:text-4xl font-bold">{kpiData.coprocesamiento.actual}%</p>
              <div className="flex items-center gap-1 mt-auto">
                <ArrowUp className="h-4 w-4 text-green-500" />
                <p className="text-green-500 text-sm font-medium">Meta 2050: {kpiData.coprocesamiento.meta2050}%</p>
              </div>
            </div>

            {/* KPI 4: Captura de Carbono */}
            <div className="group flex flex-col gap-3 rounded-xl p-5 lg:p-6 border border-[var(--border)] bg-[var(--background-card)] hover:border-[var(--primary)]/50 transition-all duration-300">
              <div className="flex items-center justify-between">
                <p className="text-[var(--foreground-muted)] text-sm font-medium">Captura de Carbono</p>
                <Trees className="h-5 w-5 text-[var(--foreground-muted)] group-hover:text-[var(--primary)] transition-colors" />
              </div>
              <p className="text-3xl lg:text-4xl font-bold">0%</p>
              <div className="flex items-center gap-1 mt-auto">
                <ArrowUp className="h-4 w-4 text-[var(--foreground-muted)]" />
                <p className="text-[var(--foreground-muted)] text-sm font-medium">Meta 2050: 45%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hoja de Ruta - Gráfico */}
      <section className="py-12 lg:py-24 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
            {/* Texto lateral */}
            <div className="lg:col-span-4 mb-8 lg:mb-0">
              <h2 className="text-2xl lg:text-4xl font-bold tracking-tight">Nuestra Hoja de Ruta</h2>
              <p className="mt-4 text-base lg:text-lg text-[var(--foreground-muted)]">
                Visualiza la trayectoria proyectada y el progreso actual hacia la neutralidad de carbono.
              </p>

              <div className="mt-6 lg:mt-8 p-4 rounded-lg bg-[var(--background-card)] border border-[var(--border)]">
                <p className="text-sm text-[var(--foreground-muted)]">Emisiones Actuales</p>
                <p className="text-2xl lg:text-3xl font-bold mt-1">{kpiData.emisionesEspecificas.actual} kgCO₂/t</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDown className="h-4 w-4 text-green-500" />
                  <p className="text-green-500 text-sm font-medium">-18% vs 1990</p>
                </div>
              </div>
            </div>

            {/* Gráfico */}
            <div className="lg:col-span-8 flex flex-col gap-2 rounded-xl border border-[var(--border)] p-4 lg:p-6 bg-[var(--background-card)]">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <p className="text-base lg:text-lg font-medium">Trayectoria de Descarbonización 2020-2050</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[var(--primary)]"></div>
                    <span className="text-xs text-[var(--foreground-muted)]">Net Zero</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs text-[var(--foreground-muted)]">BAU</span>
                  </div>
                </div>
              </div>
              <div className="h-64 lg:h-80 w-full mt-4">
                <TrayectoriaChart />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)]">
        <div className="container mx-auto px-4 py-8 lg:py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link href="/sobre" className="text-[var(--foreground-muted)] hover:text-[var(--primary)] text-sm transition-colors">
                Contacto
              </Link>
              <Link href="/hoja-de-ruta" className="text-[var(--foreground-muted)] hover:text-[var(--primary)] text-sm transition-colors">
                Documentos
              </Link>
              <Link href="/sobre" className="text-[var(--foreground-muted)] hover:text-[var(--primary)] text-sm transition-colors">
                Prensa
              </Link>
            </div>
            <p className="text-[var(--foreground-muted)] text-sm text-center md:text-left">
              © 2024 Net Zero Argentina 2050. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
