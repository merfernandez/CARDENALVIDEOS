import type { PlanNoticia } from "../NoticiaHoy";

// 19 nov – Peter Manjarrés cerró el Festival del Cactus en Papayal
export const plan: PlanNoticia = {
  video: "n19b/v-cut.mp4",
  subtitulos: "n19b/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  tarjetas: [
    { tipo: "artistas", desdeMs: 300, hastaMs: 4700, artistas: [{ nombre: "Peter Manjarrés", ms: 1861 }] },
    { tipo: "sobria", desdeMs: 4750, hastaMs: 9500, antetitulo: "Cerró el Festival del Cactus", titulo: "Papayal, La Guajira" },
    { tipo: "redes", desdeMs: 9550, hastaMs: 15250, texto: "«Feliz de amanecer en La Guajira»", redes: ["instagram", "facebook"] },
    { tipo: "sobria", desdeMs: 15300, hastaMs: 23200, antetitulo: "Con el respaldo de", titulo: "Los guajiros barranqueros" },
    {
      tipo: "cancion",
      desdeMs: 23250,
      hastaMs: 32050,
      etiqueta: "Su nuevo álbum",
      titulo: "Luchador",
      detalle: "Con el respaldo del peterismo",
    },
    { tipo: "sobria", desdeMs: 32100, hastaMs: 39200, antetitulo: "De promoción por Colombia", titulo: "«Luchador»" },
  ],
  palabrasClave: ["Peter", "Manjarrés", "Cactus", "Papayal", "Guajira", "Luchador", "peterismo", "Colombia"],
};
