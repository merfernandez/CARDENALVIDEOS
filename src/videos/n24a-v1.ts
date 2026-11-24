import type { PlanNoticia } from "../NoticiaHoy";

// 24 nov – Churo Díaz: lanzamientos de "Pluma Blanca" en Barranquilla y Riohacha
export const plan: PlanNoticia = {
  video: "n24a/v-cut.mp4",
  subtitulos: "n24a/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // Clips horizontales (sin audio) a pantalla completa con fondo difuminado
  apoyos: [
    { desdeMs: 9350, hastaMs: 20400, src: "ap24/churo-baq.mp4", desdeSeg: 12, proporcion: 1280 / 720, etiqueta: "Barranquilla" },
    {
      desdeMs: 33400,
      hastaMs: 46100,
      src: "ap24/churo-rioh.mp4",
      desdeSeg: 40,
      proporcion: 1280 / 720,
      etiqueta: "Estadio Federico Serrano Soto · Riohacha",
    },
  ],
  tarjetas: [
    { tipo: "artistas", desdeMs: 600, hastaMs: 5100, artistas: [{ nombre: "Churo Díaz", ms: 911 }] },
    { tipo: "sobria", desdeMs: 5150, hastaMs: 9300, antetitulo: "Viernes · Lanzamiento", titulo: "Salón Jumbo del Country Club" },
    {
      tipo: "cancion",
      desdeMs: 20450,
      hastaMs: 26050,
      etiqueta: "Los éxitos del Rey Guajiro",
      titulo: "Pluma Blanca",
      detalle: "Churo Díaz",
    },
    { tipo: "sobria", desdeMs: 26100, hastaMs: 33350, antetitulo: "Sábado · Tierra churista", titulo: "Riohacha, La Guajira" },
    { tipo: "sobria", desdeMs: 46150, hastaMs: 50150, antetitulo: "Churo Díaz", titulo: "¡El más taquillero!" },
  ],
  palabrasClave: ["Churo", "Díaz", "Barranquilla,", "Riohacha,", "churista.", "lleno", "taquillero.", "Rey", "Guajiro."],
};
