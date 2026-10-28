import { Video } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { z } from "zod";
import { ApoyoSobrio, type ApoyoPlan } from "./ApoyoSobrio";
import { CierreNoticias } from "./CierreNoticias";
import { RotuloNoticia } from "./RotuloNoticia";
import { Subtitulos } from "./Subtitulos";
import {
  TarjetaArtistas,
  TarjetaCancion,
  TarjetaSobria,
} from "./TarjetasNoticia";
import { plan as v1 } from "./videos/hoy-v1";

type Tramo = { desdeMs: number; hastaMs: number };
export type TarjetaPlan = Tramo &
  (
    | { tipo: "sobria"; antetitulo: string; titulo: string }
    | { tipo: "artistas"; artistas: { nombre: string; ms: number }[] }
    | { tipo: "cancion"; etiqueta: string; titulo: string; detalle: string }
  );

// Plan de una noticia del día: video de William, tarjetas, apoyos y cierre
export type PlanNoticia = {
  video: string;
  subtitulos: string;
  seccion: string;
  tarjetas: TarjetaPlan[];
  apoyos?: ApoyoPlan[];
  palabrasClave: string[];
  // Noticias serias: subtítulos sin recuadro ni pop
  sobrio?: boolean;
};

export const PLANES_HOY = { v1 };

export const noticiaHoySchema = z.object({
  plan: z.enum(["v1"]),
  rotuloSeg: z.number(),
  cierreExtraSeg: z.number(),
});

const NOMBRE = "William de la Rosa";
const CARGO = "Director artístico del Sistema Cardenal";

export const NoticiaHoy: React.FC<z.infer<typeof noticiaHoySchema>> = ({
  plan,
  rotuloSeg,
  cierreExtraSeg,
}) => {
  const { fps, durationInFrames } = useVideoConfig();
  const p = PLANES_HOY[plan];
  const f = (ms: number) => Math.round((ms / 1000) * fps);
  const cierre = durationInFrames - Math.round(cierreExtraSeg * fps);
  const tramo = (t: Tramo) => ({
    from: f(t.desdeMs),
    durationInFrames: f(t.hastaMs - t.desdeMs),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
      <Video src={staticFile(p.video)} objectFit="cover" />
      {p.apoyos ? <ApoyoSobrio apoyos={p.apoyos} /> : null}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.4) 100%)",
        }}
      />
      {p.tarjetas.map((t) => (
        <Sequence key={t.desdeMs} {...tramo(t)} name={t.tipo}>
          {t.tipo === "sobria" ? (
            <TarjetaSobria antetitulo={t.antetitulo} titulo={t.titulo} />
          ) : t.tipo === "artistas" ? (
            <TarjetaArtistas desdeMs={t.desdeMs} artistas={t.artistas} />
          ) : (
            <TarjetaCancion
              etiqueta={t.etiqueta}
              titulo={t.titulo}
              detalle={t.detalle}
            />
          )}
        </Sequence>
      ))}
      <Subtitulos
        src={p.subtitulos}
        hastaMs={(cierre / fps) * 1000}
        palabrasClave={p.palabrasClave}
        estilo={{
          fontSize: 54,
          top: 1250,
          borde: 9,
          agruparMs: 1700,
          sobrio: p.sobrio,
        }}
      />
      <Sequence
        from={6}
        durationInFrames={Math.round(rotuloSeg * fps) - 6}
        name="Rótulo William"
      >
        <RotuloNoticia
          seccion={p.seccion}
          nombre={NOMBRE}
          cargo={CARGO}
          instagram="wdelarosac"
        />
      </Sequence>
      <Sequence from={cierre} name="Cierre">
        <CierreNoticias
          seccion={p.seccion}
          invitacion="Síguenos en"
          web="www.cardenalstereo.com"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
