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
};

// Foto de apoyo en una esquina de arriba, al lado de la cara del presentador
// (sin taparla). Entra deslizándose desde su lado y se va con un fundido.
export const FotoEsquina: React.FC<{ src: string; lado: "izq" | "der" }> = ({
  src,
  lado,
}) => {
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
          top: 170,
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
        <Img
          src={staticFile(src)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </AbsoluteFill>
  );
};
