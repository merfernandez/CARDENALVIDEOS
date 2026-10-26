import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BLANCO, fontFamily, ROJO } from "./brand";
import { InstagramIcon } from "./InstagramIcon";

// Rótulo tipo noticiero: una línea roja se dibuja, de ella se despliega la
// franja con el nombre y al final se recoge de nuevo en la línea.
export const RotuloNoticia: React.FC<{
  seccion: string;
  nombre: string;
  cargo: string;
  instagram: string;
}> = ({ seccion, nombre, cargo, instagram }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const suave = { damping: 200 };

  const linea = spring({ frame, fps, durationInFrames: 10, config: suave });
  const panel = spring({
    frame,
    fps,
    delay: 8,
    durationInFrames: 14,
    config: suave,
  });
  const texto = spring({
    frame,
    fps,
    delay: 14,
    durationInFrames: 12,
    config: suave,
  });
  const etiqueta = spring({ frame, fps, delay: 20, config: { damping: 14 } });

  const fin = durationInFrames;
  const cierrePanel = spring({
    frame,
    fps,
    delay: fin - 22,
    durationInFrames: 12,
    config: suave,
  });
  const cierreLinea = spring({
    frame,
    fps,
    delay: fin - 10,
    durationInFrames: 10,
    config: suave,
  });

  const abierto = panel * (1 - cierrePanel);
  const alto = interpolate(linea * (1 - cierreLinea), [0, 1], [0, 128]);

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <div style={{ position: "absolute", left: 60, top: 1420 }}>
        <div
          style={{
            position: "absolute",
            left: 18,
            top: -36,
            backgroundColor: ROJO,
            color: BLANCO,
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
            padding: "6px 14px",
            borderRadius: "6px 6px 6px 0",
            transform: `scaleY(${etiqueta * (1 - cierrePanel)})`,
            transformOrigin: "bottom",
          }}
        >
          {seccion}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 8,
              height: alto,
              backgroundColor: ROJO,
              borderRadius: 4,
            }}
          />
          <div
            style={{
              height: 128,
              marginLeft: 10,
              backgroundColor: "rgba(12,12,14,0.86)",
              borderRadius: 10,
              padding: "0 30px 0 26px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              clipPath: `inset(0 ${(1 - abierto) * 100}% 0 0)`,
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                color: BLANCO,
                fontWeight: 800,
                fontSize: 38,
                letterSpacing: 3,
                textTransform: "uppercase",
                opacity: texto,
                transform: `translateX(${(1 - texto) * -30}px)`,
              }}
            >
              {nombre}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 6,
                color: "rgba(255,255,255,0.85)",
                fontWeight: 500,
                fontSize: 25,
                opacity: texto,
                transform: `translateX(${(1 - texto) * -20}px)`,
              }}
            >
              <span>{cargo}</span>
              <span style={{ color: ROJO, fontWeight: 800 }}>|</span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: BLANCO,
                  fontWeight: 600,
                }}
              >
                <InstagramIcon size={28} />@{instagram}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
