import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BLANCO, fontFamily, ROJO } from "./brand";

// Cierre sobrio de las noticias: logo y nombre de la sección
export const CierreNoticias: React.FC<{ seccion: string; lema: string }> = ({
  seccion,
  lema,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fondo = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logo = spring({ frame, fps, delay: 4, config: { damping: 200 } });
  const linea = spring({
    frame,
    fps,
    delay: 12,
    durationInFrames: 14,
    config: { damping: 200 },
  });
  const texto = spring({ frame, fps, delay: 18, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <AbsoluteFill
        style={{
          opacity: fondo,
          background:
            "radial-gradient(circle at 50% 45%, #2A2A30 0%, #0E0E11 75%)",
        }}
      />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <Img
          src={staticFile("logo-cardenal-sticker.png")}
          style={{
            width: 520,
            opacity: logo,
            transform: `translateY(${(1 - logo) * 30}px) scale(${0.9 + logo * 0.1})`,
          }}
        />
        <div
          style={{
            marginTop: 40,
            width: 520 * linea,
            height: 5,
            backgroundColor: ROJO,
            borderRadius: 3,
          }}
        />
        <div
          style={{
            marginTop: 24,
            color: BLANCO,
            fontWeight: 800,
            fontSize: 48,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: texto,
            transform: `translateY(${(1 - texto) * 20}px)`,
          }}
        >
          {seccion}
        </div>
        <div
          style={{
            marginTop: 10,
            color: "rgba(255,255,255,0.6)",
            fontWeight: 600,
            fontSize: 26,
            letterSpacing: 3,
            textTransform: "uppercase",
            opacity: texto,
          }}
        >
          {lema}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
