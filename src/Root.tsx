import { Composition, staticFile } from "remotion";
import { z } from "zod";
import { CardenalReel, cardenalReelSchema } from "./CardenalReel";
import { FiestaDuo, fiestaDuoSchema } from "./FiestaDuo";
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
    </>
  );
};

export type CardenalReelProps = z.infer<typeof cardenalReelSchema>;
