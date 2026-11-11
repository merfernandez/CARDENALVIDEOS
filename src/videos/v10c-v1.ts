// Julio Rojas y Tavo Sumoza: 27 presentaciones y #1 de Las 15 Cardenales (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "v10c/v-cut.mp4",
  subtitulos: "v10c/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // Las 15 Cardenales completas (sin recortar) con fondo desenfocado
  apoyos: [
    {
      desdeMs: 23600,
      hastaMs: 28900,
      src: "top15/las15.png",
      proporcion: 1600 / 2000,
    },
  ],
  tarjetas: [
    {
      tipo: "artistas",
      desdeMs: 0,
      hastaMs: 2450,
      artistas: [
        { nombre: "Julio Rojas", ms: 52 },
        { nombre: "Tavo Sumoza", ms: 1337 },
      ],
    },
    {
      tipo: "cifras",
      desdeMs: 2500,
      hastaMs: 8400,
      antetitulo: "En noviembre por Colombia",
      cifras: [{ numero: "27", texto: "Presentaciones" }],
    },
    {
      tipo: "cancion",
      desdeMs: 12100,
      hastaMs: 17500,
      etiqueta: "El pase más viral",
      titulo: "Carmen Gómez",
      detalle: "Julio Rojas y Tavo Sumoza",
    },
    {
      tipo: "sobria",
      desdeMs: 28950,
      hastaMs: 35300,
      antetitulo: "21 de noviembre",
      titulo: "En el regreso del Pluma Blanca",
    },
    {
      tipo: "artistas",
      desdeMs: 35350,
      hastaMs: 38400,
      artistas: [{ nombre: "Churo Díaz", ms: 37664 }],
    },
    {
      tipo: "sobria",
      desdeMs: 41300,
      hastaMs: 43700,
      antetitulo: "El pase",
      titulo: "¡Se fue la luz!",
    },
  ],
  palabrasClave: [
    "julio",
    "rojas",
    "tavo",
    "sumoza",
    "27",
    "presentaciones.",
    "carmen",
    "gómez,",
    "pase",
    "viral",
    "guajira,",
    "cardenal",
    "uno",
    "15",
    "cardenales.",
    "21",
    "pluma",
    "blanca",
    "churo",
    "díaz.",
    "luz!",
  ],
};
