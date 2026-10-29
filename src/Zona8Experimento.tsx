// Versión experimental de Zona 8 con ideas del TikTok de referencia, respetando la
// identidad de Cardenal Stereo: pantalla de dato gigante, pantalla dividida con
// William de pecho para arriba, etiqueta tipo "píldora" y cierre "Síguenos" con flecha.
import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FotoEsquina } from "./FotoEsquina";
import { BLANCO, fontFamily, NEGRO, ROJO } from "./brand";
import { CierreNoticias } from "./CierreNoticias";
import { RotuloNoticia } from "./RotuloNoticia";
import { Subtitulos } from "./Subtitulos";
import {
  Cardenalito,
  TarjetaArtistas,
  TarjetaCancion,
} from "./TarjetasNoticia";

const VIDEO = "d29/v3-cut.mp4";
const DURACION_VIDEO_MS = 26950;
const CTA_MS = 2600;
export const DURACION_ZONA8_EXP_MS = DURACION_VIDEO_MS + CTA_MS + 4000;

const fondoMarca =
  "radial-gradient(circle at 50% 40%, #3A0A0F 0%, #160709 55%, #0B0A0C 100%)";

// Etiqueta negra redondeada, como los textos del video de referencia
const Pildora: React.FC<{ texto: string; top: number; aparece?: number }> = ({
  texto,
  top,
  aparece = 1,
}) => (
  <AbsoluteFill style={{ alignItems: "center", fontFamily }}>
    <div
      style={{
        position: "absolute",
        top,
        display: "flex",
        alignItems: "center",
        gap: 14,
        backgroundColor: "rgba(10,10,12,0.9)",
        color: BLANCO,
        fontWeight: 700,
        fontSize: 38,
        padding: "12px 30px 12px 14px",
        borderRadius: 999,
        opacity: aparece,
        transform: `translateY(${(1 - aparece) * 20}px) scale(${0.9 + aparece * 0.1})`,
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
      }}
    >
      <Cardenalito tamano={52} />
      {texto}
    </div>
  </AbsoluteFill>
);

// Pantalla de dato: fondo de marca, palabra gigante letra por letra y píldora
const PantallaDato: React.FC<{ titulo: string; pildora: string }> = ({
  titulo,
  pildora,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const entra = interpolate(frame, [0, 6], [0, 1], {
    extrapolateRight: "clamp",
  });
  const sale = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
    },
  );
  const pild = spring({ frame, fps, delay: 14, config: { damping: 200 } });
  const palabras = titulo.split(" ");
  let k = 0;
  return (
    <AbsoluteFill
      style={{ opacity: entra * sale, background: fondoMarca, fontFamily }}
    >
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: -120,
        }}
      >
        {palabras.map((w, wi) => (
          <div key={wi} style={{ display: "flex" }}>
            {w.split("").map((ch) => {
              const p = spring({
                frame,
                fps,
                delay: k++ * 1.2,
                config: { damping: 10, stiffness: 190 },
              });
              return (
                <span
                  key={k}
                  style={{
                    display: "inline-block",
                    color: wi === palabras.length - 1 ? ROJO : BLANCO,
                    fontWeight: 900,
                    fontSize: 150,
                    lineHeight: 1,
                    letterSpacing: -2,
                    textTransform: "uppercase",
                    opacity: p,
                    transform: `translateY(${(1 - p) * 60}px) scale(${0.5 + p * 0.5})`,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </div>
        ))}
      </AbsoluteFill>
      <Pildora texto={pildora} top={1180} aparece={pild} />
    </AbsoluteFill>
  );
};

// Pantalla dividida: apoyo arriba, William abajo de pecho para arriba (sin cortarlo por la cintura)
const Dividida: React.FC<{ src: string; desdeSeg: number }> = ({
  src,
  desdeSeg,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const p = Math.min(
    spring({ frame, fps, durationInFrames: 14, config: { damping: 200 } }),
    1 -
      spring({
        frame,
        fps,
        delay: durationInFrames - 14,
        durationInFrames: 14,
        config: { damping: 200 },
      }),
  );
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          height: 960,
          overflow: "hidden",
          transform: `translateY(${(1 - p) * -960}px)`,
        }}
      >
        <Video
          src={staticFile(src)}
          trimBefore={Math.round(desdeSeg * fps)}
          muted
          objectFit="cover"
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 960,
          left: 0,
          width: 1080,
          height: 960,
          overflow: "hidden",
          opacity: p,
        }}
      >
        {/* William completo, desplazado para que se vea de pecho para arriba (sin zoom) */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 0,
            width: 1080,
            height: 1920,
          }}
        >
          <Video
            src={staticFile(VIDEO)}
            muted
            objectFit="cover"
            trimBefore={0}
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 957,
          left: 0,
          height: 6,
          width: 1080 * p,
          backgroundColor: ROJO,
        }}
      />
    </AbsoluteFill>
  );
};

// "Síguenos" con flecha dibujada que señala el botón de seguir de TikTok/Reels
const Siguenos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame, fps, config: { damping: 200 } });
  const trazo = interpolate(frame, [10, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const largo = 900;
  return (
    <AbsoluteFill style={{ background: fondoMarca, fontFamily }}>
      <AbsoluteFill style={{ alignItems: "center" }}>
        <div
          style={{
            marginTop: 560,
            opacity: t,
            transform: `translateY(${(1 - t) * 30}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Img
              src={staticFile("cardenal-cabeza.png")}
              style={{ height: 170 }}
            />
          </div>
          <div
            style={{
              color: BLANCO,
              fontWeight: 900,
              fontSize: 92,
              lineHeight: 1,
            }}
          >
            SÍGUENOS
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.8)",
              fontWeight: 600,
              fontSize: 38,
              marginTop: 18,
            }}
          >
            para más noticias vallenatas
          </div>
        </div>
      </AbsoluteFill>
      <svg
        width={1080}
        height={1920}
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d="M 600 1130 C 760 1120, 900 1160, 930 1290"
          fill="none"
          stroke={ROJO}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={largo}
          strokeDashoffset={largo * (1 - trazo)}
        />
        <path
          d="M 885 1255 L 932 1300 L 965 1245"
          fill="none"
          stroke={ROJO}
          strokeWidth={14}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={trazo > 0.95 ? 1 : 0}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 1090,
          left: 330,
          color: NEGRO,
          backgroundColor: BLANCO,
          fontWeight: 800,
          fontSize: 30,
          padding: "8px 18px",
          borderRadius: 999,
          opacity: trazo,
        }}
      >
        Toca el +
      </div>
    </AbsoluteFill>
  );
};

const f = (ms: number, fps: number) => Math.round((ms / 1000) * fps);

const DATO = { desdeMs: 1500, hastaMs: 3300 };
const DIVIDIDA = { desdeMs: 4150, hastaMs: 13850 };
const ROLANDO = { desdeMs: 14250, hastaMs: 20700 };
const COLOMBIA = { desdeMs: 20900, hastaMs: 23700 };

export const Zona8Experimento: React.FC = () => {
  const { fps } = useVideoConfig();
  const tramo = (t: { desdeMs: number; hastaMs: number }) => ({
    from: f(t.desdeMs, fps),
    durationInFrames: f(t.hastaMs - t.desdeMs, fps),
  });
  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
      <Video src={staticFile(VIDEO)} objectFit="cover" />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.4) 100%)",
        }}
      />
      {/* Clips de Instagram en tarjetas de esquina, sin las etiquetas de abajo */}
      <Sequence {...tramo(ROLANDO)} name="Rolando">
        <FotoEsquina
          src="d29/v3-ig3.mp4"
          desdeSeg={0.3}
          lado="der"
          encuadre="arriba"
        />
      </Sequence>
      <Sequence {...tramo(COLOMBIA)} name="Bucaramanga">
        <FotoEsquina
          src="d29/v3-ig1.mp4"
          desdeSeg={3}
          lado="izq"
          encuadre="arriba"
        />
      </Sequence>
      <Sequence {...tramo(DIVIDIDA)} name="Dividida alfombra roja">
        <Dividida src="d29/v3-ig2.mp4" desdeSeg={0.3} />
      </Sequence>
      <Sequence
        from={f(4600, fps)}
        durationInFrames={f(4700, fps)}
        name="Artistas"
      >
        <TarjetaArtistas
          desdeMs={4600}
          artistas={[
            { nombre: "Karolaym Murra", ms: 4600 },
            { nombre: "César David Ochoa", ms: 5400 },
          ]}
        />
      </Sequence>
      <Sequence
        from={f(15400, fps)}
        durationInFrames={f(5200, fps)}
        name="Píldora Rolando"
      >
        <PildoraAnimada texto="Rolando Ochoa · fundador" />
      </Sequence>
      <Sequence
        from={f(23750, fps)}
        durationInFrames={f(3200, fps)}
        name="Nueva producción"
      >
        <TarjetaCancion
          etiqueta="Zona 8"
          titulo="Nueva producción"
          detalle="Por toda Colombia"
        />
      </Sequence>
      <Sequence {...tramo(DATO)} name="Dato Premios Monitor">
        <PantallaDato titulo="Premios Monitor" pildora="Zona 8 brilló" />
      </Sequence>
      <Subtitulos
        src="d29/v3-cut-captions.json"
        hastaMs={DURACION_VIDEO_MS}
        palabrasClave={[
          "zona",
          "8",
          "premios",
          "monitor",
          "monitor.",
          "karolaym",
          "murra",
          "césar",
          "david",
          "ochoa",
          "ochoa,",
          "alfombra",
          "roja",
          "rolando",
          "fundador",
          "nominado",
          "colombia",
        ]}
        estilo={{ fontSize: 54, top: 1250, borde: 9, agruparMs: 1700 }}
        ocultos={[DATO, DIVIDIDA]}
      />
      <Subtitulos
        src="d29/v3-cut-captions.json"
        hastaMs={DURACION_VIDEO_MS}
        palabrasClave={[
          "zona",
          "8",
          "premios",
          "monitor",
          "monitor.",
          "karolaym",
          "murra",
          "césar",
          "david",
          "ochoa",
          "ochoa,",
          "alfombra",
          "roja",
          "rolando",
          "fundador",
          "nominado",
          "colombia",
        ]}
        estilo={{ fontSize: 54, top: 800, borde: 9, agruparMs: 1700 }}
        soloEn={[DIVIDIDA]}
      />
      <Sequence
        from={f(3400, fps)}
        durationInFrames={f(5000, fps)}
        name="Rótulo William"
      >
        <RotuloNoticia
          seccion="Noticias vallenatas"
          nombre="William de la Rosa"
          cargo="Director artístico del Sistema Cardenal"
          instagram="wdelarosac"
        />
      </Sequence>
      <Sequence
        from={f(DURACION_VIDEO_MS, fps)}
        durationInFrames={f(CTA_MS, fps)}
        name="Síguenos"
      >
        <Siguenos />
      </Sequence>
      <Sequence from={f(DURACION_VIDEO_MS + CTA_MS, fps)} name="Cierre">
        <CierreNoticias
          seccion="Noticias vallenatas"
          invitacion="Síguenos en"
          web="www.cardenalstereo.com"
        />
      </Sequence>
    </AbsoluteFill>
  );
};

const PildoraAnimada: React.FC<{ texto: string }> = ({ texto }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const a = spring({ frame, fps, config: { damping: 200 } });
  const s = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" },
  );
  return <Pildora texto={texto} top={1060} aparece={a * s} />;
};
