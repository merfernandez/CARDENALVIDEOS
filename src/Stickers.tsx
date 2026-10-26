import {
  AbsoluteFill,
  Img,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BLANCO, fontFamily, NEGRO, ROJO } from "./brand";
import type { StickerPlan } from "./tipos";

const Tarjeta: React.FC<{ arriba: string; abajo: string }> = ({
  arriba,
  abajo,
}) => (
  <div
    style={{
      minWidth: 210,
      borderRadius: 26,
      overflow: "hidden",
      backgroundColor: BLANCO,
      fontFamily,
      textAlign: "center",
      border: `5px solid ${BLANCO}`,
    }}
  >
    <div
      style={{
        backgroundColor: ROJO,
        color: BLANCO,
        fontWeight: 900,
        fontSize: 40,
        letterSpacing: 4,
        padding: "6px 0",
      }}
    >
      {arriba}
    </div>
    <div
      style={{
        color: NEGRO,
        fontWeight: 900,
        fontSize: abajo.length > 5 ? 34 : abajo.length > 2 ? 64 : 104,
        lineHeight: "130px",
        padding: "0 16px",
      }}
    >
      {abajo}
    </div>
  </div>
);

const Sticker: React.FC<Omit<StickerPlan, "ms" | "duracionMs">> = ({
  src,
  lado,
  top = 600,
  tarjeta,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const entrada = spring({
    frame,
    fps,
    config: { damping: 9, stiffness: 160 },
  });
  const salida = spring({
    frame,
    fps,
    delay: durationInFrames - 6,
    durationInFrames: 6,
    config: { damping: 200 },
  });
  const giro = (lado === "der" ? 1 : -1) * (8 + Math.sin(frame / 5) * 4);

  const style: React.CSSProperties = {
    position: "absolute",
    top: top - frame * 0.8,
    [lado === "der" ? "right" : "left"]: 70,
    width: 210,
    transform: `scale(${entrada * (1 - salida)}) rotate(${giro}deg)`,
    filter:
      "drop-shadow(0 0 6px rgba(255,255,255,0.9)) drop-shadow(0 10px 18px rgba(0,0,0,0.45))",
  };

  if (tarjeta) {
    return (
      <div style={{ ...style, width: undefined }}>
        <Tarjeta arriba={tarjeta.arriba} abajo={tarjeta.abajo} />
      </div>
    );
  }
  return <Img src={staticFile(`stickers/${src}.svg`)} style={style} />;
};

export const Stickers: React.FC<{ stickers: StickerPlan[] }> = ({
  stickers,
}) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      {stickers.map((s) => (
        <Sequence
          key={s.ms}
          from={Math.round((s.ms / 1000) * fps)}
          durationInFrames={Math.round((s.duracionMs / 1000) * fps)}
          name={`Sticker ${s.src}`}
        >
          <Sticker src={s.src} lado={s.lado} top={s.top} tarjeta={s.tarjeta} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
