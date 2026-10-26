#!/bin/bash
# Convierte un video de iPhone (4K, HDR, vertical) a 1080x1920 a 30 fps con el
# color corregido.
# Uso: bash scripts/preparar_video.sh original.mov public/mi-video.mp4 [calido|natural]
#   calido (por defecto): el color correcto de los videos de la emisora
#   natural: neutro, solo se usó en el seguimiento del accidente (opción "D")
set -euo pipefail
ESTILO="${3:-calido}"
BASE="scale=1080:1920:flags=lanczos:in_color_matrix=bt2020:out_color_matrix=bt709"
if [ "$ESTILO" = "calido" ]; then
  COLOR="eq=saturation=1.35:contrast=1.08:brightness=-0.05,colorbalance=rs=0.04:bs=-0.04:rm=0.08:gm=0.01:bm=-0.08,curves=all='0/0 0.5/0.47 1/0.97'"
else
  COLOR="eq=saturation=1.2:contrast=1.06"
fi
ffmpeg -v error -y -i "$1" -map 0:v:0 -map 0:a:0 \
  -vf "$BASE,$COLOR,format=yuv420p,fps=30" \
  -c:v libx264 -crf 10 -preset slow \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 \
  -c:a aac -b:a 320k -movflags +faststart "$2"
echo "Listo: $2"
