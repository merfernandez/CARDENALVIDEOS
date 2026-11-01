import { Audio, Video } from "@remotion/media";
import "@fontsource/caveat/700.css";
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

// Video familiar de Halloween (15 s, 1080x1920, 30 fps).
// Concepto: "Este Halloween... hubo magia". La varita lanza un hechizo y
// cada destello abre el siguiente recuerdo.

const CARPETA = "halloween-hija";
const LETRA_MANO = "'Caveat', cursive";
const LETRA_MIEDO = "'Creepster', cursive";
const NARANJA = "#FF7A1A";
const MORADO = "#7B2FF7";
const VERDE = "#8CFF3F";

export const DURACION_HALLOWEEN_HIJA = 450;

// Cortes alineados con los pulsos de la música (120 bpm = 15 cuadros)
const ESCENAS = {
  varita: [0, 120],
  grupo: [120, 180],
  alien: [180, 240],
  mama: [240, 285],
  dulces: [285, 330],
  papas: [330, 375],
  final: [375, 450],
} as const;

const dur = (k: keyof typeof ESCENAS) => ESCENAS[k][1] - ESCENAS[k][0];

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
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {new Array(cantidad).fill(0).map((_, i) => {
        const ang = random(`${semilla}a${i}`) * Math.PI * 2;
        const vel = 0.35 + random(`${semilla}v${i}`) * 0.65;
        const t = interpolate(frame, [0, 22], [0, 1], {
          extrapolateRight: "clamp",
        });
        const ease = 1 - Math.pow(1 - t, 3);
        const d = ease * alcance * vel;
        const tam = 10 + random(`${semilla}s${i}`) * 22;
        const op = interpolate(frame, [0, 4, 16, 26], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
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

// Destello de corte: luz mágica que cubre la pantalla un instante
const Destello: React.FC<{ color?: string }> = ({ color = MORADO }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 3, 10], [0, 0.95, 0], {
    extrapolateRight: "clamp",
  });
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
        const x = dir > 0 ? -220 + frame * vel - i * 90 : 1200 - frame * vel + i * 90;
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

// Texto escrito a mano que aparece letra por letra
const TextoMano: React.FC<{
  texto: string;
  top?: number;
  bottom?: number;
  size?: number;
  color?: string;
  delay?: number;
  rot?: number;
}> = ({ texto, top, bottom, size = 120, color = "#FFFFFF", delay = 0, rot = -4 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const letras = texto.split("");
  return (
    <div
      style={{
        position: "absolute",
        top,
        bottom,
        left: 40,
        right: 40,
        textAlign: "center",
        fontFamily: LETRA_MANO,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1,
        color,
        transform: `rotate(${rot}deg)`,
        WebkitTextStroke: "12px rgba(20,6,40,0.85)",
        paintOrder: "stroke fill",
        textShadow: `0 0 30px ${MORADO}, 0 8px 18px rgba(0,0,0,0.6)`,
      }}
    >
      {letras.map((l, i) => {
        const p = spring({
          frame,
          fps,
          delay: delay + i * 1.2,
          config: { damping: 10, stiffness: 220 },
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              opacity: Math.min(1, p * 2),
              transform: `translateY(${(1 - p) * 60}px) scale(${0.4 + p * 0.6}) rotate(${(1 - p) * 25}deg)`,
            }}
          >
            {l}
          </span>
        );
      })}
    </div>
  );
};

// Clip de video con entrada con impulso y leve movimiento
const Clip: React.FC<{
  src: string;
  velocidad?: number;
  desde?: number;
  semilla: string;
}> = ({ src, velocidad = 1, desde = 0, semilla }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const entrada = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const escala = interpolate(entrada, [0, 1], [1.25, 1.04]) + frame * 0.0008;
  const giro = (1 - entrada) * (random(semilla) > 0.5 ? 6 : -6);
  const salida = interpolate(frame, [durationInFrames - 6, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0414", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transform: `scale(${escala + salida * 0.12}) rotate(${giro}deg)`,
          filter: `saturate(1.15) contrast(1.05) blur(${salida * 8}px)`,
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

// Bordes oscuros con un toque morado/naranja de Halloween
const Vineta: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(40,8,70,0.55) 85%, rgba(10,2,20,0.85) 100%)",
    }}
  />
);

// Polaroid que cae girando sobre un fondo desenfocado de la misma foto
const Polaroid: React.FC<{
  src: string;
  giro: number;
  ancho?: number;
  top?: number;
  delay?: number;
  pie?: string;
}> = ({ src, giro, ancho = 860, top = 260, delay = 0, pie }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, delay, config: { damping: 12, stiffness: 120 } });
  const caida = interpolate(p, [0, 1], [-1500, 0]);
  const vaiven = Math.sin((frame - delay) / 14) * 1.2;
  const alto = (ancho - 60) * (4 / 3);
  return (
    <div
      style={{
        position: "absolute",
        left: (1080 - ancho) / 2,
        top,
        width: ancho,
        padding: "30px 30px 120px",
        background: "#FBF8F1",
        borderRadius: 8,
        boxShadow: "0 30px 70px rgba(0,0,0,0.65)",
        transform: `translateY(${caida}px) rotate(${giro * (2 - p) + vaiven}deg)`,
      }}
    >
      <div style={{ width: "100%", height: alto, overflow: "hidden" }}>
        <Img
          src={staticFile(`${CARPETA}/${src}`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${1.08 - frame * 0.001})`,
          }}
        />
      </div>
      {pie ? (
        <div
          style={{
            position: "absolute",
            bottom: 18,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: LETRA_MANO,
            fontWeight: 700,
            fontSize: 74,
            color: "#2A1240",
          }}
        >
          {pie}
        </div>
      ) : null}
    </div>
  );
};

const FondoFoto: React.FC<{ src: string }> = ({ src }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#12061F" }}>
      <Img
        src={staticFile(`${CARPETA}/${src}`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(40px) brightness(0.45) saturate(1.4)",
          transform: `scale(${1.3 + frame * 0.002})`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(123,47,247,0.35), rgba(255,122,26,0.25))`,
        }}
      />
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
  const p = spring({ frame, fps, delay, config: { damping: 9, stiffness: 180 } });
  return (
    <Img
      src={staticFile(`stickers/${src}.svg`)}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        transform: `scale(${p}) rotate(${Math.sin((frame - delay) / 6) * 10}deg)`,
        filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.55))",
      }}
    />
  );
};

// ---------- Escenas ----------

const EscenaVarita: React.FC = () => {
  const frame = useCurrentFrame();
  // Brillo creciente en la punta de la varita justo antes del hechizo
  const carga = interpolate(frame, [70, 112], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill>
      {/* Cámara lenta: el clip de 60 fps se ve suave a 0.6x */}
      <Clip src="c4447.mp4" velocidad={0.6} semilla="varita" />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 62%, rgba(255,240,180,${carga * 0.7}) 0%, rgba(123,47,247,${carga * 0.5}) 30%, rgba(0,0,0,0) 60%)`,
          mixBlendMode: "screen",
        }}
      />
      <Murcielagos semilla="intro" cantidad={3} />
      <TextoMano texto="Este Halloween..." bottom={260} size={150} delay={8} />
      <Sequence from={100} layout="none">
        <Chispas x={540} y={1180} cantidad={60} semilla="hechizo" alcance={900} />
      </Sequence>
    </AbsoluteFill>
  );
};

const EscenaFoto: React.FC<{
  src: string;
  giro: number;
  pie: string;
  stickers: { src: string; x: number; y: number; size: number; delay: number }[];
}> = ({ src, giro, pie, stickers }) => (
  <AbsoluteFill>
    <FondoFoto src={src} />
    <Polaroid src={src} giro={giro} pie={pie} />
    {stickers.map((s, i) => (
      <Sticker key={i} {...s} />
    ))}
  </AbsoluteFill>
);

const EscenaFinal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const luna = spring({ frame, fps, config: { damping: 15 } });
  const circulo = spring({ frame, fps, delay: 4, config: { damping: 11, stiffness: 120 } });
  const titulo = "HALLOWEEN".split("");
  const brillo = 0.6 + Math.sin(frame / 4) * 0.4;
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 35%, #4A1A8C 0%, #220A45 45%, #0B0414 100%)",
      }}
    >
      {/* Estrellas */}
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
      {/* Luna */}
      <div
        style={{
          position: "absolute",
          right: 70,
          top: 90,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #FFF8D6, #F7D774 70%)",
          boxShadow: "0 0 90px rgba(255,230,140,0.7)",
          transform: `scale(${luna})`,
        }}
      />
      <Img
        src={staticFile("stickers/telarana.svg")}
        style={{ position: "absolute", left: -40, top: -30, width: 330, opacity: 0.45 }}
      />
      {/* La hechicera dentro de un círculo mágico */}
      <div
        style={{
          position: "absolute",
          left: 540 - 340,
          top: 360,
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
      {/* HALLOWEEN letra por letra */}
      <div
        style={{
          position: "absolute",
          top: 1090,
          width: "100%",
          textAlign: "center",
          fontFamily: LETRA_MIEDO,
          fontSize: 170,
          color: NARANJA,
          lineHeight: 1,
          WebkitTextStroke: "8px #1A0630",
          paintOrder: "stroke fill",
          textShadow: `0 0 40px rgba(255,122,26,0.7)`,
        }}
      >
        {titulo.map((l, i) => {
          const p = spring({ frame, fps, delay: 8 + i * 2, config: { damping: 8, stiffness: 200 } });
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
          top: 1265,
          width: "100%",
          textAlign: "center",
          fontFamily: LETRA_MIEDO,
          fontSize: 120,
          color: VERDE,
          WebkitTextStroke: "7px #1A0630",
          paintOrder: "stroke fill",
          transform: `scale(${spring({ frame, fps, delay: 26, config: { damping: 9 } })})`,
          textShadow: `0 0 34px rgba(140,255,63,0.6)`,
        }}
      >
        2026
      </div>
      <TextoMano texto="...hubo magia" top={1440} size={130} delay={34} rot={-3} color="#FFE9A8" />
      <Sticker src="calabaza" x={50} y={1620} size={230} delay={20} />
      <Sticker src="fantasma" x={820} y={1580} size={190} delay={28} />
      <Sticker src="dulces" x={420} y={1700} size={150} delay={36} />
      <Murcielagos semilla="final" cantidad={3} />
      <Sequence from={0} layout="none">
        <Chispas x={540} y={700} cantidad={50} semilla="final" alcance={800} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ---------- Composición ----------

export const HalloweenHija: React.FC = () => {
  const cortes = [
    ESCENAS.grupo[0],
    ESCENAS.alien[0],
    ESCENAS.mama[0],
    ESCENAS.dulces[0],
    ESCENAS.papas[0],
    ESCENAS.final[0],
  ];
  const colores = [MORADO, NARANJA, VERDE, MORADO, NARANJA, MORADO];
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0414" }}>
      <Audio src={staticFile(`${CARPETA}/musica.wav`)} />

      <Sequence durationInFrames={dur("varita")}>
        <EscenaVarita />
      </Sequence>

      <Sequence from={ESCENAS.grupo[0]} durationInFrames={dur("grupo")}>
        <EscenaFoto
          src="grupo.jpg"
          giro={-5}
          pie="¡La pandilla completa!"
          stickers={[
            { src: "calabaza", x: 40, y: 1500, size: 200, delay: 10 },
            { src: "fantasma", x: 840, y: 120, size: 170, delay: 14 },
            { src: "dulces", x: 820, y: 1560, size: 150, delay: 18 },
          ]}
        />
      </Sequence>

      <Sequence from={ESCENAS.alien[0]} durationInFrames={dur("alien")}>
        <Clip src="c4442.mp4" semilla="alien" />
        <TextoMano texto="¡Truco o trato!" bottom={230} size={140} delay={4} rot={3} color="#C8FF9A" />
      </Sequence>

      <Sequence from={ESCENAS.mama[0]} durationInFrames={dur("mama")}>
        <Clip src="c4443.mp4" semilla="mama" velocidad={1.2} />
        <TextoMano texto="Mamá leoparda al mando" top={190} size={110} delay={2} rot={-3} color="#FFD28A" />
      </Sequence>

      <Sequence from={ESCENAS.dulces[0]} durationInFrames={dur("dulces")}>
        <Clip src="c4446.mp4" semilla="dulces" velocidad={1.2} />
        <TextoMano texto="¡Dulces por montones!" bottom={190} size={120} delay={2} rot={2} color="#FFB36B" />
      </Sequence>

      <Sequence from={ESCENAS.papas[0]} durationInFrames={dur("papas")}>
        <EscenaFoto
          src="papas.jpg"
          giro={4}
          pie="Mis compañeros de aventura"
          stickers={[
            { src: "murcielago", x: 60, y: 110, size: 170, delay: 8 },
            { src: "arana", x: 850, y: 1520, size: 150, delay: 12 },
            { src: "calabaza", x: 40, y: 1560, size: 180, delay: 16 },
          ]}
        />
      </Sequence>

      <Sequence from={ESCENAS.final[0]} durationInFrames={dur("final")}>
        <EscenaFinal />
      </Sequence>

      {/* Destellos y sonidos en cada corte */}
      {cortes.map((c, i) => (
        <Sequence key={c} from={c - 3} durationInFrames={14}>
          <Destello color={colores[i]} />
          <Audio src={staticFile("sfx/whoosh.wav")} volume={0.55} />
        </Sequence>
      ))}
      <Sequence from={104} durationInFrames={30}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={ESCENAS.final[0] + 8} durationInFrames={30}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.5} />
      </Sequence>
    </AbsoluteFill>
  );
};
