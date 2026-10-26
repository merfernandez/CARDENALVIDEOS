// Noticia seria: accidente del bus de la agrupación de Cabeto Zuleta
// (tiempos en ms, ya sin silencios). Tono sobrio: sin zoom, sin pop, sin sonidos.
import type { ApoyoPlan } from "../ApoyoSobrio";

export const APOYOS: ApoyoPlan[] = [
  // "sufrió un trágico accidente, el siniestro…": el bus en el río
  { desdeMs: 4300, hastaMs: 8500, src: "accidente-b2.mp4", desdeSeg: 3.6 },
  // "fueron trasladados… Bosconia y luego a Valledupar": vista amplia y foto
  { desdeMs: 19400, hastaMs: 23900, src: "accidente-b3.mp4", desdeSeg: 11.5 },
  { desdeMs: 23700, hastaMs: 28400, src: "accidente-foto.jpg" },
  // "El artista también iba en el bus"
  { desdeMs: 42100, hastaMs: 45500, src: "accidente-b2.mp4", desdeSeg: 0.4 },
];

export const TARJETAS = [
  {
    desdeMs: 1650,
    hastaMs: 4300,
    antetitulo: "Accidente de tránsito",
    titulo: "Agrupación de Cabeto Zuleta",
  },
  {
    desdeMs: 16800,
    hastaMs: 19400,
    antetitulo: "Balance",
    titulo: "21 músicos heridos",
  },
  {
    desdeMs: 24200,
    hastaMs: 28400,
    antetitulo: "Trasladados a",
    titulo: "Bosconia · Valledupar",
  },
];

export const MEMORIA = {
  desdeMs: 8850,
  hastaMs: 16500,
  titulo: "En memoria",
  personas: [
    { nombre: "Giovanni Lobo", rol: "Corista" },
    { nombre: "Harold Santana", rol: "Guitarrista" },
  ],
};
