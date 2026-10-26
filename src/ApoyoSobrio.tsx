import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type ApoyoPlan = {
  desdeMs: number;
  hastaMs: number;
  src: string;
  // Para videos: segundo desde el que se toma la imagen
  desdeSeg?: number;
  // Proporción ancho/alto del medio (por defecto 3:4)
  proporcion?: number;
};

const W = 1080;
const H = 1920;

const esImagen = (src: string) => /\.(jpe?g|png|webp)$/i.test(src);

// Imagen o video de apoyo a pantalla completa, sin sonido, con fundido lento.
// Se ve completo (sin recortar) sobre una versión desenfocada de sí mismo.
// Las cajas se calculan a mano para que funcione con cualquier proporción.
const Medio: React.FC<{
  src: string;
  desdeSeg: number;
  proporcion: number;
}> = ({ src, desdeSeg, proporcion }) => {
  const { fps } = useVideoConfig();
  const caja = (w: number, h: number): React.CSSProperties => ({
    position: "absolute",
    width: w,
    height: h,
    left: (W - w) / 2,
    top: (H - h) / 2,
  });
  const contenido = esImagen(src) ? (
    <Img src={staticFile(src)} style={{ width: "100%", height: "100%" }} />
  ) : (
    <Video
      src={staticFile(src)}
      trimBefore={Math.round(desdeSeg * fps)}
      muted
      style={{ width: "100%", height: "100%" }}
    />
  );
  // "contain": cabe entero; "cover": llena toda la pantalla
  const contener =
    proporcion > W / H ? caja(W, W / proporcion) : caja(H * proporcion, H);
  const cubrir =
    proporcion > W / H ? caja(H * proporcion, H) : caja(W, W / proporcion);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <div style={{ ...cubrir, filter: "blur(30px) brightness(0.5)" }}>
        {contenido}
      </div>
      <div style={contener}>{contenido}</div>
    </AbsoluteFill>
  );
};

const Fundido: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const o = interpolate(
    frame,
    [0, 12, durationInFrames - 12, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

export const ApoyoSobrio: React.FC<{ apoyos: ApoyoPlan[] }> = ({ apoyos }) => {
  const { fps } = useVideoConfig();
  const f = (ms: number) => Math.round((ms / 1000) * fps);
  return (
    <AbsoluteFill>
      {apoyos.map((a) => (
        <Sequence
          key={a.desdeMs}
          from={f(a.desdeMs)}
          durationInFrames={f(a.hastaMs - a.desdeMs)}
          name={`Apoyo ${a.src}`}
        >
          <Fundido>
            <Medio
              src={a.src}
              desdeSeg={a.desdeSeg ?? 0}
              proporcion={a.proporcion ?? 3 / 4}
            />
          </Fundido>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
