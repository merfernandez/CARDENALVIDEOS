"""Calcula la intensidad de la voz por cuadro (30 fps) para animar audiogramas.

Uso: python3 scripts/envolvente_audio.py audio.m4a salida.json
"""
import json
import subprocess
import sys

import numpy as np

src, dst = sys.argv[1:3]
FPS, SR = 30, 48000
raw = subprocess.check_output(
    ["ffmpeg", "-v", "error", "-i", src, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"]
)
x = np.frombuffer(raw, dtype=np.float32)
n = SR // FPS
frames = len(x) // n
rms = np.sqrt((x[: frames * n].reshape(frames, n) ** 2).mean(axis=1))
# Normalizar (percentil 98 = 1) y suavizar un poco
rms = np.clip(rms / (np.percentile(rms, 98) + 1e-9), 0, 1)
rms = np.convolve(rms, np.ones(3) / 3, mode="same")
json.dump([round(float(v), 3) for v in rms], open(dst, "w"))
print(frames, "cuadros")
