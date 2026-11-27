// "Las Más Virales" del viernes 27 de noviembre. Tiempos en ms del video ya sin silencios
// (se cortó "bochinche que viene, bochinche que va" del final).
import { Video } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { ApoyoSobrio } from "./ApoyoSobrio";
import { CierreNoticias } from "./CierreNoticias";
import { Bajar, LogoFijo, Separador } from "./MasViralesVideo";
import { RotuloNoticia } from "./RotuloNoticia";
import { Subtitulos } from "./Subtitulos";
import { TarjetaCancion, TarjetaSobria } from "./TarjetasNoticia";

const VIDEO = "mv27/v-cut.mp4";
export const DURACION_MV27_VIDEO_MS = 106600;
export const DURACION_MV27_MS = DURACION_MV27_VIDEO_MS + 4000;

const f = (ms: number, fps: number) => Math.round((ms / 1000) * fps);

const SEPARADORES = [
  { desdeMs: 8350, hastaMs: 9750, numero: 1, titulo: "«Benditos Versos»", detalle: "Himno folclórico de La Guajira" },
  { desdeMs: 53950, hastaMs: 55350, numero: 2, titulo: "Churo Díaz", detalle: "Lanzamientos en Barranquilla y Riohacha" },
  { desdeMs: 75400, hastaMs: 76800, numero: 3, titulo: "Lanzamientos de la semana", detalle: "Rafa Pérez · Erick Escobar" },
];

// Apoyos a pantalla completa con fondo difuminado (sin audio)
const APOYOS = [
  { desdeMs: 14150, hastaMs: 19450, src: "ap25/luna.mp4", desdeSeg: 4, proporcion: 1080 / 1920, etiqueta: "Premios Luna" },
  {
    desdeMs: 31950,
    hastaMs: 38050,
    src: "ap25/gobernador.mp4",
    desdeSeg: 2,
    proporcion: 1080 / 1920,
    etiqueta: "Gobernador de La Guajira, Jairo Aguilar",
  },
  { desdeMs: 60250, hastaMs: 63300, src: "ap24/churo-baq.mp4", desdeSeg: 12, proporcion: 1280 / 720, etiqueta: "Barranquilla" },
  {
    desdeMs: 63350,
    hastaMs: 69900,
    src: "ap24/churo-rioh.mp4",
    desdeSeg: 40,
    proporcion: 1280 / 720,
    etiqueta: "Estadio Federico Serrano Soto · Riohacha",
  },
  { desdeMs: 81350, hastaMs: 89750, src: "ap27/rafa.mp4", desdeSeg: 3, proporcion: 720 / 748, etiqueta: "«Linda» · Rafa Pérez y El Heredero" },
  { desdeMs: 89800, hastaMs: 95000, src: "ap27/erick.mp4", desdeSeg: 22, proporcion: 1080 / 1920 },
];

type Tarjeta = { desdeMs: number; hastaMs: number; el: React.ReactNode };
const sobria = (desdeMs: number, hastaMs: number, antetitulo: string, titulo: string): Tarjeta => ({
  desdeMs,
  hastaMs,
  el: <TarjetaSobria antetitulo={antetitulo} titulo={titulo} />,
});

const TARJETAS: Tarjeta[] = [
  // #1
  sobria(9800, 14100, "Premios Luna", "Barranquilla"),
  {
    desdeMs: 19500,
    hastaMs: 25500,
    el: <TarjetaCancion etiqueta="Himno folclórico de La Guajira" titulo="Benditos Versos" detalle="Premios Luna" />,
  },
  sobria(25550, 31900, "Su compositor", "Rafael Manjarrés Mendoza"),
  sobria(38100, 45850, "Un orgullo para", "La Guajira"),
  sobria(45900, 53900, "Suena permanentemente en", "Cardenal Stereo 91.7"),
  // #2
  sobria(55400, 60200, "El más taquillero", "Churo Díaz"),
  sobria(69950, 75350, "Dos lanzamientos", "Fuera de serie"),
  // #3
  sobria(76850, 81300, "Se unieron", "Rafa Pérez y El Heredero"),
  {
    desdeMs: 95050,
    hastaMs: 99950,
    el: <TarjetaCancion etiqueta="Erick Escobar y Neno Beleño" titulo="Tres pa' tres" detalle="Música nueva y fresca" />,
  },
  sobria(100000, 106550, "Cardenal Stereo · Sistema Cardenal", "Las 3 más importantes del folclor"),
];

export const MasVirales27nov: React.FC = () => {
  const { fps } = useVideoConfig();
  const tramo = (t: { desdeMs: number; hastaMs: number }) => ({
    from: f(t.desdeMs, fps),
    durationInFrames: f(t.hastaMs - t.desdeMs, fps),
  });
  const cierre = f(DURACION_MV27_VIDEO_MS, fps);
  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
      <Video src={staticFile(VIDEO)} objectFit="cover" />
      <ApoyoSobrio apoyos={APOYOS} />
      <AbsoluteFill
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.4) 100%)" }}
      />
      {/* Tarjetas abajo (arriba está el logo fijo) */}
      {TARJETAS.map((t) => (
        <Sequence key={t.desdeMs} {...tramo(t)}>
          <Bajar>{t.el}</Bajar>
        </Sequence>
      ))}
      <Subtitulos
        src="mv27/v-cut-captions.json"
        hastaMs={DURACION_MV27_VIDEO_MS}
        palabrasClave={[
          "luna", "\"benditos", "versos\"", "himno", "rafael", "manjarrés", "jairo", "aguilar", "orgullo",
          "churo", "díaz,", "taquillero,", "riohacha", "barranquilla,", "rafa", "pérez", "heredero", "\"linda\"",
          "erick", "escobar,", "\"tres", "tres\",",
        ]}
        estilo={{ fontSize: 56, top: 1250, borde: 9, agruparMs: 1500 }}
        ocultos={[...SEPARADORES, ...APOYOS]}
      />
      <Sequence from={f(1300, fps)} durationInFrames={f(5000, fps)} name="Rótulo William">
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
        <CierreNoticias seccion="Las más virales" invitacion="Síguenos en" web="www.cardenalstereo.com" />
      </Sequence>
    </AbsoluteFill>
  );
};
