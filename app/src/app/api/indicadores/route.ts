import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';
import * as XLSX from 'xlsx';

const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'benchmarking.db');

interface IndicadorRow {
  anio: number;
  campoGNR: string;
  valor: number;
  fuente: string;
}

interface IndicadorMeta {
  campoGNR: string;
  nombre: string;
  unidad: string;
}

// Indicadores derivados que se calculan a partir de los datos base
function calcularDerivados(datos: Record<string, number>): Record<string, number> {
  const cem = datos['20'] || 0;  // produccion cemento
  const ck = datos['8'] || 0;    // produccion clinker
  const co2 = datos['71'] || 0;  // CO2 neto
  const term = datos['25'] || 0; // consumo termico total TJ
  const bio = datos['28'] || 0;  // biomasa TJ
  const alt = datos['27'] || 0;  // alt fossil TJ
  const conv = datos['26'] || 0; // fosil conv TJ
  const elec = datos['33'] || 0; // consumo electrico MWh

  const derivados: Record<string, number> = {};

  if (cem > 0 && ck > 0) {
    derivados['factor_clinker'] = (ck / cem) * 100;
    derivados['emisiones_netas_tcem'] = co2 > 0 ? (co2 / cem) * 1000 : 0;
    derivados['consumo_electrico_tcem'] = elec > 0 ? (elec / cem) * 1000 : 0;
  }
  if (ck > 0) {
    derivados['eficiencia_termica'] = term > 0 ? (term * 1e6) / ck : 0;
    derivados['emisiones_netas_tck'] = co2 > 0 ? (co2 / ck) * 1000 : 0;
  }
  if (term > 0) {
    derivados['tsr'] = ((alt + bio) / term) * 100;
    derivados['biomasa_pct'] = (bio / term) * 100;
    derivados['fosil_alt_pct'] = (alt / term) * 100;
    derivados['fosil_conv_pct'] = (conv / term) * 100;
  }
  if (cem > 0) {
    derivados['produccion_cemento_mt'] = cem / 1e6;
    derivados['co2_neto_mt'] = co2 / 1e6;
  }

  return derivados;
}

export async function GET(request: NextRequest) {
  try {
    const db = new Database(dbPath, { readonly: true });
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'resumen';

    switch (action) {
      case 'serie_temporal': {
        const campo = searchParams.get('campo');
        if (!campo) {
          db.close();
          return NextResponse.json({ error: 'campo parameter required' }, { status: 400 });
        }

        const rows = db.prepare(`
          SELECT anio, valor FROM indicadores_anuales
          WHERE campoGNR = ? ORDER BY anio
        `).all(campo) as { anio: number; valor: number }[];

        const meta = db.prepare(`
          SELECT nombre, unidad FROM indicadores WHERE campoGNR = ?
        `).get(campo) as IndicadorMeta | undefined;

        db.close();
        return NextResponse.json({
          campo,
          nombre: meta?.nombre || campo,
          unidad: meta?.unidad || '',
          datos: rows,
        });
      }

      case 'anio': {
        const anio = parseInt(searchParams.get('anio') || '0');
        if (!anio) {
          db.close();
          return NextResponse.json({ error: 'anio parameter required' }, { status: 400 });
        }

        const rows = db.prepare(`
          SELECT ia.campoGNR, ia.valor, i.nombre, i.unidad
          FROM indicadores_anuales ia
          LEFT JOIN indicadores i ON ia.campoGNR = i.campoGNR
          WHERE ia.anio = ?
        `).all(anio) as (IndicadorRow & { nombre: string; unidad: string })[];

        const base: Record<string, number> = {};
        const indicadores: Record<string, { valor: number; nombre: string; unidad: string }> = {};

        for (const row of rows) {
          base[row.campoGNR] = row.valor;
          indicadores[row.campoGNR] = {
            valor: row.valor,
            nombre: row.nombre || row.campoGNR,
            unidad: row.unidad || '',
          };
        }

        const derivados = calcularDerivados(base);

        db.close();
        return NextResponse.json({ anio, indicadores, derivados });
      }

      case 'resumen': {
        // Todos los años con indicadores derivados calculados
        const anios = db.prepare(`
          SELECT DISTINCT anio FROM indicadores_anuales ORDER BY anio
        `).all() as { anio: number }[];

        const resultado: Record<number, Record<string, number>> = {};

        for (const { anio } of anios) {
          const rows = db.prepare(`
            SELECT campoGNR, valor FROM indicadores_anuales WHERE anio = ?
          `).all(anio) as { campoGNR: string; valor: number }[];

          const base: Record<string, number> = {};
          for (const row of rows) {
            base[row.campoGNR] = row.valor;
          }

          resultado[anio] = {
            ...base,
            ...calcularDerivados(base),
          };
        }

        db.close();
        return NextResponse.json({ datos: resultado });
      }

      case 'trayectoria': {
        // Serie temporal de indicadores derivados para gráficos de trayectoria
        const anios = db.prepare(`
          SELECT DISTINCT anio FROM indicadores_anuales ORDER BY anio
        `).all() as { anio: number }[];

        const serie: {
          anio: number;
          emisiones_netas: number;
          factor_clinker: number;
          tsr: number;
          biomasa_pct: number;
          eficiencia_termica: number;
          produccion_mt: number;
        }[] = [];

        for (const { anio } of anios) {
          const rows = db.prepare(`
            SELECT campoGNR, valor FROM indicadores_anuales WHERE anio = ?
          `).all(anio) as { campoGNR: string; valor: number }[];

          const base: Record<string, number> = {};
          for (const row of rows) {
            base[row.campoGNR] = row.valor;
          }
          const d = calcularDerivados(base);

          serie.push({
            anio,
            emisiones_netas: Math.round(d['emisiones_netas_tcem'] || 0),
            factor_clinker: Math.round((d['factor_clinker'] || 0) * 10) / 10,
            tsr: Math.round((d['tsr'] || 0) * 10) / 10,
            biomasa_pct: Math.round((d['biomasa_pct'] || 0) * 10) / 10,
            eficiencia_termica: Math.round(d['eficiencia_termica'] || 0),
            produccion_mt: Math.round((d['produccion_cemento_mt'] || 0) * 100) / 100,
          });
        }

        db.close();
        return NextResponse.json({ serie });
      }

      case 'diccionario': {
        const indicadores = db.prepare(`
          SELECT campoGNR, nombre, unidad FROM indicadores ORDER BY campoGNR
        `).all() as IndicadorMeta[];
        db.close();
        return NextResponse.json({ indicadores });
      }

      default: {
        db.close();
        return NextResponse.json({
          error: 'Unknown action',
          acciones: ['resumen', 'anio', 'serie_temporal', 'trayectoria', 'diccionario'],
        }, { status: 400 });
      }
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Error accessing database', details: String(error) },
      { status: 500 }
    );
  }
}

// Los 8 indicadores base requeridos para la carga consolidada
const INDICADORES_REQUERIDOS = ['20', '8', '71', '25', '26', '27', '28', '33'];

const INDICADOR_NOMBRES: Record<string, string> = {
  '20': 'Cemento producido (t/año)',
  '8': 'Clinker producido (t/año)',
  '71': 'Emisión total neta CO₂ (t/año)',
  '25': 'Consumo térmico total (TJ/año)',
  '26': 'Fósiles convencionales (TJ/año)',
  '27': 'Fósiles alternativos (TJ/año)',
  '28': 'Biomasa (TJ/año)',
  '33': 'Consumo eléctrico (MWh/año)',
};

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let anio: number;
    let datos: Record<string, number>;
    let fuente: string;

    if (contentType.includes('multipart/form-data')) {
      // Upload de Excel
      const formData = await request.formData();
      const file = formData.get('archivo') as File | null;
      const anioParam = formData.get('anio') as string | null;

      if (!file || !anioParam) {
        return NextResponse.json({ error: 'Se requiere archivo Excel y año' }, { status: 400 });
      }

      anio = parseInt(anioParam);
      if (isNaN(anio) || anio < 2000 || anio > 2100) {
        return NextResponse.json({ error: 'Año inválido' }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

      datos = {};
      for (const row of rows) {
        const campo = String(row['campoGNR'] || row['campo'] || row['indicador'] || '').trim();
        const valor = Number(row['valor'] || row['value'] || 0);
        if (campo && !isNaN(valor) && valor !== 0) {
          datos[campo] = valor;
        }
      }

      fuente = `Excel: ${file.name}`;
    } else {
      // JSON directo (formulario manual)
      const body = await request.json();
      anio = parseInt(body.anio);
      datos = body.datos || {};
      fuente = body.fuente || 'Carga manual';

      if (isNaN(anio) || anio < 2000 || anio > 2100) {
        return NextResponse.json({ error: 'Año inválido' }, { status: 400 });
      }
    }

    // Validar que hay datos
    const camposPresentes = Object.keys(datos).filter(k => INDICADORES_REQUERIDOS.includes(k));
    if (camposPresentes.length === 0) {
      return NextResponse.json({
        error: 'No se encontraron indicadores válidos',
        esperados: INDICADORES_REQUERIDOS.map(k => `${k}: ${INDICADOR_NOMBRES[k]}`),
      }, { status: 400 });
    }

    // Validar rangos razonables
    const errores: string[] = [];
    if (datos['20'] && (datos['20'] < 1e5 || datos['20'] > 50e6)) {
      errores.push(`Producción cemento (${datos['20']}) fuera de rango esperado (100,000 - 50,000,000 t)`);
    }
    if (datos['8'] && (datos['8'] < 1e5 || datos['8'] > 50e6)) {
      errores.push(`Producción clínker (${datos['8']}) fuera de rango esperado (100,000 - 50,000,000 t)`);
    }
    if (datos['71'] && (datos['71'] < 1e5 || datos['71'] > 50e6)) {
      errores.push(`Emisiones CO₂ (${datos['71']}) fuera de rango esperado (100,000 - 50,000,000 t)`);
    }

    if (errores.length > 0) {
      return NextResponse.json({ error: 'Valores fuera de rango', errores }, { status: 400 });
    }

    // Insertar en BD
    const db = new Database(dbPath);
    const fechaCarga = new Date().toISOString();

    const insert = db.prepare(`
      INSERT OR REPLACE INTO indicadores_anuales (anio, campoGNR, valor, fuente, fecha_carga)
      VALUES (?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((items: { campo: string; valor: number }[]) => {
      for (const item of items) {
        insert.run(anio, item.campo, item.valor, fuente, fechaCarga);
      }
    });

    const items = Object.entries(datos).map(([campo, valor]) => ({ campo, valor }));
    insertMany(items);

    // Calcular derivados para la respuesta
    const base: Record<string, number> = {};
    const rows = db.prepare('SELECT campoGNR, valor FROM indicadores_anuales WHERE anio = ?')
      .all(anio) as { campoGNR: string; valor: number }[];
    for (const row of rows) {
      base[row.campoGNR] = row.valor;
    }
    const derivados = calcularDerivados(base);

    db.close();

    return NextResponse.json({
      ok: true,
      anio,
      indicadores_cargados: items.length,
      campos: items.map(i => i.campo),
      derivados,
      fuente,
      fecha_carga: fechaCarga,
    });
  } catch (error) {
    console.error('Error en carga:', error);
    return NextResponse.json(
      { error: 'Error procesando la carga', details: String(error) },
      { status: 500 }
    );
  }
}
