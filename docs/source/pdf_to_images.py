#!/usr/bin/env python3
"""
Script para convertir un PDF a imágenes (una imagen por página).
Requiere: pip install pdf2image
También requiere poppler-utils instalado en el sistema:
  - Ubuntu/Debian: sudo apt-get install poppler-utils
  - macOS: brew install poppler
  - Windows: descargar desde https://github.com/osber/pdf2image
"""

import os
import sys
from pathlib import Path

try:
    from pdf2image import convert_from_path
except ImportError:
    print("Error: pdf2image no está instalado.")
    print("Instálalo con: pip install pdf2image")
    sys.exit(1)


def pdf_to_images(pdf_path: str, output_dir: str = None, dpi: int = 150, fmt: str = "png"):
    """
    Convierte un PDF a imágenes.

    Args:
        pdf_path: Ruta al archivo PDF
        output_dir: Directorio de salida (por defecto: mismo directorio que el PDF)
        dpi: Resolución de las imágenes (por defecto: 150)
        fmt: Formato de imagen (png, jpg, jpeg)
    """
    pdf_path = Path(pdf_path)

    if not pdf_path.exists():
        print(f"Error: El archivo '{pdf_path}' no existe.")
        sys.exit(1)

    if output_dir is None:
        output_dir = pdf_path.parent / f"{pdf_path.stem}_images"
    else:
        output_dir = Path(output_dir)

    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"Convirtiendo: {pdf_path}")
    print(f"Directorio de salida: {output_dir}")
    print(f"DPI: {dpi}")
    print(f"Formato: {fmt}")
    print("-" * 50)

    # Convertir PDF a imágenes
    print("Procesando PDF (esto puede tomar varios minutos para archivos grandes)...")

    try:
        # Procesar por lotes para archivos grandes
        images = convert_from_path(
            pdf_path,
            dpi=dpi,
            fmt=fmt,
            thread_count=4,
            use_pdftocairo=True
        )

        total_pages = len(images)
        print(f"Total de páginas: {total_pages}")

        for i, image in enumerate(images, start=1):
            output_path = output_dir / f"pagina_{i:04d}.{fmt}"
            image.save(output_path, fmt.upper())
            print(f"Guardada: {output_path.name} ({i}/{total_pages})")

        print("-" * 50)
        print(f"Conversión completada. {total_pages} imágenes guardadas en: {output_dir}")

    except Exception as e:
        print(f"Error durante la conversión: {e}")
        sys.exit(1)


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Convertir PDF a imágenes")
    parser.add_argument("pdf", nargs="?", default="HR NET ZERO ARGENTINA 2050_23 nov.pdf",
                        help="Ruta al archivo PDF")
    parser.add_argument("-o", "--output", default=None,
                        help="Directorio de salida")
    parser.add_argument("-d", "--dpi", type=int, default=150,
                        help="Resolución DPI (default: 150)")
    parser.add_argument("-f", "--format", choices=["png", "jpg", "jpeg"], default="png",
                        help="Formato de imagen (default: png)")

    args = parser.parse_args()

    pdf_to_images(args.pdf, args.output, args.dpi, args.format)
