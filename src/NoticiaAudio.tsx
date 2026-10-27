import { Audio, Video } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { ApoyoSobrio } from "./ApoyoSobrio";
import { Audiograma, AudiogramaMini } from "./Audiograma";
import { BLANCO, fontFamily, ROJO } from "./brand";
import { CierreNoticias } from "./CierreNoticias";
import { RotuloNoticia } from "./RotuloNoticia";
import { Subtitulos } from "./Subtitulos";
import { TarjetaCifras, TarjetaSobria } from "./TarjetasNoticia";
import {
  APOYOS_NOTA,
  CIFRAS,
  DURACION_FINAL_MS,
  DURACION_INICIO_MS,
  DURACION_NOTA_MS,
  TARJETAS_NOTA,
} from "./videos/kbeto-audio";

export const DURACION_CIERRE_MS = 4000;
export const DURACION_TOTAL_MS =
  DURACION_INICIO_MS +
  DURACION_NOTA_MS +
  DURACION_FINAL_MS +
  DURACION_CIERRE_MS;

const NOMBRE = "William de la Rosa";
const CARGO = "Director artístico del Sistema Cardenal";

const EtiquetaDesarrollo: React.FC = () => (
  <AbsoluteFill style={{ alignItems: "center", fontFamily }}>
    <div
      style={{
        position: "absolute",
        top: 120,
        display: "flex",
        alignItems: "center",
        gap: 12,
        backgroundColor: ROJO,
        color: BLANCO,
        fontWeight: 800,
        fontSize: 26,
        letterSpacing: 5,
        textTransform: "uppercase",
        padding: "10px 22px",
        borderRadius: 8,
        boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
      }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: BLANCO,
        }}
      />
      Noticia en desarrollo
    </div>
  </AbsoluteFill>
);

// Inicio en video + nota de audio (audiograma con apoyos) + video final + cierre
export const NoticiaAudio: React.FC = () => {
  const { fps } = useVideoConfig();
  const f = (ms: number) => Math.round((ms / 1000) * fps);
  const nota = f(DURACION_INICIO_MS);
  const final = nota + f(DURACION_NOTA_MS);
  const cierre = final + f(DURACION_FINAL_MS);
  const tramo = (t: { desdeMs: number; hastaMs: number }) => ({
    from: f(t.desdeMs),
    durationInFrames: f(t.hastaMs - t.desdeMs),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
      <Sequence durationInFrames={nota} name="Video de inicio">
        <Video src={staticFile("kbeto/inicio-cut.mp4")} objectFit="cover" />
        <Sequence from={6} durationInFrames={f(5000)} name="Rótulo William">
          <RotuloNoticia
            seccion="Noticia en desarrollo"
            nombre={NOMBRE}
            cargo={CARGO}
            instagram="wdelarosac"
          />
        </Sequence>
      </Sequence>

      <Sequence
        from={nota}
        durationInFrames={final - nota}
        name="Nota de audio"
      >
        <Audio src={staticFile("audio-nota.m4a")} />
        <Audiograma
          envolvente="kbeto/nota-envolvente.json"
          nombre={NOMBRE}
          cargo={CARGO}
        />
        <ApoyoSobrio apoyos={APOYOS_NOTA} />
        {APOYOS_NOTA.map((a) => (
          <Sequence key={a.desdeMs} {...tramo(a)} name="Mini audiograma">
            <AudiogramaMini
              envolvente="kbeto/nota-envolvente.json"
              nombre={NOMBRE}
            />
          </Sequence>
        ))}
        {TARJETAS_NOTA.map((t) => (
          <Sequence key={t.desdeMs} {...tramo(t)} name={t.titulo}>
            <TarjetaSobria antetitulo={t.antetitulo} titulo={t.titulo} />
          </Sequence>
        ))}
        <Sequence {...tramo(CIFRAS)} name="Cifras">
          <TarjetaCifras
            antetitulo={CIFRAS.antetitulo}
            cifras={CIFRAS.cifras}
            top={1420}
          />
        </Sequence>
        <EtiquetaDesarrollo />
      </Sequence>

      <Sequence
        from={final}
        durationInFrames={cierre - final}
        name="Video final"
      >
        <Video src={staticFile("kbeto/final-cut.mp4")} objectFit="cover" />
      </Sequence>

      <Subtitulos
        src="kbeto/captions-total.json"
        hastaMs={DURACION_INICIO_MS + DURACION_NOTA_MS + DURACION_FINAL_MS}
        palabrasClave={[]}
        estilo={{
          fontSize: 52,
          top: 1250,
          borde: 9,
          agruparMs: 1800,
          sobrio: true,
        }}
      />

      <Sequence from={cierre} name="Cierre">
        <CierreNoticias
          seccion="Seguiremos informando"
          invitacion="Síguenos en"
          web="www.cardenalstereo.com"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
