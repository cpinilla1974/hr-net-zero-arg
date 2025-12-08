#!/usr/bin/env python3
"""
Script para extraer los logos de las instituciones desde la portada del PDF.
Los logos están en el pie de la página 1.
"""

from PIL import Image
from pathlib import Path

def extract_logos():
    # Cargar la imagen de la portada
    source_path = Path(__file__).parent / "images" / "pagina_0001.jpg"
    output_dir = Path(__file__).parent.parent.parent / "app" / "public" / "logos"
    output_dir.mkdir(parents=True, exist_ok=True)

    img = Image.open(source_path)
    width, height = img.size
    print(f"Dimensiones de la imagen: {width}x{height}")

    # Los logos están en la franja inferior de la imagen
    # Basado en la imagen, los logos están aproximadamente en:
    # - Y: desde ~91% hasta ~97% de la altura
    # - X: distribuidos horizontalmente

    logo_y_top = int(height * 0.895)
    logo_y_bottom = int(height * 0.975)

    # Definir las regiones aproximadas de cada logo (x_start, x_end)
    # Basado en la distribución visual de los 5 logos
    logos = [
        {
            "name": "unido",
            "x_start": 0.24,
            "x_end": 0.40,
            "description": "UNIDO - United Nations Industrial Development Organization"
        },
        {
            "name": "net-zero-partnership",
            "x_start": 0.40,
            "x_end": 0.51,
            "description": "Net Zero Partnership"
        },
        {
            "name": "gcca",
            "x_start": 0.51,
            "x_end": 0.60,
            "description": "GCCA - Global Cement and Concrete Association"
        },
        {
            "name": "ficem",
            "x_start": 0.60,
            "x_end": 0.70,
            "description": "FICEM - Federación Interamericana del Cemento"
        },
        {
            "name": "afcp",
            "x_start": 0.70,
            "x_end": 0.78,
            "description": "AFCP - Asociación de Fabricantes de Cemento Portland"
        },
    ]

    for logo in logos:
        x_start = int(width * logo["x_start"])
        x_end = int(width * logo["x_end"])

        # Recortar la región del logo
        logo_img = img.crop((x_start, logo_y_top, x_end, logo_y_bottom))

        # Guardar el logo
        output_path = output_dir / f"{logo['name']}.png"
        logo_img.save(output_path, "PNG")
        print(f"Extraído: {logo['name']} -> {output_path}")
        print(f"  {logo['description']}")
        print(f"  Dimensiones: {logo_img.size}")

    print(f"\nLogos guardados en: {output_dir}")

if __name__ == "__main__":
    extract_logos()
