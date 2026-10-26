import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { ApoyoCompleto } from "./PantallaDividida";
import { CierreNoticias } from "./CierreNoticias";
import { noticiasSchema } from "./NoticiasVallenatas";
import { RotuloNoticia } from "./RotuloNoticia";
import { Subtitulos } from "./Subtitulos";
import { TarjetaCancion, TarjetaMarcador } from "./TarjetasNoticia";
import {
  ALBUM,
  AMARILLO,
  TRAMOS_APOYO,
  NOMBRES,
  PALABRAS_CLAVE,
} from "./videos/noticias-gamarra";
import type { z } from "zod";

export const NoticiaGamarra: React.FC<z.infer<typeof noticiasSchema>> = ({
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
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.4) 100%)",
        }}
      />
      <ApoyoCompleto tramos={TRAMOS_APOYO} colorLinea={AMARILLO} />
      {NOMBRES.map((n) => (
        <Sequence
          key={n.desdeMs}
          {...tramo(n)}
          name={`Oscar Gamarra: ${n.etiqueta}`}
        >
          <TarjetaMarcador
            nombre="Oscar Gamarra"
            etiqueta={n.etiqueta}
            color={AMARILLO}
          />
        </Sequence>
      ))}
      <Sequence {...tramo(ALBUM)} name="Álbum">
        <TarjetaCancion {...ALBUM} color={AMARILLO} />
      </Sequence>
      <Subtitulos
        src={subtitulos}
        hastaMs={cierreInicioSeg * 1000}
        palabrasClave={PALABRAS_CLAVE}
        estilo={{
          fontSize: 54,
          top: 1250,
          borde: 9,
          agruparMs: 1700,
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
          rapido
        />
      </Sequence>
    </AbsoluteFill>
  );
};
