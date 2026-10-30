// Logo animado "Las Más Virales" (video de los viernes con las 3 noticias de la semana).
// Entra grande en el centro y luego se queda pequeño en una esquina todo el video.
import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BLANCO, fontFamily, NEGRO, ROJO } from "./brand";

// Flecha de tendencia (sube) que "late"
const Tendencia: React.FC<{ size: number; frame: number }> = ({
  size,
  frame,
}) => {
  const sube = Math.sin(frame / 8) * 0.08 * size;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ transform: `translateY(${-Math.abs(sube)}px)` }}
    >
      <path
        d="M3 17 L9 11 L13 15 L21 7"
        fill="none"
        stroke={BLANCO}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 7 L21 7 L21 13"
        fill="none"
        stroke={BLANCO}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// El logo en sí. "escala" 1 = tamaño grande de presentación.
export const LogoMasVirales: React.FC<{
  escala: number;
  aparicion: number;
}> = ({ escala, aparicion }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = (delay: number) =>
    spring({ frame, fps, delay, config: { damping: 11, stiffness: 160 } });
  const cardenal = aparicion >= 1 ? 1 : pop(0);
  const las = aparicion >= 1 ? 1 : pop(8);
  const virales = aparicion >= 1 ? 1 : pop(14);
  // Brillo que cruza la palabra VIRALES cada 3 segundos
  const ciclo = (frame % 90) / 90;
  const brillo = interpolate(ciclo, [0, 0.35], [-40, 140], {
    extrapolateRight: "clamp",
  });
  // Ondas que salen del cardenal (como algo que se comparte y se vuelve viral)
  const onda = (frame % 45) / 45;
  const S = (n: number) => n * escala;

  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: S(22), fontFamily }}
    >
      <div
        style={{
          position: "relative",
          width: S(170),
          height: S(170),
          flexShrink: 0,
        }}
      >
        {[0, 0.5].map((d) => {
          const p = (onda + d) % 1;
          return (
            <div
              key={d}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: `${S(5)}px solid ${ROJO}`,
                transform: `scale(${1 + p * 0.45})`,
                opacity: (1 - p) * 0.7 * cardenal,
              }}
            />
          );
        })}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            backgroundColor: BLANCO,
            border: `${S(7)}px solid ${ROJO}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 ${S(10)}px ${S(30)}px rgba(0,0,0,0.45)`,
            transform: `scale(${cardenal}) rotate(${(1 - cardenal) * -25}deg)`,
          }}
        >
          <Img
            src={staticFile("cardenal-cabeza.png")}
            style={{ height: S(118), marginLeft: S(6) }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            color: BLANCO,
            fontWeight: 900,
            fontSize: S(54),
            letterSpacing: S(8),
            lineHeight: 1,
            textShadow: `0 ${S(3)}px ${S(12)}px rgba(0,0,0,0.7)`,
            opacity: las,
            transform: `translateX(${(1 - las) * S(-60)}px)`,
          }}
        >
          LAS MÁS
        </div>
        <div
          style={{
            marginTop: S(8),
            display: "flex",
            alignItems: "center",
            gap: S(12),
            backgroundColor: ROJO,
            padding: `${S(8)}px ${S(22)}px ${S(8)}px ${S(20)}px`,
            borderRadius: S(14),
            boxShadow: `${S(6)}px ${S(8)}px 0 ${NEGRO}`,
            transform: `skewX(-8deg) scale(${virales})`,
            transformOrigin: "left center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              color: BLANCO,
              fontWeight: 900,
              fontSize: S(84),
              lineHeight: 1,
              letterSpacing: S(1),
            }}
          >
            VIRALES
          </span>
          <Tendencia size={S(64)} frame={frame} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(105deg, transparent ${brillo - 15}%, rgba(255,255,255,0.45) ${brillo}%, transparent ${brillo + 15}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Animación completa: entra grande al centro y viaja a la esquina, donde se queda
export const LogoMasViralesAnimado: React.FC<{
  inicioEsquinaFrame?: number;
}> = ({ inicioEsquinaFrame = 75 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const viaje = spring({
    frame,
    fps,
    delay: inicioEsquinaFrame,
    durationInFrames: 22,
    config: { damping: 200 },
  });
  const fondo = interpolate(
    frame,
    [0, 6, inicioEsquinaFrame, inicioEsquinaFrame + 14],
    [0, 0.55, 0.55, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const escala = interpolate(viaje, [0, 1], [1, 0.5]);
  // Centro de pantalla → esquina superior izquierda
  const x = interpolate(viaje, [0, 1], [540, 40]);
  const y = interpolate(viaje, [0, 1], [860, 95]);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: `rgba(0,0,0,${fondo})` }} />
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          transform: `translateX(${-50 * (1 - viaje)}%)`,
        }}
      >
        <LogoMasVirales
          escala={escala}
          aparicion={frame >= inicioEsquinaFrame ? 1 : 0}
        />
      </div>
    </AbsoluteFill>
  );
};

// Demostración sobre un video de William para aprobar el diseño
export const DemoMasVirales: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#111" }}>
    <Video src={staticFile("d29/v1-cut.mp4")} objectFit="cover" muted />
    <LogoMasViralesAnimado />
  </AbsoluteFill>
);
