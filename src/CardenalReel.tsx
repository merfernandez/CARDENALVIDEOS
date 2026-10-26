import { Video } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { z } from "zod";
import { Cierre } from "./Cierre";
import { LogoMarca } from "./LogoMarca";
import { Rotulo } from "./Rotulo";
import { Stickers } from "./Stickers";
import { Subtitulos } from "./Subtitulos";
import { PALABRAS_CLAVE, STICKERS, ZOOMS } from "./videos/william";
import { Zoom } from "./Zoom";

export const cardenalReelSchema = z.object({
  // Nombre del archivo dentro de la carpeta public/ (vacío = fondo de prueba)
  video: z.string(),
  subtitulos: z.string(),
  nombre: z.string(),
  cargo: z.string(),
  instagram: z.string(),
  rotuloDuracionSeg: z.number().min(1),
  cierreInicioSeg: z.number().min(0),
  // Segundos que el cierre se queda en pantalla después de que termina el video
  cierreExtraSeg: z.number().min(0),
  cierreFecha: z.string(),
  cierreHora: z.string(),
  cierreLugar: z.string(),
});

export const CardenalReel: React.FC<z.infer<typeof cardenalReelSchema>> = ({
  video,
  subtitulos,
  nombre,
  cargo,
  instagram,
  rotuloDuracionSeg,
  cierreInicioSeg,
  cierreFecha,
  cierreHora,
  cierreLugar,
}) => {
  const { fps } = useVideoConfig();
  const cierreFrame = Math.round(cierreInicioSeg * fps);

  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
      <Zoom zooms={ZOOMS}>
        {video ? (
          <Video src={staticFile(video)} objectFit="cover" />
        ) : (
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(160deg, #3a3f4a 0%, #1b1d22 55%, #2a1416 100%)",
            }}
          />
        )}
      </Zoom>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.45) 100%)",
        }}
      />
      <Sequence durationInFrames={cierreFrame} name="Stickers">
        <Stickers stickers={STICKERS} />
      </Sequence>
      {subtitulos ? (
        <Subtitulos
          src={subtitulos}
          hastaMs={cierreInicioSeg * 1000}
          palabrasClave={PALABRAS_CLAVE}
        />
      ) : null}
      <Sequence durationInFrames={cierreFrame} name="Logo">
        <LogoMarca />
      </Sequence>
      <Sequence
        durationInFrames={Math.min(
          Math.round(rotuloDuracionSeg * fps),
          cierreFrame,
        )}
        name="Nombre"
      >
        <Rotulo nombre={nombre} cargo={cargo} instagram={instagram} />
      </Sequence>
      <Sequence from={cierreFrame} name="Cierre">
        <Cierre fecha={cierreFecha} hora={cierreHora} lugar={cierreLugar} />
      </Sequence>
    </AbsoluteFill>
  );
};
