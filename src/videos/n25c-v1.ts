import type { PlanNoticia } from "../NoticiaHoy";

// 25 nov – Fawell Solano y Kiko Ramos: lanzamiento en vivo de "En las manos de Dios" (5 dic, Fonseca)
export const plan: PlanNoticia = {
  video: "n25c/v-cut.mp4",
  subtitulos: "n25c/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  tarjetas: [
    {
      tipo: "artistas",
      desdeMs: 0,
      hastaMs: 4400,
      artistas: [
        { nombre: "Fawell Solano", ms: 58 },
        { nombre: "Kiko Ramos", ms: 1237 },
      ],
    },
    { tipo: "cancion", desdeMs: 4450, hastaMs: 8500, etiqueta: "Lanzamiento en vivo", titulo: "En las manos de Dios", detalle: "Fawell Solano y Kiko Ramos" },
    { tipo: "cifras", desdeMs: 8550, hastaMs: 13300, antetitulo: "Atención · Agéndese · Sábado", cifras: [{ numero: "5", texto: "De diciembre" }] },
    { tipo: "sobria", desdeMs: 13350, hastaMs: 17550, antetitulo: "Plaza principal de Fonseca", titulo: "Tarima Tierra de Cantores" },
    {
      tipo: "cifras",
      desdeMs: 17600,
      hastaMs: 20450,
      antetitulo: "Desde las 7:00 p. m.",
      cifras: [{ numero: "Gratis", texto: "Totalmente" }],
    },
    { tipo: "sobria", desdeMs: 25250, hastaMs: 31850, antetitulo: "Fawell Solano y su equipo artístico", titulo: "Montaje y escenografía" },
    { tipo: "sobria", desdeMs: 31900, hastaMs: 39700, antetitulo: "Sábado 5 de diciembre · Fonseca", titulo: "«En las manos de Dios» en vivo" },
  ],
  palabrasClave: ["Fawell", "Kiko", "Dios\".", "5", "diciembre,", "Fonseca,", "Cantores,", "gratis.", "escenografía"],
};
