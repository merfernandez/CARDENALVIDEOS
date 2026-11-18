import type { PlanNoticia } from "../NoticiaHoy";

// 18 nov – Rafa Pérez La Evolución: Cartagena, Festival Náutico y Feria de la Chinita
export const plan: PlanNoticia = {
  video: "n18a/v-cut.mp4",
  subtitulos: "n18a/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // "cerró con broche de oro en la Feria de la Chinita…" → William en ventana, el show de Maracaibo habla solo
  ventana: [
    {
      desdeMs: 17800,
      hastaMs: 31950,
      apoyos: [
        { src: "n18a/apoyo.mp4", hastaMs: 24000, desdeSeg: 2, posicion: "abajo" },
        { src: "n18a/apoyo.mp4", hastaMs: 31950, desdeSeg: 43, posicion: "abajo" },
      ],
    },
  ],
  tarjetas: [
    { tipo: "artistas", desdeMs: 900, hastaMs: 6500, artistas: [{ nombre: "Rafa Pérez La Evolución", ms: 3040 }] },
    {
      tipo: "sobria",
      desdeMs: 6600,
      hastaMs: 12250,
      antetitulo: "Desfile del bando · Fiestas de Independencia",
      titulo: "Cartagena",
    },
    { tipo: "sobria", desdeMs: 12350, hastaMs: 17700, antetitulo: "Show musical", titulo: "Festival Náutico de la Heroica" },
    {
      tipo: "cifras",
      desdeMs: 32050,
      hastaMs: 41100,
      antetitulo: "Rafa Pérez La Evolución",
      cifras: [{ numero: "2026", texto: "Un año exitoso" }],
    },
  ],
  palabrasClave: ["Rafa", "Pérez", "Evolución", "Cartagena", "Náutico", "Chinita", "Maracaibo", "2026", "éxito"],
};
