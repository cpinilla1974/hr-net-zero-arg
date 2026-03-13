import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

// Ruta configurable via variable de entorno DATABASE_PATH
const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'benchmarking.db');

interface IndicatorRow {
  region: string;
  indicator: string;
  year: number;
  value: number;
  unit: string;
}

interface RegionRow {
  code: string;
  name: string;
  name_es: string;
  region_type: string;
  parent_region: string | null;
}

interface IndicatorMetaRow {
  code: string;
  name: string;
  name_es: string;
  unit: string;
  description: string;
  gnr_code: string;
  category: string;
}

export async function GET(request: NextRequest) {
  try {
    const db = new Database(dbPath, { readonly: true });
    const { searchParams } = new URL(request.url);

    const action = searchParams.get('action') || 'indicators';

    switch (action) {
      case 'regions': {
        // Obtener lista de regiones
        const regions = db.prepare(`
          SELECT code, name, name_es, region_type, parent_region
          FROM regions
          WHERE is_active = 1
          ORDER BY region_type, name
        `).all() as RegionRow[];
        db.close();
        return NextResponse.json({ regions });
      }

      case 'indicators_meta': {
        // Obtener metadatos de indicadores
        const indicators = db.prepare(`
          SELECT code, name, name_es, unit, description, gnr_code, category
          FROM indicators
          ORDER BY category, name
        `).all() as IndicatorMetaRow[];
        db.close();
        return NextResponse.json({ indicators });
      }

      case 'time_series': {
        // Obtener serie temporal para un indicador y múltiples regiones
        const indicator = searchParams.get('indicator');
        const regionsParam = searchParams.get('regions');
        const startYear = searchParams.get('start_year') || '1990';
        const endYear = searchParams.get('end_year') || '2050';

        if (!indicator) {
          db.close();
          return NextResponse.json({ error: 'indicator parameter required' }, { status: 400 });
        }

        let query = `
          SELECT region, indicator, year, value, unit
          FROM gnr_indicators
          WHERE indicator = ? AND year >= ? AND year <= ?
        `;
        const params: (string | number)[] = [indicator, parseInt(startYear), parseInt(endYear)];

        if (regionsParam) {
          const regionsList = regionsParam.split(',');
          query += ` AND region IN (${regionsList.map(() => '?').join(',')})`;
          params.push(...regionsList);
        }

        query += ' ORDER BY region, year';

        const data = db.prepare(query).all(...params) as IndicatorRow[];
        db.close();

        // Agrupar por región
        const grouped: Record<string, { year: number; value: number }[]> = {};
        data.forEach((row) => {
          if (!grouped[row.region]) {
            grouped[row.region] = [];
          }
          grouped[row.region].push({ year: row.year, value: row.value });
        });

        return NextResponse.json({
          indicator,
          unit: data[0]?.unit || '',
          series: grouped
        });
      }

      case 'comparison': {
        // Obtener comparación de múltiples indicadores para un año específico
        const year = searchParams.get('year') || '2022';
        const indicatorsParam = searchParams.get('indicators');
        const regionsParam = searchParams.get('regions');

        let query = `
          SELECT region, indicator, year, value, unit
          FROM gnr_indicators
          WHERE year = ?
        `;
        const params: (string | number)[] = [parseInt(year)];

        if (indicatorsParam) {
          const indicatorsList = indicatorsParam.split(',');
          query += ` AND indicator IN (${indicatorsList.map(() => '?').join(',')})`;
          params.push(...indicatorsList);
        }

        if (regionsParam) {
          const regionsList = regionsParam.split(',');
          query += ` AND region IN (${regionsList.map(() => '?').join(',')})`;
          params.push(...regionsList);
        }

        query += ' ORDER BY indicator, value';

        const data = db.prepare(query).all(...params) as IndicatorRow[];
        db.close();

        // Agrupar por indicador
        const grouped: Record<string, { region: string; value: number; unit: string }[]> = {};
        data.forEach((row) => {
          if (!grouped[row.indicator]) {
            grouped[row.indicator] = [];
          }
          grouped[row.indicator].push({
            region: row.region,
            value: row.value,
            unit: row.unit
          });
        });

        return NextResponse.json({ year: parseInt(year), comparison: grouped });
      }

      case 'argentina_summary': {
        // Obtener resumen de Argentina con comparaciones
        const data = db.prepare(`
          SELECT region, indicator, year, value, unit
          FROM gnr_indicators
          WHERE region IN ('Argentina', 'Argentina_Target', 'South_Latin_America', 'World', 'FICEM')
          ORDER BY indicator, region, year
        `).all() as IndicatorRow[];
        db.close();

        // Estructurar datos
        const result: Record<string, Record<string, { year: number; value: number }[]>> = {};
        data.forEach((row) => {
          if (!result[row.indicator]) {
            result[row.indicator] = {};
          }
          if (!result[row.indicator][row.region]) {
            result[row.indicator][row.region] = [];
          }
          result[row.indicator][row.region].push({ year: row.year, value: row.value });
        });

        return NextResponse.json({ summary: result });
      }

      default: {
        // Obtener todos los indicadores (paginado)
        const limit = parseInt(searchParams.get('limit') || '100');
        const offset = parseInt(searchParams.get('offset') || '0');

        const data = db.prepare(`
          SELECT region, indicator, year, value, unit
          FROM gnr_indicators
          ORDER BY region, indicator, year
          LIMIT ? OFFSET ?
        `).all(limit, offset) as IndicatorRow[];

        const countResult = db.prepare('SELECT COUNT(*) as count FROM gnr_indicators').get() as { count: number };
        const total = countResult.count;

        db.close();
        return NextResponse.json({
          data,
          total,
          limit,
          offset,
          hasMore: offset + limit < total
        });
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