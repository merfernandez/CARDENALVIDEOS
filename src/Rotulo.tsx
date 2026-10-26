import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BLANCO, fontFamily, ROJO } from "./brand";
import { InstagramIcon } from "./InstagramIcon";

// Identificación del orador, debajo de los subtítulos (dura lo que dure su Sequence)
export const Rotulo: React.FC<{
  nombre: string;
  cargo?: string;
  instagram: string;
  lado?: "izq" | "der" | "centro";
}> = ({ nombre, cargo, instagram, lado = "centro" }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const entrada = spring({ frame, fps, delay: 6, config: { damping: 200 } });
  const salida = spring({
    frame,
    fps,
    delay: durationInFrames - 12,
    durationInFrames: 12,
    config: { damping: 200 },
  });

  const alineacion =
    lado === "izq" ? "flex-start" : lado === "der" ? "flex-end" : "center";

  return (
    <AbsoluteFill
      style={{ fontFamily, alignItems: alineacion, padding: "0 60px" }}
    >
      <div
        style={{
          position: "absolute",
          top: 1400,
          display: "flex",
          alignItems: "stretch",
          borderRadius: 14,
          overflow: "hidden",
          backgroundColor: "rgba(12,12,14,0.78)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          opacity: entrada * (1 - salida),
          transform: `translateY(${(1 - entrada) * 30 + salida * 30}px)`,
        }}
      >
        <div style={{ width: 8, backgroundColor: ROJO }} />
        <div style={{ padding: "14px 28px 16px 24px" }}>
          <div
            style={{
              color: BLANCO,
              fontWeight: 800,
              fontSize: 42,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {nombre}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 4,
              color: "rgba(255,255,255,0.85)",
              fontWeight: 500,
              fontSize: 27,
              letterSpacing: 0.3,
            }}
          >
            {cargo ? (
              <>
                <span>{cargo}</span>
                <span style={{ color: ROJO, fontWeight: 800 }}>|</span>
              </>
            ) : null}
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: BLANCO,
                fontWeight: 600,
              }}
            >
              <InstagramIcon size={30} />@{instagram}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
