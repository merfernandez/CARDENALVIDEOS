import { Video } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { z } from "zod";
import { CierreHalloween } from "./CierreHalloween";
import { Rotulo } from "./Rotulo";
import { Subtitulos } from "./Subtitulos";
import {
  ORADORES,
  PALABRAS_CLAVE,
  DESTACADOS,
  ZOOMS,
} from "./videos/fiesta-duo";
import { Zoom } from "./Zoom";

export const fiestaDuoSchema = z.object({
  video: z.string(),
  subtitulos: z.string(),
  cierreInicioSeg: z.number().min(0),
  // Segundos que el cierre se queda en pantalla después de que termina el video
  cierreExtraSeg: z.number().min(0),
  cierreFecha: z.string(),
  cierreHora: z.string(),
  cierreLugar: z.string(),
});

export const FiestaDuo: React.FC<z.infer<typeof fiestaDuoSchema>> = ({
  video,
  subtitulos,
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
        <Video src={staticFile(video)} objectFit="cover" />
      </Zoom>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.45) 100%)",
        }}
      />
      <Subtitulos
        src={subtitulos}
        hastaMs={cierreInicioSeg * 1000}
        palabrasClave={PALABRAS_CLAVE}
        destacados={DESTACADOS}
      />
      {ORADORES.map((o) => (
        <Sequence
          key={o.nombre}
          from={Math.round(o.desdeSeg * fps)}
          durationInFrames={Math.round((o.hastaSeg - o.desdeSeg) * fps)}
          name={o.nombre}
        >
          <Rotulo
            nombre={o.nombre}
            cargo={o.cargo}
            instagram={o.instagram}
            lado={o.lado}
          />
        </Sequence>
      ))}
      <Sequence from={cierreFrame} name="Cierre">
        <CierreHalloween
          fecha={cierreFecha}
          hora={cierreHora}
          lugar={cierreLugar}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
