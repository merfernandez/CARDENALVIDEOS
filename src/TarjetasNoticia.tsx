import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BLANCO, DORADO, fontFamily, NEGRO, ROJO } from "./brand";

// Tarjetas informativas sobrias para las noticias (parte de arriba, sin tapar la cara)

// Altura de las tarjetas de arriba: lo más arriba posible para no caer nunca
// sobre la cabeza o la cara de nadie (debajo de la barra superior de Reels/TikTok)
export const ALTURA_TARJETAS = 95;

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
        top: ALTURA_TARJETAS,
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
  color?: string;
}> = ({ etiqueta, titulo, detalle, color = ROJO }) => {
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
            <circle r="17" fill={color} />
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
              color,
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
                    backgroundColor: color,
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

// Nombre del artista con efecto de resaltador: la franja de color se pinta y
// luego aparecen las letras encima.
export const TarjetaMarcador: React.FC<{
  nombre: string;
  etiqueta: string;
  color: string;
}> = ({ nombre, etiqueta, color }) => {
  const { frame, fps, v } = useEntradaSalida();
  const trazo = spring({
    frame,
    fps,
    delay: 2,
    durationInFrames: 12,
    config: { damping: 200 },
  });
  return (
    <Contenedor v={v}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: BLANCO,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 6,
            textTransform: "uppercase",
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            marginBottom: 8,
          }}
        >
          {etiqueta}
        </div>
        <div style={{ position: "relative", padding: "6px 30px" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: color,
              borderRadius: "10px 30px 10px 30px",
              transform: "rotate(-2deg) skewX(-8deg)",
              clipPath: `inset(0 ${(1 - trazo) * 100}% 0 0)`,
              boxShadow: "0 12px 26px rgba(0,0,0,0.35)",
            }}
          />
          <div style={{ position: "relative", display: "flex" }}>
            {nombre.split("").map((ch, i) => {
              const p = spring({
                frame,
                fps,
                delay: 8 + i * 0.9,
                config: { damping: 12, stiffness: 200 },
              });
              return (
                <span
                  key={i}
                  style={{
                    whiteSpace: "pre",
                    color: NEGRO,
                    fontSize: 64,
                    fontWeight: 900,
                    textTransform: "uppercase",
                    opacity: p,
                    display: "inline-block",
                    transform: `translateY(${(1 - p) * 20}px) scale(${0.6 + p * 0.4})`,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Contenedor>
  );
};

// Tarjeta sobria para noticias serias: aparece con un fundido lento
const useFundidoLento = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return interpolate(
    frame,
    [0, 15, durationInFrames - 12, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
};

export const TarjetaSobria: React.FC<{
  antetitulo: string;
  titulo: string;
}> = ({ antetitulo, titulo }) => {
  const v = useFundidoLento();
  return (
    <AbsoluteFill style={{ alignItems: "center", fontFamily }}>
      <div
        style={{
          position: "absolute",
          top: ALTURA_TARJETAS,
          opacity: v,
          backgroundColor: "rgba(12,12,14,0.85)",
          borderLeft: `6px solid ${ROJO}`,
          borderRadius: 8,
          padding: "16px 30px",
          textAlign: "left",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 5,
            textTransform: "uppercase",
          }}
        >
          {antetitulo}
        </div>
        <div
          style={{ color: BLANCO, fontSize: 44, fontWeight: 800, marginTop: 4 }}
        >
          {titulo}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// En memoria de las personas fallecidas
export const TarjetaMemoria: React.FC<{
  titulo: string;
  personas: { nombre: string; rol: string }[];
}> = ({ titulo, personas }) => {
  const v = useFundidoLento();
  return (
    <AbsoluteFill style={{ alignItems: "center", fontFamily }}>
      <div
        style={{
          position: "absolute",
          top: ALTURA_TARJETAS,
          opacity: v,
          backgroundColor: "rgba(10,10,12,0.88)",
          borderRadius: 10,
          padding: "22px 44px 26px",
          textAlign: "center",
          minWidth: 620,
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          {titulo}
        </div>
        <div
          style={{
            width: 80,
            height: 2,
            backgroundColor: "rgba(255,255,255,0.5)",
            margin: "14px auto 16px",
          }}
        />
        {personas.map((p) => (
          <div key={p.nombre} style={{ marginTop: 8 }}>
            <div style={{ color: BLANCO, fontSize: 40, fontWeight: 700 }}>
              {p.nombre}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              {p.rol}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Cifras del boletín médico en columnas (sobrio)
export const TarjetaCifras: React.FC<{
  antetitulo: string;
  cifras: { numero: string; texto: string }[];
  top?: number;
}> = ({ antetitulo, cifras, top = ALTURA_TARJETAS }) => {
  const v = useFundidoLento();
  return (
    <AbsoluteFill style={{ alignItems: "center", fontFamily }}>
      <div
        style={{
          position: "absolute",
          top,
          opacity: v,
          backgroundColor: "rgba(12,12,14,0.88)",
          borderTop: `5px solid ${ROJO}`,
          borderRadius: 10,
          padding: "18px 34px 22px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 5,
            textTransform: "uppercase",
          }}
        >
          {antetitulo}
        </div>
        <div style={{ display: "flex", gap: 40, marginTop: 12 }}>
          {cifras.map((c) => (
            <div key={c.texto}>
              <div
                style={{
                  color: BLANCO,
                  fontSize: 72,
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                {c.numero}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 22,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  marginTop: 6,
                }}
              >
                {c.texto}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Íconos de redes sociales que entran uno por uno (abajo, bajo los subtítulos)
export const TarjetaRedes: React.FC<{ texto: string; redes: string[] }> = ({
  texto,
  redes,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const salida = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  return (
    <AbsoluteFill style={{ alignItems: "center", fontFamily }}>
      <div
        style={{
          position: "absolute",
          top: 1420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          opacity: salida,
        }}
      >
        <div style={{ display: "flex", gap: 22 }}>
          {redes.map((r, i) => {
            const p = spring({
              frame,
              fps,
              delay: i * 4,
              config: { damping: 12 },
            });
            return (
              <div
                key={r}
                style={{
                  width: 92,
                  height: 92,
                  borderRadius: 24,
                  backgroundColor: ROJO,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
                  transform: `scale(${p}) translateY(${(1 - p) * 30}px)`,
                }}
              >
                <img
                  src={staticFile(`hoy/${r}.svg`)}
                  style={{ width: 50, height: 50 }}
                />
              </div>
            );
          })}
        </div>
        <div
          style={{
            color: BLANCO,
            fontWeight: 800,
            fontSize: 28,
            letterSpacing: 3,
            textTransform: "uppercase",
            textShadow: "0 2px 10px rgba(0,0,0,0.7)",
          }}
        >
          {texto}
        </div>
      </div>
    </AbsoluteFill>
  );
};
