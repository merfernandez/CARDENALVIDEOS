import type { Caption, TikTokPage } from "@remotion/captions";
import { createTikTokStyleCaptions } from "@remotion/captions";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AbsoluteFill,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useDelayRender,
  useVideoConfig,
} from "remotion";
import { BLANCO, fontFamily, NEGRO, ROJO } from "./brand";
import { FraseDestacada } from "./FraseDestacada";
import type { Destacado } from "./tipos";

const limpiar = (texto: string) =>
  texto.trim().toLowerCase().replace(/[.,]/g, "");

const SWITCH_CAPTIONS_EVERY_MS = 1100;

export type EstiloSubtitulos = {
  fontSize: number;
  top: number;
  borde: number;
  // Cada cuánto cambia la frase: más alto = más palabras a la vez
  agruparMs?: number;
  // Color de las palabras clave y del recuadro de la palabra que se dice
  colorClave?: string;
  colorActivo?: string;
  textoActivo?: string;
  // Noticias serias: sin recuadro en la palabra que se dice y sin "pop"
  sobrio?: boolean;
};

const ESTILO_NORMAL: EstiloSubtitulos = { fontSize: 76, top: 1180, borde: 12 };

const Pagina: React.FC<{
  page: TikTokPage;
  claves: string[];
  estilo: EstiloSubtitulos;
}> = ({ page, claves, estilo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const absoluteTimeMs = page.startMs + (frame / fps) * 1000;

  return (
    <AbsoluteFill
      style={{ justifyContent: "flex-start", alignItems: "center" }}
    >
      <div
        style={{
          position: "absolute",
          top: estilo.top,
          width: 900,
          textAlign: "center",
          fontFamily,
          fontWeight: 900,
          fontSize: estilo.fontSize,
          lineHeight: 1.15,
          textTransform: "uppercase",
          whiteSpace: "pre-wrap",
        }}
      >
        {page.tokens.map((token, i) => {
          const active =
            !estilo.sobrio &&
            token.fromMs <= absoluteTimeMs &&
            token.toMs > absoluteTimeMs;
          const clave = claves.includes(limpiar(token.text));
          // Cada palabra aparece con un "pop" cuando se dice
          const aparicion = spring({
            frame,
            fps,
            delay: Math.round(((token.fromMs - page.startMs) / 1000) * fps),
            durationInFrames: 7,
            config: { damping: 12, stiffness: 260 },
          });
          return (
            <span key={`${token.fromMs}-${i}`}>
              {token.text.startsWith(" ") ? " " : ""}
              <span
                style={{
                  color: active
                    ? (estilo.textoActivo ?? BLANCO)
                    : clave
                      ? (estilo.colorClave ?? ROJO)
                      : BLANCO,
                  padding: "0 8px",
                  borderRadius: 14,
                  backgroundColor: active
                    ? (estilo.colorActivo ?? ROJO)
                    : "transparent",
                  WebkitTextStroke: active
                    ? "0px"
                    : `${estilo.borde}px ${NEGRO}`,
                  paintOrder: "stroke fill",
                  display: "inline-block",
                  opacity: estilo.sobrio
                    ? Math.min(1, aparicion * 1.5)
                    : aparicion > 0.01
                      ? 1
                      : 0,
                  transform: estilo.sobrio
                    ? undefined
                    : `scale(${(0.5 + aparicion * 0.5) * (active ? 1.08 : 1)})`,
                }}
              >
                {token.text.trim()}
              </span>
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const Subtitulos: React.FC<{
  src: string;
  hastaMs: number;
  palabrasClave: string[];
  destacados?: Destacado[];
  estilo?: EstiloSubtitulos;
  // Tramos sin subtítulos (p. ej. mientras un afiche "habla solo")
  ocultos?: { desdeMs: number; hastaMs: number }[];
}> = ({
  src,
  hastaMs,
  palabrasClave,
  destacados = [],
  estilo = ESTILO_NORMAL,
  ocultos = [],
}) => {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() => delayRender());
  const { fps } = useVideoConfig();

  const fetchCaptions = useCallback(async () => {
    try {
      const response = await fetch(staticFile(src));
      setCaptions(await response.json());
      continueRender(handle);
    } catch (e) {
      cancelRender(e);
    }
  }, [continueRender, cancelRender, handle, src]);

  useEffect(() => {
    fetchCaptions();
  }, [fetchCaptions]);

  const pages = useMemo(() => {
    if (!captions) return [];
    return createTikTokStyleCaptions({
      // Las palabras de las frases destacadas no van en los subtítulos normales
      captions: captions.filter(
        (c) =>
          c.startMs < hastaMs &&
          !destacados.some(
            (d) => c.startMs >= d.desdeMs && c.startMs < d.hastaMs,
          ) &&
          !ocultos.some((d) => c.startMs >= d.desdeMs && c.startMs < d.hastaMs),
      ),
      combineTokensWithinMilliseconds:
        estilo.agruparMs ?? SWITCH_CAPTIONS_EVERY_MS,
    }).pages;
  }, [captions, hastaMs, destacados, ocultos, estilo.agruparMs]);

  return (
    <AbsoluteFill>
      {pages.map((page, index) => {
        const nextPage = pages[index + 1] ?? null;
        const startFrame = Math.round((page.startMs / 1000) * fps);
        const endFrame = Math.round(
          (Math.min(
            nextPage ? nextPage.startMs : Infinity,
            ...[...destacados, ...ocultos]
              .map((d) => d.desdeMs)
              .filter((ms) => ms > page.startMs),
            page.startMs + page.durationMs + 400,
            hastaMs,
          ) /
            1000) *
            fps,
        );
        if (endFrame - startFrame <= 0) return null;
        return (
          <Sequence
            key={index}
            from={startFrame}
            durationInFrames={endFrame - startFrame}
            name={page.text}
          >
            <Pagina page={page} claves={palabrasClave} estilo={estilo} />
          </Sequence>
        );
      })}
      {destacados.map((d) => (
        <Sequence
          key={d.desdeMs}
          from={Math.round((d.desdeMs / 1000) * fps)}
          durationInFrames={Math.round(((d.hastaMs - d.desdeMs) / 1000) * fps)}
          name={d.lineas.map((l) => l.texto).join(" ")}
        >
          <FraseDestacada destacado={d} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
