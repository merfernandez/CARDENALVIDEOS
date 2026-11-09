// Fabián Corrales: EP «Amanecemos parrandeando» (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "fc/v-cut.mp4",
  subtitulos: "fc/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  tarjetas: [
    {
      tipo: "artistas",
      desdeMs: 1850,
      hastaMs: 6100,
      artistas: [{ nombre: "Fabián Corrales", ms: 1899 }],
    },
    {
      tipo: "cancion",
      desdeMs: 6200,
      hastaMs: 12200,
      etiqueta: "Nuevo EP",
      titulo: "Amanecemos parrandeando",
      detalle: "Fabián Corrales",
    },
    {
      tipo: "lista",
      desdeMs: 13900,
      hastaMs: 19600,
      titulo: "Las 4 canciones del EP",
      items: [
        { texto: "Amanecemos parrandeando", ms: 14783 },
        { texto: "Ya se terminó", ms: 16695 },
        { texto: "Yo tengo una novia", ms: 17681 },
        { texto: "El disfraz", ms: 18940 },
      ],
    },
    {
      tipo: "redes",
      desdeMs: 19700,
      hastaMs: 25700,
      texto: "Las 4 con videoclip, ya disponibles",
      redes: ["youtube", "instagram", "tiktok", "facebook"],
    },
    {
      tipo: "sobria",
      desdeMs: 25800,
      hastaMs: 31300,
      antetitulo: "Recomendada para fin de año",
      titulo: "«Amanecemos parrandeando»",
    },
    {
      tipo: "artistas",
      desdeMs: 31350,
      hastaMs: 34200,
      artistas: [
        { nombre: "Fabián Corrales", ms: 31406 },
        { nombre: "Leonardo Farfán", ms: 32762 },
      ],
    },
  ],
  palabrasClave: [
    "fabián",
    "corrales",
    "ep",
    "amanecemos",
    "parrandeando,",
    "parrandeando",
    "cuatro",
    "terminó,",
    "novia",
    "disfraz.",
    "videoclip",
    "plataformas",
    "digitales.",
    "leonardo",
    "farfán.",
  ],
};
