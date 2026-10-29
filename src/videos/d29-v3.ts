// Zona 8 brilló en los Premios Monitor (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "d29/v3-cut.mp4",
  subtitulos: "d29/v3-cut-captions.json",
  seccion: "Noticias vallenatas",
  // Clips de Instagram en tarjetas de esquina, recortando las etiquetas de abajo
  fotos: [
    {
      desdeMs: 4150,
      hastaMs: 13850,
      src: "d29/v3-ig2.mp4",
      desdeSeg: 0.3,
      lado: "izq",
      encuadre: "arriba",
    },
    {
      desdeMs: 14250,
      hastaMs: 20700,
      src: "d29/v3-ig3.mp4",
      desdeSeg: 0.3,
      lado: "der",
      encuadre: "arriba",
    },
    {
      desdeMs: 20900,
      hastaMs: 26900,
      src: "d29/v3-ig1.mp4",
      desdeSeg: 3,
      lado: "izq",
      encuadre: "arriba",
    },
  ],
  tarjetas: [
    {
      tipo: "sobria",
      desdeMs: 300,
      hastaMs: 4100,
      antetitulo: "Premios Monitor",
      titulo: "Zona 8 brilló",
    },
    {
      tipo: "artistas",
      desdeMs: 4300,
      hastaMs: 9300,
      artistas: [
        { nombre: "Karolaym Murra", ms: 4300 },
        { nombre: "César David Ochoa", ms: 5300 },
      ],
    },
  ],
  palabrasClave: [
    "zona",
    "8",
    "premios",
    "monitor",
    "monitor.",
    "karolaym",
    "murra",
    "césar",
    "david",
    "ochoa",
    "ochoa,",
    "alfombra",
    "roja",
    "rolando",
    "fundador",
    "nominado",
    "colombia",
  ],
};
