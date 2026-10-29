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

export type FotoPlan = {
  desdeMs: number;
  hastaMs: number;
  src: string;
  lado: "izq" | "der";
  // Para videos: segundo desde el que se toma la imagen
  desdeSeg?: number;
  // "arriba": muestra la parte de arriba del clip y recorta la de abajo
  // (donde suelen ir las etiquetas de Instagram)
  encuadre?: "centro" | "arriba";
};

// Foto de apoyo en una esquina de arriba, al lado de la cara del presentador
// (sin taparla). Entra deslizándose desde su lado y se va con un fundido.
export const FotoEsquina: React.FC<{
  src: string;
  lado: "izq" | "der";
  desdeSeg?: number;
  encuadre?: "centro" | "arriba";
}> = ({ src, lado, desdeSeg = 0, encuadre = "centro" }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const entrada = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const salida = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const signo = lado === "izq" ? -1 : 1;
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 215,
          [lado === "izq" ? "left" : "right"]: 40,
          width: 380,
          height: 475,
          borderRadius: 18,
          overflow: "hidden",
          border: "8px solid #fff",
          boxShadow: "0 20px 44px rgba(0,0,0,0.45)",
          opacity: 1 - salida,
          transform: `translateX(${(1 - entrada) * 460 * signo}px) rotate(${signo * (3 - entrada * 1)}deg) scale(${1 - salida * 0.1})`,
        }}
      >
        {/\.(mp4|mov|webm)$/i.test(src) ? (
          <div
            style={
              encuadre === "arriba"
                ? {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: (380 * 16) / 9,
                  }
                : { width: "100%", height: "100%" }
            }
          >
            <Video
              src={staticFile(src)}
              trimBefore={Math.round(desdeSeg * fps)}
              muted
              objectFit="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ) : (
          <Img
            src={staticFile(src)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: encuadre === "arriba" ? "top" : "center",
            }}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};
