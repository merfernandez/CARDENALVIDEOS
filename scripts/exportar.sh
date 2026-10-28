#!/bin/bash
# Exporta un video en la mayor calidad posible sin pasar del tamaño que se puede
# descargar desde la app (≈ 48 MB; 100 MB ya no se descargó).
#  1) Render maestro sin pérdidas visibles (cuadros PNG, CRF 12).
#  2) Compresión final con CRF 16 y un tope de bitrate calculado por duración,
#     para que el archivo quede por debajo del límite.
# Uso: bash scripts/exportar.sh ComposicionId out/Nombre.mp4 [MB_max]
set -euo pipefail
COMP="$1"; SALIDA="$2"; MAX_MB="${3:-48}"
B=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell
MAESTRO="out/.maestro-$COMP.mp4"
npx remotion render "$COMP" "$MAESTRO" --browser-executable="$B" --image-format=png \
  --crf=12 --x264-preset=slow --audio-bitrate=320k --color-space=bt709 | grep -E '^\+|rror' || true
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$MAESTRO")
# kbit/s de video que caben en MAX_MB dejando 256k para el audio y un 5% de margen
TOPE=$(python3 -c "print(int(($MAX_MB*8*1024*0.95)/$DUR - 256))")
ffmpeg -v error -y -i "$MAESTRO" -c:v libx264 -preset slow -crf 16 \
  -maxrate "${TOPE}k" -bufsize "$((TOPE*2))k" -profile:v high -pix_fmt yuv420p \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 \
  -c:a aac -b:a 256k -movflags +faststart "$SALIDA"
rm -f "$MAESTRO"
ls -la "$SALIDA" | awk '{printf "Listo: %s (%.1f MB)\n", $9, $5/1048576}'
