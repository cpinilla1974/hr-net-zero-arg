#!/usr/bin/env python3
"""
Script para extraer datos GNR del archivo de Eduardo e insertarlos en benchmarking.db
"""

import pandas as pd
import sqlite3
import re
from pathlib import Path

# Mapeo de códigos GNR a nombres de indicadores en la base de datos
GNR_CODE_MAPPING = {
    '8TG': 'clinker_production',
    '21TGWcm': 'cement_production',
    '21TGWct': 'cementitious_production',
    '59cAG': 'gross_co2_kg_clinker',
    '71AG': 'net_co2_kg_clinker',
    '25aAG': 'thermal_energy_mj_clinker',
    '593AG': 'carbon_intensity_fuel',
    '33eAGW': 'power_consumption_kwh_cement',
}

def extract_gnr_data(excel_file):
    """
    Extrae datos GNR del archivo Excel
    """
    # Leer sin header
    df = pd.read_excel(excel_file, sheet_name='Argentina', header=None)

    all_data = []
    current_indicator_code = None
    current_indicator_name = None
    header_row = None

    for idx, row in df.iterrows():
        first_col = str(row[0])

        # Detectar inicio de sección de indicador
        if pd.notna(row[0]) and ('|' in first_col or re.search(r'\d+(TG|AG|a)', first_col)):
            # Extraer código del indicador
            match = re.match(r'(\w+)\s*-', first_col)
            if match:
                current_indicator_code = match.group(1)
                current_indicator_name = first_col
                header_row = None
                print(f"Encontrado indicador: {current_indicator_code}")

        # Detectar fila de header (Region, Year, Value)
        elif pd.notna(row[0]) and row[0] == 'Region' and pd.notna(row[1]) and row[1] == 'Year':
            header_row = idx
            continue

        # Extraer datos si estamos después del header
        elif header_row is not None and pd.notna(row[0]) and row[0] == 'Argentina':
            year = row[1]
            value = row[2]

            # Validar que year y value sean números
            try:
                year = int(year)
                value = float(value)

                # Solo procesar si el indicador está en nuestro mapeo
                if current_indicator_code in GNR_CODE_MAPPING:
                    all_data.append({
                        'gnr_code': current_indicator_code,
                        'indicator': GNR_CODE_MAPPING[current_indicator_code],
                        'region': 'Argentina',
                        'year': year,
                        'value': value
                    })
            except (ValueError, TypeError):
                continue

    return pd.DataFrame(all_data)

def get_indicator_unit(indicator_code):
    """
    Retorna la unidad para cada indicador
    """
    units = {
        'clinker_production': 't',
        'cement_production': 't',
        'cementitious_production': 't',
        'gross_co2_kg_clinker': 'kg CO₂/t clinker',
        'net_co2_kg_clinker': 'kg CO₂/t clinker',
        'thermal_energy_mj_clinker': 'MJ/t clinker',
        'carbon_intensity_fuel': 'g CO₂/MJ',
        'power_consumption_kwh_cement': 'kWh/t cement',
    }
    return units.get(indicator_code, '')

def insert_into_database(data_df, db_path):
    """
    Inserta los datos en la base de datos SQLite
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Primero, eliminar datos existentes de Argentina para evitar duplicados
    print("\nEliminando datos existentes de Argentina...")
    cursor.execute("DELETE FROM gnr_indicators WHERE region = 'Argentina'")
    deleted = cursor.rowcount
    print(f"Eliminados {deleted} registros anteriores")

    # Insertar nuevos datos
    print("\nInsertando nuevos datos...")
    inserted = 0
    for _, row in data_df.iterrows():
        unit = get_indicator_unit(row['indicator'])

        cursor.execute("""
            INSERT INTO gnr_indicators (region, indicator, year, value, unit)
            VALUES (?, ?, ?, ?, ?)
        """, (row['region'], row['indicator'], row['year'], row['value'], unit))
        inserted += 1

    conn.commit()

    # Verificar inserción
    cursor.execute("""
        SELECT indicator, MIN(year), MAX(year), COUNT(*)
        FROM gnr_indicators
        WHERE region = 'Argentina'
        GROUP BY indicator
        ORDER BY indicator
    """)

    results = cursor.fetchall()
    print(f"\n✅ Insertados {inserted} registros nuevos")
    print("\n=== COBERTURA DE DATOS ACTUALIZADA ===")
    print(f"{'Indicador':<35} {'Año Inicio':<12} {'Año Fin':<12} {'Registros':<10}")
    print("-" * 75)
    for row in results:
        print(f"{row[0]:<35} {row[1]:<12} {row[2]:<12} {row[3]:<10}")

    conn.close()

def main():
    # Rutas
    excel_file = Path('Data_GNR_Argentina_17dic.xlsx')
    db_file = Path('app/data/benchmarking.db')

    if not excel_file.exists():
        print(f"❌ Error: No se encuentra el archivo {excel_file}")
        return

    if not db_file.exists():
        print(f"❌ Error: No se encuentra la base de datos {db_file}")
        return

    print("=== EXTRACCIÓN DE DATOS GNR ===\n")
    print(f"Archivo fuente: {excel_file}")
    print(f"Base de datos destino: {db_file}\n")

    # Extraer datos
    print("Extrayendo datos del archivo Excel...")
    data_df = extract_gnr_data(excel_file)

    if data_df.empty:
        print("❌ No se encontraron datos para extraer")
        return

    print(f"\n✅ Extraídos {len(data_df)} registros")
    print(f"\nIndicadores encontrados: {data_df['indicator'].unique().tolist()}")
    print(f"Rango de años: {data_df['year'].min()} - {data_df['year'].max()}")

    # Mostrar resumen por indicador
    print("\n=== RESUMEN DE DATOS EXTRAÍDOS ===")
    summary = data_df.groupby('indicator').agg({
        'year': ['min', 'max', 'count']
    }).reset_index()
    for _, row in summary.iterrows():
        print(f"  {row['indicator'][0]}: {row['year']['count']} registros ({row['year']['min']} - {row['year']['max']})")

    # Insertar en base de datos
    response = input("\n¿Deseas insertar estos datos en la base de datos? (s/n): ")
    if response.lower() == 's':
        insert_into_database(data_df, db_file)
        print("\n✅ Proceso completado exitosamente")
    else:
        print("\n❌ Operación cancelada")

if __name__ == '__main__':
    main()
