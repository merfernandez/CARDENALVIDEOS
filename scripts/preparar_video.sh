#!/bin/bash
# Convierte un video de iPhone (4K, HDR, vertical) a 1080x1920 a 30 fps con el
# color corregido.
# Uso: bash scripts/preparar_video.sh original.mov public/mi-video.mp4 [original|noticias|calido|natural]
#   original (por defecto): respeta el color con que llega el video, solo la conversión técnica
#            de HDR a formato normal. La directora pidió respetar el color original.
#   noticias: el color de las noticias de Elder, Gamarra y el accidente,
#            que la directora considera el correcto
#   calido: más saturado y cálido (primeros videos de William)
#   natural: neutro, solo se usó en el seguimiento del accidente (opción "D")
set -euo pipefail
ESTILO="${3:-original}"
BASE="scale=1080:1920:flags=lanczos:in_color_matrix=bt2020:out_color_matrix=bt709"
if [ "$ESTILO" = "original" ]; then
  COLOR="null"
elif [ "$ESTILO" = "noticias" ]; then
  COLOR="eq=contrast=1.07:saturation=1.15:brightness=-0.02,colorbalance=rm=0.03:bm=-0.03"
elif [ "$ESTILO" = "calido" ]; then
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
