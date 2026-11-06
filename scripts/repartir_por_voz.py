"""Reparte las palabras de cada frase de Whisper sobre los tramos REALES de voz
(detectados con silencedetect). Útil cuando el DTW se corre o comprime frases.

Uso: python3 scripts/repartir_por_voz.py video.mp4 dtw.json subtitulos.json [correcciones.json]
"""
import json
import re
import subprocess
import sys

video, dtw, dst = sys.argv[1:4]
fix = json.load(open(sys.argv[4])) if len(sys.argv) > 4 else {}

log = subprocess.run(["ffmpeg", "-i", video, "-af", "silencedetect=noise=-30dB:d=0.25", "-vn", "-f", "null", "-"],
                     capture_output=True, text=True).stderr
st = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", log)]
en = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", log)]
sil = list(zip(st, en))

def voz(a, b):
    tramos, c = [], a
    for s, e in sil:
        if e <= a or s >= b:
            continue
        if s > c:
            tramos.append((c, s))
        c = max(c, e)
    if c < b:
        tramos.append((c, b))
    return tramos or [(a, b)]

out = []
for seg in json.load(open(dtw))["transcription"]:
    a, b = seg["offsets"]["from"] / 1000, seg["offsets"]["to"] / 1000
    palabras = seg["text"].split()
    if not palabras:
        continue
    tramos = voz(a, b)
    total = sum(y - x for x, y in tramos)
    L = sum(len(p) for p in palabras)

    def t(frac):
        obj = frac * total
        for x, y in tramos:
            if obj <= y - x:
                return x + obj
            obj -= y - x
        return tramos[-1][1]

    acc = 0
    for p in palabras:
        s = t(acc / L); acc += len(p); e = t(acc / L)
        for k, v in fix.items():
            p = re.sub(rf"\b{re.escape(k)}\b", v, p)
        out.append({"text": " " + p, "startMs": int(s * 1000), "endMs": int(e * 1000),
                    "timestampMs": int(s * 1000), "confidence": None,
                    "pageBreakAfter": p.endswith((".", ","))})
json.dump(out, open(dst, "w"), ensure_ascii=False, indent=1)
print(len(out), "palabras")
