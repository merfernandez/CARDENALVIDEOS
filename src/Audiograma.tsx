import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useDelayRender,
} from "remotion";
import { BLANCO, fontFamily, ROJO } from "./brand";

// Intensidad de la voz por cuadro (scripts/envolvente_audio.py)
export const useEnvolvente = (src: string) => {
  const [datos, setDatos] = useState<number[] | null>(null);
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() => delayRender());
  useEffect(() => {
    fetch(staticFile(src))
      .then((r) => r.json())
      .then((d) => {
        setDatos(d);
        continueRender(handle);
      })
      .catch(cancelRender);
  }, [src, handle, continueRender, cancelRender]);
  return datos;
};

const valor = (datos: number[] | null, f: number) =>
  datos && f >= 0 && f < datos.length ? datos[f] : 0;

// Foto circular del presentador con anillo que se mueve con su voz
export const FotoVoz: React.FC<{
  foto: string;
  tamano: number;
  // Ancho al que se escala la foto y posición de la cara en ella (px)
  anchoFoto: number;
  caraX: number;
  caraY: number;
  nivel: number;
}> = ({ foto, tamano, anchoFoto, caraX, caraY, nivel }) => (
  <div style={{ position: "relative", width: tamano, height: tamano }}>
    {[1, 2].map((i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `${3 + i}px solid ${ROJO}`,
          transform: `scale(${1 + nivel * 0.12 * i})`,
          opacity: nivel * (0.7 - i * 0.2),
        }}
      />
    ))}
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        overflow: "hidden",
        border: `${Math.max(4, tamano / 60)}px solid ${ROJO}`,
        boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
      }}
    >
      <Img
        src={staticFile(foto)}
        style={{
          position: "absolute",
          width: anchoFoto,
          left: tamano / 2 - caraX,
          top: tamano / 2 - caraY,
        }}
      />
    </div>
  </div>
);

// Barras de onda de sonido a partir de la intensidad de los últimos cuadros
export const OndaVoz: React.FC<{
  datos: number[] | null;
  frame: number;
  barras: number;
  alto: number;
  ancho: number;
}> = ({ datos, frame, barras, alto, ancho }) => {
  const mitad = Math.floor(barras / 2);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: ancho * 0.6,
        height: alto,
      }}
    >
      {Array.from({ length: barras }).map((_, i) => {
        const d = Math.abs(i - mitad);
        const v = valor(datos, frame - d * 2);
        const forma = 1 - (d / (mitad + 1)) * 0.5;
        return (
          <div
            key={i}
            style={{
              width: ancho,
              height: Math.max(ancho, alto * v * forma),
              borderRadius: ancho,
              backgroundColor: d < 3 ? ROJO : BLANCO,
              opacity: 0.9,
            }}
          />
        );
      })}
    </div>
  );
};

// Pantalla de audiograma: fondo de marca, foto que reacciona a la voz y onda
export const Audiograma: React.FC<{
  envolvente: string;
  nombre: string;
  cargo: string;
}> = ({ envolvente, nombre, cargo }) => {
  const frame = useCurrentFrame();
  const datos = useEnvolvente(envolvente);
  const nivel = valor(datos, frame);
  return (
    <AbsoluteFill style={{ fontFamily }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile("kbeto/william-cabina.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(36px) brightness(0.35)",
            transform: "scale(1.2)",
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 36%, rgba(227,6,19,0.25) 0%, rgba(0,0,0,0) 55%)",
        }}
      />
      <AbsoluteFill style={{ alignItems: "center" }}>
        <div style={{ marginTop: 300 }}>
          <FotoVoz
            foto="kbeto/william.jpg"
            tamano={480}
            anchoFoto={1150}
            caraX={612}
            caraY={700}
            nivel={nivel}
          />
        </div>
        <div
          style={{
            marginTop: 40,
            color: BLANCO,
            fontWeight: 800,
            fontSize: 44,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {nombre}
        </div>
        <div
          style={{
            marginTop: 6,
            color: "rgba(255,255,255,0.7)",
            fontWeight: 500,
            fontSize: 26,
          }}
        >
          {cargo}
        </div>
        <div style={{ marginTop: 50 }}>
          <OndaVoz
            datos={datos}
            frame={frame}
            barras={31}
            alto={150}
            ancho={12}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Versión pequeña para mostrar sobre las imágenes de apoyo
export const AudiogramaMini: React.FC<{
  envolvente: string;
  nombre: string;
}> = ({ envolvente, nombre }) => {
  const frame = useCurrentFrame();
  const datos = useEnvolvente(envolvente);
  return (
    <AbsoluteFill style={{ fontFamily }}>
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 1430,
          display: "flex",
          alignItems: "center",
          gap: 18,
          backgroundColor: "rgba(10,10,12,0.8)",
          borderRadius: 999,
          padding: "10px 28px 10px 10px",
        }}
      >
        <FotoVoz
          foto="kbeto/william.jpg"
          tamano={110}
          anchoFoto={280}
          caraX={149}
          caraY={171}
          nivel={valor(datos, frame)}
        />
        <div>
          <div
            style={{
              color: BLANCO,
              fontWeight: 800,
              fontSize: 26,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {nombre}
          </div>
          <div style={{ marginTop: 6 }}>
            <OndaVoz
              datos={datos}
              frame={frame}
              barras={15}
              alto={40}
              ancho={6}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
