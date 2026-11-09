// Nota curiosa: la estatua de Diomedes Díaz amaneció sin un brazo (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "es/v-cut.mp4",
  subtitulos: "es/v-cut-captions.json",
  seccion: "Nota curiosa",
  // Fotos a pantalla completa con fondo desenfocado (no se recortan)
  apoyos: [
    {
      desdeMs: 3700,
      hastaMs: 10900,
      src: "es/estatua-1.jpg",
      proporcion: 1296 / 864,
    },
    {
      desdeMs: 29700,
      hastaMs: 33500,
      src: "es/estatua-2.jpg",
      proporcion: 780 / 565,
    },
  ],
  tarjetas: [
    {
      tipo: "sobria",
      desdeMs: 11000,
      hastaMs: 17600,
      antetitulo: "Parque de la Provincia, Valledupar",
      titulo: "Vandalismo y exceso de turistas",
    },
    {
      tipo: "sobria",
      desdeMs: 25800,
      hastaMs: 29600,
      antetitulo: "Se preguntan en Valledupar",
      titulo: "¿Un brazo milagroso?",
    },
    {
      tipo: "sobria",
      desdeMs: 33600,
      hastaMs: 37000,
      antetitulo: "La escultura",
      titulo: "Ya está en reparación",
    },
    {
      tipo: "sobria",
      desdeMs: 37100,
      hastaMs: 45900,
      antetitulo: "Un llamado a los turistas",
      titulo: "Cultura ciudadana",
    },
    {
      tipo: "artistas",
      desdeMs: 45950,
      hastaMs: 49400,
      artistas: [{ nombre: "Diomedes Díaz", ms: 45988 }],
    },
  ],
  palabrasClave: [
    "curiosa",
    "escultura",
    "cacique",
    "cacique.",
    "cacique,",
    "provincia",
    "provincia.",
    "valledupar",
    "valledupar,",
    "brazos.",
    "vandalismo",
    "turistas",
    "milagroso?",
    "mágico,",
    "reparación,",
    "cultura",
    "ciudadana",
    "diomedes",
    "díaz,",
    "milagroso.",
  ],
};
