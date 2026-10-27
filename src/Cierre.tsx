import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BLANCO, fontFamily, NEGRO, ROJO, CREDITO_EDICION } from "./brand";

const Pin: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
      fill={ROJO}
    />
  </svg>
);

// Cierre: logo + fecha, hora y lugar del evento
export const Cierre: React.FC<{
  fecha: string;
  hora: string;
  lugar: string;
}> = ({ fecha, hora, lugar }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fondo = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const pop = (delay: number) =>
    spring({ frame, fps, delay, config: { damping: 11, stiffness: 160 } });
  const logo = pop(2);
  const f = pop(12);
  const h = pop(22);
  const l = pop(34);
  const latido = 1 + Math.max(0, Math.sin((frame - 50) / 6)) * 0.03;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
        textTransform: "uppercase",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 40%, #FFFFFF 0%, #FFFFFF 45%, #F7C9CC 100%)",
          opacity: fondo,
        }}
      />
      <Img
        src={staticFile("logo-cardenal-917.png")}
        style={{
          width: 560,
          transform: `scale(${logo})`,
          filter: "drop-shadow(0 14px 24px rgba(0,0,0,0.25))",
        }}
      />
      <div
        style={{
          marginTop: 60,
          backgroundColor: ROJO,
          color: BLANCO,
          fontWeight: 900,
          fontSize: 96,
          lineHeight: 1,
          padding: "22px 44px",
          borderRadius: 24,
          transform: `scale(${f}) rotate(-3deg)`,
          boxShadow: "0 14px 30px rgba(227,6,19,0.35)",
        }}
      >
        {fecha}
      </div>
      <div
        style={{
          marginTop: 24,
          backgroundColor: NEGRO,
          color: BLANCO,
          fontWeight: 900,
          fontSize: 84,
          lineHeight: 1,
          padding: "18px 40px",
          borderRadius: 24,
          transform: `scale(${h}) rotate(2deg)`,
          boxShadow: "0 14px 30px rgba(0,0,0,0.3)",
        }}
      >
        {hora}
      </div>
      <div
        style={{
          marginTop: 56,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${l * latido})`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: NEGRO,
            fontWeight: 700,
            fontSize: 40,
            letterSpacing: 6,
          }}
        >
          <Pin size={44} />
          Centro Comercial
        </div>
        <div
          style={{
            color: ROJO,
            fontWeight: 900,
            fontSize: 132,
            lineHeight: 1.05,
            letterSpacing: 2,
            WebkitTextStroke: `4px ${NEGRO}`,
            paintOrder: "stroke fill",
          }}
        >
          {lugar}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 120,
          width: "100%",
          textAlign: "center",
          color: "rgba(255,255,255,0.75)",
          fontWeight: 600,
          fontSize: 24,
          letterSpacing: 3,
          textTransform: "uppercase",
          textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          opacity: Math.min(1, Math.max(0, (frame - 40) / 15)),
        }}
      >
        {CREDITO_EDICION}
      </div>
    </AbsoluteFill>
  );
};
