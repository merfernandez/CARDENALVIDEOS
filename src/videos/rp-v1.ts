// Rafa Pérez, La Evolución: gira del fin de semana (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "rp/v-cut.mp4",
  subtitulos: "rp/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  tarjetas: [
    {
      tipo: "sobria",
      desdeMs: 200,
      hastaMs: 4200,
      antetitulo: "2026",
      titulo: "Un año exitoso",
    },
    {
      tipo: "artistas",
      desdeMs: 4250,
      hastaMs: 7000,
      artistas: [{ nombre: "Rafa Pérez · La Evolución", ms: 4302 }],
    },
    {
      tipo: "sobria",
      desdeMs: 7100,
      hastaMs: 14700,
      antetitulo: "Cada fin de semana",
      titulo: "Su show por todo el país",
    },
    {
      tipo: "lista",
      desdeMs: 19900,
      hastaMs: 23100,
      titulo: "La gira del fin de semana",
      items: [
        { texto: "Bogotá", ms: 20457 },
        { texto: "San Roque", ms: 21377 },
        { texto: "Berbeo", ms: 22608 },
      ],
    },
    {
      tipo: "sobria",
      desdeMs: 23200,
      hastaMs: 29900,
      antetitulo: "Los rafanáticos",
      titulo: "Show de alto impacto",
    },
  ],
  palabrasClave: [
    "2026",
    "exitoso",
    "rafa",
    "pérez,",
    "evolución.",
    "show",
    "éxitos",
    "país.",
    "gira",
    "emociones",
    "bogotá,",
    "san",
    "roque",
    "berbeo,",
    "rafanáticos",
    "impacto",
  ],
};
