// Zona 8 brilló en los Premios Monitor (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "d29/v3-cut.mp4",
  subtitulos: "d29/v3-cut-captions.json",
  seccion: "Noticias vallenatas",
  completa: [
    {
      // "Karolay Murra y César David Ochoa desfilaron por la alfombra roja…"
      desdeMs: 4150,
      hastaMs: 13850,
      clips: [{ src: "d29/v3-ig2.mp4", desdeSeg: 0.3, hastaMs: 13850 }],
    },
    {
      // "Luego llegó su fundador, Rolando Ochoa…"
      desdeMs: 14250,
      hastaMs: 20700,
      clips: [{ src: "d29/v3-ig3.mp4", desdeSeg: 0.3, hastaMs: 20700 }],
    },
    {
      // "Zona 8 le sigue trabajando por toda Colombia…" (Bucaramanga)
      desdeMs: 20900,
      hastaMs: 26950,
      clips: [{ src: "d29/v3-ig1.mp4", desdeSeg: 3, hastaMs: 26950 }],
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
        { nombre: "Karolay Murra", ms: 4300 },
        { nombre: "César David Ochoa", ms: 5300 },
      ],
    },
    {
      tipo: "sobria",
      desdeMs: 15400,
      hastaMs: 20600,
      antetitulo: "Fundador de Zona 8",
      titulo: "Rolando Ochoa",
    },
  ],
  palabrasClave: [
    "zona",
    "8",
    "premios",
    "monitor",
    "monitor.",
    "karolay",
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
