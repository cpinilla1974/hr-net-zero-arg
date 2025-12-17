#!/usr/bin/env python3
"""
Script para actualizar datos de Argentina en benchmarking.db desde múltiples fuentes

FUENTES DE DATOS:
1. Rep_Sostenibilidad_CONSOLIDADO_AFCP.xlsx (AFCP Argentina)
   - Email: "Indicadores consolidados AFCP"
   - Período: 2010-2024 (15 años)
   - Indicadores: 5 (factor clínker, energía térmica, combustibles alternativos, biomasa, emisiones netas)

2. Data_GNR_Argentina_17dic.xlsx (Eduardo - FICEM)
   - Email: "Data GNR Argentina" (17/dic/2025)
   - Período: 1990-2023 (33 años)
   - Indicadores: 8 (códigos GNR oficiales)

ESTRATEGIA:
- Priorizar datos GNR (1990-2023) por ser fuente oficial del protocolo
- Complementar con datos AFCP para 2024 (año más reciente)
- Documentar fuente de cada registro en tabla metadata
"""

import pandas as pd
import sqlite3
import re
from datetime import datetime
from pathlib import Path

# CONFIGURACIÓN DE FUENTES
SOURCES = {
    'gnr': {
        'file': 'Data_GNR_Argentina_17dic.xlsx',
        'descripcion': 'Datos GNR oficiales de Argentina',
        'email': 'Data GNR Argentina (17/dic/2025)',
        'periodo': '1990-2023',
        'prioridad': 1  # Mayor prioridad
    },
    'afcp': {
        'file': '/home/cpinilla/storage/ficem_bd/Rep_Sostenibilidad_CONSOLIDADO_AFCP.xlsx',
        'descripcion': 'Reporte de Sostenibilidad AFCP Argentina',
        'email': 'Indicadores consolidados AFCP',
        'periodo': '2010-2024',
        'prioridad': 2  # Menor prioridad (solo para datos faltantes)
    }
}

# MAPEO DE INDICADORES GNR
GNR_MAPPING = {
    '8TG': 'clinker_production',
    '21TGWcm': 'cement_production',
    '21TGWct': 'cementitious_production',
    '59cAG': 'gross_co2_kg_clinker',
    '71AG': 'net_co2_kg_clinker',
    '25aAG': 'thermal_energy_mj_clinker',
    '593AG': 'carbon_intensity_fuel',
    '33eAGW': 'power_consumption_kwh_cement',
}

# MAPEO DE INDICADORES AFCP (filas del Excel)
AFCP_MAPPING = {
    20: ('clinker_cement_ratio', '%', 0.01),
    22: ('thermal_energy_mj_clinker', 'MJ/t clinker', 1000),
    32: ('alternative_fuel_rate', '%', 1),
    33: ('biomass_rate', '%', 1),
    53: ('net_co2_kg_cement', 'kg CO₂/t cement', 1),
}

UNITS = {
    'clinker_production': 't',
    'cement_production': 't',
    'cementitious_production': 't',
    'gross_co2_kg_clinker': 'kg CO₂/t clinker',
    'net_co2_kg_clinker': 'kg CO₂/t clinker',
    'thermal_energy_mj_clinker': 'MJ/t clinker',
    'carbon_intensity_fuel': 'g CO₂/MJ',
    'power_consumption_kwh_cement': 'kWh/t cement',
    'clinker_cement_ratio': '%',
    'alternative_fuel_rate': '%',
    'biomass_rate': '%',
    'net_co2_kg_cement': 'kg CO₂/t cement',
}

def extract_gnr_data(excel_file):
    """Extrae datos GNR del archivo de Eduardo"""
    df = pd.read_excel(excel_file, sheet_name='Argentina', header=None)

    all_data = []
    current_indicator_code = None
    header_row = None

    for idx, row in df.iterrows():
        first_col = str(row[0])

        # Detectar sección de indicador
        if pd.notna(row[0]) and ('|' in first_col or re.search(r'\d+(TG|AG|a)', first_col)):
            match = re.match(r'(\w+)\s*-', first_col)
            if match:
                current_indicator_code = match.group(1)
                header_row = None

        # Detectar header
        elif pd.notna(row[0]) and row[0] == 'Region' and pd.notna(row[1]) and row[1] == 'Year':
            header_row = idx
            continue

        # Extraer datos
        elif header_row is not None and pd.notna(row[0]) and row[0] == 'Argentina':
            try:
                year = int(row[1])
                value = float(row[2])

                if current_indicator_code in GNR_MAPPING:
                    all_data.append({
                        'indicator': GNR_MAPPING[current_indicator_code],
                        'year': year,
                        'value': value,
                        'source': 'gnr'
                    })
            except (ValueError, TypeError):
                continue

    return pd.DataFrame(all_data)

def extract_afcp_data(excel_file):
    """Extrae datos AFCP del reporte de sostenibilidad"""
    df = pd.read_excel(excel_file, sheet_name='General')

    all_data = []

    for row_num, (indicator_code, unit, multiplier) in AFCP_MAPPING.items():
        for col_idx in range(6, 19):  # Columnas 2010-2022 (solo 13 años disponibles)
            year = 2010 + (col_idx - 6)
            try:
                value = float(df.iloc[row_num, col_idx]) * multiplier
                if pd.notna(value):
                    all_data.append({
                        'indicator': indicator_code,
                        'year': year,
                        'value': value,
                        'source': 'afcp'
                    })
            except (ValueError, TypeError):
                continue

    return pd.DataFrame(all_data)

def merge_sources(gnr_df, afcp_df):
    """
    Combina datos de ambas fuentes con prioridad a GNR
    Solo usa AFCP para años/indicadores no disponibles en GNR
    """
    # Crear clave única
    gnr_df['key'] = gnr_df['indicator'] + '_' + gnr_df['year'].astype(str)
    afcp_df['key'] = afcp_df['indicator'] + '_' + afcp_df['year'].astype(str)

    # Obtener claves de GNR
    gnr_keys = set(gnr_df['key'])

    # Filtrar AFCP: solo registros no presentes en GNR
    afcp_complement = afcp_df[~afcp_df['key'].isin(gnr_keys)].copy()

    # Combinar
    combined = pd.concat([gnr_df, afcp_complement], ignore_index=True)
    combined = combined.drop('key', axis=1)

    return combined.sort_values(['indicator', 'year'])

def create_metadata_table(conn):
    """Crea tabla de metadatos si no existe"""
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS data_sources (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            source_key TEXT UNIQUE NOT NULL,
            source_file TEXT NOT NULL,
            descripcion TEXT,
            email_origen TEXT,
            periodo TEXT,
            fecha_extraccion TEXT NOT NULL,
            registros_insertados INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()

def insert_metadata(conn, source_key, info, num_records):
    """Inserta o actualiza metadatos de la fuente"""
    cursor = conn.cursor()
    cursor.execute("""
        INSERT OR REPLACE INTO data_sources
        (source_key, source_file, descripcion, email_origen, periodo, fecha_extraccion, registros_insertados)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        source_key,
        info['file'],
        info['descripcion'],
        info['email'],
        info['periodo'],
        datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        num_records
    ))
    conn.commit()

def main():
    db_path = Path('app/data/benchmarking.db')

    if not db_path.exists():
        print(f"❌ Error: No se encuentra la base de datos {db_path}")
        return

    print("=" * 80)
    print("ACTUALIZACIÓN DE DATOS DE ARGENTINA - BENCHMARKING")
    print("=" * 80)
    print(f"\nFecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

    # Extraer datos de ambas fuentes
    print("📥 Extrayendo datos de fuentes...")
    print(f"\n1. Fuente GNR (prioridad 1)")
    print(f"   Archivo: {SOURCES['gnr']['file']}")
    gnr_df = extract_gnr_data(SOURCES['gnr']['file'])
    print(f"   ✅ {len(gnr_df)} registros extraídos ({gnr_df['year'].min()}-{gnr_df['year'].max()})")

    print(f"\n2. Fuente AFCP (prioridad 2)")
    print(f"   Archivo: {SOURCES['afcp']['file']}")
    afcp_df = extract_afcp_data(SOURCES['afcp']['file'])
    print(f"   ✅ {len(afcp_df)} registros extraídos ({afcp_df['year'].min()}-{afcp_df['year'].max()})")

    # Combinar fuentes
    print("\n🔀 Combinando fuentes (prioridad a GNR)...")
    combined_df = merge_sources(gnr_df, afcp_df)
    print(f"   ✅ {len(combined_df)} registros totales después de combinar")

    # Mostrar resumen
    print("\n📊 Resumen por fuente:")
    gnr_count = len(combined_df[combined_df['source'] == 'gnr'])
    afcp_count = len(combined_df[combined_df['source'] == 'afcp'])
    print(f"   - GNR: {gnr_count} registros")
    print(f"   - AFCP (complemento): {afcp_count} registros")

    print("\n📊 Cobertura por indicador:")
    coverage = combined_df.groupby('indicator').agg({
        'year': ['min', 'max', 'count']
    }).reset_index()
    for _, row in coverage.iterrows():
        indicator = row['indicator'][0]
        min_year = int(row['year']['min'])
        max_year = int(row['year']['max'])
        count = int(row['year']['count'])
        print(f"   {indicator:35} {min_year}-{max_year} ({count} registros)")

    # Confirmar actualización
    response = input("\n¿Deseas actualizar la base de datos con estos datos? (s/n): ")
    if response.lower() != 's':
        print("\n❌ Operación cancelada")
        return

    # Actualizar base de datos
    print("\n💾 Actualizando base de datos...")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Crear tabla de metadatos
    create_metadata_table(conn)

    # Eliminar datos anteriores de Argentina
    cursor.execute("DELETE FROM gnr_indicators WHERE region = 'Argentina'")
    deleted = cursor.rowcount
    print(f"   - Eliminados {deleted} registros anteriores")

    # Insertar nuevos datos
    inserted = 0
    for _, row in combined_df.iterrows():
        unit = UNITS.get(row['indicator'], '')
        cursor.execute("""
            INSERT INTO gnr_indicators (region, indicator, year, value, unit)
            VALUES (?, ?, ?, ?, ?)
        """, ('Argentina', row['indicator'], row['year'], row['value'], unit))
        inserted += 1

    conn.commit()
    print(f"   - Insertados {inserted} registros nuevos")

    # Guardar metadatos
    print("\n📝 Guardando metadatos de fuentes...")
    insert_metadata(conn, 'gnr', SOURCES['gnr'], gnr_count)
    insert_metadata(conn, 'afcp', SOURCES['afcp'], afcp_count)
    print("   ✅ Metadatos guardados")

    # Verificar resultado final
    cursor.execute("""
        SELECT indicator, MIN(year), MAX(year), COUNT(*)
        FROM gnr_indicators
        WHERE region = 'Argentina'
        GROUP BY indicator
        ORDER BY indicator
    """)

    results = cursor.fetchall()
    print("\n✅ ACTUALIZACIÓN COMPLETADA")
    print("\n📊 Cobertura final en base de datos:")
    print(f"{'Indicador':<37} {'Inicio':<8} {'Fin':<8} {'Registros'}")
    print("-" * 70)
    for row in results:
        print(f"{row[0]:<37} {row[1]:<8} {row[2]:<8} {row[3]}")

    conn.close()
    print("\n" + "=" * 80)

if __name__ == '__main__':
    main()