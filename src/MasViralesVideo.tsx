// "Las Más Virales" del viernes 30 de octubre: las 3 noticias de la semana.
// Tiempos en ms del video ya sin silencios.
import { Audio } from "@remotion/media";
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
import { ApoyoSobrio } from "./ApoyoSobrio";
import { BLANCO, fontFamily, ROJO } from "./brand";
import { CierreNoticias } from "./CierreNoticias";
import { FotoEsquina } from "./FotoEsquina";
import { LogoMasVirales } from "./MasVirales";
import { RotuloNoticia } from "./RotuloNoticia";
import { Subtitulos } from "./Subtitulos";
import { TarjetaCancion, TarjetaSobria } from "./TarjetasNoticia";
import { VideoConVentana } from "./VentanaPresentador";

const VIDEO = "mv/v-cut.mp4";
export const DURACION_MV_VIDEO_MS = 97420;
export const DURACION_MV_MS = DURACION_MV_VIDEO_MS + 4000;
const INTRO_LOGO = 75; // cuadros que el logo se queda grande al centro

const f = (ms: number, fps: number) => Math.round((ms / 1000) * fps);

// Logo: entra grande al centro y viaja a la esquina, donde se queda hasta el cierre
const LogoFijo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const viaje = spring({
    frame,
    fps,
    delay: INTRO_LOGO,
    durationInFrames: 22,
    config: { damping: 200 },
  });
  const oscuro = interpolate(
    frame,
    [0, 6, INTRO_LOGO, INTRO_LOGO + 14],
    [0, 0.55, 0.55, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: `rgba(0,0,0,${oscuro})` }} />
      <div
        style={{
          position: "absolute",
          left: interpolate(viaje, [0, 1], [540, 40]),
          top: interpolate(viaje, [0, 1], [860, 95]),
          transform: `translateX(${-50 * (1 - viaje)}%)`,
        }}
      >
        <LogoMasVirales
          escala={interpolate(viaje, [0, 1], [1, 0.5])}
          aparicion={frame >= INTRO_LOGO ? 1 : 0}
        />
      </div>
    </AbsoluteFill>
  );
};

// Separador rápido "#1 / #2 / #3" antes de cada noticia (con whoosh)
const Separador: React.FC<{
  numero: number;
  titulo: string;
  detalle: string;
}> = ({ numero, titulo, detalle }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const entra = spring({
    frame,
    fps,
    durationInFrames: 9,
    config: { damping: 200 },
  });
  const sale = spring({
    frame,
    fps,
    delay: durationInFrames - 8,
    durationInFrames: 8,
    config: { damping: 200 },
  });
  const num = spring({
    frame,
    fps,
    delay: 3,
    config: { damping: 9, stiffness: 200 },
  });
  const txt = spring({ frame, fps, delay: 8, config: { damping: 200 } });
  return (
    <AbsoluteFill>
      <Audio src={staticFile("sfx/whoosh.wav")} volume={0.45} />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 42%, #4A0A10 0%, #1A0709 55%, #0B0A0C 100%)",
          transform: `translateX(${(1 - entra) * 1080 - sale * 1080}px)`,
          justifyContent: "center",
          alignItems: "center",
          fontFamily,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            transform: `scale(${num})`,
          }}
        >
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              backgroundColor: BLANCO,
              border: `7px solid ${ROJO}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Img
              src={staticFile("cardenal-cabeza.png")}
              style={{ height: 104, marginLeft: 6 }}
            />
          </div>
          <div
            style={{
              color: ROJO,
              fontWeight: 900,
              fontSize: 280,
              lineHeight: 1,
              textShadow: "8px 10px 0 #000",
            }}
          >
            #{numero}
          </div>
        </div>
        <div
          style={{
            marginTop: 30,
            color: BLANCO,
            fontWeight: 900,
            fontSize: 64,
            lineHeight: 1.1,
            maxWidth: 960,
            textTransform: "uppercase",
            textAlign: "center",
            opacity: txt,
            transform: `translateY(${(1 - txt) * 30}px)`,
          }}
        >
          {titulo}
        </div>
        <div
          style={{
            marginTop: 14,
            color: "rgba(255,255,255,0.75)",
            fontWeight: 600,
            fontSize: 34,
            letterSpacing: 3,
            textTransform: "uppercase",
            opacity: txt,
          }}
        >
          {detalle}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// En "Las Más Virales" las tarjetas van ABAJO, bajo los subtítulos, para no saturar el logo ni tapar a William
const Bajar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ transform: "translateY(1330px)" }}>
    {children}
  </AbsoluteFill>
);

const SEPARADORES = [
  {
    desdeMs: 7650,
    hastaMs: 9150,
    numero: 1,
    titulo: "Accidente de Kbeto Zuleta y su agrupación",
    detalle: "En el río Ariguaní",
  },
  {
    desdeMs: 44150,
    hastaMs: 45650,
    numero: 2,
    titulo: "Peter Manjarrés",
    detalle: "Lanzó «Luchador»",
  },
  {
    desdeMs: 69350,
    hastaMs: 70850,
    numero: 3,
    titulo: "Silvestre Dangond",
    detalle: "Nuevo álbum desde Urumita",
  },
];

const ESQUINAS = [
  {
    desdeMs: 18400,
    hastaMs: 24400,
    src: "accidente-b3.mp4",
    desdeSeg: 11.3,
    lado: "izq" as const,
  },
  {
    desdeMs: 33700,
    hastaMs: 39200,
    src: "hoy/v3-avion.mp4",
    desdeSeg: 2,
    lado: "der" as const,
  },
  {
    desdeMs: 39200,
    hastaMs: 43900,
    src: "hoy/v3-llegada.mp4",
    desdeSeg: 18,
    lado: "izq" as const,
  },
];

const FOTOS_PETER = [
  { desdeMs: 51200, hastaMs: 55500, src: "mv/peter/p1.jpg", proporcion: 1.5 },
  { desdeMs: 55400, hastaMs: 59100, src: "mv/peter/p2.jpg", proporcion: 1.5 },
  { desdeMs: 59000, hastaMs: 62700, src: "mv/peter/p0.jpg", proporcion: 1.5 },
];

const VENTANA_SILVESTRE = [
  {
    desdeMs: 71800,
    hastaMs: 84000,
    apoyos: [
      { src: "hoy/silvestre/s1.jpg", hastaMs: 75500 },
      { src: "hoy/silvestre/s3.jpg", hastaMs: 79400 },
      { src: "hoy/silvestre/s0.jpg", hastaMs: 84000 },
    ],
  },
];

export const MasViralesVideo: React.FC = () => {
  const { fps } = useVideoConfig();
  const tramo = (t: { desdeMs: number; hastaMs: number }) => ({
    from: f(t.desdeMs, fps),
    durationInFrames: f(t.hastaMs - t.desdeMs, fps),
  });
  const cierre = f(DURACION_MV_VIDEO_MS, fps);
  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
      <VideoConVentana src={VIDEO} tramos={VENTANA_SILVESTRE} />
      <ApoyoSobrio apoyos={FOTOS_PETER} />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.4) 100%)",
        }}
      />
      {ESQUINAS.map((e) => (
        <Sequence key={e.desdeMs} {...tramo(e)} name={`Esquina ${e.src}`}>
          <FotoEsquina
            src={e.src}
            desdeSeg={e.desdeSeg}
            lado={e.lado}
            encuadre="arriba"
          />
        </Sequence>
      ))}
      <Sequence {...tramo({ desdeMs: 24500, hastaMs: 31400 })} name="Balance">
        <Bajar>
          <TarjetaSobria
            antetitulo="Balance"
            titulo="2 fallecidos · 20 heridos"
          />
        </Bajar>
      </Sequence>
      <Sequence {...tramo({ desdeMs: 45750, hastaMs: 51100 })} name="Luchador">
        <Bajar>
          <TarjetaCancion
            etiqueta="Nuevo álbum"
            titulo="Luchador"
            detalle="Peter Manjarrés"
          />
        </Bajar>
      </Sequence>
      <Sequence
        {...tramo({ desdeMs: 62800, hastaMs: 69200 })}
        name="14 canciones"
      >
        <Bajar>
          <TarjetaSobria antetitulo="«Luchador» trae" titulo="14 canciones" />
        </Bajar>
      </Sequence>
      <Subtitulos
        src="mv/v-cut-captions.json"
        hastaMs={DURACION_MV_VIDEO_MS}
        palabrasClave={[
          "virales",
          "kbeto",
          "zuleta",
          "accidente",
          "sincelejo",
          "ariguaní,",
          "fallecieron",
          "heridos,",
          "barranquilla,",
          "avión",
          "ambulancia",
          "peter",
          "manjarrés",
          "luchador",
          "luchador,",
          "14",
          "canciones",
          "silvestre",
          "dangond",
          "urumita,",
          "grabación",
        ]}
        estilo={{ fontSize: 56, top: 1250, borde: 9, agruparMs: 1500 }}
        ocultos={SEPARADORES}
      />
      <Sequence
        from={f(2600, fps)}
        durationInFrames={f(4900, fps)}
        name="Rótulo William"
      >
        <RotuloNoticia
          seccion="Las más virales"
          nombre="William de la Rosa"
          cargo="Director artístico del Sistema Cardenal"
          instagram="wdelarosac"
        />
      </Sequence>
      <Sequence durationInFrames={cierre} name="Logo Las Más Virales">
        <LogoFijo />
      </Sequence>
      {SEPARADORES.map((s) => (
        <Sequence key={s.numero} {...tramo(s)} name={`Separador #${s.numero}`}>
          <Separador numero={s.numero} titulo={s.titulo} detalle={s.detalle} />
        </Sequence>
      ))}
      <Sequence from={cierre} name="Cierre">
        <CierreNoticias
          seccion="Las más virales"
          invitacion="Síguenos en"
          web="www.cardenalstereo.com"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
