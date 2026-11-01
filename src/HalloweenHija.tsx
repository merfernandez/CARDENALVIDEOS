import { Audio, Video } from "@remotion/media";
import "@fontsource/creepster/400.css";
import {
  AbsoluteFill,
  Img,
  interpolate,
  random,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Video familiar de Halloween 2026 de Francesca "France" (28 s, 1080x1920, 30 fps).
// Inicio: France lanza un hechizo con la varita (cámara lenta) y el destello
// abre un montaje rápido al ritmo de la música (150 bpm = 12 cuadros por pulso).
// Sin textos: solo "HALLOWEEN 2026" en el cierre.
// Música: scripts/musica_halloween.py (el "drop" cae justo en el cuadro 120).

const CARPETA = "halloween-hija";
const LETRA_MIEDO = "'Creepster', cursive";
const NARANJA = "#FF7A1A";
const MORADO = "#7B2FF7";
const VERDE = "#8CFF3F";

const PULSO = 12; // cuadros por pulso
const COMPAS = PULSO * 4; // 48 cuadros
const DROP = 120;
const FINAL = DROP + COMPAS * 13; // 744
export const DURACION_HALLOWEEN_HIJA = 840;

const compas = (n: number) => DROP + COMPAS * n;

// ---------- Piezas ----------

// Chispas mágicas que salen de un punto
const Chispas: React.FC<{
  x: number;
  y: number;
  cantidad?: number;
  semilla: string;
  alcance?: number;
}> = ({ x, y, cantidad = 40, semilla, alcance = 700 }) => {
  const frame = useCurrentFrame();
  const colores = [NARANJA, MORADO, VERDE, "#FFE45C", "#FFFFFF"];
  const t = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: "clamp" });
  const ease = 1 - Math.pow(1 - t, 3);
  const op = interpolate(frame, [0, 4, 16, 26], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {new Array(cantidad).fill(0).map((_, i) => {
        const ang = random(`${semilla}a${i}`) * Math.PI * 2;
        const vel = 0.35 + random(`${semilla}v${i}`) * 0.65;
        const d = ease * alcance * vel;
        const tam = 10 + random(`${semilla}s${i}`) * 22;
        const c = colores[i % colores.length];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + Math.cos(ang) * d - tam / 2,
              top: y + Math.sin(ang) * d - tam / 2 + ease * ease * 120,
              width: tam,
              height: tam,
              opacity: op,
              background: c,
              clipPath:
                "polygon(50% 0,61% 39%,100% 50%,61% 61%,50% 100%,39% 61%,0 50%,39% 39%)",
              transform: `rotate(${frame * 12 + i * 30}deg) scale(${1 - t * 0.5})`,
              filter: `drop-shadow(0 0 10px ${c})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Destello de corte
const Destello: React.FC<{ color?: string; corto?: boolean }> = ({
  color = MORADO,
  corto,
}) => {
  const frame = useCurrentFrame();
  const op = interpolate(
    frame,
    corto ? [0, 3, 6] : [0, 3, 10],
    [0, corto ? 0.6 : 0.95, 0],
    {
      extrapolateRight: "clamp",
    },
  );
  return (
    <AbsoluteFill
      style={{
        opacity: op,
        background: `radial-gradient(circle at 50% 50%, #FFFFFF 0%, ${color} 45%, rgba(0,0,0,0) 85%)`,
        mixBlendMode: "screen",
      }}
    />
  );
};

// Murciélagos que cruzan la pantalla
const Murcielagos: React.FC<{ semilla: string; cantidad?: number }> = ({
  semilla,
  cantidad = 4,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {new Array(cantidad).fill(0).map((_, i) => {
        const y0 = 120 + random(`${semilla}y${i}`) * 380;
        const vel = 22 + random(`${semilla}v${i}`) * 16;
        const dir = i % 2 === 0 ? 1 : -1;
        const x =
          dir > 0 ? -220 + frame * vel - i * 90 : 1200 - frame * vel + i * 90;
        const tam = 90 + random(`${semilla}t${i}`) * 80;
        return (
          <Img
            key={i}
            src={staticFile("stickers/murcielago.svg")}
            style={{
              position: "absolute",
              left: x,
              top: y0 + Math.sin(frame / 3 + i) * 40,
              width: tam,
              transform: `scaleX(${dir}) scaleY(${0.8 + Math.abs(Math.sin(frame / 2 + i)) * 0.3})`,
              filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.6))",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Bordes oscuros con un toque morado
const Vineta: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(40,8,70,0.55) 85%, rgba(10,2,20,0.85) 100%)",
    }}
  />
);

type Entrada = "zoom" | "izq" | "der" | "arriba" | "giro";

// Movimiento de entrada (barrido con desenfoque de movimiento)
const useEntrada = (tipo: Entrada) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 15, stiffness: 190 } });
  const q = 1 - p;
  const blur = Math.min(24, Math.abs(q) * 60);
  switch (tipo) {
    case "izq":
      return { transform: `translateX(${-q * 1100}px)`, blur };
    case "der":
      return { transform: `translateX(${q * 1100}px)`, blur };
    case "arriba":
      return { transform: `translateY(${-q * 1900}px)`, blur };
    case "giro":
      return {
        transform: `rotate(${q * 25}deg) scale(${1 + q * 0.8})`,
        blur: blur * 0.6,
      };
    default:
      return { transform: `scale(${1 + q * 0.6})`, blur: blur * 0.6 };
  }
};

const Clip: React.FC<{
  src: string;
  velocidad?: number;
  desde?: number;
  entrada?: Entrada;
  espejo?: boolean;
}> = ({ src, velocidad = 1, desde = 0, entrada = "zoom", espejo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = useEntrada(entrada);
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0414", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transform: `${e.transform} scale(${1.06 + frame * 0.0015}) ${espejo ? "scaleX(-1)" : ""}`,
          filter: `saturate(1.2) contrast(1.06) blur(${e.blur}px)`,
        }}
      >
        <Video
          src={staticFile(`${CARPETA}/${src}`)}
          objectFit="cover"
          muted
          playbackRate={velocidad}
          trimBefore={Math.round(desde * fps)}
        />
      </AbsoluteFill>
      <Vineta />
    </AbsoluteFill>
  );
};

// Foto a pantalla completa que, en el pulso 2, hace zoom sobre un punto
const FotoZoom: React.FC<{
  src: string;
  posicion: string; // object-position del encuadre
  foco: string; // transform-origin del zoom
  zoom?: number;
  entrada?: Entrada;
  retraso?: number;
  mover?: [number, number]; // desplazamiento en px al hacer zoom
}> = ({
  src,
  posicion,
  foco,
  zoom = 1.9,
  entrada = "zoom",
  retraso = PULSO * 2,
  mover = [0, 0],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = useEntrada(entrada);
  const z = spring({
    frame,
    fps,
    delay: retraso,
    config: { damping: 13, stiffness: 150 },
  });
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#0B0414" }}>
      <AbsoluteFill
        style={{
          transform: `${e.transform} translate(${z * mover[0]}px, ${z * mover[1]}px)`,
          filter: `blur(${e.blur}px)`,
        }}
      >
        <Img
          src={staticFile(`${CARPETA}/${src}`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: posicion,
            transformOrigin: foco,
            transform: `scale(${1.04 + frame * 0.001 + z * (zoom - 1)})`,
            filter: "saturate(1.2) contrast(1.05)",
          }}
        />
      </AbsoluteFill>
      <Vineta />
    </AbsoluteFill>
  );
};

// Polaroid que cae girando sobre un fondo desenfocado de la misma foto
const Polaroid: React.FC<{ src: string; giro: number }> = ({ src, giro }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 11, stiffness: 140 } });
  const caida = interpolate(p, [0, 1], [-1600, 0]);
  const ancho = 880;
  const alto = (ancho - 60) * (4 / 3);
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#12061F" }}>
      <Img
        src={staticFile(`${CARPETA}/${src}`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(40px) brightness(0.45) saturate(1.4)",
          transform: `scale(${1.3 + frame * 0.003})`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(123,47,247,0.35), rgba(255,122,26,0.25))",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: (1080 - ancho) / 2,
          top: 300,
          width: ancho,
          padding: "30px 30px 70px",
          background: "#FBF8F1",
          borderRadius: 8,
          boxShadow: "0 30px 70px rgba(0,0,0,0.65)",
          transform: `translateY(${caida}px) rotate(${giro * (2 - p) + Math.sin(frame / 8) * 1.5}deg)`,
        }}
      >
        <div style={{ width: "100%", height: alto, overflow: "hidden" }}>
          <Img
            src={staticFile(`${CARPETA}/${src}`)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${1.12 - frame * 0.002})`,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Sticker: React.FC<{
  src: string;
  x: number;
  y: number;
  size: number;
  delay: number;
}> = ({ src, x, y, size, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame,
    fps,
    delay,
    config: { damping: 9, stiffness: 180 },
  });
  return (
    <Img
      src={staticFile(`stickers/${src}.svg`)}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        transform: `scale(${p}) rotate(${Math.sin((frame - delay) / 5) * 12}deg)`,
        filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.55))",
      }}
    />
  );
};

// Pantalla partida en 3 franjas que entran por arriba y por abajo
// y se juntan para formar la imagen completa.
const Franjas: React.FC<{ src: string; desde: number; velocidad: number }> = ({
  src,
  desde,
  velocidad,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0414" }}>
      {[0, 1, 2].map((i) => {
        const p = spring({
          frame,
          fps,
          delay: i * 3,
          config: { damping: 14, stiffness: 170 },
        });
        const dir = i % 2 === 0 ? -1 : 1;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: i * 360,
              top: 0,
              width: 360,
              height: 1920,
              overflow: "hidden",
              transform: `translateY(${(1 - p) * 1920 * dir}px)`,
              borderLeft:
                i > 0 ? `6px solid ${i === 1 ? NARANJA : MORADO}` : undefined,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: -i * 360,
                top: 0,
                width: 1080,
                height: 1920,
                transform: `scale(${1.05 + frame * 0.002})`,
              }}
            >
              <Video
                src={staticFile(`${CARPETA}/${src}`)}
                objectFit="cover"
                muted
                playbackRate={velocidad}
                trimBefore={Math.round(desde * fps)}
              />
            </div>
          </div>
        );
      })}
      <Vineta />
    </AbsoluteFill>
  );
};

// Golpe al ritmo: todo "salta" un poco en cada pulso y se sacude en las palmas
const AlRitmo: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const t = frame - DROP;
  if (t < 0 || frame >= FINAL) {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const fase = t % PULSO;
  const pulso = Math.floor(t / PULSO);
  const golpe = Math.exp(-fase / 3);
  const palma = pulso % 2 === 1 ? golpe : 0;
  const lado = pulso % 4 === 1 ? 1 : -1;
  return (
    <AbsoluteFill
      style={{
        transform: `scale(${1 + golpe * 0.045}) rotate(${palma * lado * 1.4}deg) translateX(${palma * lado * 14}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Velas flotantes (adorno de magos)
const VelasFlotantes: React.FC<{
  semilla: string;
  cantidad?: number;
  alto?: number;
}> = ({ semilla, cantidad = 5, alto = 60 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {new Array(cantidad).fill(0).map((_, i) => {
        const p = spring({ frame, fps, delay: i * 3, config: { damping: 12 } });
        const x = 60 + (i * 960) / Math.max(1, cantidad - 1) - 30;
        const y = alto + random(`${semilla}${i}`) * 140;
        const tam = 55 + random(`${semilla}t${i}`) * 35;
        return (
          <Img
            key={i}
            src={staticFile("stickers/vela.svg")}
            style={{
              position: "absolute",
              left: x,
              top: y + Math.sin(frame / 9 + i * 1.7) * 18 + (1 - p) * -300,
              width: tam,
              opacity: p,
              filter: "drop-shadow(0 0 18px rgba(255,190,90,0.9))",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Foto protagonista: plano general y luego acercamiento a cada niño, uno por cada 2 pulsos.
// Coordenadas en el lienzo de 1440x1920 (la foto 3:4 a pantalla completa, corrida -180 px).
type Parada = { x: number; y: number; s: number };
const RecorridoFoto: React.FC<{
  src: string;
  paradas: Parada[];
  paso: number;
}> = ({ src, paradas, paso }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = useEntrada("zoom");
  const camara = (k: number) => {
    const { x, y, s } = paradas[k];
    if (s === 1) return { tx: 0, ty: 0, s };
    const tx = Math.min(180 * s, Math.max(1080 - 1260 * s, 540 - s * x));
    const ty = Math.min(0, Math.max(1920 - 1920 * s, 820 - s * y));
    return { tx, ty, s };
  };
  const k = Math.min(paradas.length - 1, Math.floor(frame / paso));
  const a = camara(Math.max(0, k - 1));
  const b = camara(k);
  const p =
    k === 0
      ? 1
      : spring({
          frame: frame - k * paso,
          fps,
          config: { damping: 16, stiffness: 170 },
        });
  const mezcla = (u: number, v: number) => u + (v - u) * p;
  const s = mezcla(a.s, b.s) + frame * 0.0006;
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#0B0414" }}>
      <AbsoluteFill
        style={{ transform: e.transform, filter: `blur(${e.blur}px)` }}
      >
        <AbsoluteFill
          style={{
            transformOrigin: "0 0",
            transform: `translate(${mezcla(a.tx, b.tx)}px, ${mezcla(a.ty, b.ty)}px) scale(${s})`,
          }}
        >
          <Img
            src={staticFile(`${CARPETA}/${src}`)}
            style={{
              position: "absolute",
              left: -180,
              top: 0,
              width: 1440,
              height: 1920,
              objectFit: "cover",
              filter: "saturate(1.2) contrast(1.06)",
            }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
      <Vineta />
      {paradas.map((_, i) =>
        i === 0 ? null : (
          <Sequence
            key={i}
            from={i * paso}
            durationInFrames={paso}
            layout="none"
          >
            <Chispas
              x={540}
              y={820}
              cantidad={28}
              semilla={`nino${i}`}
              alcance={520}
            />
          </Sequence>
        ),
      )}
    </AbsoluteFill>
  );
};

// ---------- Escenas ----------

const EscenaVarita: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrada = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const carga = interpolate(frame, [70, 112], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const salida = interpolate(frame, [114, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#0B0414" }}>
      <AbsoluteFill
        style={{
          transform: `scale(${interpolate(entrada, [0, 1], [1.25, 1.04]) + frame * 0.0008 + salida * 0.12})`,
          filter: `saturate(1.15) contrast(1.05) blur(${salida * 8}px)`,
        }}
      >
        {/* Cámara lenta: el clip de 60 fps se ve suave a 0.6x */}
        <Video
          src={staticFile(`${CARPETA}/c4447.mp4`)}
          objectFit="cover"
          muted
          playbackRate={0.6}
        />
      </AbsoluteFill>
      <Vineta />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 62%, rgba(255,240,180,${carga * 0.7}) 0%, rgba(123,47,247,${carga * 0.5}) 30%, rgba(0,0,0,0) 60%)`,
          mixBlendMode: "screen",
        }}
      />
      <Murcielagos semilla="intro" cantidad={3} />
      <Sequence from={100} layout="none">
        <Chispas
          x={540}
          y={1180}
          cantidad={60}
          semilla="hechizo"
          alcance={900}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

const EscenaFinal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const luna = spring({ frame, fps, config: { damping: 15 } });
  const circulo = spring({
    frame,
    fps,
    delay: 2,
    config: { damping: 11, stiffness: 120 },
  });
  const brillo = 0.6 + Math.sin(frame / 4) * 0.4;
  const latido = 1 + Math.max(0, Math.sin(frame / 5)) * 0.03;
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 35%, #4A1A8C 0%, #220A45 45%, #0B0414 100%)",
      }}
    >
      {new Array(40).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: random(`ex${i}`) * 1080,
            top: random(`ey${i}`) * 1920,
            width: 4 + random(`es${i}`) * 5,
            height: 4 + random(`es${i}`) * 5,
            borderRadius: "50%",
            background: "#FFF6D0",
            opacity: 0.3 + Math.abs(Math.sin(frame / 5 + i)) * 0.7,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          right: 70,
          top: 90,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 35%, #FFF8D6, #F7D774 70%)",
          boxShadow: "0 0 90px rgba(255,230,140,0.7)",
          transform: `scale(${luna})`,
        }}
      />
      <Img
        src={staticFile("stickers/telarana.svg")}
        style={{
          position: "absolute",
          left: -40,
          top: -30,
          width: 330,
          opacity: 0.45,
        }}
      />
      {/* France dentro de un círculo mágico */}
      <div
        style={{
          position: "absolute",
          left: 540 - 340,
          top: 330,
          width: 680,
          height: 680,
          borderRadius: "50%",
          overflow: "hidden",
          border: `14px solid ${NARANJA}`,
          boxShadow: `0 0 ${60 + brillo * 50}px ${MORADO}, 0 0 30px ${NARANJA}`,
          transform: `scale(${circulo}) rotate(${(1 - circulo) * -30}deg)`,
        }}
      >
        <Video
          src={staticFile(`${CARPETA}/c4447.mp4`)}
          muted
          playbackRate={0.5}
          trimBefore={30}
          style={{
            width: 1080,
            height: 1920,
            marginLeft: -200,
            marginTop: -290,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 1100,
          width: "100%",
          textAlign: "center",
          fontFamily: LETRA_MIEDO,
          fontSize: 190,
          color: NARANJA,
          lineHeight: 1,
          WebkitTextStroke: "9px #1A0630",
          paintOrder: "stroke fill",
          textShadow: "0 0 40px rgba(255,122,26,0.7)",
          transform: `scale(${latido})`,
        }}
      >
        {"HALLOWEEN".split("").map((l, i) => {
          const p = spring({
            frame,
            fps,
            delay: 6 + i * 2,
            config: { damping: 8, stiffness: 200 },
          });
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                transform: `translateY(${(1 - p) * -500}px) rotate(${(1 - p) * (i % 2 ? 40 : -40)}deg)`,
              }}
            >
              {l}
            </span>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          top: 1300,
          width: "100%",
          textAlign: "center",
          fontFamily: LETRA_MIEDO,
          fontSize: 170,
          color: VERDE,
          lineHeight: 1,
          WebkitTextStroke: "8px #1A0630",
          paintOrder: "stroke fill",
          transform: `scale(${spring({ frame, fps, delay: 26, config: { damping: 8 } }) * latido})`,
          textShadow: "0 0 34px rgba(140,255,63,0.6)",
        }}
      >
        2026
      </div>
      <Sticker src="calabaza" x={50} y={1600} size={240} delay={18} />
      <Sticker src="fantasma" x={810} y={1570} size={200} delay={24} />
      <Sticker src="dulces" x={420} y={1690} size={160} delay={30} />
      <Sticker src="buho" x={40} y={300} size={170} delay={14} />
      <Sticker src="varita" x={870} y={330} size={170} delay={20} />
      <Murcielagos semilla="final" cantidad={4} />
      <Chispas x={540} y={670} cantidad={60} semilla="final" alcance={850} />
    </AbsoluteFill>
  );
};

// ---------- Plan del montaje ----------
// [desde, duración, contenido, color del destello]
type Toma = { desde: number; dur: number; el: React.ReactNode; color: string };

const PASO_NINO = PULSO * 2;
const NINOS: Parada[] = [
  { x: 0, y: 0, s: 1 }, // plano general
  { x: 194, y: 640, s: 2 }, // France
  { x: 462, y: 690, s: 2 }, // el alien
  { x: 694, y: 560, s: 2 }, // S.W.A.T.
  { x: 756, y: 1060, s: 1.9 }, // la calabaza
  { x: 972, y: 950, s: 2 }, // Spider-Man
];

const TOMAS: Toma[] = [
  // Compases 1-3: la foto protagonista, acercamiento a cada niño
  {
    desde: compas(0),
    dur: COMPAS * 3,
    color: MORADO,
    el: (
      <>
        <RecorridoFoto src="entrada.jpg" paradas={NINOS} paso={PASO_NINO} />
        {/* Mientras se ve a France: adornos de magos lejos de las caras */}
        <Sequence from={PASO_NINO} durationInFrames={PASO_NINO} layout="none">
          <Sticker src="sombrero-mago" x={40} y={90} size={210} delay={2} />
          <Sticker src="buho" x={810} y={110} size={210} delay={5} />
          <Sticker src="varita" x={780} y={1560} size={230} delay={8} />
          <Sticker src="lentes-rayo" x={60} y={1580} size={200} delay={10} />
        </Sequence>
      </>
    ),
  },
  // Compás 4: la llegada, acelerada al ritmo
  {
    desde: compas(3),
    dur: COMPAS,
    color: VERDE,
    el: (
      <>
        <Clip
          src="c_llegada.mp4"
          desde={0.2}
          velocidad={3.4}
          entrada="arriba"
        />
        <Murcielagos semilla="llegada" cantidad={3} />
      </>
    ),
  },
  // Compás 5: las calles llenas
  {
    desde: compas(4),
    dur: COMPAS,
    color: NARANJA,
    el: <Clip src="c_calle.mp4" velocidad={2.5} entrada="der" />,
  },
  // Compás 6: la pandilla en el castillo, y zoom a France
  {
    desde: compas(5),
    dur: COMPAS,
    color: MORADO,
    el: (
      <>
        <FotoZoom
          src="grupo.jpg"
          posicion="0% 50%"
          foco="26% 37%"
          zoom={2.1}
          mover={[260, 60]}
        />
        <Sticker src="buho" x={810} y={130} size={200} delay={26} />
        <Sticker src="escoba" x={760} y={1560} size={240} delay={30} />
      </>
    ),
  },
  // Compás 7: el alien
  {
    desde: compas(6),
    dur: COMPAS,
    color: VERDE,
    el: <Clip src="c4442.mp4" entrada="der" />,
  },
  // Compás 8: France en franjas, con velas flotantes
  {
    desde: compas(7),
    dur: COMPAS,
    color: NARANJA,
    el: (
      <>
        <Franjas src="c4447.mp4" desde={0.5} velocidad={0.7} />
        <VelasFlotantes semilla="franjas" cantidad={5} alto={40} />
        <Sticker src="pocion" x={60} y={1600} size={190} delay={10} />
      </>
    ),
  },
  // Compás 9: mamá leoparda
  {
    desde: compas(8),
    dur: COMPAS,
    color: MORADO,
    el: <Clip src="c4443.mp4" entrada="izq" velocidad={1.1} />,
  },
  // Compás 10: la fila de los dulces
  {
    desde: compas(9),
    dur: COMPAS,
    color: NARANJA,
    el: <Clip src="c4446.mp4" entrada="giro" velocidad={1.15} />,
  },
  // Compás 11: papá y mamá en polaroid
  {
    desde: compas(10),
    dur: COMPAS,
    color: VERDE,
    el: (
      <>
        <Polaroid src="papas.jpg" giro={4} />
        <Sticker src="murcielago" x={60} y={110} size={180} delay={6} />
        <Sticker src="arana" x={860} y={1560} size={150} delay={10} />
      </>
    ),
  },
  // Compás 12: ráfaga, un corte por pulso
  {
    desde: compas(11),
    dur: PULSO,
    color: MORADO,
    el: <RecorridoFoto src="entrada.jpg" paradas={[NINOS[1]]} paso={PULSO} />,
  },
  {
    desde: compas(11) + PULSO,
    dur: PULSO,
    color: VERDE,
    el: <Clip src="c4442.mp4" desde={1.0} entrada="der" />,
  },
  {
    desde: compas(11) + PULSO * 2,
    dur: PULSO,
    color: NARANJA,
    el: <RecorridoFoto src="entrada.jpg" paradas={[NINOS[3]]} paso={PULSO} />,
  },
  {
    desde: compas(11) + PULSO * 3,
    dur: PULSO,
    color: MORADO,
    el: <Clip src="c4443.mp4" desde={0.9} entrada="giro" />,
  },
  // Compás 13: France de nuevo en cámara lenta, en espejo, hacia el final
  {
    desde: compas(12),
    dur: COMPAS,
    color: NARANJA,
    el: (
      <>
        <Clip
          src="c4447.mp4"
          desde={1.1}
          velocidad={0.5}
          entrada="zoom"
          espejo
        />
        <VelasFlotantes semilla="c13" cantidad={4} alto={50} />
        <Sticker src="sombrero-mago" x={40} y={1590} size={200} delay={8} />
        <Sticker src="buho" x={830} y={1600} size={190} delay={12} />
      </>
    ),
  },
];

// ---------- Composición ----------

export const HalloweenHija: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0414" }}>
      <Audio src={staticFile(`${CARPETA}/musica.wav`)} />

      <Sequence durationInFrames={DROP}>
        <EscenaVarita />
      </Sequence>

      <AlRitmo>
        {TOMAS.map((t) => (
          <Sequence key={t.desde} from={t.desde} durationInFrames={t.dur}>
            {t.el}
          </Sequence>
        ))}
      </AlRitmo>

      <Sequence from={FINAL}>
        <EscenaFinal />
      </Sequence>

      {/* Destellos en cada corte; whoosh solo en los cortes de compás */}
      {[
        ...TOMAS.map((t) => ({ c: t.desde, color: t.color })),
        { c: FINAL, color: MORADO },
      ].map(({ c, color }) => (
        <Sequence key={`d${c}`} from={c - 3} durationInFrames={14}>
          <Destello color={color} corto={(c - DROP) % COMPAS !== 0} />
          {(c - DROP) % COMPAS === 0 ? (
            <Audio src={staticFile("sfx/whoosh.wav")} volume={0.4} />
          ) : null}
        </Sequence>
      ))}
      <Sequence from={104} durationInFrames={30}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.6} />
      </Sequence>
    </AbsoluteFill>
  );
};
