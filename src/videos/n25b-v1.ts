import type { PlanNoticia } from "../NoticiaHoy";

// 25 nov – Jean Carlos Centeno regresa el 10 de diciembre con gira de 14 presentaciones
export const plan: PlanNoticia = {
  video: "n25b/v-cut.mp4",
  subtitulos: "n25b/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // La agenda de diciembre (afiche del clip) habla sola
  apoyos: [
    { desdeMs: 19200, hastaMs: 27100, src: "ap25/jeank.mp4", desdeSeg: 44, proporcion: 1080 / 1920 },
  ],
  tarjetas: [
    { tipo: "sobria", desdeMs: 300, hastaMs: 4850, antetitulo: "Tras su cirugía", titulo: "Periodo de incapacidad" },
    { tipo: "artistas", desdeMs: 4900, hastaMs: 7800, artistas: [{ nombre: "Jean Carlos Centeno", ms: 4984 }] },
    { tipo: "cifras", desdeMs: 7850, hastaMs: 14600, antetitulo: "Regresa a los escenarios", cifras: [{ numero: "10", texto: "De diciembre" }] },
    { tipo: "cifras", desdeMs: 14650, hastaMs: 19150, antetitulo: "Gira del 10 al 28 de diciembre", cifras: [{ numero: "14", texto: "Presentaciones" }] },
    { tipo: "sobria", desdeMs: 27150, hastaMs: 36350, antetitulo: "Jean Carlos Centeno", titulo: "Se recupera satisfactoriamente" },
  ],
  palabrasClave: ["Centeno", "cirugía,", "regresa", "10", "14", "presentaciones", "Venezuela", "Colombia.", "satisfactoriamente"],
};
