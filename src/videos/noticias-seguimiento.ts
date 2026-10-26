// Seguimiento al accidente de la agrupación de Kbeto Zuleta
// (tiempos en ms, ya sin silencios). Tono sobrio: sin zoom, sin pop, sin sonidos.
import type { ApoyoPlan } from "../ApoyoSobrio";

const ARCHIVO = "Imágenes de archivo";

export const APOYOS: ApoyoPlan[] = [
  // "Recordemos que en el siniestro murieron dos integrantes…"
  {
    desdeMs: 18550,
    hastaMs: 23300,
    src: "accidente-b3.mp4",
    desdeSeg: 11.3,
    etiqueta: ARCHIVO,
  },
  {
    desdeMs: 23200,
    hastaMs: 27950,
    src: "accidente-foto.jpg",
    etiqueta: ARCHIVO,
  },
];

export const TARJETAS = [
  {
    desdeMs: 5800,
    hastaMs: 10500,
    antetitulo: "Seguimiento",
    titulo: "Accidente agrupación de Kbeto Zuleta",
  },
  {
    desdeMs: 10750,
    hastaMs: 18300,
    antetitulo: "Kbeto Zuleta",
    titulo: "Pronóstico reservado · UCI en Bosconia",
  },
  {
    desdeMs: 37700,
    hastaMs: 50750,
    antetitulo: "Integrantes atendidos en",
    titulo: "Bosconia · Valledupar",
  },
  {
    desdeMs: 55000,
    hastaMs: 63700,
    antetitulo: "Mundo vallenato",
    titulo: "En cadena de oración",
  },
];
