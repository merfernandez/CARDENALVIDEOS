// Churo Díaz: lanzamiento del Pluma Blanca en Riohacha (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "ch/v-cut.mp4",
  subtitulos: "ch/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // William se reduce a una ventana abajo a la derecha y el afiche habla solo
  ventana: [
    {
      desdeMs: 15800,
      hastaMs: 27900,
      apoyos: [
        { src: "ch/apoyo.mp4", hastaMs: 27900, desdeSeg: 1, posicion: "abajo" },
      ],
    },
  ],
  tarjetas: [
    {
      tipo: "sobria",
      desdeMs: 200,
      hastaMs: 6900,
      antetitulo: "Riohacha se prepara",
      titulo: "El evento del año",
    },
    {
      tipo: "cancion",
      desdeMs: 7000,
      hastaMs: 11300,
      etiqueta: "Lanzamiento",
      titulo: "Pluma Blanca",
      detalle: "Churo Díaz",
    },
    {
      tipo: "artistas",
      desdeMs: 11400,
      hastaMs: 15700,
      artistas: [{ nombre: "Churo Díaz", ms: 11461 }],
    },
    {
      tipo: "sobria",
      desdeMs: 32300,
      hastaMs: 36300,
      antetitulo: "Sábado 21 de noviembre",
      titulo: "Estadio Federico Serrano Soto",
    },
  ],
  palabrasClave: [
    "riohacha",
    "riohacha,",
    "noviembre",
    "noviembre,",
    "pluma",
    "blanca",
    "blanca,",
    "blanca.",
    "churo",
    "díaz",
    "21",
    "estadio",
    "federico",
    "serrano",
    "julio",
    "rojas",
    "tavo",
    "sumoza",
    "edgar",
    "goyo.",
    "lanzamiento",
    "regreso",
  ],
};
