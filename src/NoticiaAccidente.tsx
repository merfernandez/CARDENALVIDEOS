import { Video } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import type { z } from "zod";
import { ApoyoSobrio } from "./ApoyoSobrio";
import { CierreNoticias } from "./CierreNoticias";
import { noticiasSchema } from "./NoticiasVallenatas";
import { RotuloNoticia } from "./RotuloNoticia";
import { Subtitulos } from "./Subtitulos";
import { TarjetaSobria } from "./TarjetasNoticia";
import { APOYOS, TARJETAS } from "./videos/noticias-accidente";

export const NoticiaAccidente: React.FC<z.infer<typeof noticiasSchema>> = ({
  video,
  subtitulos,
  seccion,
  nombre,
  cargo,
  instagram,
  rotuloHastaSeg,
  cierreInicioSeg,
}) => {
  const { fps } = useVideoConfig();
  const f = (ms: number) => Math.round((ms / 1000) * fps);
  const tramo = (t: { desdeMs: number; hastaMs: number }) => ({
    from: f(t.desdeMs),
    durationInFrames: f(t.hastaMs - t.desdeMs),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
      <Video src={staticFile(video)} objectFit="cover" />
      <ApoyoSobrio apoyos={APOYOS} />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />
      {TARJETAS.map((t) => (
        <Sequence key={t.desdeMs} {...tramo(t)} name={t.titulo}>
          <TarjetaSobria antetitulo={t.antetitulo} titulo={t.titulo} />
        </Sequence>
      ))}
      <Subtitulos
        src={subtitulos}
        hastaMs={cierreInicioSeg * 1000}
        palabrasClave={[]}
        estilo={{
          fontSize: 52,
          top: 1250,
          borde: 9,
          agruparMs: 1800,
          sobrio: true,
        }}
      />
      <Sequence
        from={6}
        durationInFrames={Math.round(rotuloHastaSeg * fps) - 6}
        name="Rótulo William"
      >
        <RotuloNoticia
          seccion={seccion}
          nombre={nombre}
          cargo={cargo}
          instagram={instagram}
        />
      </Sequence>
      <Sequence from={f(cierreInicioSeg * 1000)} name="Cierre">
        <CierreNoticias
          seccion={seccion}
          invitacion="Síguenos en"
          web="www.cardenalstereo.com"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
