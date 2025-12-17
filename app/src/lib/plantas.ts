/**
 * Datos de plantas por empresa
 * TODO: Reemplazar por endpoint API GET /empresas/{id}/plantas
 */

export interface Planta {
  id: number;
  nombre: string;
  ubicacion: string;
  empresa_id: number;
}

// Mapping de empresa_id a plantas
// empresa_id coincide con los IDs usados en el login (ver AuthContext)
export const plantasPorEmpresa: Record<number, Planta[]> = {
  // Holcim Argentina (empresa_id: 1)
  1: [
    { id: 1, nombre: "Planta Campana", ubicacion: "Buenos Aires", empresa_id: 1 },
    { id: 2, nombre: "Planta Puesto Viejo", ubicacion: "Jujuy", empresa_id: 1 },
    { id: 3, nombre: "Planta Malagueño", ubicacion: "Córdoba", empresa_id: 1 },
    { id: 4, nombre: "Planta Capdeville", ubicacion: "Mendoza", empresa_id: 1 },
  ],
  // Loma Negra (empresa_id: 2)
  2: [
    { id: 5, nombre: "Planta Olavarría", ubicacion: "Buenos Aires", empresa_id: 2 },
    { id: 6, nombre: "Planta L'Amalí", ubicacion: "Buenos Aires", empresa_id: 2 },
    { id: 7, nombre: "Planta Catamarca", ubicacion: "Catamarca", empresa_id: 2 },
    { id: 8, nombre: "Planta San Juan", ubicacion: "San Juan", empresa_id: 2 },
  ],
  // Cementos Avellaneda (empresa_id: 3)
  3: [
    { id: 9, nombre: "Planta San Luis", ubicacion: "San Luis", empresa_id: 3 },
    { id: 10, nombre: "Planta Olavarría", ubicacion: "Buenos Aires", empresa_id: 3 },
  ],
  // PCR (empresa_id: 4)
  4: [
    { id: 11, nombre: "Planta San Luis", ubicacion: "San Luis", empresa_id: 4 },
    { id: 12, nombre: "Planta Salta", ubicacion: "Salta", empresa_id: 4 },
  ],
};

/**
 * Obtener plantas de una empresa
 */
export function getPlantasByEmpresa(empresaId: number): Planta[] {
  return plantasPorEmpresa[empresaId] || [];
}

/**
 * Obtener una planta por ID
 */
export function getPlantaById(plantaId: number): Planta | undefined {
  for (const plantas of Object.values(plantasPorEmpresa)) {
    const planta = plantas.find(p => p.id === plantaId);
    if (planta) return planta;
  }
  return undefined;
}
