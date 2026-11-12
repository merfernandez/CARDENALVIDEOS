// Sistema Cardenal en Expo Guajira (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "eg/v-cut.mp4",
  subtitulos: "eg/v-cut-captions.json",
  seccion: "Sistema Cardenal",
  // Imágenes de la feria a pantalla completa con cortina (la voz de William sigue)
  completa: [
    {
      desdeMs: 5100,
      hastaMs: 7250,
      clips: [{ src: "eg/a1.mp4", desdeSeg: 7, hastaMs: 7250 }],
    },
    {
      desdeMs: 7300,
      hastaMs: 11500,
      clips: [{ src: "eg/a3.mp4", desdeSeg: 1, hastaMs: 11500 }],
    },
    {
      desdeMs: 13400,
      hastaMs: 15300,
      clips: [{ src: "eg/a2.mp4", desdeSeg: 1, hastaMs: 15300 }],
    },
  ],
  tarjetas: [
    {
      tipo: "sobria",
      desdeMs: 0,
      hastaMs: 5000,
      antetitulo: "Sistema Cardenal",
      titulo: "Desde Expo Guajira",
    },
    {
      tipo: "sobria",
      desdeMs: 15350,
      hastaMs: 18800,
      antetitulo: "De la mano de",
      titulo: "Cardenal Stereo · Diario del Norte",
    },
    {
      tipo: "sobria",
      desdeMs: 18850,
      hastaMs: 20600,
      antetitulo: "Centro de Convenciones Anas Mai",
      titulo: "¡Vengan a disfrutar!",
    },
  ],
  palabrasClave: [
    "sistema",
    "cardenal,",
    "cardenal",
    "expo",
    "guajira",
    "convenciones",
    "anas",
    "mai.",
    "programas,",
    "locutores,",
    "periodistas,",
    "corresponsales,",
    "stereo",
    "diario",
    "norte.",
    "¡vengan",
    "disfrutar!",
  ],
};
