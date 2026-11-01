# Música original para el video de Halloween (28 s).
# 0-4 s: intro misteriosa (órgano + cajita musical + subida al hechizo)
# 4-24.8 s: ritmo bailable de Halloween a 150 bpm (13 compases)
# 24.8-28 s: golpe final con órgano y arpegio mágico
# Uso: python3 scripts/musica_halloween.py public/halloween-hija/musica.wav
import numpy as np, wave, sys
SR = 44100; DUR = 28.0; N = int(SR * DUR)
BPM = 150; B = 60 / BPM; DROP = 4.0; COMPASES = 13; FIN = DROP + COMPASES * 4 * B  # 24.8 s
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(13)

def f(n): return 440 * 2 ** ((n - 69) / 12)
def add(sig, t, gain=1.0, pan=0.0):
    i = int(round(t * SR))
    if i >= N: return
    s = sig[: N - i] * gain
    L[i:i + len(s)] += s * (1 - max(0, pan))
    R[i:i + len(s)] += s * (1 + min(0, pan))
def tt(d): return np.arange(int(SR * d)) / SR

def bell(n, d=1.2):
    t = tt(d); fr = f(n)
    s = np.sin(2*np.pi*fr*t) + 0.4*np.sin(2*np.pi*fr*2.76*t)*np.exp(-t*6) + 0.2*np.sin(2*np.pi*fr*5.4*t)*np.exp(-t*10)
    return s * np.exp(-t*3.2) * 0.2
def organ(ns, d, att=0.01, rel=0.08):
    t = tt(d); s = 0
    for n in ns:
        for h, a in ((1, 1), (2, 0.5), (3, 0.3), (4, 0.25), (6, 0.12), (8, 0.1)):
            s = s + a*np.sin(2*np.pi*f(n)*h*t*(1+0.002*np.sin(2*np.pi*6*t)))
    env = np.minimum(1, t/att) * np.minimum(1, np.maximum(0, (d-t))/rel)
    return s * env * 0.03
def bass(n, d):
    t = tt(d); fr = f(n); s = 0
    for h in range(1, 9): s = s + np.sin(2*np.pi*fr*h*t)/h
    s = np.tanh(s*1.6)
    return s * np.exp(-t*5) * np.minimum(1, t/0.004) * 0.32
def kick():
    t = tt(0.32); fr = 150*np.exp(-t*28) + 45
    return np.tanh(np.sin(2*np.pi*np.cumsum(fr)/SR)*1.5) * np.exp(-t*8) * 0.75
def clap():
    t = tt(0.22); e = np.exp(-t*22)
    for k in (0.0, 0.011, 0.022): e += np.where(t > k, np.exp(-(t-k)*90), 0)*0.6
    return rng.standard_normal(len(t)) * e * 0.12
def hat(d=0.05, g=0.06):
    t = tt(d); x = rng.standard_normal(len(t)); x = np.diff(np.concatenate([[0], x]))
    return x * np.exp(-t*(70 if d < 0.1 else 18)) * g
def theremin(notas, d):
    # notas: lista de (inicio_beat, nota); se desliza entre notas con vibrato
    t = tt(d); nn = np.zeros(len(t))
    for k, (b, n) in enumerate(notas):
        i = int(b*B*SR); nn[i:] = n
    # portamento
    a = np.exp(-1/(SR*0.06)); sm = np.copy(nn)
    for i in range(1, len(sm)): sm[i] = a*sm[i-1] + (1-a)*nn[i]
    fr = 440*2**((sm-69)/12) * (1 + 0.012*np.sin(2*np.pi*5.5*t))
    s = np.sin(2*np.pi*np.cumsum(fr)/SR) + 0.15*np.sin(4*np.pi*np.cumsum(fr)/SR)
    env = np.minimum(1, t/0.05) * np.minimum(1, (d-t)/0.2)
    return s * env * 0.13
def riser(d, g=0.18):
    t = tt(d); x = rng.standard_normal(len(t))
    sweep = np.sin(2*np.pi*np.cumsum(200 + 1800*(t/d)**2)/SR)*0.3
    return (x*0.6 + sweep) * (t/d)**2.2 * g
def impact():
    t = tt(1.6); fr = 60*np.exp(-t*3) + 30
    return (np.sin(2*np.pi*np.cumsum(fr)/SR)*0.9 + rng.standard_normal(len(t))*np.exp(-t*12)*0.4) * np.exp(-t*2.2) * 0.7

# ---------- Intro (0-4 s) ----------
add(organ([50, 57, 62, 65], 4.0, att=1.2, rel=0.3), 0, 0.9)
for i, n in enumerate([74, 77, 81, 80, 81, 77, 74, 73]):
    add(bell(n), 0.15 + i*0.42, 0.9, pan=(-0.3 if i % 2 else 0.3))
add(riser(1.6), DROP-1.6)

# ---------- Cuerpo (4-16.8 s) ----------
prog = [50, 50, 46, 46, 43, 43, 45, 45]           # Dm Dm Bb Bb Gm Gm A A (raíz)
acordes = {50: [62, 65, 69], 46: [62, 65, 70], 43: [62, 67, 70], 45: [61, 64, 69]}
riff = [0, 0, 12, 0, 3, 0, 2, 1]                  # bajo cromático "de monstruo"
for bar in range(COMPASES):
    root = prog[bar % 8]
    for beat in range(4):
        t = DROP + (bar*4 + beat)*B
        add(kick(), t)
        if beat in (1, 3): add(clap(), t, pan=0.1)
        for s in range(4):
            add(hat(), t + s*B/4, 1.0 if s % 2 else 0.6, pan=-0.25)
        add(hat(0.18, 0.05), t + B/2, pan=0.25)
        for e in range(2):
            n = root - 12 + riff[(beat*2 + e) % 8]
            add(bass(n, B/2*0.95), t + e*B/2)
        add(organ(acordes[root], B*0.3), t + B/2, 0.9)  # golpe de órgano a contratiempo
    if bar in (3, 7):  # redoble antes de la segunda mitad
        for k in range(8): add(clap(), DROP + (bar*4+2)*B + k*B/4, 0.5 + k*0.07)
lead = [(0, 74), (1, 77), (1.5, 76), (2, 74), (3, 81), (4.5, 80), (5, 81), (6, 77), (7, 73),
        (8, 74), (9, 77), (9.5, 79), (10, 82), (11, 81), (12, 77), (13, 76), (14, 73), (15, 74)]
add(theremin(lead, 16*B), DROP + 16*B, 1.0, pan=0.15)
add(theremin([(b, n + 12) for b, n in lead], 16*B), DROP + 32*B, 0.8, pan=-0.15)
for i, n in enumerate([74, 77, 81, 86]*4):
    add(bell(n, 0.5), DROP + i*B/2, 0.45)
add(riser(1.6, 0.22), FIN-1.6)

# ---------- Final (24.8-28 s) ----------
add(impact(), FIN)
add(kick(), FIN)
add(organ([38, 50, 57, 62, 65, 69], DUR-FIN, att=0.02, rel=1.2), FIN, 1.3)
for k, n in enumerate([74, 77, 81, 86, 89, 93, 98, 101]):
    add(bell(n, 1.6), FIN + 0.05 + k*0.06, 0.8, pan=(k % 2)*0.4-0.2)

x = np.stack([L, R], 1)
x = np.tanh(x / np.abs(x).max() * 1.6) / np.tanh(1.6)
fade = np.ones(N); k = int(SR*0.8); fade[-k:] = np.linspace(1, 0, k); x *= fade[:, None] * 0.9
w = wave.open(sys.argv[1], 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((x*32767).astype('<i2').tobytes()); w.close()
print("Listo:", sys.argv[1], "drop", DROP, "final", FIN)
