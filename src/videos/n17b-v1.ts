import type { PlanNoticia } from "../NoticiaHoy";

// 17 nov – Juancho De la Espriella y Los de Juancho: "El Losartán" (19 de noviembre)
export const plan: PlanNoticia = {
  video: "n17b/v-cut.mp4",
  subtitulos: "n17b/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // "con la voz de Jorge Clavijo… se trata de la canción" → clip oficial (sin audio) a pantalla completa
  apoyos: [{ desdeMs: 9850, hastaMs: 15750, src: "n17b/apoyo.mp4", desdeSeg: 1, proporcion: 1276 / 720 }],
  tarjetas: [
    {
      tipo: "artistas",
      desdeMs: 900,
      hastaMs: 7400,
      artistas: [
        { nombre: "Juancho De la Espriella", ms: 1064 },
        { nombre: "Los de Juancho", ms: 4819 },
      ],
    },
    { tipo: "sobria", desdeMs: 7500, hastaMs: 9800, antetitulo: "Lanzamiento", titulo: "19 de noviembre" },
    { tipo: "portada", desdeMs: 15800, hastaMs: 21500, src: "n17b/portada.jpg", lado: "izq", etiqueta: "Nuevo sencillo" },
    {
      tipo: "cancion",
      desdeMs: 21550,
      hastaMs: 29200,
      etiqueta: "Llega el 19 de noviembre",
      titulo: "El Losartán",
      detalle: "En todas las plataformas digitales",
    },
  ],
  palabrasClave: ["Juancho", "Espriella", "Losartán", "Clavijo", "19", "noviembre", "plataformas"],
};
