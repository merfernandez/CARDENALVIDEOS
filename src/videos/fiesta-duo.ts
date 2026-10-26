// Plan de edición: William de la Rosa + Sixto A. Carrillo (tiempos en ms, ya sin silencios)
import type { Destacado, Orador, ZoomClave } from "../tipos";

// Puntos de la cara de cada uno para el zoom
const WILLIAM = { x: 0.66, y: 0.3 };
const SIXTO = { x: 0.35, y: 0.33 };
const AMBOS = { x: 0.5, y: 0.3 };

export const ORADORES: Orador[] = [
  {
    nombre: "William de la Rosa",
    cargo: "Director artístico del Sistema Cardenal",
    instagram: "wdelarosac",
    desdeSeg: 0.3,
    hastaSeg: 7.3,
    lado: "der",
  },
  {
    nombre: "Sixto A. Carrillo",
    instagram: "sixtoacarrillo",
    desdeSeg: 7.7,
    hastaSeg: 15.9,
    lado: "izq",
  },
];

export const ZOOMS: ZoomClave[] = [
  { ms: 0, escala: 1.05, ...AMBOS },
  { ms: 1020, escala: 1.22, ...WILLIAM }, // "cardenalitos"
  { ms: 3360, escala: 1.3, ...WILLIAM }, // "31 de octubre"
  { ms: 4620, escala: 1.2, ...WILLIAM }, // "Suchiimma"
  { ms: 6130, escala: 1.05, ...AMBOS }, // "con Cardenal Stereo"
  { ms: 7620, escala: 1.24, ...SIXTO }, // Sixto: "Todos los niños…"
  { ms: 9915, escala: 1.32, ...SIXTO }, // "cordialmente invitados"
  { ms: 11625, escala: 1.2, ...SIXTO }, // "a gozar"
  { ms: 13167, escala: 1.3, ...SIXTO }, // "31 de octubre"
  { ms: 15221, escala: 1.36, ...SIXTO }, // "4 de la tarde"
  { ms: 16621, escala: 1.2, ...WILLIAM }, // William: "Tendremos…"
  { ms: 19851, escala: 1.28, ...WILLIAM }, // "lo mejor"
  { ms: 21131, escala: 1.36, ...WILLIAM }, // "Halloween"
  { ms: 22411, escala: 1.18, ...WILLIAM }, // "personajes"
  { ms: 25684, escala: 1.24, ...SIXTO }, // Sixto: "El Centro Comercial…"
  { ms: 27164, escala: 1.32, ...SIXTO }, // "Suchiimma"
  { ms: 29694, escala: 1.15, ...SIXTO }, // "te esperamos"
  { ms: 30637, escala: 1.05, ...AMBOS }, // los dos: "En la gran fiesta…"
  { ms: 32067, escala: 1.15, ...AMBOS }, // "cardenalitos"
];

// Palabras clave en letra gigante animada: marca, día, hora y lugar
export const DESTACADOS: Destacado[] = [
  {
    desdeMs: 1020,
    hastaMs: 2900,
    lineas: [
      { texto: "Cardenalitos", ms: 1020, estilo: "enorme" },
      { texto: "de la sintonía", ms: 1780, estilo: "etiqueta" },
    ],
  },
  {
    desdeMs: 3360,
    hastaMs: 4500,
    lineas: [
      { texto: "31", ms: 3360, estilo: "enorme" },
      { texto: "de octubre", ms: 3800, estilo: "bloque" },
    ],
  },
  {
    desdeMs: 4620,
    hastaMs: 5900,
    lineas: [
      { texto: "Suchiimma", ms: 4620, estilo: "enorme" },
      { texto: "Centro Comercial", ms: 5060, estilo: "etiqueta" },
    ],
  },
  {
    desdeMs: 6130,
    hastaMs: 7550,
    lineas: [
      { texto: "Cardenal", ms: 6130, estilo: "enorme" },
      { texto: "Stereo", ms: 6740, estilo: "bloque" },
    ],
  },
  {
    desdeMs: 13167,
    hastaMs: 14251,
    lineas: [
      { texto: "31", ms: 13167, estilo: "enorme" },
      { texto: "de octubre", ms: 13531, estilo: "bloque" },
    ],
  },
  {
    desdeMs: 15221,
    hastaMs: 16550,
    lineas: [
      { texto: "4:00", ms: 15221, estilo: "enorme" },
      { texto: "de la tarde", ms: 15461, estilo: "bloque" },
    ],
  },
  {
    desdeMs: 25814,
    hastaMs: 27860,
    lineas: [
      { texto: "Centro Comercial", ms: 25814, estilo: "etiqueta" },
      { texto: "Suchiimma", ms: 25950, estilo: "enorme" },
    ],
  },
  {
    desdeMs: 27884,
    hastaMs: 29514,
    lineas: [
      { texto: "Cardenal", ms: 27884, estilo: "enorme" },
      { texto: "Stereo", ms: 28604, estilo: "bloque" },
    ],
  },
  {
    desdeMs: 32067,
    hastaMs: 34150,
    lineas: [
      { texto: "Cardenalitos", ms: 32067, estilo: "enorme" },
      { texto: "de la sintonía", ms: 32967, estilo: "etiqueta" },
    ],
  },
];

export const PALABRAS_CLAVE = [
  "cardenalitos",
  "31",
  "octubre",
  "suchiimma",
  "cardenal",
  "stereo",
  "niños",
  "riohacha",
  "invitados",
  "gozar",
  "disfrutar",
  "4",
  "tarde",
  "dulces",
  "regalos",
  "sorpresas",
  "show",
  "halloween",
  "esperamos",
  "fiesta",
];
