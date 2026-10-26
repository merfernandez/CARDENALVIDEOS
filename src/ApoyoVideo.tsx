import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Video de apoyo SIN sonido: el audio principal siempre es el del presentador.
// "tarjeta": recuadro con borde que entra deslizándose sobre el video principal.
// "completa": ocupa toda la pantalla con un fundido corto.
export const ApoyoVideo: React.FC<{
  src: string;
  desdeSeg: number;
  estilo: "tarjeta" | "completa";
  lado?: "izq" | "der";
  colorBorde?: string;
}> = ({ src, desdeSeg, estilo, lado = "der", colorBorde = "#FFFFFF" }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const entrada = spring({
    frame,
    fps,
    durationInFrames: 12,
    config: { damping: 200 },
  });
  const salida = spring({
    frame,
    fps,
    delay: durationInFrames - 10,
    durationInFrames: 10,
    config: { damping: 200 },
  });
  const video = (
    <Video
      src={staticFile(src)}
      trimBefore={Math.round(desdeSeg * fps)}
      muted
      objectFit="cover"
    />
  );

  if (estilo === "completa") {
    const o = interpolate(
      frame,
      [0, 6, durationInFrames - 6, durationInFrames],
      [0, 1, 1, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );
    return <AbsoluteFill style={{ opacity: o }}>{video}</AbsoluteFill>;
  }

  const signo = lado === "der" ? 1 : -1;
  const x = (1 - entrada) * 1100 * signo - salida * 1100 * signo;
  return (
    <AbsoluteFill style={{ alignItems: "center" }}>
      <div
        style={{
          position: "absolute",
          top: 170,
          width: 900,
          height: 1180,
          borderRadius: 34,
          overflow: "hidden",
          border: `8px solid ${colorBorde}`,
          boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
          transform: `translateX(${x}px) rotate(${signo * -1.5}deg)`,
        }}
      >
        {video}
      </div>
    </AbsoluteFill>
  );
};
