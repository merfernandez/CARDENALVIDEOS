import type { PlanNoticia } from "../NoticiaHoy";

// 23 nov – Rafa Pérez La Evolución en los 117 años de Tierralta, Córdoba
export const plan: PlanNoticia = {
  video: "n23a/v-cut.mp4",
  subtitulos: "n23a/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // Concierto en Tierralta (horizontal, sin audio) a pantalla completa con fondo difuminado
  apoyos: [
    { desdeMs: 15100, hastaMs: 18600, src: "n23a/apoyo.mp4", desdeSeg: 3, proporcion: 1280 / 720 },
    { desdeMs: 24650, hastaMs: 32800, src: "n23a/apoyo.mp4", desdeSeg: 38, proporcion: 1280 / 720, etiqueta: "Tierralta, Córdoba" },
  ],
  tarjetas: [
    { tipo: "cifras", desdeMs: 300, hastaMs: 6300, antetitulo: "Tierralta, Córdoba celebró", cifras: [{ numero: "117", texto: "Años" }] },
    { tipo: "artistas", desdeMs: 6350, hastaMs: 9500, artistas: [{ nombre: "Rafa Pérez La Evolución", ms: 6699 }] },
    {
      tipo: "cifras",
      desdeMs: 9550,
      hastaMs: 15050,
      antetitulo: "Estadio 25 de Noviembre",
      cifras: [{ numero: "+15 mil", texto: "Personas" }],
    },
    {
      tipo: "lista",
      desdeMs: 18650,
      hastaMs: 24600,
      titulo: "Sonaron",
      items: [
        { texto: "La familia que soñé", ms: 20025 },
        { texto: "Mi novia mujer", ms: 21684 },
        { texto: "A ti no te gusta na", ms: 22703 },
      ],
    },
  ],
  palabrasClave: ["Tierralta,", "117", "Rafa", "Pérez", "Evolución.", "15", "mil", "familia", "coreadas"],
};
