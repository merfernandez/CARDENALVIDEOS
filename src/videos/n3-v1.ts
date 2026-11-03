// Peter Manjarrés: las canciones favoritas de «Luchador» (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "n3/v-cut.mp4",
  subtitulos: "n3/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  fotos: [
    // "Una producción bastante equilibrada…" / "Eso trajo Peter Manjarrés…"
    { desdeMs: 22750, hastaMs: 26700, src: "mv/peter/p1.jpg", lado: "izq" },
    { desdeMs: 26800, hastaMs: 30300, src: "mv/peter/p0.jpg", lado: "der" },
  ],
  tarjetas: [
    {
      tipo: "cancion",
      desdeMs: 300,
      hastaMs: 4450,
      etiqueta: "Nuevo álbum",
      titulo: "Luchador",
      detalle: "Peter Manjarrés",
    },
    {
      tipo: "sobria",
      desdeMs: 4550,
      hastaMs: 8800,
      antetitulo: "Los peteristas",
      titulo: "Ya tienen sus favoritas",
    },
    {
      tipo: "lista",
      desdeMs: 12900,
      hastaMs: 22650,
      titulo: "Las favoritas de «Luchador»",
      items: [
        { texto: "Yoyito", ms: 13054 },
        { texto: "Como tú no hay nadie", ms: 13990 },
        { texto: "Dueña de mi presente", ms: 15510 },
        { texto: "La Playita", ms: 17235 },
      ],
    },
  ],
  palabrasClave: [
    "peter",
    "manjarrés",
    "luchador",
    "peteristas",
    "favoritas",
    "yoyito,",
    "nadie,",
    "presente",
    "playita",
    "folclor",
    "vallenato",
    "equilibrada",
  ],
};
