import { Video } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { z } from "zod";
import { CierreNoticias } from "./CierreNoticias";
import { RotuloNoticia } from "./RotuloNoticia";
import { Subtitulos } from "./Subtitulos";
import {
  TarjetaArtistas,
  TarjetaCancion,
  TarjetaPlataformas,
} from "./TarjetasNoticia";
import {
  ARTISTA_CANTOR,
  ARTISTAS_1,
  ARTISTAS_2,
  CANCION,
  PALABRAS_CLAVE,
  PLATAFORMAS,
  ZOOMS,
} from "./videos/noticias-la-corriente";
import { Zoom } from "./Zoom";

export const noticiasSchema = z.object({
  video: z.string(),
  subtitulos: z.string(),
  seccion: z.string(),
  nombre: z.string(),
  cargo: z.string(),
  instagram: z.string(),
  rotuloHastaSeg: z.number(),
  cierreInicioSeg: z.number(),
  // Segundos que el cierre se queda en pantalla después de que termina el video
  cierreExtraSeg: z.number().min(0),
});

const seg = (ms: number, fps: number) => Math.round((ms / 1000) * fps);

export const NoticiasVallenatas: React.FC<z.infer<typeof noticiasSchema>> = ({
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
  const cierreFrame = Math.round(cierreInicioSeg * fps);
  const tramo = (t: { desdeMs: number; hastaMs: number }) => ({
    from: seg(t.desdeMs, fps),
    durationInFrames: seg(t.hastaMs - t.desdeMs, fps),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
      <Zoom zooms={ZOOMS}>
        <Video src={staticFile(video)} objectFit="cover" />
      </Zoom>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.4) 100%)",
        }}
      />
      <Sequence {...tramo(ARTISTAS_1)} name="Artistas">
        <TarjetaArtistas {...ARTISTAS_1} />
      </Sequence>
      <Sequence {...tramo(CANCION)} name="Canción">
        <TarjetaCancion {...CANCION} />
      </Sequence>
      <Sequence {...tramo(ARTISTA_CANTOR)} name="El cantor">
        <TarjetaArtistas {...ARTISTA_CANTOR} />
      </Sequence>
      <Sequence {...tramo(PLATAFORMAS)} name="Plataformas">
        <TarjetaPlataformas {...PLATAFORMAS} />
      </Sequence>
      <Sequence {...tramo(ARTISTAS_2)} name="Artistas (final)">
        <TarjetaArtistas {...ARTISTAS_2} />
      </Sequence>
      <Subtitulos
        src={subtitulos}
        hastaMs={cierreInicioSeg * 1000}
        palabrasClave={PALABRAS_CLAVE}
        estilo={{ fontSize: 54, top: 1250, borde: 9, agruparMs: 1700 }}
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
      <Sequence from={cierreFrame} name="Cierre">
        <CierreNoticias seccion={seccion} lema="Cardenal Stereo 91.7 FM" />
      </Sequence>
    </AbsoluteFill>
  );
};
