#!/bin/bash
# Prepara un video de William para las noticias del día:
#  descarga ya hecha → 1080x1920 30fps (color original) → transcripción DTW → subtítulos
#  → quita pausas → voltea si viene en espejo.
# Uso: bash scripts/preparar_noticia.sh original.mp4 carpeta_public [fix.json] [espejo|normal]
set -euo pipefail
ORIG="$1"; DIR="public/$2"; FIX="${3:-}"; ESPEJO="${4:-espejo}"
TMP=$(mktemp -d)
mkdir -p "$DIR"
ffmpeg -v error -y -i "$ORIG" -map 0:v:0 -map 0:a:0 -vf "scale=1080:1920:flags=lanczos,fps=30,format=yuv420p" \
  -c:v libx264 -crf 10 -preset slow -color_primaries bt709 -color_trc bt709 -colorspace bt709 \
  -c:a aac -b:a 320k -movflags +faststart "$DIR/v.mp4"
ffmpeg -v error -y -i "$DIR/v.mp4" -ar 16000 -ac 1 "$TMP/a.wav"
whisper.cpp/build/bin/whisper-cli -m whisper.cpp/ggml-large-v3-turbo.bin -f "$TMP/a.wav" -l es \
  --dtw large.v3.turbo -ojf -of "$TMP/dtw" -t 8 >/dev/null 2>&1
cp "$TMP/dtw.json" "$DIR/dtw.json"
python3 scripts/dtw_captions.py "$TMP/dtw.json" "$DIR/captions.json" $FIX >/dev/null
python3 scripts/cut_silences.py "$DIR/v.mp4" "$DIR/captions.json" "$DIR/v-cut.mp4" "$DIR/v-cut-captions.json" 0.25 | tail -1
if [ "$ESPEJO" = "espejo" ]; then
  ffmpeg -v error -y -i "$DIR/v-cut.mp4" -vf "hflip,format=yuv420p" -c:v libx264 -crf 10 -preset slow \
    -color_primaries bt709 -color_trc bt709 -colorspace bt709 -c:a copy -movflags +faststart "$TMP/f.mp4"
  mv "$TMP/f.mp4" "$DIR/v-cut.mp4"
fi
python3 -c "
import json;d=json.load(open('$DIR/dtw.json'))
for s in d['transcription']: print(s['offsets']['from'],s['text'])"
rm -rf "$TMP"
