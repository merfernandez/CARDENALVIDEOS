import { Composition, staticFile } from "remotion";
import { z } from "zod";
import { CardenalReel, cardenalReelSchema } from "./CardenalReel";
import { FiestaDuo, fiestaDuoSchema } from "./FiestaDuo";
import { NoticiaAccidente, noticiaSeriaSchema } from "./NoticiaAccidente";
import { NoticiaGamarra } from "./NoticiaGamarra";
import { NoticiasVallenatas, noticiasSchema } from "./NoticiasVallenatas";
import { getVideoDurationInSeconds } from "./get-video-duration";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CardenalReel"
        component={CardenalReel}
        fps={FPS}
        width={1080}
        height={1920}
        durationInFrames={FPS * 10}
        schema={cardenalReelSchema}
        defaultProps={{
          video: "william-cut.mp4",
          subtitulos: "william-cut-captions.json",
          nombre: "William de la Rosa",
          cargo: "Director artístico del Sistema Cardenal",
          instagram: "wdelarosac",
          rotuloDuracionSeg: 10,
          cierreInicioSeg: 16.69,
          cierreExtraSeg: 1.5,
          cierreFecha: "31 de octubre",
          cierreHora: "4:00 p.m.",
          cierreLugar: "Suchiimma",
        }}
        calculateMetadata={async ({ props }) => {
          if (!props.video) {
            return {};
          }
          const seconds = await getVideoDurationInSeconds(
            staticFile(props.video),
          );
          return {
            durationInFrames: Math.max(
              1,
              Math.floor((seconds + props.cierreExtraSeg) * FPS),
            ),
          };
        }}
      />
      <Composition
        id="FiestaDuo"
        component={FiestaDuo}
        fps={FPS}
        width={1080}
        height={1920}
        durationInFrames={FPS * 10}
        schema={fiestaDuoSchema}
        defaultProps={{
          video: "video2-cut.mp4",
          subtitulos: "video2-cut-captions.json",
          cierreInicioSeg: 34.2,
          cierreExtraSeg: 3.5,
          cierreFecha: "31 de octubre",
          cierreHora: "4:00 p.m.",
          cierreLugar: "Suchiimma",
        }}
        calculateMetadata={async ({ props }) => {
          const seconds = await getVideoDurationInSeconds(
            staticFile(props.video),
          );
          return {
            durationInFrames: Math.floor(
              (seconds + props.cierreExtraSeg) * FPS,
            ),
          };
        }}
      />
      <Composition
        id="NoticiasLaCorriente"
        component={NoticiasVallenatas}
        fps={FPS}
        width={1080}
        height={1920}
        durationInFrames={FPS * 10}
        schema={noticiasSchema}
        defaultProps={{
          video: "noticias1-cut.mp4",
          subtitulos: "noticias1-cut-captions.json",
          seccion: "Noticias vallenatas",
          nombre: "William de la Rosa",
          cargo: "Director artístico del Sistema Cardenal",
          instagram: "wdelarosac",
          rotuloHastaSeg: 15,
          cierreInicioSeg: 29.5,
          cierreExtraSeg: 4,
        }}
        calculateMetadata={async ({ props }) => {
          const seconds = await getVideoDurationInSeconds(
            staticFile(props.video),
          );
          return {
            durationInFrames: Math.floor(
              (seconds + props.cierreExtraSeg) * FPS,
            ),
          };
        }}
      />
      <Composition
        id="NoticiaGamarra"
        component={NoticiaGamarra}
        fps={FPS}
        width={1080}
        height={1920}
        durationInFrames={FPS * 10}
        schema={noticiasSchema}
        defaultProps={{
          video: "gamarra-cut.mp4",
          subtitulos: "gamarra-cut-captions.json",
          seccion: "Noticias vallenatas",
          nombre: "William de la Rosa",
          cargo: "Director artístico del Sistema Cardenal",
          instagram: "wdelarosac",
          rotuloHastaSeg: 5,
          cierreInicioSeg: 41.95,
          cierreExtraSeg: 2.6,
        }}
        calculateMetadata={async ({ props }) => {
          const seconds = await getVideoDurationInSeconds(
            staticFile(props.video),
          );
          return {
            durationInFrames: Math.floor(
              (seconds + props.cierreExtraSeg) * FPS,
            ),
          };
        }}
      />
      <Composition
        id="NoticiaAccidente"
        component={NoticiaAccidente}
        fps={FPS}
        width={1080}
        height={1920}
        durationInFrames={FPS * 10}
        schema={noticiaSeriaSchema}
        defaultProps={{
          plan: "accidente",
          cierreTitulo: "Noticia en desarrollo",
          video: "accidente-cut.mp4",
          subtitulos: "accidente-cut-captions.json",
          seccion: "Noticia en desarrollo",
          nombre: "William de la Rosa",
          cargo: "Director artístico del Sistema Cardenal",
          instagram: "wdelarosac",
          rotuloHastaSeg: 5,
          cierreInicioSeg: 48.6,
          cierreExtraSeg: 3,
        }}
        calculateMetadata={async ({ props }) => {
          const seconds = await getVideoDurationInSeconds(
            staticFile(props.video),
          );
          return {
            durationInFrames: Math.floor(
              (seconds + props.cierreExtraSeg) * FPS,
            ),
          };
        }}
      />
      <Composition
        id="NoticiaSeguimiento"
        component={NoticiaAccidente}
        fps={FPS}
        width={1080}
        height={1920}
        durationInFrames={FPS * 10}
        schema={noticiaSeriaSchema}
        defaultProps={{
          plan: "seguimiento",
          cierreTitulo: "Seguiremos informando",
          video: "seguimiento-cut.mp4",
          subtitulos: "seguimiento-cut-captions.json",
          seccion: "Seguimiento",
          nombre: "William de la Rosa",
          cargo: "Director artístico del Sistema Cardenal",
          instagram: "wdelarosac",
          rotuloHastaSeg: 5,
          cierreInicioSeg: 66.85,
          cierreExtraSeg: 4,
        }}
        calculateMetadata={async ({ props }) => {
          const seconds = await getVideoDurationInSeconds(
            staticFile(props.video),
          );
          return {
            durationInFrames: Math.floor(
              (seconds + props.cierreExtraSeg) * FPS,
            ),
          };
        }}
      />
    </>
  );
};

export type CardenalReelProps = z.infer<typeof cardenalReelSchema>;
