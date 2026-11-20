// "Las Más Virales" del viernes 20 de noviembre (sin material de apoyo). Tiempos en ms del video ya sin silencios.
import { Video } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { CierreNoticias } from "./CierreNoticias";
import { Bajar, LogoFijo, Separador } from "./MasViralesVideo";
import { RotuloNoticia } from "./RotuloNoticia";
import { Subtitulos } from "./Subtitulos";
import { TarjetaCancion, TarjetaCifras, TarjetaLista, TarjetaSobria } from "./TarjetasNoticia";

const VIDEO = "mv20/v-cut.mp4";
export const DURACION_MV20_VIDEO_MS = 110350;
export const DURACION_MV20_MS = DURACION_MV20_VIDEO_MS + 4000;

const f = (ms: number, fps: number) => Math.round((ms / 1000) * fps);

const SEPARADORES = [
  { desdeMs: 10200, hastaMs: 11600, numero: 1, titulo: "El vallenato brilló", detalle: "Feria de la Chinita · Maracaibo" },
  { desdeMs: 43550, hastaMs: 44950, numero: 2, titulo: "Churo Díaz en Riohacha", detalle: "Sábado 21 de noviembre" },
  { desdeMs: 60250, hastaMs: 61650, numero: 3, titulo: "Fawell Solano y Kiko Ramos", detalle: "«En las manos de Dios»" },
];

type Tarjeta = { desdeMs: number; hastaMs: number; nombre: string; el: (desdeMs: number) => React.ReactNode };
const sobria = (desdeMs: number, hastaMs: number, antetitulo: string, titulo: string): Tarjeta => ({
  desdeMs,
  hastaMs,
  nombre: titulo,
  el: () => <TarjetaSobria antetitulo={antetitulo} titulo={titulo} />,
});

const TARJETAS: Tarjeta[] = [
  // #1
  sobria(12000, 17700, "Feria de la Chinita", "Maracaibo, Zulia, Venezuela"),
  sobria(17800, 23100, "Llegaron al famoso", "Amanecer de ferias"),
  {
    desdeMs: 23150,
    hastaMs: 27350,
    nombre: "Artistas 1",
    el: (d) => (
      <TarjetaLista
        titulo="Desfilaron"
        desdeMs={d}
        items={[
          { texto: "Elder Dayán Díaz", ms: 23327 },
          { texto: "Diego Daza", ms: 24833 },
          { texto: "Churo Díaz", ms: 25616 },
          { texto: "Alex Manga", ms: 26557 },
        ]}
      />
    ),
  },
  {
    desdeMs: 27400,
    hastaMs: 31650,
    nombre: "Artistas 2",
    el: (d) => (
      <TarjetaLista
        titulo="También"
        desdeMs={d}
        items={[
          { texto: "Nelson Velásquez", ms: 27499 },
          { texto: "Penchy Castro", ms: 29004 },
          { texto: "Silvestre Dangond", ms: 30228 },
        ]}
      />
    ),
  },
  sobria(31700, 43400, "Un show inolvidable", "Aplausos de principio a fin"),
  // #2
  {
    desdeMs: 45000,
    hastaMs: 49200,
    nombre: "Sábado 21",
    el: () => <TarjetaCifras antetitulo="Sábado" cifras={[{ numero: "21", texto: "De noviembre" }]} />,
  },
  {
    desdeMs: 49250,
    hastaMs: 55000,
    nombre: "Pluma Blanca",
    el: () => <TarjetaCancion etiqueta="Su gran regreso" titulo="Pluma Blanca" detalle="Churo Díaz en Riohacha" />,
  },
  sobria(55050, 60100, "Riohacha", "Estadio Federico Serrano Soto"),
  // #3
  {
    desdeMs: 61700,
    hastaMs: 67600,
    nombre: "En las manos de Dios",
    el: () => <TarjetaCancion etiqueta="Nuevo álbum" titulo="En las manos de Dios" detalle="Los mejores comentarios" />,
  },
  sobria(67650, 74200, "Caravana de lanzamiento", "Fonseca"),
  sobria(74250, 80950, "Promoción en los medios", "La Guajira"),
  sobria(81000, 84800, "Hoy viajan a", "Bogotá"),
  sobria(84850, 90500, "Nota importante", "Lanzamiento en vivo"),
  {
    desdeMs: 90550,
    hastaMs: 99900,
    nombre: "5 de diciembre",
    el: () => (
      <TarjetaCifras
        antetitulo="Plaza principal de Fonseca · Tierra de Cantores"
        cifras={[{ numero: "5", texto: "De diciembre" }]}
      />
    ),
  },
  sobria(100000, 110300, "Cardenal Stereo · Sistema Cardenal", "Las 3 más importantes de la semana"),
];

export const MasVirales20nov: React.FC = () => {
  const { fps } = useVideoConfig();
  const tramo = (t: { desdeMs: number; hastaMs: number }) => ({
    from: f(t.desdeMs, fps),
    durationInFrames: f(t.hastaMs - t.desdeMs, fps),
  });
  const cierre = f(DURACION_MV20_VIDEO_MS, fps);
  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
      <Video src={staticFile(VIDEO)} objectFit="cover" />
      <AbsoluteFill
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.4) 100%)" }}
      />
      {/* Tarjetas abajo (arriba está el logo fijo) */}
      {TARJETAS.map((t) => (
        <Sequence key={t.desdeMs} {...tramo(t)} name={t.nombre}>
          <Bajar>{t.el(t.desdeMs)}</Bajar>
        </Sequence>
      ))}
      <Subtitulos
        src="mv20/v-cut-captions.json"
        hastaMs={DURACION_MV20_VIDEO_MS}
        palabrasClave={[
          "vallenato", "chinita", "maracaibo,", "amanecer", "elder", "dayán", "churo", "alex", "manga,",
          "nelson", "penchy", "silvestre", "dangond,", "inolvidable", "21", "riohacha,", "riohacha.",
          "blanca\",", "fawell", "kiko", "dios\".", "dios\",", "fonseca.", "fonseca,", "guajira.",
          "bogotá", "5", "diciembre",
        ]}
        estilo={{ fontSize: 56, top: 1250, borde: 9, agruparMs: 1500 }}
        ocultos={SEPARADORES}
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
