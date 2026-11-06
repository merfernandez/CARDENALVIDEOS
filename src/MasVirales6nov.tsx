// "Las Más Virales" del viernes 6 de noviembre. Tiempos en ms del video ya sin silencios.
import { Video } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { ApoyoSobrio } from "./ApoyoSobrio";
import { CierreNoticias } from "./CierreNoticias";
import { FotoEsquina } from "./FotoEsquina";
import { Bajar, LogoFijo, Separador } from "./MasViralesVideo";
import { PortadaAlbum } from "./PortadaAlbum";
import { RotuloNoticia } from "./RotuloNoticia";
import { Subtitulos } from "./Subtitulos";
import { TarjetaCancion, TarjetaSobria } from "./TarjetasNoticia";

const VIDEO = "mv2/v-cut.mp4";
export const DURACION_MV6_VIDEO_MS = 92150;
export const DURACION_MV6_MS = DURACION_MV6_VIDEO_MS + 4000;

const f = (ms: number, fps: number) => Math.round((ms / 1000) * fps);

const SEPARADORES = [
  {
    desdeMs: 7600,
    hastaMs: 9000,
    numero: 1,
    titulo: "Poncho Zuleta",
    detalle: "Comunicado a la opinión pública",
  },
  {
    desdeMs: 40200,
    hastaMs: 41600,
    numero: 2,
    titulo: "Edgar y Goyo",
    detalle: "Lanzan «Lo que tú querías»",
  },
  {
    desdeMs: 64400,
    hastaMs: 65800,
    numero: 3,
    titulo: "Carlos Bloom",
    detalle: "Lo más viral de la semana",
  },
];

// #1: el comunicado completo a pantalla (sobrio, con fondo desenfocado)
const COMUNICADO = [
  {
    desdeMs: 9100,
    hastaMs: 16000,
    src: "mv2/comunicado-poncho.jpg",
    proporcion: 1320 / 1683,
  },
];

const ESQUINAS = [
  // #1: Kbeto, de quien se habla
  {
    desdeMs: 20100,
    hastaMs: 25400,
    src: "kbeto/kbeto.jpg",
    lado: "der" as const,
  },
  // #1: Poncho llegando a acompañar a su hijo
  {
    desdeMs: 33400,
    hastaMs: 40100,
    src: "kbeto/poncho.mp4",
    desdeSeg: 2,
    lado: "der" as const,
  },
  // #3: el podcast, solo un momento
  {
    desdeMs: 67200,
    hastaMs: 71000,
    src: "cb/apoyo.mp4",
    desdeSeg: 40,
    lado: "der" as const,
  },
];

export const MasVirales6nov: React.FC = () => {
  const { fps } = useVideoConfig();
  const tramo = (t: { desdeMs: number; hastaMs: number }) => ({
    from: f(t.desdeMs, fps),
    durationInFrames: f(t.hastaMs - t.desdeMs, fps),
  });
  const cierre = f(DURACION_MV6_VIDEO_MS, fps);
  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
      <Video src={staticFile(VIDEO)} objectFit="cover" />
      <ApoyoSobrio apoyos={COMUNICADO} />
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
      <Sequence
        {...tramo({ desdeMs: 44000, hastaMs: 52300 })}
        name="Portada Edgar y Goyo"
      >
        <PortadaAlbum
          src="mv2/edgar-goyo.jpg"
          lado="der"
          etiqueta="EP en vivo"
        />
      </Sequence>
      {/* Tarjetas abajo (arriba está el logo fijo) */}
      <Sequence {...tramo({ desdeMs: 26300, hastaMs: 33300 })} name="Pausa">
        <Bajar>
          <TarjetaSobria
            antetitulo="Poncho Zuleta"
            titulo="Pausa en sus presentaciones"
          />
        </Bajar>
      </Sequence>
      <Sequence {...tramo({ desdeMs: 47000, hastaMs: 52500 })} name="EP">
        <Bajar>
          <TarjetaCancion
            etiqueta="EP · 4 canciones"
            titulo="Lo que tú querías"
            detalle="Edgar y Goyo"
          />
        </Bajar>
      </Sequence>
      <Sequence
        {...tramo({ desdeMs: 58500, hastaMs: 64200 })}
        name="Disponible"
      >
        <Bajar>
          <TarjetaSobria
            antetitulo="Ya disponible"
            titulo="En plataformas digitales"
          />
        </Bajar>
      </Sequence>
      <Sequence {...tramo({ desdeMs: 77300, hastaMs: 81000 })} name="Churo">
        <Bajar>
          <TarjetaSobria
            antetitulo="Según Carlos Bloom"
            titulo="Churo Díaz, el artista del momento"
          />
        </Bajar>
      </Sequence>
      <Sequence {...tramo({ desdeMs: 81100, hastaMs: 86300 })} name="Top 5">
        <Bajar>
          <TarjetaSobria
            antetitulo="Carlos Bloom"
            titulo="Su top 5 de la nueva generación"
          />
        </Bajar>
      </Sequence>
      <Subtitulos
        src="mv2/v-cut-captions.json"
        hastaMs={DURACION_MV6_VIDEO_MS}
        palabrasClave={[
          "poncho",
          "zuleta",
          "zuleta.",
          "comunicado",
          "kbeto",
          "accidente",
          "escenarios,",
          "padre,",
          "edgar",
          "goyo",
          "goyo.",
          "querías",
          "cuatro",
          "canciones",
          "dímelo",
          "king",
          "carlos",
          "bloom,",
          "churo",
          "díaz",
          "top",
          "5",
          "viral",
        ]}
        estilo={{ fontSize: 56, top: 1250, borde: 9, agruparMs: 1500 }}
        ocultos={[...SEPARADORES, ...COMUNICADO]}
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
