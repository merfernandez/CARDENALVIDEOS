// Peter Manjarrés presentará su álbum «Luchador» (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "hoy/v1-cut.mp4",
  subtitulos: "hoy/v1-cut-captions.json",
  seccion: "Noticias vallenatas",
  tarjetas: [
    {
      tipo: "artistas",
      desdeMs: 1400,
      hastaMs: 4550,
      artistas: [{ nombre: "Peter Manjarrés", ms: 1461 }],
    },
    {
      tipo: "cancion",
      desdeMs: 4650,
      hastaMs: 8200,
      etiqueta: "Nuevo álbum",
      titulo: "Luchador",
      detalle: "Peter Manjarrés",
    },
    {
      tipo: "sobria",
      desdeMs: 9600,
      hastaMs: 16400,
      antetitulo: "Video de solidaridad",
      titulo: "Con la familia Zuleta",
    },
    {
      tipo: "sobria",
      desdeMs: 18700,
      hastaMs: 22700,
      antetitulo: "Lanzamiento",
      titulo: "30 de octubre",
    },
    {
      tipo: "sobria",
      desdeMs: 26800,
      hastaMs: 32900,
      antetitulo: "En solidaridad",
      titulo: "Sin caravana ni celebración",
    },
    {
      tipo: "sobria",
      desdeMs: 38750,
      hastaMs: 47000,
      antetitulo: "Rueda de prensa",
      titulo: "Centro Cultural, Valledupar",
    },
  ],
  palabrasClave: [
    "peter",
    "manjarrés",
    "luchador",
    "álbum",
    "solidaridad",
    "30",
    "octubre",
    "caravana",
    "celebración",
    "kbeto",
    "zuleta",
    "rueda",
    "prensa",
  ],
};
