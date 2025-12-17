"use client";

import { useState, useMemo } from "react";
import { RotateCcw, XCircle, CheckCircle } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { emisionesDetalladas, matrizCombustibles } from "@/lib/data";

// Factores de emisión oficiales (fuente: GCCA/FICEM Argentina)
const FACTOR_CALCINACION = emisionesDetalladas.calcinacion; // 525 kgCO2/tClinker
const FACTOR_GAS_NATURAL = 56.1; // kgCO2/GJ
const FACTOR_PETCOKE = 97.5; // kgCO2/GJ

// Valores línea base 2020
const LINEA_BASE = {
  produccion: 12.55, // Mt cemento
  factorClinker: 67, // %
  eficienciaTermica: 3425, // MJ/tCk
  gasNatural: matrizCombustibles.lineaBase.gasNatural, // 82%
  petcoke: matrizCombustibles.lineaBase.petcoke, // 11%
  biomasa: matrizCombustibles.lineaBase.biomasa, // 4%
  hidrogeno: matrizCombustibles.lineaBase.hidrogeno, // 0%
  cdrFosil: matrizCombustibles.lineaBase.cdrFosil, // 3%
};

function CalculadoraContent() {
  // Estados para inputs (valores línea base 2020)
  const [produccionCemento, setProduccionCemento] = useState(LINEA_BASE.produccion);
  const [factorClinker, setFactorClinker] = useState(LINEA_BASE.factorClinker);
  const [eficienciaTermica, setEficienciaTermica] = useState(LINEA_BASE.eficienciaTermica);
  const [gasNatural, setGasNatural] = useState(LINEA_BASE.gasNatural);
  const [petcoke, setPetcoke] = useState(LINEA_BASE.petcoke);
  const [biomasa, setBiomasa] = useState(LINEA_BASE.biomasa);
  const [hidrogeno, setHidrogeno] = useState(LINEA_BASE.hidrogeno);
  const [cdrFosil, setCdrFosil] = useState(LINEA_BASE.cdrFosil);

  // Cálculos
  const resultados = useMemo(() => {
    const produccionClinker = produccionCemento * (factorClinker / 100);
    const emisionesCalcinacion = produccionClinker * FACTOR_CALCINACION / 1000;
    const energiaTotal = produccionClinker * (eficienciaTermica / 1000);
    const energiaGas = energiaTotal * (gasNatural / 100);
    const energiaPetcoke = energiaTotal * (petcoke / 100);
    const emisionesCombustibles = (energiaGas * FACTOR_GAS_NATURAL + energiaPetcoke * FACTOR_PETCOKE) / 1000;
    const emisionesTotales = emisionesCalcinacion + emisionesCombustibles;
    const emisionesEspecificas = (emisionesTotales / produccionCemento) * 1000;
    const brecha2030 = ((emisionesEspecificas - 500) / 500) * 100;

    return {
      emisionesCalcinacion: emisionesCalcinacion.toFixed(2),
      emisionesCombustibles: emisionesCombustibles.toFixed(2),
      emisionesTotales: emisionesTotales.toFixed(2),
      emisionesEspecificas: Math.round(emisionesEspecificas),
      brecha2030: brecha2030.toFixed(1),
      cumpleMeta2030: emisionesEspecificas <= 500,
    };
  }, [produccionCemento, factorClinker, gasNatural, petcoke, eficienciaTermica]);

  const totalMatriz = gasNatural + petcoke + biomasa + hidrogeno + cdrFosil;

  const resetear = () => {
    setProduccionCemento(LINEA_BASE.produccion);
    setFactorClinker(LINEA_BASE.factorClinker);
    setEficienciaTermica(LINEA_BASE.eficienciaTermica);
    setGasNatural(LINEA_BASE.gasNatural);
    setPetcoke(LINEA_BASE.petcoke);
    setBiomasa(LINEA_BASE.biomasa);
    setHidrogeno(LINEA_BASE.hidrogeno);
    setCdrFosil(LINEA_BASE.cdrFosil);
  };

  return (
    <main className="flex-1 bg-[var(--background-secondary)] min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-8 lg:px-8">
        <h1 className="text-3xl font-bold text-[var(--primary)] tracking-tight">
          Calculadora / Simulador
        </h1>
        <p className="mt-1 text-[var(--foreground-muted)]">
          Ajuste las variables para simular el impacto en los objetivos Net Zero.
        </p>
      </div>

      <div className="px-6 py-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Panel de inputs */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-[var(--border)] p-6">
              {/* Producción */}
              <div className="mb-8">
                <h2 className="text-base font-semibold text-[var(--primary)] mb-4">Producción</h2>
                <div className="space-y-6">
                  <SliderInput
                    label="Producción"
                    value={produccionCemento}
                    onChange={setProduccionCemento}
                    min={5}
                    max={25}
                    step={0.1}
                    unit="Mt"
                  />
                  <SliderInput
                    label="Factor Clinker"
                    value={factorClinker}
                    onChange={setFactorClinker}
                    min={50}
                    max={80}
                    step={1}
                    unit="%"
                  />
                  <SliderInput
                    label="Eficiencia Térmica"
                    value={eficienciaTermica}
                    onChange={setEficienciaTermica}
                    min={3000}
                    max={4000}
                    step={25}
                    unit="MJ/tCk"
                  />
                </div>
              </div>

              {/* Matriz de Combustibles */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-[var(--primary)]">
                    Matriz de Combustibles (Total 100%)
                  </h2>
                  <span className={`text-sm font-medium ${totalMatriz === 100 ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                    {totalMatriz}%
                  </span>
                </div>
                <div className="space-y-4">
                  <SliderInput
                    label="Gas Natural"
                    value={gasNatural}
                    onChange={setGasNatural}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                  />
                  <SliderInput
                    label="Petcoke"
                    value={petcoke}
                    onChange={setPetcoke}
                    min={0}
                    max={50}
                    step={1}
                    unit="%"
                  />
                  <SliderInput
                    label="Biomasa"
                    value={biomasa}
                    onChange={setBiomasa}
                    min={0}
                    max={30}
                    step={1}
                    unit="%"
                  />
                  <SliderInput
                    label="Hidrógeno"
                    value={hidrogeno}
                    onChange={setHidrogeno}
                    min={0}
                    max={20}
                    step={1}
                    unit="%"
                  />
                  <SliderInput
                    label="CDR Fósil"
                    value={cdrFosil}
                    onChange={setCdrFosil}
                    min={0}
                    max={20}
                    step={1}
                    unit="%"
                  />
                </div>
              </div>
            </div>

            {/* Panel de resultados */}
            <div className="space-y-6">
              {/* Resultados en Tiempo Real */}
              <div className="bg-[var(--primary)] rounded-xl p-6 text-white">
                <h2 className="text-lg font-semibold mb-4">Resultados en Tiempo Real</h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-white/70 text-sm">Emisiones Específicas</p>
                    <p className="text-4xl font-bold">{resultados.emisionesEspecificas}</p>
                    <p className="text-white/70 text-sm">kgCO₂/t cem</p>
                  </div>

                  <div>
                    <p className="text-white/70 text-sm">Emisiones Totales</p>
                    <p className="text-3xl font-bold">{resultados.emisionesTotales}</p>
                    <p className="text-white/70 text-sm">MtCO₂</p>
                  </div>

                  <div>
                    <p className="text-white/70 text-sm">Brecha vs Meta 2030</p>
                    <p className={`text-2xl font-bold ${resultados.cumpleMeta2030 ? 'text-green-300' : 'text-yellow-300'}`}>
                      {parseFloat(resultados.brecha2030) > 0 ? '+' : ''}{resultados.brecha2030}%
                    </p>
                  </div>

                  <div>
                    <p className="text-white/70 text-sm">Estado</p>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                      resultados.cumpleMeta2030
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {resultados.cumpleMeta2030 ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Cumple</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">No Cumple</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Desglose */}
              <div className="bg-white rounded-xl border border-[var(--border)] p-6">
                <h3 className="text-base font-semibold text-[var(--primary)] mb-4">Desglose de Emisiones</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--foreground-muted)]">Calcinación</span>
                    <span className="font-medium text-[var(--foreground)]">{resultados.emisionesCalcinacion} MtCO₂</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--foreground-muted)]">Combustibles</span>
                    <span className="font-medium text-[var(--foreground)]">{resultados.emisionesCombustibles} MtCO₂</span>
                  </div>
                  <div className="border-t border-[var(--border)] pt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[var(--primary)]">Total</span>
                      <span className="text-lg font-bold text-[var(--primary)]">{resultados.emisionesTotales} MtCO₂</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón Reset */}
              <button
                onClick={resetear}
                className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] text-white rounded-xl py-3 font-medium hover:bg-[var(--accent)]/90 transition-colors"
              >
                <RotateCcw className="h-5 w-5" />
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-[var(--foreground-muted)]">{label}</span>
        <span className="text-sm font-semibold text-[var(--primary)]">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-[var(--gray-light)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
      />
    </div>
  );
}

export default function CalculadoraPage() {
  return (
    <ProtectedRoute requiredRole="member">
      <CalculadoraContent />
    </ProtectedRoute>
  );
}
