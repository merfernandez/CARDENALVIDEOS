# Musica original de 15 s: cajita musical "de miedo" (Re menor) que explota en ritmo
import numpy as np, wave, sys
SR=44100; BPM=120; B=60/BPM; DUR=15.0
N=int(SR*DUR); L=np.zeros(N); R=np.zeros(N)
def f(n): return 440*2**((n-69)/12)
def add(sig,t,pan=0.0,gain=1.0):
    i=int(t*SR); s=sig[:max(0,N-i)]*gain
    L[i:i+len(s)]+=s*(1-pan)/1.0 if pan>0 else s
    R[i:i+len(s)]+=s*(1+pan) if pan<0 else s
    if pan>0: R[i:i+len(s)]+=0
def bell(n,d=1.2):
    t=np.arange(int(SR*d))/SR; fr=f(n)
    s=(np.sin(2*np.pi*fr*t)+0.4*np.sin(2*np.pi*fr*2.76*t)*np.exp(-t*6)+0.25*np.sin(2*np.pi*fr*5.4*t)*np.exp(-t*10))
    return s*np.exp(-t*3.2)*0.22
def pluck(n,d=0.35):
    t=np.arange(int(SR*d))/SR; fr=f(n)
    s=np.sign(np.sin(2*np.pi*fr*t))*0.3+np.sin(2*np.pi*fr*t)
    return s*np.exp(-t*9)*0.28
def kick():
    t=np.arange(int(SR*0.3))/SR; fr=110*np.exp(-t*25)+45
    return np.sin(2*np.pi*np.cumsum(fr)/SR)*np.exp(-t*9)*0.6
def hat(d=0.06):
    t=np.arange(int(SR*d))/SR; return np.random.randn(len(t))*np.exp(-t*60)*0.07
def snap():
    t=np.arange(int(SR*0.15))/SR; return (np.random.randn(len(t))*0.6+np.sin(2*np.pi*190*t))*np.exp(-t*30)*0.22
def pad(ns,d):
    t=np.arange(int(SR*d))/SR; s=sum(np.sin(2*np.pi*f(n)*t)+0.3*np.sin(2*np.pi*f(n)*1.003*t) for n in ns)
    env=np.minimum(1,t/0.4)*np.minimum(1,(d-t)/0.8)
    return s*env*0.05
def riser(d):
    t=np.arange(int(SR*d))/SR; return np.random.randn(len(t))*(t/d)**2*0.12
np.random.seed(7)
# Intro (0-4 s): cajita musical misteriosa
mel=[(0,74),(0.5,77),(1,81),(1.5,80),(2,81),(3,77),(3.5,74),(4,73),(4.5,74),(5,77),(5.5,76),(6,74)]
for b,n in mel: add(bell(n),b*B)
add(pad([50,57,62],4.0),0)
add(riser(1.0),3.0*1)  # sube al hechizo
# Cuerpo (4-12.5 s): ritmo con bajo
prog=[50,50,46,46,48,48,45,45]  # Dm Bb C A
hook=[74,77,81,77,79,77,76,73]
for bar in range(4):
    for beat in range(4):
        t=4+ (bar*4+beat)*B
        add(kick(),t) if beat in (0,2) else add(snap(),t)
        add(hat(),t+B/2); add(hat(0.03),t)
        bn=prog[(bar*2+beat//2)%8]
        add(pluck(bn-12+12),t); add(pluck(bn+12,0.2),t+B/2,gain=0.6)
    for k in range(8):
        n=hook[(k+bar*3)%8]+(0 if bar<2 else 12 if k%4==0 else 0)
        add(bell(n,0.6),4+bar*2+k*B/2,gain=0.8)
    add(pad([62,65,69] if bar%2==0 else [58,62,65],2.0),4+bar*2)
# Final (12.5-15 s): arpegio magico y acorde
add(riser(0.5),12.0)
for k,n in enumerate([74,77,81,86,89,93,98]): add(bell(n,1.5),12.5+k*0.07,gain=0.7)
add(pad([50,62,65,69,74],2.5),12.5)
add(kick(),12.5)
x=np.stack([L,R],1)
fade=np.ones(N); fade[-int(SR*0.6):]=np.linspace(1,0,int(SR*0.6)); x*=fade[:,None]
x/=np.abs(x).max()*1.12
w=wave.open(sys.argv[1],'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((x*32767).astype('<i2').tobytes()); w.close()
