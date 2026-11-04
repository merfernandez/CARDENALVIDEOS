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

// Portada de álbum cuadrada que sale de su funda con el disco girando detrás.
// Va a un costado, arriba, para no tapar la cara del presentador.
export const PortadaAlbum: React.FC<{
  src: string;
  lado: "izq" | "der";
  etiqueta: string;
}> = ({ src, lado, etiqueta }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const entra = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const disco = spring({ frame, fps, delay: 10, config: { damping: 200 } });
  const sale = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const signo = lado === "izq" ? -1 : 1;
  const T = 330;
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 210,
          [lado === "izq" ? "left" : "right"]: 40,
          width: T + 120,
          height: T + 70,
          opacity: sale,
          transform: `translateX(${(1 - entra) * 520 * signo}px) rotate(${signo * -3}deg)`,
        }}
      >
        {/* Disco de vinilo que se asoma detrás de la portada */}
        <div
          style={{
            position: "absolute",
            top: 10,
            [lado === "izq" ? "left" : "right"]: disco * 110,
            width: T - 20,
            height: T - 20,
            borderRadius: "50%",
            background:
              "repeating-radial-gradient(circle, #111 0 3px, #1e1e1e 3px 6px)",
            boxShadow: "0 10px 24px rgba(0,0,0,0.5)",
            transform: `rotate(${frame * 4}deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              backgroundColor: BLANCO,
              border: `5px solid ${ROJO}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Img
              src={staticFile("cardenal-cabeza.png")}
              style={{ height: 70, marginLeft: 4 }}
            />
          </div>
        </div>
        <Img
          src={staticFile(src)}
          style={{
            position: "absolute",
            top: 0,
            [lado === "izq" ? "left" : "right"]: 0,
            width: T,
            height: T,
            borderRadius: 10,
            boxShadow: "0 18px 40px rgba(0,0,0,0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: T + 14,
            [lado === "izq" ? "left" : "right"]: 0,
            width: T,
            textAlign: "center",
            fontFamily,
            color: BLANCO,
            fontWeight: 800,
            fontSize: 26,
            letterSpacing: 3,
            textTransform: "uppercase",
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          {etiqueta}
        </div>
      </div>
    </AbsoluteFill>
  );
};
