// Iván Villazón graba su nuevo álbum con tres acordeoneros (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "iv/v-cut.mp4",
  subtitulos: "iv/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  tarjetas: [
    {
      tipo: "artistas",
      desdeMs: 1200,
      hastaMs: 4400,
      artistas: [{ nombre: "Iván Villazón", ms: 1245 }],
    },
    {
      tipo: "sobria",
      desdeMs: 4500,
      hastaMs: 7000,
      antetitulo: "El cantor de cantores",
      titulo: "Graba nuevo álbum",
    },
    {
      tipo: "sobria",
      desdeMs: 9100,
      hastaMs: 15400,
      antetitulo: "Estudios y producción",
      titulo: "Rolando Ochoa · R8",
    },
    {
      tipo: "lista",
      desdeMs: 19600,
      hastaMs: 25800,
      titulo: "Sus tres acordeoneros",
      items: [
        { texto: "Tuto López", ms: 20844 },
        { texto: "Jerónimo Villazón", ms: 22130 },
        { texto: "Jesús Ballestas", ms: 24510 },
      ],
    },
  ],
  palabrasClave: [
    "iván",
    "villazón,",
    "villazón",
    "álbum",
    "grabación",
    "rolando",
    "ochoa",
    "r8.",
    "acordeoneros,",
    "tuto",
    "lópez,",
    "jerónimo",
    "jesús",
    "ballestas.",
    "expectativa",
  ],
};
