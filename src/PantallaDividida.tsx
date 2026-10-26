import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type TramoDividido = {
  desdeMs: number;
  hastaMs: number;
  // Videos de apoyo uno tras otro dentro del tramo (sin sonido)
  clips: { src: string; desdeSeg: number; hastaMs: number }[];
};

const MITAD = 960;
// Cuánto sube el video del presentador para que su cara quede en la mitad de arriba
const SUBIR = 240;

const f = (ms: number, fps: number) => Math.round((ms / 1000) * fps);

// Progreso (0–1) de la pantalla dividida en el cuadro actual
export const useDivision = (tramos: TramoDividido[]) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return tramos.reduce((max, t) => {
    const entrada = spring({
      frame,
      fps,
      delay: f(t.desdeMs, fps),
      durationInFrames: 14,
      config: { damping: 200 },
    });
    const salida = spring({
      frame,
      fps,
      delay: f(t.hastaMs, fps) - 14,
      durationInFrames: 14,
      config: { damping: 200 },
    });
    return Math.max(max, entrada * (1 - salida));
  }, 0);
};

// Video del presentador: sube a la mitad de arriba cuando la pantalla se divide
export const VideoPresentador: React.FC<{
  src: string;
  division: number;
}> = ({ src, division }) => (
  <AbsoluteFill style={{ transform: `translateY(${-SUBIR * division}px)` }}>
    <Video src={staticFile(src)} objectFit="cover" />
  </AbsoluteFill>
);

// Mitad de abajo con los videos de apoyo, separada con una línea de color
export const MitadApoyo: React.FC<{
  tramos: TramoDividido[];
  division: number;
  colorLinea: string;
}> = ({ tramos, division, colorLinea }) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: MITAD,
          width: 1080,
          height: MITAD,
          overflow: "hidden",
          backgroundColor: "#000",
          transform: `translateY(${(1 - division) * MITAD}px)`,
        }}
      >
        {tramos.map((t) =>
          t.clips.map((c, i) => {
            const desde = i === 0 ? t.desdeMs : t.clips[i - 1].hastaMs;
            return (
              <Sequence
                key={`${t.desdeMs}-${i}`}
                from={f(desde, fps)}
                durationInFrames={f(c.hastaMs - desde, fps)}
                name={`Apoyo ${c.src}`}
              >
                <Clip src={c.src} desdeSeg={c.desdeSeg} primero={i === 0} />
              </Sequence>
            );
          }),
        )}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: MITAD - 3,
          height: 6,
          width: 1080 * division,
          backgroundColor: colorLinea,
          boxShadow: "0 0 12px rgba(0,0,0,0.4)",
        }}
      />
    </AbsoluteFill>
  );
};

const Clip: React.FC<{ src: string; desdeSeg: number; primero: boolean }> = ({
  src,
  desdeSeg,
  primero,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Fundido corto al cambiar de clip dentro del mismo tramo
  const o = primero
    ? 1
    : interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  const trim = Math.round(desdeSeg * fps);
  // El clip vertical se ve completo en el centro, con el mismo clip desenfocado de fondo
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <AbsoluteFill
        style={{
          filter: "blur(28px) brightness(0.55)",
          transform: "scale(1.15)",
        }}
      >
        <Video
          src={staticFile(src)}
          trimBefore={trim}
          muted
          objectFit="cover"
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center" }}>
        <div
          style={{
            width: 540,
            height: 960,
            boxShadow: "0 0 40px rgba(0,0,0,0.6)",
          }}
        >
          <Video
            src={staticFile(src)}
            trimBefore={trim}
            muted
            objectFit="cover"
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
