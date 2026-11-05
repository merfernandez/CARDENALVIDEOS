// Daniel Restrepo y Jafid Nazar: el mosaico peterista (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "dr/v-cut.mp4",
  subtitulos: "dr/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  tarjetas: [
    {
      tipo: "artistas",
      desdeMs: 250,
      hastaMs: 3500,
      artistas: [
        { nombre: "Daniel Restrepo", ms: 283 },
        { nombre: "Jafid Nazar", ms: 1223 },
      ],
    },
    {
      tipo: "cancion",
      desdeMs: 3600,
      hastaMs: 10400,
      etiqueta: "Se viraliza",
      titulo: "Mosaico peterista",
      detalle: "Homenaje a Peter Manjarrés",
    },
    {
      tipo: "sobria",
      desdeMs: 10500,
      hastaMs: 19900,
      antetitulo: "Una mezcla de",
      titulo: "Sentimiento y éxitos",
    },
    {
      tipo: "artistas",
      desdeMs: 19950,
      hastaMs: 21400,
      artistas: [{ nombre: "Peter Manjarrés", ms: 19989 }],
    },
    {
      tipo: "redes",
      desdeMs: 24500,
      hastaMs: 28000,
      texto: "Disponible en plataformas digitales",
      redes: ["youtube", "instagram", "tiktok", "facebook"],
    },
  ],
  palabrasClave: [
    "daniel",
    "restrepo",
    "jafid",
    "nazar",
    "viralizan",
    "mosaico",
    "peterista,",
    "peterista",
    "homenaje",
    "folclor",
    "vallenato,",
    "éxitos",
    "caballero",
    "peter",
    "manjarrés.",
    "plataformas",
    "digitales.",
  ],
};
