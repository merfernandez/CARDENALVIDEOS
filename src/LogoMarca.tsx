import {
  AbsoluteFill,
  Img,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Logo fijo y discreto arriba a la derecha durante todo el video
export const LogoMarca: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const entrada = spring({ frame, fps, config: { damping: 200 } });
  const salida = spring({
    frame,
    fps,
    delay: durationInFrames - 10,
    durationInFrames: 10,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill>
      <Img
        src={staticFile("logo-cardenal-917.png")}
        style={{
          position: "absolute",
          top: 150,
          right: 50,
          width: 200,
          opacity: entrada * (1 - salida),
          filter:
            "drop-shadow(0 0 2px rgba(255,255,255,0.9)) drop-shadow(0 6px 16px rgba(0,0,0,0.6))",
        }}
      />
    </AbsoluteFill>
  );
};
