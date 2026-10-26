"""Corta silencios del video y re-sincroniza los subtítulos.

Uso: python3 scripts/cut_silences.py public/william.mp4 public/william-captions.json \
        public/william-cut.mp4 public/william-cut-captions.json
"""
import json
import re
import subprocess
import sys

src, captions_in, dst, captions_out = sys.argv[1:5]
NOISE, MIN_SIL, PAD = "-28dB", 0.15, 0.06

dur = float(subprocess.check_output(
    ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", src]))
log = subprocess.run(
    ["ffmpeg", "-i", src, "-af", f"silencedetect=noise={NOISE}:d={MIN_SIL}", "-vn", "-f", "null", "-"],
    capture_output=True, text=True).stderr
starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", log)]
ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", log)]

# Tramos con voz = complemento de los silencios (con un pequeño margen)
keep, cursor = [], 0.0
for s, e in zip(starts, ends):
    cut_from, cut_to = s + PAD, (e - PAD if e < dur - 0.01 else dur)
    if cut_to - cut_from > 0.05:
        keep.append((cursor, cut_from))
        cursor = cut_to
if cursor < dur - 0.05:
    keep.append((cursor, dur))
print("tramos:", [(round(a, 2), round(b, 2)) for a, b in keep])

parts, labels = [], []
for i, (a, b) in enumerate(keep):
    parts.append(f"[0:v]trim={a}:{b},setpts=PTS-STARTPTS[v{i}];[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS[a{i}]")
    labels.append(f"[v{i}][a{i}]")
fc = ";".join(parts) + ";" + "".join(labels) + f"concat=n={len(keep)}:v=1:a=1[v][a]"
subprocess.check_call(["ffmpeg", "-v", "error", "-y", "-i", src, "-filter_complex", fc,
                       "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-crf", "10", "-preset", "slow",
                       "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
                       "-c:a", "aac", "-b:a", "320k", "-movflags", "+faststart", dst])

def remap(ms):
    t, offset = ms / 1000, 0.0
    for a, b in keep:
        if t < a:
            return round((offset) * 1000)
        if t <= b:
            return round((offset + t - a) * 1000)
        offset += b - a
    return round(offset * 1000)

caps = json.load(open(captions_in))
for c in caps:
    c["startMs"], c["endMs"] = remap(c["startMs"]), remap(c["endMs"])
json.dump(caps, open(captions_out, "w"), ensure_ascii=False, indent=1)
print("duración final:", round(sum(b - a for a, b in keep), 2), "s")
print("cortes (s en el video final):", [round(sum(b - a for a, b in keep[:i + 1]), 2) for i in range(len(keep) - 1)])
