// Churo Díaz: el regreso del Pluma Blanca, 80% vendido (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "n17a/v-cut.mp4",
  subtitulos: "n17a/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // Churo en el estadio a pantalla completa (fondo desenfocado)
  apoyos: [
    {
      desdeMs: 7200,
      hastaMs: 11700,
      src: "ch2/apoyo.mp4",
      desdeSeg: 3,
      proporcion: 720 / 920,
    },
  ],
  tarjetas: [
    {
      tipo: "cifras",
      desdeMs: 1400,
      hastaMs: 5300,
      antetitulo: "Lanzamiento en Riohacha",
      cifras: [{ numero: "80%", texto: "Vendido" }],
    },
    {
      tipo: "lista",
      desdeMs: 11750,
      hastaMs: 16500,
      titulo: "Con Churo estarán",
      items: [
        { texto: "Julio Rojas y Tavo Sumoza", ms: 13186 },
        { texto: "Edgar y Goyo", ms: 15261 },
      ],
    },
    {
      tipo: "sobria",
      desdeMs: 16550,
      hastaMs: 22300,
      antetitulo: "Se espera para el viernes",
      titulo: "¡Sold out!",
    },
    {
      tipo: "artistas",
      desdeMs: 22350,
      hastaMs: 25400,
      artistas: [{ nombre: "Churo Díaz", ms: 23988 }],
    },
  ],
  palabrasClave: [
    "churo",
    "díaz",
    "díaz.",
    "riohacha",
    "80%",
    "vendido.",
    "pluma",
    "blanca",
    "blanca,",
    "21",
    "noviembre,",
    "estadio",
    "federico",
    "serrano",
    "soto.",
    "julio",
    "rojas,",
    "tavo",
    "sumoza,",
    "edgar",
    "goyo.",
    "sold",
    "taquillero,",
  ],
};
