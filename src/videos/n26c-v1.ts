import type { PlanNoticia } from "../NoticiaHoy";

// 26 nov – Daniel Restrepo y Jafid Nazar: carátula de "La Fórmula" (3 de diciembre)
export const plan: PlanNoticia = {
  video: "n26c/v-cut.mp4",
  subtitulos: "n26c/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // Cierre: la carátula a pantalla completa
  apoyos: [{ desdeMs: 24250, hastaMs: 30950, src: "ap26/la-formula.jpg", proporcion: 1 }],
  tarjetas: [
    {
      tipo: "artistas",
      desdeMs: 0,
      hastaMs: 2650,
      artistas: [
        { nombre: "Daniel Restrepo", ms: 59 },
        { nombre: "Jafid Nazar", ms: 1651 },
      ],
    },
    { tipo: "portada", desdeMs: 2700, hastaMs: 10450, src: "ap26/la-formula.jpg", lado: "izq", etiqueta: "Su primer álbum" },
    { tipo: "cifras", desdeMs: 10500, hastaMs: 16200, antetitulo: "En todas las plataformas", cifras: [{ numero: "3", texto: "De diciembre" }] },
    {
      tipo: "sobria",
      desdeMs: 16250,
      hastaMs: 24200,
      antetitulo: "Escribieron los artistas",
      titulo: "«Con mucho amor, talento y dedicación»",
    },
  ],
  palabrasClave: ["Daniel", "Restrepo", "Jafid", "\"La", "Fórmula\",", "3", "diciembre", "amor,"],
};
