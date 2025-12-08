"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, Calculator, RotateCcw } from "lucide-react";
import Link from "next/link";
import { kpiData } from "@/lib/data";

// Factores de emisión (simplificados)
const FACTOR_CALCINACION = 525; // kgCO2/tClinker
const FACTOR_GAS_NATURAL = 56.1; // kgCO2/GJ
const FACTOR_PETCOKE = 97.5; // kgCO2/GJ
const ENERGIA_POR_CLINKER = 3.425; // GJ/tClinker

export default function CalculadoraPage() {
  // Estados para inputs
  const [produccionCemento, setProduccionCemento] = useState(12.6); // Mt
  const [factorClinker, setFactorClinker] = useState(67); // %
  const [gasNatural, setGasNatural] = useState(82); // %
  const [petcoke, setPetcoke] = useState(11); // %
  const [biomasa, setBiomasa] = useState(4); // %
  const [cdrFosil, setCdrFosil] = useState(3); // %
  const [hidrogeno, setHidrogeno] = useState(0); // %
  const [coprocesamiento, setCoprocesamiento] = useState(7); // %
  const [eficienciaTermica, setEficienciaTermica] = useState(3425); // MJ/tCk

  // Cálculos
  const resultados = useMemo(() => {
    // Producción de clínker
    const produccionClinker = produccionCemento * (factorClinker / 100);

    // Emisiones de calcinación
    const emisionesCalcinacion = produccionClinker * FACTOR_CALCINACION / 1000; // MtCO2

    // Energía total
    const energiaTotal = produccionClinker * (eficienciaTermica / 1000); // PJ

    // Emisiones de combustibles fósiles
    const energiaGas = energiaTotal * (gasNatural / 100);
    const energiaPetcoke = energiaTotal * (petcoke / 100);
    const emisionesCombustibles = (energiaGas * FACTOR_GAS_NATURAL + energiaPetcoke * FACTOR_PETCOKE) / 1000; // MtCO2

    // Emisiones totales
    const emisionesTotales = emisionesCalcinacion + emisionesCombustibles;

    // Emisiones específicas
    const emisionesEspecificas = (emisionesTotales / produccionCemento) * 1000; // kgCO2/tcem

    // Brecha vs metas
    const brecha2030 = emisionesEspecificas - 500;
    const brecha2050 = emisionesEspecificas;

    return {
      produccionClinker: produccionClinker.toFixed(2),
      emisionesCalcinacion: emisionesCalcinacion.toFixed(2),
      emisionesCombustibles: emisionesCombustibles.toFixed(2),
      emisionesTotales: emisionesTotales.toFixed(2),
      emisionesEspecificas: Math.round(emisionesEspecificas),
      brecha2030: Math.round(brecha2030),
      brecha2050: Math.round(brecha2050),
      cumpleMeta2030: emisionesEspecificas <= 500,
    };
  }, [produccionCemento, factorClinker, gasNatural, petcoke, eficienciaTermica]);

  const resetear = () => {
    setProduccionCemento(12.6);
    setFactorClinker(67);
    setGasNatural(82);
    setPetcoke(11);
    setBiomasa(4);
    setCdrFosil(3);
    setHidrogeno(0);
    setCoprocesamiento(7);
    setEficienciaTermica(3425);
  };

  return (
    <main className="flex-1">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/80 p-4 backdrop-blur-sm">
        <Link href="/" className="flex h-10 w-10 items-center justify-center text-[var(--foreground-muted)]">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="flex-1 text-center text-lg font-bold tracking-tight">
          Calculadora de Emisiones
        </h1>
        <button
          onClick={resetear}
          className="flex h-10 w-10 items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--primary)]"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </header>

      <div className="px-4 py-6">
        {/* Resultados principales */}
        <section className="mb-6 rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4">
          <div className="mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-[var(--primary)]" />
            <h2 className="text-lg font-bold">Resultados</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-[var(--background)] p-3">
              <p className="text-xs text-[var(--foreground-muted)]">Emisiones Específicas</p>
              <p className={`text-2xl font-bold ${resultados.cumpleMeta2030 ? "text-[var(--primary)]" : "text-[var(--warning)]"}`}>
                {resultados.emisionesEspecificas}
              </p>
              <p className="text-xs text-[var(--foreground-muted)]">kgCO₂/tcem</p>
            </div>
            <div className="rounded-lg bg-[var(--background)] p-3">
              <p className="text-xs text-[var(--foreground-muted)]">Emisiones Totales</p>
              <p className="text-2xl font-bold text-white">{resultados.emisionesTotales}</p>
              <p className="text-xs text-[var(--foreground-muted)]">MtCO₂</p>
            </div>
            <div className="rounded-lg bg-[var(--background)] p-3">
              <p className="text-xs text-[var(--foreground-muted)]">Brecha Meta 2030</p>
              <p className={`text-2xl font-bold ${resultados.brecha2030 <= 0 ? "text-[var(--primary)]" : "text-[var(--error)]"}`}>
                {resultados.brecha2030 > 0 ? "+" : ""}{resultados.brecha2030}
              </p>
              <p className="text-xs text-[var(--foreground-muted)]">kgCO₂/tcem vs 500</p>
            </div>
            <div className="rounded-lg bg-[var(--background)] p-3">
              <p className="text-xs text-[var(--foreground-muted)]">Estado</p>
              <p className={`text-lg font-bold ${resultados.cumpleMeta2030 ? "text-[var(--primary)]" : "text-[var(--warning)]"}`}>
                {resultados.cumpleMeta2030 ? "✓ Cumple 2030" : "⚠ Sobre meta"}
              </p>
            </div>
          </div>
        </section>

        {/* Inputs - Producción */}
        <section className="mb-6">
          <h3 className="mb-4 text-base font-bold">Producción</h3>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-sm text-[var(--foreground-muted)]">Producción de Cemento</label>
                <span className="text-sm font-medium text-[var(--primary)]">{produccionCemento} Mt</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="0.1"
                value={produccionCemento}
                onChange={(e) => setProduccionCemento(parseFloat(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
              <div className="flex justify-between text-xs text-[var(--foreground-muted)]">
                <span>5 Mt</span>
                <span>25 Mt</span>
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-sm text-[var(--foreground-muted)]">Factor Clínker</label>
                <span className="text-sm font-medium text-[var(--primary)]">{factorClinker}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="80"
                step="1"
                value={factorClinker}
                onChange={(e) => setFactorClinker(parseInt(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
              <div className="flex justify-between text-xs text-[var(--foreground-muted)]">
                <span>50%</span>
                <span>Meta 2050: 61%</span>
                <span>80%</span>
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-sm text-[var(--foreground-muted)]">Eficiencia Térmica</label>
                <span className="text-sm font-medium text-[var(--primary)]">{eficienciaTermica} MJ/tCk</span>
              </div>
              <input
                type="range"
                min="3000"
                max="4000"
                step="25"
                value={eficienciaTermica}
                onChange={(e) => setEficienciaTermica(parseInt(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
              <div className="flex justify-between text-xs text-[var(--foreground-muted)]">
                <span>3000</span>
                <span>Meta: 3300</span>
                <span>4000</span>
              </div>
            </div>
          </div>
        </section>

        {/* Inputs - Matriz de Combustibles */}
        <section className="mb-6">
          <h3 className="mb-4 text-base font-bold">Matriz de Combustibles</h3>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-sm text-[var(--foreground-muted)]">Gas Natural</label>
                <span className="text-sm font-medium text-[var(--primary)]">{gasNatural}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={gasNatural}
                onChange={(e) => setGasNatural(parseInt(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-sm text-[var(--foreground-muted)]">Petcoke</label>
                <span className="text-sm font-medium text-[var(--primary)]">{petcoke}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={petcoke}
                onChange={(e) => setPetcoke(parseInt(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-sm text-[var(--foreground-muted)]">Biomasa</label>
                <span className="text-sm font-medium text-[var(--primary)]">{biomasa}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={biomasa}
                onChange={(e) => setBiomasa(parseInt(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-sm text-[var(--foreground-muted)]">Hidrógeno</label>
                <span className="text-sm font-medium text-[var(--primary)]">{hidrogeno}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={hidrogeno}
                onChange={(e) => setHidrogeno(parseInt(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-[var(--background)] p-3">
            <p className="text-xs text-[var(--foreground-muted)]">Total matriz</p>
            <p className={`text-lg font-bold ${gasNatural + petcoke + biomasa + cdrFosil + hidrogeno === 100 ? "text-[var(--primary)]" : "text-[var(--warning)]"}`}>
              {gasNatural + petcoke + biomasa + cdrFosil + hidrogeno}%
            </p>
          </div>
        </section>

        {/* Desglose de emisiones */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4">
          <h3 className="mb-4 text-base font-bold">Desglose de Emisiones</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--foreground-muted)]">Calcinación</span>
              <span className="font-medium">{resultados.emisionesCalcinacion} MtCO₂</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--foreground-muted)]">Combustibles</span>
              <span className="font-medium">{resultados.emisionesCombustibles} MtCO₂</span>
            </div>
            <div className="border-t border-[var(--border)] pt-2">
              <div className="flex items-center justify-between">
                <span className="font-bold">Total</span>
                <span className="text-lg font-bold text-[var(--primary)]">{resultados.emisionesTotales} MtCO₂</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
