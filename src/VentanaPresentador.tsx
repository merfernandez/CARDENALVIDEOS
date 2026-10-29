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
  apoyos: {
    src: string;
    hastaMs: number;
    desdeSeg?: number;
    // Dónde va la ventana del presentador mientras se ve este apoyo
    posicion?: "arriba" | "abajo";
  }[];
};

const W = 1080;
const H = 1920;
const MARGEN = 40;
// Tamaño y ubicación de la ventana del presentador
const POSICIONES = {
  arriba: { escala: 0.32, y: 150 },
  abajo: { escala: 0.22, y: H - 30 - H * 0.22 },
};

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

  // Posición de la ventana: cambia suavemente al pasar de un apoyo a otro
  let destino = { escala: POSICIONES.arriba.escala, y: POSICIONES.arriba.y };
  for (const t of tramos) {
    t.apoyos.forEach((a, i) => {
      const pos = POSICIONES[a.posicion ?? "arriba"];
      const desde = i === 0 ? t.desdeMs : t.apoyos[i - 1].hastaMs;
      const b =
        i === 0 && f(desde, fps) >= frame
          ? 1
          : spring({
              frame,
              fps,
              delay: f(desde, fps),
              durationInFrames: 16,
              config: { damping: 200 },
            });
      if (frame >= f(desde, fps) - 16 || i === 0) {
        destino = {
          escala:
            destino.escala + (pos.escala - destino.escala) * (i === 0 ? 1 : b),
          y: destino.y + (pos.y - destino.y) * (i === 0 ? 1 : b),
        };
      }
    });
  }
  const escala = interpolate(p, [0, 1], [1, destino.escala]);
  const x = interpolate(p, [0, 1], [0, W - MARGEN - W * destino.escala]);
  const y = interpolate(p, [0, 1], [0, destino.y]);

  return (
    <AbsoluteFill>
      {tramos.map((t) =>
        t.apoyos.map((a, i) => {
          const desde = i === 0 ? t.desdeMs : t.apoyos[i - 1].hastaMs;
          return (
            <Sequence
              key={`${t.desdeMs}-${i}`}
              from={f(desde, fps)}
              // El apoyo que sale se queda unos cuadros más mientras entra el siguiente
              durationInFrames={
                f(a.hastaMs - desde, fps) + (i < t.apoyos.length - 1 ? 10 : 0)
              }
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
    <AbsoluteFill
      style={{ opacity: o, backgroundColor: primero ? "#000" : undefined }}
    >
      <Video
        src={staticFile(src)}
        trimBefore={Math.round(desdeSeg * fps)}
        muted
        objectFit="cover"
      />
    </AbsoluteFill>
  );
};
