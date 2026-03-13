"use client";

import { useState, useEffect } from "react";

export interface TrayectoriaAnual {
  anio: number;
  emisiones_netas: number;
  factor_clinker: number;
  tsr: number;
  biomasa_pct: number;
  eficiencia_termica: number;
  produccion_mt: number;
}

export interface ResumenAnual {
  [anio: number]: Record<string, number>;
}

export function useTrayectoria() {
  const [serie, setSerie] = useState<TrayectoriaAnual[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/indicadores?action=trayectoria")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setSerie(data.serie))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { serie, loading, error };
}

export function useResumen() {
  const [datos, setDatos] = useState<ResumenAnual | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/indicadores?action=resumen")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setDatos(data.datos))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { datos, loading, error };
}

// Utilidad: obtener el último año de la serie
export function ultimoAnio(serie: TrayectoriaAnual[]): TrayectoriaAnual | undefined {
  return serie.length > 0 ? serie[serie.length - 1] : undefined;
}
