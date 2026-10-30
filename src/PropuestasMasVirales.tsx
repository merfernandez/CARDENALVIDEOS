// Tres propuestas de logo para "Las Más Virales" (para que la directora escoja)
import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BLANCO, fontFamily, NEGRO, ROJO } from "./brand";
import { LogoMasVirales } from "./MasVirales";

const CABEZA = "cardenal-cabeza.png";

// ---------- Opción 2: "Glitch moderno" (tipo noticiero digital) ----------
export const LogoGlitch: React.FC<{ escala?: number }> = ({ escala = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const S = (n: number) => n * escala;
  const entra = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 10,
  });
  // Temblor digital al entrar y un "glitch" corto cada 2 segundos
  const enGlitch = frame < 12 || frame % 60 < 4;
  const dx = enGlitch ? Math.sin(frame * 7.3) * S(8) : 0;
  const barrido = ((frame % 75) / 75) * 140 - 20;
  const top3 = spring({ frame, fps, delay: 14, config: { damping: 9 } });
  return (
    <div
      style={{
        fontFamily,
        display: "flex",
        alignItems: "center",
        gap: S(20),
        padding: `${S(18)}px ${S(32)}px ${S(18)}px ${S(18)}px`,
        backgroundColor: "rgba(10,10,12,0.92)",
        borderRadius: S(26),
        border: `${S(3)}px solid ${ROJO}`,
        boxShadow: `0 0 ${S(40)}px rgba(227,6,19,0.55)`,
        position: "relative",
        overflow: "hidden",
        opacity: entra,
        transform: `scaleY(${0.2 + entra * 0.8})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, transparent ${barrido - 6}%, rgba(255,255,255,0.12) ${barrido}%, transparent ${barrido + 6}%)`,
        }}
      />
      <Img
        src={staticFile(CABEZA)}
        style={{
          height: S(120),
          filter: "drop-shadow(0 0 10px rgba(227,6,19,0.6))",
        }}
      />
      <div style={{ position: "relative" }}>
        <div
          style={{
            color: "rgba(255,255,255,0.75)",
            fontWeight: 700,
            fontSize: S(30),
            letterSpacing: S(10),
          }}
        >
          LAS MÁS
        </div>
        <div
          style={{
            position: "relative",
            fontWeight: 900,
            fontSize: S(96),
            lineHeight: 1,
            letterSpacing: S(2),
          }}
        >
          <span
            style={{
              position: "absolute",
              left: dx,
              color: "#00E5FF",
              opacity: enGlitch ? 0.8 : 0,
            }}
          >
            VIRALES
          </span>
          <span
            style={{
              position: "absolute",
              left: -dx,
              color: ROJO,
              opacity: enGlitch ? 0.9 : 0,
            }}
          >
            VIRALES
          </span>
          <span style={{ position: "relative", color: BLANCO }}>VIRALES</span>
        </div>
      </div>
      <div
        style={{
          alignSelf: "flex-start",
          backgroundColor: ROJO,
          color: BLANCO,
          fontWeight: 900,
          fontSize: S(30),
          padding: `${S(6)}px ${S(14)}px`,
          borderRadius: S(10),
          whiteSpace: "nowrap",
          transform: `scale(${top3}) rotate(8deg)`,
        }}
      >
        TOP 3
      </div>
    </div>
  );
};

// ---------- Opción 3: "Notificación viral" (tipo redes sociales) ----------
export const LogoNotificacion: React.FC<{ escala?: number }> = ({
  escala = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const S = (n: number) => n * escala;
  const baja = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const corazon = spring({
    frame,
    fps,
    delay: 14,
    config: { damping: 6, stiffness: 200 },
  });
  const latido = 1 + Math.max(0, Math.sin(frame / 6)) * 0.12;
  const cuenta = Math.floor(
    interpolate(frame, [14, 50], [0, 99], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <div
      style={{
        fontFamily,
        display: "flex",
        alignItems: "center",
        gap: S(22),
        backgroundColor: BLANCO,
        borderRadius: S(36),
        padding: `${S(18)}px ${S(28)}px ${S(18)}px ${S(18)}px`,
        boxShadow: `0 ${S(18)}px ${S(44)}px rgba(0,0,0,0.4)`,
        transform: `translateY(${(1 - baja) * S(-260)}px)`,
      }}
    >
      <div
        style={{
          width: S(116),
          height: S(116),
          borderRadius: S(30),
          background: `linear-gradient(135deg, ${ROJO}, #8C0410)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: S(92),
            height: S(92),
            borderRadius: "50%",
            backgroundColor: BLANCO,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Img
            src={staticFile(CABEZA)}
            style={{ height: S(70), marginLeft: S(4) }}
          />
        </div>
      </div>
      <div>
        <div
          style={{
            color: NEGRO,
            fontWeight: 900,
            fontSize: S(56),
            lineHeight: 1.05,
          }}
        >
          #LasMás<span style={{ color: ROJO }}>Virales</span>
        </div>
        <div
          style={{
            color: "#666",
            fontWeight: 600,
            fontSize: S(26),
            marginTop: S(6),
          }}
        >
          Cardenal Stereo · las 3 de la semana
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: S(6),
        }}
      >
        <svg
          width={S(64)}
          height={S(64)}
          viewBox="0 0 24 24"
          style={{ transform: `scale(${corazon * latido})` }}
        >
          <path
            d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3.3 5 6.8 5c2 0 3.4 1.1 4.2 2.4C11.8 6.1 13.2 5 15.2 5c3.5 0 5.6 3.6 4.3 6.8C19.5 16.4 12 21 12 21z"
            fill={ROJO}
          />
        </svg>
        <div style={{ color: ROJO, fontWeight: 900, fontSize: S(26) }}>
          +{cuenta}K
        </div>
      </div>
    </div>
  );
};

// ---------- Muestra de las 3 opciones, cada una entra grande y queda pequeña ----------
const Opcion: React.FC<{
  n: number;
  titulo: string;
  children: (escala: number) => React.ReactNode;
}> = ({ n, titulo, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const viaje = spring({
    frame,
    fps,
    delay: 55,
    durationInFrames: 18,
    config: { damping: 200 },
  });
  const escala = interpolate(viaje, [0, 1], [1, 0.5]);
  const x = interpolate(viaje, [0, 1], [540, 40]);
  const y = interpolate(viaje, [0, 1], [820, 95]);
  const oscuro = interpolate(viaje, [0, 1], [0.55, 0]);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: `rgba(0,0,0,${oscuro})` }} />
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          transform: `translateX(${-50 * (1 - viaje)}%)`,
          transformOrigin: "left top",
        }}
      >
        {children(escala)}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 120,
          width: "100%",
          textAlign: "center",
          fontFamily,
          color: BLANCO,
          fontWeight: 900,
          fontSize: 54,
          textShadow: "0 3px 14px rgba(0,0,0,0.8)",
        }}
      >
        OPCIÓN {n} · {titulo}
      </div>
    </AbsoluteFill>
  );
};

export const PropuestasMasVirales: React.FC = () => {
  const { fps } = useVideoConfig();
  const d = 4 * fps;
  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
      <Video src={staticFile("d29/v1-cut.mp4")} objectFit="cover" muted />
      <Sequence durationInFrames={d} name="Opción 1">
        <Opcion n={1} titulo="Viral">
          {(e) => <LogoMasVirales escala={e} aparicion={0} />}
        </Opcion>
      </Sequence>
      <Sequence from={d} durationInFrames={d} name="Opción 2">
        <Opcion n={2} titulo="Glitch moderno">
          {(e) => <LogoGlitch escala={e} />}
        </Opcion>
      </Sequence>
      <Sequence from={2 * d} durationInFrames={d} name="Opción 3">
        <Opcion n={3} titulo="Notificación">
          {(e) => <LogoNotificacion escala={e} />}
        </Opcion>
      </Sequence>
    </AbsoluteFill>
  );
};

// Hoja de comparación: los 3 logos grandes sobre fondo oscuro
export const HojaLogos: React.FC = () => (
  <AbsoluteFill
    style={{
      background: "radial-gradient(circle at 50% 40%, #2A2A30 0%, #0E0E11 80%)",
      alignItems: "center",
      justifyContent: "space-evenly",
      fontFamily,
    }}
  >
    {[
      { n: 1, t: "Viral", el: <LogoMasVirales escala={0.95} aparicion={1} /> },
      { n: 2, t: "Glitch moderno", el: <LogoGlitch escala={0.85} /> },
      { n: 3, t: "Notificación", el: <LogoNotificacion escala={0.75} /> },
    ].map((o) => (
      <div
        key={o.n}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 26,
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            fontWeight: 800,
            fontSize: 34,
            letterSpacing: 4,
          }}
        >
          OPCIÓN {o.n} · {o.t.toUpperCase()}
        </div>
        {o.el}
      </div>
    ))}
  </AbsoluteFill>
);
