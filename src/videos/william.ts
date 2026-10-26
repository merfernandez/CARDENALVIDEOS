// Plan de edición del video de William (tiempos en ms, ya sin silencios)
import type { StickerPlan, ZoomClave } from "../tipos";

// Zooms suaves: en cada cambio de idea o palabra clave
export const ZOOMS: ZoomClave[] = [
  { ms: 0, escala: 1.08 },
  { ms: 1380, escala: 1.15 }, // "31 de octubre"
  { ms: 2520, escala: 1.0 }, // "la fiesta es aquí"
  { ms: 3660, escala: 1.09 }, // "Suchiimma"
  { ms: 5280, escala: 1.0 },
  { ms: 6170, escala: 1.13 }, // "4 de la tarde"
  { ms: 7000, escala: 1.0 }, // "Tendremos…"
  { ms: 8550, escala: 1.07 }, // corte
  { ms: 10080, escala: 1.0 }, // "un show…"
  { ms: 10508, escala: 1.14 }, // "Halloween"
  { ms: 11158, escala: 1.04 },
  { ms: 13210, escala: 1.0 }, // "Te esperamos…"
  { ms: 14398, escala: 1.1 }, // "Suchiimma"
  { ms: 16019, escala: 1.0 },
];

// Stickers de apoyo que aparecen cuando William menciona algo
export const STICKERS: StickerPlan[] = [
  {
    ms: 1380,
    duracionMs: 1100,
    src: "",
    lado: "der",
    tarjeta: { arriba: "OCT", abajo: "31" },
  },
  {
    ms: 3660,
    duracionMs: 1600,
    src: "",
    lado: "der",
    tarjeta: { arriba: "C.C.", abajo: "SUCHIIMMA" },
  },
  {
    ms: 6170,
    duracionMs: 1100,
    src: "",
    lado: "izq",
    tarjeta: { arriba: "HORA", abajo: "4 PM" },
  },
  { ms: 9206, duracionMs: 1100, src: "boleto", lado: "izq" },
];

// Palabras que se resaltan en rojo en los subtítulos
export const PALABRAS_CLAVE = [
  "cardenalitos",
  "31",
  "octubre",
  "fiesta",
  "suchiimma",
  "4",
  "tarde",
  "tendremos",
  "dulces",
  "sorpresas",
  "premios",
  "rifa",
  "show",
  "halloween",
  "personajes",
  "esperamos",
];
