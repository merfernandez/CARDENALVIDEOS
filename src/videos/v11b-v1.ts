// Jorge Celedón, Karen Lizarazo y Gusi en Las Vegas para los Latin Grammy (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "v11b/v-cut.mp4",
  subtitulos: "v11b/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  tarjetas: [
    {
      tipo: "lista",
      desdeMs: 1100,
      hastaMs: 5800,
      titulo: "Ya están en Las Vegas",
      items: [
        { texto: "Jorgito Celedón", ms: 1171 },
        { texto: "Karen Lizarazo", ms: 2561 },
        { texto: "Gusi", ms: 4135 },
      ],
    },
    {
      tipo: "sobria",
      desdeMs: 9200,
      hastaMs: 13900,
      antetitulo: "Latin Grammy",
      titulo: "Jueves · 3:00 p.m.",
    },
    {
      tipo: "sobria",
      desdeMs: 14000,
      hastaMs: 20100,
      antetitulo: "En la Premier",
      titulo: "Se conocerá el ganador",
    },
    {
      tipo: "cancion",
      desdeMs: 20150,
      hastaMs: 25300,
      etiqueta: "Latin Grammy",
      titulo: "Cumbia / Vallenato",
      detalle: "Categoría",
    },
    {
      tipo: "sobria",
      desdeMs: 25400,
      hastaMs: 36000,
      antetitulo: "Desde Cardenal Stereo",
      titulo: "¡Éxitos en Las Vegas!",
    },
  ],
  palabrasClave: [
    "jorgito",
    "celedón,",
    "karen",
    "lizarazo",
    "gusi",
    "las",
    "vegas",
    "latin",
    "grammy",
    "grammy.",
    "jueves",
    "3",
    "premier,",
    "ganador",
    "cumbia",
    "vallenato",
    "éxitos",
  ],
};
