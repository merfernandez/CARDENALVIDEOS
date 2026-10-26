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
    for t in seg["tokens"]:
        if t["text"].startswith("[_") or t.get("t_dtw", -1) < 0:
            continue
        tokens.append(
            (t["text"], max(0, t["t_dtw"] * 10 - ADELANTO_MS), t["offsets"]["to"])
        )

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
