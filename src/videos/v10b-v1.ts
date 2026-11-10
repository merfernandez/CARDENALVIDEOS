// Nota curiosa: Rafa Pérez y El Heredero entraron juntos a estudio (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "v10b/v-cut.mp4",
  subtitulos: "v10b/v-cut-captions.json",
  seccion: "Nota curiosa",
  tarjetas: [
    {
      tipo: "sobria",
      desdeMs: 300,
      hastaMs: 4900,
      antetitulo: "Nota curiosa",
      titulo: "Una reunión inesperada",
    },
    {
      tipo: "artistas",
      desdeMs: 5000,
      hastaMs: 11700,
      artistas: [
        { nombre: "Rafa Pérez", ms: 5082 },
        { nombre: "El Heredero", ms: 7805 },
      ],
    },
    {
      tipo: "sobria",
      desdeMs: 14600,
      hastaMs: 21400,
      antetitulo: "Óigalo bien",
      titulo: "Entraron juntos a estudio",
    },
    {
      tipo: "sobria",
      desdeMs: 21450,
      hastaMs: 28500,
      antetitulo: "Sus seguidores se preguntan",
      titulo: "¿Qué sorpresa musical viene?",
    },
    {
      tipo: "sobria",
      desdeMs: 30600,
      hastaMs: 34400,
      antetitulo: "Rafa Pérez · La Evolución",
      titulo: "Un 2026 exitoso",
    },
  ],
  palabrasClave: [
    "curiosa",
    "inesperada",
    "rafa",
    "pérez,",
    "pérez",
    "evolución",
    "heredero,",
    "heredero?",
    "estudios",
    "grabación,",
    "sorpresa",
    "musical",
    "2026",
    "exitoso.",
  ],
};
