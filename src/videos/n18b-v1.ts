import type { PlanNoticia } from "../NoticiaHoy";

// 18 nov – Fawell Solano y Kiko Ramos: "En las manos de Dios"
export const plan: PlanNoticia = {
  video: "n18b/v-cut.mp4",
  subtitulos: "n18b/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // Clip de la caravana (sin audio) a pantalla completa
  apoyos: [
    // "Fonseca se engalanó el sábado con una caravana de lanzamiento"
    { desdeMs: 24650, hastaMs: 29350, src: "n18b/apoyo.mp4", desdeSeg: 16, proporcion: 1080 / 1920, etiqueta: "Caravana en Fonseca" },
    // "para presentar esta nueva producción titulada En las manos de Dios"
    { desdeMs: 36650, hastaMs: 42000, src: "n18b/apoyo.mp4", desdeSeg: 80, proporcion: 1080 / 1920 },
  ],
  tarjetas: [
    {
      tipo: "artistas",
      desdeMs: 1500,
      hastaMs: 4000,
      artistas: [
        { nombre: "Fawell Solano", ms: 1972 },
        { nombre: "Kiko Ramos", ms: 3090 },
      ],
    },
    {
      tipo: "cancion",
      desdeMs: 4050,
      hastaMs: 10600,
      etiqueta: "Nueva producción",
      titulo: "En las manos de Dios",
      detalle: "Fawell Solano y Kiko Ramos",
    },
    {
      tipo: "cancion",
      desdeMs: 10700,
      hastaMs: 19100,
      etiqueta: "La canción que abandera el álbum",
      titulo: "Cuando me besas",
      detalle: "Autoría de Dachi Moya",
    },
    { tipo: "sobria", desdeMs: 19150, hastaMs: 24600, antetitulo: "Gira de promoción · viernes", titulo: "Valledupar" },
    {
      tipo: "lista",
      desdeMs: 29400,
      hastaMs: 36600,
      titulo: "Esta semana llegan a",
      items: [
        { texto: "Riohacha", ms: 32053 },
        { texto: "Municipios de La Guajira", ms: 33630 },
      ],
    },
    { tipo: "sobria", desdeMs: 42050, hastaMs: 45950, antetitulo: "Fawell Solano y Kiko Ramos", titulo: "En las manos de Dios" },
  ],
  palabrasClave: ["Fawell", "Kiko", "Dios", "besas", "Valledupar", "Fonseca", "Riohacha", "Guajira"],
};
