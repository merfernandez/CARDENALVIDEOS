import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Sequence,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BLANCO, CREDITO_EDICION, fontFamily, ROJO } from "./brand";

const LOGO = "logo-cardenal-sticker.png";

// Ondas de radio que salen del logo
const Ondas: React.FC<{ frame: number; inicio: number; ciclo: number }> = ({
  frame,
  inicio,
  ciclo,
}) => (
  <>
    {[0, 1, 2].map((i) => {
      const paso = ciclo / 3;
      const t = (((frame - inicio - i * paso) % ciclo) + ciclo) % ciclo;
      const p = t / ciclo;
      return frame < inicio + i * paso ? null : (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 560,
            height: 380,
            borderRadius: "50%",
            border: `4px solid ${ROJO}`,
            transform: `scale(${1 + p * 0.9})`,
            opacity: (1 - p) * 0.55,
          }}
        />
      );
    })}
  </>
);

// Cierre de noticias: el logo cae con rebote, lo cruza un brillo y emite ondas
// de radio; luego aparecen la sección y la página web.
export const CierreNoticias: React.FC<{
  seccion: string;
  invitacion: string;
  web: string;
  // Versión más rápida con sonido (whoosh al caer el logo y campanita al aterrizar)
  rapido?: boolean;
  // Noticias serias: sin rebote, brillo, ondas ni escritura animada
  sobrio?: boolean;
  // Crédito pequeño al final, p. ej. "Edición: Equipo Digital Sistema Cardenal"
  credito?: string;
}> = ({
  seccion,
  invitacion,
  web,
  rapido = false,
  sobrio = false,
  credito = CREDITO_EDICION,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = rapido ? 0.6 : 1;
  const d = (n: number) => Math.round(n * k);
  const fondo = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logo = spring({
    frame,
    fps,
    delay: 4,
    config: { damping: 9, stiffness: 120 },
  });
  const brillo = interpolate(frame, [d(22), d(40)], [-60, 160], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flotar =
    Math.sin((frame - 30) / 14) *
    6 *
    Math.min(1, Math.max(0, (frame - 30) / 10));
  const linea = spring({
    frame,
    fps,
    delay: 24,
    durationInFrames: 14,
    config: { damping: 200 },
  });
  const web1 = spring({ frame, fps, delay: 52, config: { damping: 200 } });
  const letrasWeb = sobrio
    ? web.length
    : Math.floor(
        interpolate(frame, [d(58), d(58) + web.length * k], [0, web.length], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      );

  return (
    <AbsoluteFill style={{ fontFamily }}>
      {rapido ? (
        <>
          <Sequence from={d(2)} name="Whoosh">
            <Audio src={staticFile("sfx/whoosh.wav")} volume={0.5} />
          </Sequence>
          <Sequence from={d(12)} name="Campanita">
            <Audio src={staticFile("sfx/ding.wav")} volume={0.45} />
          </Sequence>
        </>
      ) : null}
      <AbsoluteFill
        style={{
          opacity: fondo,
          background:
            "radial-gradient(circle at 50% 42%, #2E2A30 0%, #141216 55%, #0B0A0C 100%)",
        }}
      />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: -120,
          }}
        >
          {sobrio ? null : <Ondas frame={frame} inicio={d(26)} ciclo={d(42)} />}
          <div
            style={{
              position: "relative",
              width: 520,
              opacity: sobrio ? logo : 1,
              transform: sobrio
                ? `translateY(${(1 - logo) * 30}px)`
                : `translateY(${(1 - logo) * -500 + flotar}px) rotate(${(1 - logo) * -8}deg)`,
            }}
          >
            <Img
              src={staticFile(LOGO)}
              style={{ width: 520, display: "block" }}
            />
            {/* Brillo que cruza el logo (recortado a la forma del logo) */}
            {sobrio ? null : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(105deg, transparent ${brillo - 20}%, rgba(255,255,255,0.75) ${brillo}%, transparent ${brillo + 20}%)`,
                  WebkitMaskImage: `url(${staticFile(LOGO)})`,
                  WebkitMaskSize: "100% 100%",
                }}
              />
            )}
          </div>
        </div>
        <div
          style={{
            marginTop: 70,
            width: 560 * linea,
            height: 5,
            backgroundColor: ROJO,
            borderRadius: 3,
          }}
        />
        <div
          style={{
            marginTop: 26,
            display: "flex",
            color: BLANCO,
            fontWeight: 800,
            fontSize: 50,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          {seccion.split("").map((ch, i) => {
            const p = spring({
              frame,
              fps,
              delay: 30 + i * 0.8,
              config: { damping: 200 },
            });
            return (
              <span
                key={i}
                style={{
                  whiteSpace: "pre",
                  opacity: p,
                  transform: `translateY(${(1 - p) * 24}px)`,
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 60,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            opacity: web1,
            transform: `translateY(${(1 - web1) * 20}px)`,
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.7)",
              fontWeight: 600,
              fontSize: 28,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {invitacion}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              backgroundColor: ROJO,
              color: BLANCO,
              fontWeight: 800,
              fontSize: 40,
              padding: "14px 30px",
              borderRadius: 999,
              boxShadow: "0 10px 30px rgba(227,6,19,0.4)",
            }}
          >
            <svg
              width={38}
              height={38}
              viewBox="0 0 24 24"
              fill="none"
              stroke={BLANCO}
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="9.5" />
              <path d="M2.5 12h19M12 2.5c2.8 3 2.8 16 0 19M12 2.5c-2.8 3-2.8 16 0 19" />
            </svg>
            <span style={{ whiteSpace: "pre" }}>
              {web.slice(0, letrasWeb)}
              <span
                style={{
                  opacity: letrasWeb < web.length && frame % 10 < 5 ? 1 : 0,
                }}
              >
                |
              </span>
              <span style={{ opacity: 0 }}>{web.slice(letrasWeb)}</span>
            </span>
          </div>
        </div>
        {credito ? (
          <div
            style={{
              marginTop: 50,
              color: "rgba(255,255,255,0.6)",
              fontWeight: 600,
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
              opacity: web1,
            }}
          >
            {credito}
          </div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
