import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BLANCO, DORADO, fontFamily, NEGRO, ROJO } from "./brand";

// Tarjetas informativas sobrias para las noticias (parte de arriba, sin tapar la cara)

const useEntradaSalida = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const entrada = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 14,
  });
  const salida = spring({
    frame,
    fps,
    delay: durationInFrames - 10,
    durationInFrames: 10,
    config: { damping: 200 },
  });
  return { frame, fps, entrada, salida, v: entrada * (1 - salida) };
};

const Contenedor: React.FC<{ v: number; children: React.ReactNode }> = ({
  v,
  children,
}) => (
  <AbsoluteFill style={{ alignItems: "center", fontFamily }}>
    <div
      style={{
        position: "absolute",
        top: 200,
        opacity: v,
        transform: `translateY(${(1 - v) * -40}px)`,
      }}
    >
      {children}
    </div>
  </AbsoluteFill>
);

// Nombres de los artistas, uno tras otro con una "×" en el medio
export const TarjetaArtistas: React.FC<{
  artistas: { nombre: string; ms: number }[];
  desdeMs: number;
}> = ({ artistas, desdeMs }) => {
  const { frame, fps, v } = useEntradaSalida();
  return (
    <Contenedor v={v}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {artistas.map((a, i) => {
          const p = spring({
            frame,
            fps,
            delay: Math.round(((a.ms - desdeMs) / 1000) * fps),
            config: { damping: 14 },
          });
          return (
            <div
              key={a.nombre}
              style={{ display: "flex", alignItems: "center", gap: 18 }}
            >
              {i > 0 ? (
                <span
                  style={{
                    color: DORADO,
                    fontWeight: 900,
                    fontSize: 44,
                    opacity: p,
                    textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                  }}
                >
                  ×
                </span>
              ) : null}
              <div
                style={{
                  backgroundColor: NEGRO,
                  color: BLANCO,
                  borderBottom: `5px solid ${DORADO}`,
                  borderRadius: 12,
                  padding: "14px 24px 12px",
                  textAlign: "center",
                  opacity: p,
                  transform: `scale(${0.7 + p * 0.3})`,
                  boxShadow: "0 10px 24px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    letterSpacing: 4,
                    color: DORADO,
                    fontWeight: 700,
                  }}
                >
                  ARTISTA
                </div>
                <div
                  style={{
                    fontSize: 38,
                    fontWeight: 800,
                    textTransform: "uppercase",
                  }}
                >
                  {a.nombre}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Contenedor>
  );
};

// Disco girando + barras de ecualizador con el nombre de la canción
export const TarjetaCancion: React.FC<{
  etiqueta: string;
  titulo: string;
  detalle: string;
}> = ({ etiqueta, titulo, detalle }) => {
  const { frame, v } = useEntradaSalida();
  return (
    <Contenedor v={v}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          backgroundColor: "rgba(12,12,14,0.88)",
          borderRadius: 20,
          padding: "20px 34px 20px 20px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
        }}
      >
        <svg width={120} height={120} viewBox="-50 -50 100 100">
          <g transform={`rotate(${frame * 6})`}>
            <circle r="48" fill="#111" />
            {[40, 34, 28].map((r) => (
              <circle
                key={r}
                r={r}
                fill="none"
                stroke="#2a2a2a"
                strokeWidth="1.5"
              />
            ))}
            <circle r="17" fill={ROJO} />
            <rect
              x="-2"
              y="-17"
              width="4"
              height="10"
              fill={BLANCO}
              opacity="0.8"
            />
            <circle r="3" fill="#111" />
          </g>
        </svg>
        <div>
          <div
            style={{
              color: ROJO,
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {etiqueta}
          </div>
          <div
            style={{
              color: BLANCO,
              fontSize: 52,
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            «{titulo}»
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 14,
              marginTop: 4,
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: 24,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {detalle}
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 4,
                height: 26,
              }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 6,
                    borderRadius: 3,
                    backgroundColor: ROJO,
                    height: interpolate(
                      Math.sin(frame / 3 + i * 1.7),
                      [-1, 1],
                      [6, 26],
                    ),
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Contenedor>
  );
};

// "Disponible en plataformas digitales" con botón de reproducir que late
export const TarjetaPlataformas: React.FC<{
  texto: string;
  titulo: string;
}> = ({ texto, titulo }) => {
  const { frame, v } = useEntradaSalida();
  const latido = 1 + Math.max(0, Math.sin(frame / 5)) * 0.08;
  return (
    <Contenedor v={v}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          backgroundColor: BLANCO,
          borderRadius: 999,
          padding: "14px 34px 14px 14px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 999,
            backgroundColor: ROJO,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${latido})`,
          }}
        >
          <svg width={34} height={34} viewBox="0 0 24 24">
            <path d="M7 4l13 8-13 8z" fill={BLANCO} />
          </svg>
        </div>
        <div>
          <div style={{ color: NEGRO, fontSize: 36, fontWeight: 900 }}>
            «{titulo}»
          </div>
          <div
            style={{
              color: "#555",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {texto}
          </div>
        </div>
      </div>
    </Contenedor>
  );
};
