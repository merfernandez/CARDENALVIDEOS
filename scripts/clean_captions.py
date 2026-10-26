"""Une los tokens de Whisper en palabras y corrige nombres propios.

Uso: python3 scripts/clean_captions.py entrada.json salida.json
"""
import json
import re
import sys

src, dst = sys.argv[1:3]
FIX = [
    (r"\bSuchima\b", "Suchiimma"),
    (r"\bEstéreo\b", "Stereo"),
]

words = []
for t in json.load(open(src)):
    if words and not t["text"].startswith(" "):
        words[-1]["text"] += t["text"]
        words[-1]["endMs"] = t["endMs"]
    else:
        words.append({k: t[k] for k in ("text", "startMs", "endMs", "timestampMs", "confidence")})

# Whisper a veces parte "Riohacha" en "Río" + "H."
merged = []
for w in words:
    if merged and merged[-1]["text"].strip() == "Río" and w["text"].strip().startswith("H"):
        merged[-1]["text"] = " Riohacha"
        merged[-1]["endMs"] = w["endMs"]
        continue
    merged.append(w)
words = merged

for w in words:
    for pat, rep in FIX:
        w["text"] = re.sub(pat, rep, w["text"])
    w["pageBreakAfter"] = w["text"].strip().endswith((".", ","))

json.dump(words, open(dst, "w"), ensure_ascii=False, indent=1)
print(" | ".join(f"{w['text'].strip()}@{w['startMs']}" for w in words))
