// "Las Más Virales" del viernes 13 de noviembre. Tiempos en ms del video ya sin silencios.
import { Video } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { ApoyoSobrio } from "./ApoyoSobrio";
import { CierreNoticias } from "./CierreNoticias";
import { Bajar, LogoFijo, Separador } from "./MasViralesVideo";
import { PortadaAlbum } from "./PortadaAlbum";
import { RotuloNoticia } from "./RotuloNoticia";
import { Subtitulos } from "./Subtitulos";
import { TarjetaSobria } from "./TarjetasNoticia";

const VIDEO = "mv13/v-cut.mp4";
export const DURACION_MV13_VIDEO_MS = 72850;
export const DURACION_MV13_MS = DURACION_MV13_VIDEO_MS + 4000;

const f = (ms: number, fps: number) => Math.round((ms / 1000) * fps);

const SEPARADORES = [
  {
    desdeMs: 13300,
    hastaMs: 14700,
    numero: 1,
    titulo: "Carlos Vives",
    detalle: "Gana el Latin Grammy",
  },
  {
    desdeMs: 36200,
    hastaMs: 37600,
    numero: 2,
    titulo: "Julio Morillo",
    detalle: "Lamentamos su partida",
  },
  {
    desdeMs: 53500,
    hastaMs: 54900,
    numero: 3,
    titulo: "Lanzamientos de la semana",
    detalle: "Fawell Solano · Laura «La China»",
  },
];

// #1: Carlos Vives celebrando en el avión (completo, fondo desenfocado)
const VIVES = [
  {
    desdeMs: 20800,
    hastaMs: 26600,
    src: "mv13/vives-celebra.mp4",
    desdeSeg: 6,
    proporcion: 720 / 900,
  },
];

// #2: sobrio, Julio cantando y su foto (fundido lento, fondo desenfocado)
const JULIO = [
  {
    desdeMs: 40300,
    hastaMs: 45400,
    src: "mv13/julio-morillo.jpg",
    proporcion: 1274 / 1235,
  },
  {
    desdeMs: 45400,
    hastaMs: 53300,
    src: "mv13/julio-cantando.mp4",
    desdeSeg: 2,
    proporcion: 720 / 900,
  },
];

// #3: arte de los lanzamientos en ventana grande
const FAWELL = [
  {
    desdeMs: 57400,
    hastaMs: 60700,
    src: "mv13/fawell.mp4",
    desdeSeg: 10,
    proporcion: 720 / 1280,
  },
];

export const MasVirales13nov: React.FC = () => {
  const { fps } = useVideoConfig();
  const tramo = (t: { desdeMs: number; hastaMs: number }) => ({
    from: f(t.desdeMs, fps),
    durationInFrames: f(t.hastaMs - t.desdeMs, fps),
  });
  const cierre = f(DURACION_MV13_VIDEO_MS, fps);
  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
      <Video src={staticFile(VIDEO)} objectFit="cover" />
      <ApoyoSobrio apoyos={[...VIVES, ...JULIO, ...FAWELL]} />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.4) 100%)",
        }}
      />
      {/* #1: el arte de ganador sale como portada al costado */}
      <Sequence {...tramo({ desdeMs: 14800, hastaMs: 20700 })} name="Ganador">
        <PortadaAlbum
          src="mv13/vives-ganador.jpg"
          lado="der"
          etiqueta="Ganador Latin Grammy"
        />
      </Sequence>
      <Sequence {...tramo({ desdeMs: 60700, hastaMs: 65600 })} name="Campeones">
        <PortadaAlbum
          src="mv13/campeones.jpg"
          lado="der"
          etiqueta="Campeones"
        />
      </Sequence>
      {/* Tarjetas abajo (arriba está el logo fijo) */}
      <Sequence
        {...tramo({ desdeMs: 26700, hastaMs: 36100 })}
        name="Agradecimiento"
      >
        <Bajar>
          <TarjetaSobria
            antetitulo="Agradeció a"
            titulo="Cocha Molina e Israel Romero"
          />
        </Bajar>
      </Sequence>
      <Sequence
        {...tramo({ desdeMs: 38600, hastaMs: 45300 })}
        name="En memoria"
      >
        <Bajar>
          <TarjetaSobria
            antetitulo="En memoria"
            titulo="Julio Morillo · Corista"
          />
        </Bajar>
      </Sequence>
      <Sequence
        {...tramo({ desdeMs: 65600, hastaMs: 68700 })}
        name="Recomendadas"
      >
        <Bajar>
          <TarjetaSobria
            antetitulo="Cardenal Stereo"
            titulo="Nuestras recomendadas de la semana"
          />
        </Bajar>
      </Sequence>
      <Subtitulos
        src="mv13/v-cut-captions.json"
        hastaMs={DURACION_MV13_VIDEO_MS}
        palabrasClave={[
          "carlos",
          "vives",
          "vives.",
          "latin",
          "grammy",
          "cumbia",
          "vallenato",
          "ganador",
          "cocha",
          "molina",
          "israel",
          "romero",
          "julio",
          "morillo",
          "corista",
          "fawell",
          "solano",
          "kiko",
          "ramos",
          "dios.",
          "laura",
          "hamburguer,",
          "campeones.",
          "recomendadas",
        ]}
        estilo={{ fontSize: 56, top: 1250, borde: 9, agruparMs: 1500 }}
        ocultos={[...SEPARADORES, ...VIVES, ...JULIO, ...FAWELL]}
      />
      <Sequence
        from={f(2400, fps)}
        durationInFrames={f(5000, fps)}
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
