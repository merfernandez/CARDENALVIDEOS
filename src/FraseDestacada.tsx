import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BLANCO, fontFamily, NEGRO, ROJO } from "./brand";
import type { Destacado } from "./tipos";

const ANCHO_MAX = 980;

// Tamaño de letra que hace caber la palabra en el ancho del video
const ajustar = (texto: string, base: number, factor: number) =>
  Math.min(base, ANCHO_MAX / (texto.length * factor));

// Palabra enorme: las letras caen una por una con rebote
const Enorme: React.FC<{ texto: string; delay: number }> = ({
  texto,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const size = ajustar(texto, 210, 0.74);
  const pulso = 1 + Math.sin((frame - delay) / 5) * 0.025;

  return (
    <div
      style={{
        display: "flex",
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: -2,
        transform: `rotate(-4deg) scale(${pulso})`,
      }}
    >
      {texto.split("").map((ch, i) => {
        const p = spring({
          frame,
          fps,
          delay: delay + i * 1.5,
          config: { damping: 9, stiffness: 200 },
        });
        const giro = ((i * 37) % 21) - 10;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              color: BLANCO,
              WebkitTextStroke: `${Math.round(size * 0.08)}px ${ROJO}`,
              paintOrder: "stroke fill",
              textShadow: `${size * 0.05}px ${size * 0.06}px 0 ${NEGRO}`,
              opacity: frame >= delay + i * 1.5 ? 1 : 0,
              transform: `translateY(${(1 - p) * -120}px) scale(${p}) rotate(${(1 - p) * giro * 3}deg)`,
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
};

// Frase clave (fecha, hora, lugar, marca) en letra gigante; cada línea entra cuando se dice
export const FraseDestacada: React.FC<{ destacado: Destacado }> = ({
  destacado,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const salida = spring({
    frame,
    fps,
    delay: durationInFrames - 6,
    durationInFrames: 6,
    config: { damping: 200 },
  });
  // Pequeño temblor al entrar cada línea
  const temblor = destacado.lineas.reduce((acc, l) => {
    const d = Math.round(((l.ms - destacado.desdeMs) / 1000) * fps);
    const t = frame - d;
    return acc + (t >= 0 && t < 6 ? Math.sin(t * 3) * (6 - t) * 1.5 : 0);
  }, 0);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        fontFamily,
        textTransform: "uppercase",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 990,
          width: 1080,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          opacity: 1 - salida,
          transform: `translateX(${temblor}px) scale(${1 - salida * 0.25})`,
        }}
      >
        {destacado.lineas.map((linea, i) => {
          const delay = Math.round(
            ((linea.ms - destacado.desdeMs) / 1000) * fps,
          );
          const p = spring({
            frame,
            fps,
            delay,
            config: { damping: 10, stiffness: 170 },
          });
          const visible = frame >= delay;
          const vaiven = Math.sin((frame - delay) / 8) * 1.5;

          if (linea.estilo === "enorme") {
            return <Enorme key={i} texto={linea.texto} delay={delay} />;
          }
          if (linea.estilo === "bloque") {
            return (
              <div
                key={i}
                style={{
                  backgroundColor: ROJO,
                  color: BLANCO,
                  fontWeight: 900,
                  fontSize: ajustar(linea.texto, 100, 0.72),
                  lineHeight: 1,
                  padding: "16px 36px",
                  borderRadius: 18,
                  boxShadow: `8px 10px 0 ${NEGRO}`,
                  opacity: visible ? 1 : 0,
                  transform: `translateX(${(1 - p) * (i % 2 ? 600 : -600)}px) rotate(${2 + vaiven * 0.5}deg) scale(${0.6 + p * 0.4})`,
                }}
              >
                {linea.texto}
              </div>
            );
          }
          return (
            <div
              key={i}
              style={{
                backgroundColor: BLANCO,
                color: NEGRO,
                fontWeight: 800,
                fontSize: ajustar(linea.texto, 60, 0.75),
                letterSpacing: 4,
                lineHeight: 1,
                padding: "12px 28px",
                borderRadius: 12,
                boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
                opacity: visible ? p : 0,
                transform: `translateY(${(1 - p) * 40}px) scale(${0.6 + p * 0.4}) rotate(${-1 + vaiven * 0.4}deg)`,
              }}
            >
              {linea.texto}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
