// Noticia vallenata: Elder Dayán Díaz y Eddy Herrera presentan «La Corriente»
// (tiempos en ms, ya sin silencios)
import type { ZoomClave } from "../tipos";

const CARA = { x: 0.5, y: 0.38 };

export const ZOOMS: ZoomClave[] = [
  { ms: 0, escala: 1.0, ...CARA },
  { ms: 701, escala: 1.06, ...CARA }, // los artistas
  { ms: 3821, escala: 1.12, ...CARA }, // «La Corriente»
  { ms: 5161, escala: 1.04, ...CARA },
  { ms: 8853, escala: 1.1, ...CARA }, // "uniendo dos generaciones"
  { ms: 11246, escala: 1.0, ...CARA },
  { ms: 13826, escala: 1.08, ...CARA }, // "sorprendernos"
  { ms: 15766, escala: 1.14, ...CARA }, // "versatilidad"
  { ms: 18581, escala: 1.0, ...CARA },
  { ms: 21161, escala: 1.1, ...CARA }, // «La Corriente» disponible
  { ms: 23081, escala: 1.03, ...CARA },
  { ms: 25465, escala: 1.08, ...CARA },
  { ms: 27421, escala: 1.13, ...CARA }, // "Elder Dayán Díaz"
];

export const ARTISTAS_1 = {
  desdeMs: 600,
  hastaMs: 3700,
  artistas: [
    { nombre: "Elder Dayán Díaz", ms: 701 },
    { nombre: "Eddy Herrera", ms: 1841 },
  ],
};

export const CANCION = {
  desdeMs: 3800,
  hastaMs: 8800,
  etiqueta: "Nuevo lanzamiento",
  titulo: "La Corriente",
  detalle: "Merengue",
};

export const ARTISTA_CANTOR = {
  desdeMs: 12326,
  hastaMs: 16600,
  artistas: [{ nombre: "Elder Dayán Díaz", ms: 12326 }],
};

export const PLATAFORMAS = {
  desdeMs: 21161,
  hastaMs: 25300,
  titulo: "La Corriente",
  texto: "Disponible en plataformas digitales",
};

export const ARTISTAS_2 = {
  desdeMs: 25465,
  hastaMs: 29200,
  artistas: [
    { nombre: "Eddy Herrera", ms: 25885 },
    { nombre: "Elder Dayán Díaz", ms: 27421 },
  ],
};

export const PALABRAS_CLAVE = [
  "elder",
  "dayán",
  "díaz",
  "eddy",
  "herrera",
  "corriente",
  "merengue",
  "colombiano",
  "generaciones",
  "cantor",
  "versatilidad",
  "lanzamiento",
  "plataformas",
  "digitales",
];
