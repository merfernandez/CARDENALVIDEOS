// Binomio de Oro de América: «Vamos que vamos» (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "bo/v-cut.mp4",
  subtitulos: "bo/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  tarjetas: [
    {
      tipo: "portada",
      desdeMs: 4500,
      hastaMs: 12600,
      src: "bo/apoyo.jpg",
      lado: "izq",
      etiqueta: "Vamos que vamos",
    },
    {
      tipo: "lista",
      desdeMs: 12700,
      hastaMs: 23400,
      titulo: "Las que causan sensación",
      items: [
        { texto: "Dos inviernos", ms: 13452 },
        { texto: "Donde quedaron las promesas", ms: 14605 },
        { texto: "Binomio Internacional", ms: 21678 },
      ],
    },
    {
      tipo: "sobria",
      desdeMs: 27800,
      hastaMs: 32900,
      antetitulo: "Bajo la dirección de",
      titulo: "Israel Romero «El Pollo Irra»",
    },
    {
      tipo: "artistas",
      desdeMs: 33000,
      hastaMs: 38100,
      artistas: [
        { nombre: "Israel David", ms: 34861 },
        { nombre: "Samir Benz", ms: 37038 },
      ],
    },
    {
      tipo: "portada",
      desdeMs: 38200,
      hastaMs: 45300,
      src: "bo/apoyo.jpg",
      lado: "der",
      etiqueta: "Ya disponible",
    },
  ],
  palabrasClave: [
    "binomio",
    "oro",
    "américa,",
    "américa",
    "vamos",
    "vamos,",
    "inviernos",
    "promesas",
    "internacional",
    "israel",
    "romero",
    "pollo",
    "irra,",
    "david",
    "samir",
    "benz.",
    "plataformas",
    "digitales.",
  ],
};
