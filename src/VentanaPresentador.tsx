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

export type VentanaPlan = {
  desdeMs: number;
  hastaMs: number;
  // Apoyos que se muestran a pantalla completa, uno tras otro, mientras dura el tramo
  apoyos: { src: string; hastaMs: number; desdeSeg?: number }[];
};

const W = 1080;
const ESCALA = 0.32; // tamaño de la ventana del presentador
const MARGEN = 40;
const ARRIBA = 150;

const f = (ms: number, fps: number) => Math.round((ms / 1000) * fps);

// El video del presentador se reduce (sin recortarlo) a una ventana arriba a la
// derecha y el apoyo ocupa toda la pantalla detrás. Luego vuelve a pantalla completa.
export const VideoConVentana: React.FC<{
  src: string;
  tramos: VentanaPlan[];
}> = ({ src, tramos }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = tramos.reduce((max, t) => {
    const entrada = spring({
      frame,
      fps,
      delay: f(t.desdeMs, fps),
      durationInFrames: 16,
      config: { damping: 200 },
    });
    const salida = spring({
      frame,
      fps,
      delay: f(t.hastaMs, fps) - 16,
      durationInFrames: 16,
      config: { damping: 200 },
    });
    return Math.max(max, entrada * (1 - salida));
  }, 0);

  const escala = interpolate(p, [0, 1], [1, ESCALA]);
  const x = interpolate(p, [0, 1], [0, W - MARGEN - W * ESCALA]);
  const y = interpolate(p, [0, 1], [0, ARRIBA]);

  return (
    <AbsoluteFill>
      {tramos.map((t) =>
        t.apoyos.map((a, i) => {
          const desde = i === 0 ? t.desdeMs : t.apoyos[i - 1].hastaMs;
          return (
            <Sequence
              key={`${t.desdeMs}-${i}`}
              from={f(desde, fps)}
              durationInFrames={f(a.hastaMs - desde, fps)}
              name={`Apoyo ${a.src}`}
            >
              <ApoyoFondo
                src={a.src}
                desdeSeg={a.desdeSeg ?? 0}
                primero={i === 0}
              />
            </Sequence>
          );
        }),
      )}
      <AbsoluteFill
        style={{
          transformOrigin: "0 0",
          transform: `translate(${x}px, ${y}px) scale(${escala})`,
          borderRadius: p > 0.01 ? 60 : 0,
          overflow: "hidden",
          boxShadow:
            p > 0.01 ? `0 30px 80px rgba(0,0,0,${0.6 * p})` : undefined,
          outline: p > 0.01 ? `${Math.round(18 * p)}px solid #fff` : undefined,
        }}
      >
        <Video src={staticFile(src)} objectFit="cover" />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const ApoyoFondo: React.FC<{
  src: string;
  desdeSeg: number;
  primero: boolean;
}> = ({ src, desdeSeg, primero }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const o = primero
    ? 1
    : interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: o, backgroundColor: "#000" }}>
      <Video
        src={staticFile(src)}
        trimBefore={Math.round(desdeSeg * fps)}
        muted
        objectFit="cover"
      />
    </AbsoluteFill>
  );
};
