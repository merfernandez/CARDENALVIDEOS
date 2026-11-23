import type { PlanNoticia } from "../NoticiaHoy";

// 23 nov – Jean Carlos Centeno fue operado: 28 días fuera de los escenarios (tono sobrio)
export const plan: PlanNoticia = {
  video: "n23c/v-cut.mp4",
  subtitulos: "n23c/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  sobrio: true,
  // Jean Carlos (clip de sus redes, sin audio) a pantalla completa
  apoyos: [{ desdeMs: 800, hastaMs: 4900, src: "n23c/apoyo.mp4", desdeSeg: 0, proporcion: 1080 / 1920, etiqueta: "Jean Carlos Centeno" }],
  tarjetas: [
    { tipo: "cifras", desdeMs: 5000, hastaMs: 8350, antetitulo: "Fuera de los escenarios", cifras: [{ numero: "28", texto: "Días" }] },
    { tipo: "sobria", desdeMs: 8400, hastaMs: 18300, antetitulo: "Boletín de prensa", titulo: "Equipo de comunicaciones" },
    { tipo: "sobria", desdeMs: 18350, hastaMs: 25200, antetitulo: "Conciertos pactados", titulo: "Serán reprogramados" },
    {
      tipo: "sobria",
      desdeMs: 25250,
      hastaMs: 31700,
      antetitulo: "Sistema Cardenal · Cardenal Stereo",
      titulo: "¡Pronta recuperación, Jean Carlos!",
    },
  ],
  palabrasClave: ["Centeno", "Centeno.", "operado", "28", "días", "reprogramados", "recuperación"],
};
