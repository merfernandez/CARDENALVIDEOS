// Churo Díaz inspecciona el estadio para el regreso del Pluma Blanca (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "ch2/v-cut.mp4",
  subtitulos: "ch2/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // Churo en el estadio: video completo (sin bordes negros) con fondo desenfocado
  apoyos: [
    {
      desdeMs: 2600,
      hastaMs: 8900,
      src: "ch2/apoyo.mp4",
      desdeSeg: 2,
      proporcion: 720 / 920,
    },
    {
      desdeMs: 9000,
      hastaMs: 17200,
      src: "ch2/apoyo-2.mp4",
      desdeSeg: 0,
      proporcion: 720 / 708,
    },
  ],
  tarjetas: [
    {
      tipo: "artistas",
      desdeMs: 300,
      hastaMs: 2500,
      artistas: [{ nombre: "Churo Díaz", ms: 753 }],
    },
    {
      tipo: "cancion",
      desdeMs: 18200,
      hastaMs: 22000,
      etiqueta: "Regreso y lanzamiento",
      titulo: "Pluma Blanca",
      detalle: "Churo Díaz",
    },
    {
      tipo: "lista",
      desdeMs: 22100,
      hastaMs: 26700,
      titulo: "Artistas invitados",
      items: [
        { texto: "Julio Rojas", ms: 23776 },
        { texto: "Tavo Sumoza", ms: 24670 },
        { texto: "Edgar y Goyo", ms: 25767 },
      ],
    },
    {
      tipo: "sobria",
      desdeMs: 26750,
      hastaMs: 34600,
      antetitulo: "Riohacha · Sábado 21 de noviembre",
      titulo: "Estadio Federico Serrano Soto · 7 p.m.",
    },
  ],
  palabrasClave: [
    "churo",
    "díaz",
    "riohacha",
    "riohacha,",
    "regreso",
    "lanzamiento",
    "pluma",
    "blanca",
    "estadio",
    "federico",
    "serrano",
    "soto",
    "azul",
    "21",
    "noviembre",
    "julio",
    "rojas,",
    "tavo",
    "sumoza,",
    "edgar",
    "goyo",
    "7",
  ],
};
