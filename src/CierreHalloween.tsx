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

const Pin: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
      fill={ROJO}
    />
  </svg>
);

const Decoracion: React.FC<{
  src: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  vuelo?: boolean;
}> = ({ src, x, y, size, delay, vuelo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, delay, config: { damping: 12 } });
  const t = frame - delay;
  const dx = vuelo ? Math.sin(t / 9) * 30 : 0;
  const dy = vuelo ? Math.cos(t / 7) * 18 : Math.sin(t / 10) * 8;
  return (
    <Img
      src={staticFile(`stickers/${src}.svg`)}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        transform: `translate(${dx}px, ${dy}px) scale(${p}) rotate(${Math.sin(t / 12) * 6}deg)`,
        filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
      }}
    />
  );
};

// Cierre de noche de Halloween con logo, fecha, hora y lugar
export const CierreHalloween: React.FC<{
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
  const logo = pop(4);
  const f = pop(16);
  const h = pop(26);
  const l = pop(38);
  const latido = 1 + Math.max(0, Math.sin((frame - 60) / 6)) * 0.03;

  return (
    <AbsoluteFill style={{ fontFamily, textTransform: "uppercase" }}>
      <AbsoluteFill
        style={{
          opacity: fondo,
          background:
            "radial-gradient(circle at 50% 42%, #7A0A12 0%, #3A0710 40%, #12060A 100%)",
        }}
      />
      <AbsoluteFill style={{ opacity: fondo }}>
        <Img
          src={staticFile("stickers/telarana.svg")}
          style={{
            position: "absolute",
            left: -40,
            top: -30,
            width: 330,
            opacity: 0.5,
          }}
        />
        <Img
          src={staticFile("stickers/telarana.svg")}
          style={{
            position: "absolute",
            right: -40,
            top: -30,
            width: 330,
            opacity: 0.5,
            transform: "scaleX(-1)",
          }}
        />
      </AbsoluteFill>
      <Decoracion src="murcielago" x={110} y={230} size={150} delay={8} vuelo />
      <Decoracion
        src="murcielago"
        x={820}
        y={330}
        size={120}
        delay={14}
        vuelo
      />
      <Decoracion src="fantasma" x={830} y={1360} size={170} delay={44} />
      <Decoracion src="calabaza" x={60} y={1560} size={230} delay={40} />
      <Decoracion src="calabaza" x={800} y={1590} size={190} delay={48} />
      <Decoracion src="dulces" x={330} y={1660} size={120} delay={52} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <Img
          src={staticFile("logo-cardenal-sticker.png")}
          style={{
            width: 560,
            marginTop: -200,
            transform: `scale(${logo}) rotate(${(1 - logo) * -12}deg)`,
            filter: "drop-shadow(0 16px 34px rgba(0,0,0,0.6))",
          }}
        />
        <div
          style={{
            marginTop: 50,
            backgroundColor: ROJO,
            color: BLANCO,
            fontWeight: 900,
            fontSize: 96,
            lineHeight: 1,
            padding: "22px 44px",
            borderRadius: 24,
            transform: `scale(${f}) rotate(-3deg)`,
            boxShadow: "0 14px 34px rgba(227,6,19,0.45)",
          }}
        >
          {fecha}
        </div>
        <div
          style={{
            marginTop: 24,
            backgroundColor: BLANCO,
            color: NEGRO,
            fontWeight: 900,
            fontSize: 84,
            lineHeight: 1,
            padding: "18px 40px",
            borderRadius: 24,
            transform: `scale(${h}) rotate(2deg)`,
            boxShadow: "0 14px 34px rgba(0,0,0,0.4)",
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
              color: BLANCO,
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
              color: BLANCO,
              fontWeight: 900,
              fontSize: 132,
              lineHeight: 1.05,
              letterSpacing: 2,
              WebkitTextStroke: `10px ${ROJO}`,
              paintOrder: "stroke fill",
              textShadow: "0 0 40px rgba(227,6,19,0.6)",
            }}
          >
            {lugar}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
