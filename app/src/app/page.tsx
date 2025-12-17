"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingDown,
  TrendingUp,
  Target,
  Globe,
  Calculator,
  ChevronRight,
  ChevronDown,
  Rocket,
  Info,
  Users,
  Building2,
  Landmark,
} from "lucide-react";
import { benchmarkingResumen, gruposDescarbonizacion } from "@/lib/data";

export default function Home() {
  const [heroExpanded, setHeroExpanded] = useState(false);

  return (
    <main className="flex-1 bg-white">
      {/* HERO: Argentina lidera - Colapsable */}
      <section className="relative bg-gradient-to-br from-[#1B3A5F] via-[#2E5A8B] to-[#1B3A5F] text-white overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -top-10 -left-10 w-96 h-96 bg-[#5B9BD5] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-8 py-8">
          {/* Header Compacto - Siempre visible */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                <Globe className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Net Zero Argentina 2050
                </h2>
                <p className="text-sm text-white/60">
                  Argentina: Líder en Descarbonización • 495 kgCO₂/tcem vs 598 global
                </p>
              </div>
            </div>

            <button
              onClick={() => setHeroExpanded(!heroExpanded)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 transition-colors text-sm font-medium"
            >
              {heroExpanded ? "Ocultar métricas" : "Ver métricas detalladas"}
              <ChevronDown className={`h-4 w-4 transition-transform ${heroExpanded ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Contenido expandible - Métricas Detalladas */}
          {heroExpanded && (
            <div className="animate-in slide-in-from-top duration-300">
              {/* Dual Commitment Visualization */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-sm mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Building2 className="w-64 h-64 text-white" strokeWidth={0.5} />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-around gap-8 relative z-10">
                  {/* Production UP */}
                  <div className="flex flex-col items-center text-center group cursor-default">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full shadow-md mb-4 border border-white/20 group-hover:-translate-y-1 transition-transform">
                      <TrendingUp className="w-12 h-12 text-emerald-400" strokeWidth={2.5} />
                    </div>
                    <p className="text-emerald-400 text-5xl font-extrabold mb-1">+55%</p>
                    <p className="text-white font-semibold text-lg">Producción Estimada</p>
                    <p className="text-sm text-white/60 mt-1 font-light">Demanda de Mercado</p>
                  </div>

                  {/* Center Connector */}
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="h-px w-32 bg-white/20"></div>
                    <div className="px-4 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-semibold text-white uppercase tracking-wider shadow-sm">
                      27 Años de Transición
                    </div>
                    <div className="h-px w-32 bg-white/20"></div>
                  </div>

                  {/* Emissions DOWN */}
                  <div className="flex flex-col items-center text-center group cursor-default">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full shadow-md mb-4 border border-white/20 group-hover:translate-y-1 transition-transform">
                      <TrendingDown className="w-12 h-12 text-green-400" strokeWidth={2.5} />
                    </div>
                    <p className="text-green-400 text-5xl font-extrabold mb-1">-100%</p>
                    <p className="text-white font-semibold text-lg">Emisiones Netas</p>
                    <p className="text-sm text-white/60 mt-1 font-light">Objetivo Net Zero</p>
                  </div>
                </div>
              </div>

              {/* Dashboard Grid: Leadership & Why It Matters */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                {/* Leadership Card (5 cols) */}
                <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-xl p-6 text-white shadow-lg border border-white/20 relative overflow-hidden">
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-4 text-green-400">
                        <Globe className="w-5 h-5" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Benchmarking</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-1">Argentina: Líder en Descarbonización</h3>
                      <p className="text-white/60 text-sm font-light">
                        Intensidad de emisión actual vs. promedio global
                      </p>
                    </div>
                    <div className="mt-6 flex items-end gap-4">
                      <div className="flex flex-col gap-1 w-1/2">
                        <span className="text-4xl font-extrabold text-white">{benchmarkingResumen.argentina.emisionesNetas}</span>
                        <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-green-400 w-[82%]"></div>
                        </div>
                        <span className="text-xs text-white/60 font-light">kgCO₂/tcem (Argentina)</span>
                      </div>
                      <div className="flex flex-col gap-1 w-1/2 opacity-70">
                        <span className="text-2xl font-bold text-white">598</span>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-white/40 w-full"></div>
                        </div>
                        <span className="text-xs text-white/60 font-light">kgCO₂/tcem (Global)</span>
                      </div>
                    </div>
                  </div>
                  {/* decorative pattern */}
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
                </div>

                {/* Why It Matters (7 cols) */}
                <div className="lg:col-span-7 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-sm flex flex-col justify-center">
                  <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                    <Info className="w-5 h-5 text-green-400" />
                    Impacto del Sector
                  </h3>
                  <div className="grid grid-cols-3 gap-4 divide-x divide-white/10">
                    <div className="flex flex-col items-center text-center px-2">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white mb-3 border border-white/20">
                        <Landmark className="w-6 h-6" />
                      </div>
                      <p className="text-2xl font-bold text-white">12%</p>
                      <p className="text-sm text-white/60 font-light">del PIB Industrial</p>
                    </div>
                    <div className="flex flex-col items-center text-center px-2">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white mb-3 border border-white/20">
                        <Users className="w-6 h-6" />
                      </div>
                      <p className="text-2xl font-bold text-white">60k</p>
                      <p className="text-sm text-white/60 font-light">Empleos Directos</p>
                    </div>
                    <div className="flex flex-col items-center text-center px-2">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white mb-3 border border-white/20">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <p className="text-2xl font-bold text-white">Crítica</p>
                      <p className="text-sm text-white/60 font-light">Infraestructura Nacional</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Cascada Estilizada - Resumen Visual - ELEMENTO PRINCIPAL */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900 text-xl font-bold">Estrategia de Descarbonización</h3>
              <Link
                href="/2050"
                className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
              >
                Ver detalle completo <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Cascada horizontal simplificada */}
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {/* Línea Base */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-16 h-24 rounded-lg bg-red-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    100%
                  </div>
                  <span className="text-xs text-gray-600 mt-2 font-medium">Línea Base</span>
                </div>

                {/* Flecha */}
                <div className="flex-shrink-0 text-gray-300 text-2xl px-1">→</div>

                {/* Grupos de reducción */}
                {gruposDescarbonizacion.map((grupo, index) => (
                  <div key={grupo.grupo} className="flex items-center gap-2">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div
                        className="w-16 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md transition-transform hover:scale-105"
                        style={{
                          backgroundColor: grupo.color,
                          height: `${Math.max(40, grupo.aporte * 2)}px`,
                        }}
                      >
                        -{grupo.aporte}%
                      </div>
                      <span className="text-xs text-gray-500 mt-2 text-center max-w-16 leading-tight">
                        {grupo.nombre.split(" ")[0]}
                      </span>
                    </div>
                    {index < gruposDescarbonizacion.length - 1 && (
                      <div className="flex-shrink-0 text-gray-300 text-xl px-1">+</div>
                    )}
                  </div>
                ))}

                {/* Flecha final */}
                <div className="flex-shrink-0 text-gray-300 text-2xl px-1">=</div>

                {/* Net Zero */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-16 h-24 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    0%
                  </div>
                  <span className="text-xs text-green-600 mt-2 font-bold">Net Zero</span>
                </div>
              </div>

              {/* Leyenda de grupos */}
              <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200">
                {gruposDescarbonizacion.map((grupo) => (
                  <div key={grupo.grupo} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: grupo.color }}
                    />
                    <span className="text-xs text-gray-600">
                      {grupo.nombre} ({grupo.aporte}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Navigation Cards */}
          <div className="mb-12">
            <h3 className="text-gray-900 text-xl font-bold mb-6">Explorar Hoja de Ruta</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 - Trayectoria 2030 */}
              <Link
                href="/2030"
                className="group bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="text-gray-900 text-lg font-bold mb-2">Trayectoria 2030</h4>
                <p className="text-sm text-gray-600 leading-relaxed font-light flex-1">
                  Metas intermedias y planes de acción a mediano plazo.
                </p>
                <div className="mt-4 pt-4 flex items-center text-primary text-sm font-semibold">
                  Ver detalles <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>

              {/* Card 2 - Trayectoria 2050 */}
              <Link
                href="/2050"
                className="group bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Rocket className="w-6 h-6" />
                </div>
                <h4 className="text-gray-900 text-lg font-bold mb-2">Trayectoria 2050</h4>
                <p className="text-sm text-gray-600 leading-relaxed font-light flex-1">
                  El camino final hacia la neutralidad de carbono.
                </p>
                <div className="mt-4 pt-4 flex items-center text-primary text-sm font-semibold">
                  Ver proyección <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>

              {/* Card 3 - Benchmarking */}
              <Link
                href="/benchmarking"
                className="group bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Globe className="w-6 h-6" />
                </div>
                <h4 className="text-gray-900 text-lg font-bold mb-2">Benchmarking</h4>
                <p className="text-sm text-gray-600 leading-relaxed font-light flex-1">
                  Comparativa de indicadores con estándares internacionales.
                </p>
                <div className="mt-4 pt-4 flex items-center text-primary text-sm font-semibold">
                  Analizar datos <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>

              {/* Card 4 - Calculadora */}
              <Link
                href="/calculadora"
                className="group bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Calculator className="w-6 h-6" />
                </div>
                <h4 className="text-gray-900 text-lg font-bold mb-2">Calculadora</h4>
                <p className="text-sm text-gray-600 leading-relaxed font-light flex-1">
                  Simular escenarios de reducción y nuevas tecnologías.
                </p>
                <div className="mt-4 pt-4 flex items-center text-primary text-sm font-semibold">
                  Simular <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            </div>
          </div>

          {/* Timeline Visual */}
          <div className="mb-12">
            <div className="relative w-full h-1 bg-slate-200 rounded-full mt-8">
              {/* Progress bar */}
              <div className="absolute left-0 top-0 h-full w-[4%] bg-primary rounded-full"></div>

              {/* Nodes */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-primary border-2 border-white shadow-sm z-10"></div>
                <p className="absolute top-6 text-sm font-bold text-primary-dark">2023</p>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 left-[25%] flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-slate-300 border-2 border-white shadow-sm z-10"></div>
                <p className="absolute top-6 text-sm font-medium text-slate-400">2030</p>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 left-[62%] flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-slate-300 border-2 border-white shadow-sm z-10"></div>
                <p className="absolute top-6 text-sm font-medium text-slate-400">2040</p>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-0 flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-sm z-10"></div>
                <p className="absolute top-6 text-sm font-bold text-green-600">2050</p>
                <p className="absolute -top-8 text-xs font-bold text-green-600 uppercase tracking-wider bg-green-50 px-2 py-0.5 rounded border border-green-100">
                  Net Zero
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 max-w-7xl mx-auto">
          <div className="flex gap-6 font-light">
            <a className="hover:text-primary transition-colors" href="#">
              Términos de Uso
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Política de Privacidad
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Contacto Institucional
            </a>
          </div>
          <div className="text-right opacity-60 font-light">
            © 2023 AFCP • FICEM • GCCA • ONUDI
          </div>
        </div>
      </footer>
    </main>
  );
}