import type { PlanNoticia } from "../NoticiaHoy";

// 25 nov – "Benditos Versos", himno folclórico de La Guajira (Premios Luna)
export const plan: PlanNoticia = {
  video: "n25a/v-cut.mp4",
  subtitulos: "n25a/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  apoyos: [
    { desdeMs: 5600, hastaMs: 9100, src: "ap25/luna.mp4", desdeSeg: 4, proporcion: 1080 / 1920, etiqueta: "Premios Luna" },
    {
      desdeMs: 21250,
      hastaMs: 28850,
      src: "ap25/gobernador.mp4",
      desdeSeg: 2,
      proporcion: 1080 / 1920,
      etiqueta: "Gobernador de La Guajira, Jairo Aguilar",
    },
  ],
  tarjetas: [
    { tipo: "sobria", desdeMs: 300, hastaMs: 5550, antetitulo: "Ceremonia de los Premios Luna", titulo: "Barranquilla" },
    {
      tipo: "cancion",
      desdeMs: 9150,
      hastaMs: 13800,
      etiqueta: "Himno folclórico de La Guajira",
      titulo: "Benditos Versos",
      detalle: "Premios Luna",
    },
    {
      tipo: "sobria",
      desdeMs: 13850,
      hastaMs: 21200,
      antetitulo: "Recibió el reconocimiento el compositor",
      titulo: "Rafael Manjarrés Mendoza",
    },
  ],
  palabrasClave: ["Luna", "\"Benditos", "Versos\"", "himno", "folclórico", "Rafael", "Manjarrés", "Jairo", "Aguilar"],
};
