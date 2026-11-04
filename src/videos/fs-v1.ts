// Fawell Solano y Kiko Ramos: «En las manos de Dios», 13 de noviembre (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "fs/v-cut.mp4",
  subtitulos: "fs/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // Formato del día: William en ventana y el video de expectativa ocupa la pantalla
  ventana: [
    {
      desdeMs: 0,
      hastaMs: 4400,
      apoyos: [
        { src: "fs/apoyo.mp4", hastaMs: 4400, desdeSeg: 8, posicion: "arriba" },
      ],
    },
    {
      desdeMs: 13700,
      hastaMs: 19900,
      apoyos: [
        {
          src: "fs/apoyo.mp4",
          hastaMs: 19900,
          desdeSeg: 33,
          posicion: "abajo",
        },
      ],
    },
  ],
  tarjetas: [
    {
      tipo: "artistas",
      desdeMs: 4500,
      hastaMs: 8700,
      artistas: [
        { nombre: "Fawell Solano", ms: 4500 },
        { nombre: "Kiko Ramos", ms: 4900 },
      ],
    },
    {
      tipo: "cancion",
      desdeMs: 8800,
      hastaMs: 13600,
      etiqueta: "Nuevo álbum",
      titulo: "En las manos de Dios",
      detalle: "Fawell Solano",
    },
    {
      tipo: "sobria",
      desdeMs: 20000,
      hastaMs: 26000,
      antetitulo: "Dato importante",
      titulo: "Su sexta producción",
    },
    {
      tipo: "sobria",
      desdeMs: 26100,
      hastaMs: 32600,
      antetitulo: "Orgullo guajiro",
      titulo: "De Fonseca, La Guajira",
    },
  ],
  palabrasClave: [
    "fawell",
    "solano",
    "solano,",
    "kiko",
    "ramos",
    "lanzamiento",
    "álbum",
    "manos",
    "dios.",
    "viernes",
    "13",
    "noviembre",
    "plataformas",
    "digitales.",
    "sexta",
    "guajiro",
    "fonseca",
  ],
};
