"""Convierte la salida de whisper-cli (--dtw, -ojf) en subtítulos por palabra.

Los tiempos DTW son más precisos que los de Whisper normales: así el texto
sale justo cuando se dice la palabra.

Uso: python3 scripts/dtw_captions.py salida.json subtitulos.json [correcciones.json]
"""
import json
import re
import sys

src, dst = sys.argv[1:3]
fixes = json.load(open(sys.argv[3])) if len(sys.argv) > 3 else {}
# DTW marca las palabras ~150 ms tarde (medido contra los silencios del audio)
ADELANTO_MS = 150

FIX = {
    "Suchima": "Suchiimma",
    "Estéreo": "Stereo",
    **fixes,
}

tokens = []
for seg in json.load(open(src))["transcription"]:
    desde, hasta = seg["offsets"]["from"], seg["offsets"]["to"]
    toks = [t for t in seg["tokens"] if not t["text"].startswith("[_") and t.get("t_dtw", -1) >= 0]
    if not toks:
        continue
    tiempos = [t["t_dtw"] * 10 for t in toks]
    # En audios largos el DTW se "corre" al final: si los tiempos se salen de la frase
    # o la comprimen demasiado, se reparten las palabras a lo largo de la frase real.
    fuera = any(t < desde - 600 or t > hasta + 600 for t in tiempos)
    comprimido = len(toks) > 4 and (tiempos[-1] - tiempos[0]) < 0.45 * (hasta - desde)
    tarde = tiempos[0] - desde > 1500
    if fuera or comprimido or tarde:
        largo = sum(max(1, len(t["text"].strip())) for t in toks)
        # Ritmo natural (~15 letras por segundo): no estirar la frase sobre la pausa siguiente
        duracion = min(hasta - desde - 300, largo / 15 * 1000)
        acum = 0
        for t in toks:
            inicio = desde + 80 + duracion * acum / largo
            tokens.append((t["text"], int(inicio), hasta))
            acum += max(1, len(t["text"].strip()))
        print(f"frase {desde}-{hasta} con tiempos repartidos (DTW no confiable)", file=sys.stderr)
    else:
        for t, tt in zip(toks, tiempos):
            tokens.append((t["text"], max(0, tt - ADELANTO_MS), t["offsets"]["to"]))

words = []
for text, start, end in tokens:
    if words and not text.startswith(" "):
        words[-1]["text"] += text
        words[-1]["_end"] = end
    else:
        words.append({"text": text, "startMs": start, "_end": end})

# Cada palabra dura hasta que empieza la siguiente (mínimo 120 ms en pantalla)
for i, w in enumerate(words):
    nxt = words[i + 1]["startMs"] if i + 1 < len(words) else w["_end"]
    w["endMs"] = max(w["startMs"] + 120, min(nxt, w["startMs"] + 1200))
    del w["_end"]
    for k, v in FIX.items():
        w["text"] = re.sub(rf"\b{re.escape(k)}\b", v, w["text"])
    w["timestampMs"] = w["startMs"]
    w["confidence"] = None
    w["pageBreakAfter"] = w["text"].strip().endswith((".", ","))

json.dump(words, open(dst, "w"), ensure_ascii=False, indent=1)
print(" | ".join(f"{w['text'].strip()}@{w['startMs']}" for w in words))
