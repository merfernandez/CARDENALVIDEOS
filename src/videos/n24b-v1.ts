import type { PlanNoticia } from "../NoticiaHoy";

// 24 nov – Yader Romero: "Esto se va a descontrolar" (álbum DVD, 27 de noviembre)
export const plan: PlanNoticia = {
  video: "n24b/v-cut.mp4",
  subtitulos: "n24b/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // "Lanzamiento 27 de noviembre, disponible…" → el afiche animado habla solo
  apoyos: [{ desdeMs: 26400, hastaMs: 32350, src: "ap24/yader.mp4", desdeSeg: 6, proporcion: 1080 / 1920 }],
  tarjetas: [
    { tipo: "sobria", desdeMs: 100, hastaMs: 2850, antetitulo: "Noticia importante", titulo: "Lanzamiento este viernes" },
    { tipo: "portada", desdeMs: 2900, hastaMs: 6600, src: "ap24/yader-portada.jpg", lado: "izq", etiqueta: "Yader Romero" },
    { tipo: "cifras", desdeMs: 6650, hastaMs: 9400, antetitulo: "Álbum DVD", cifras: [{ numero: "7", texto: "Canciones" }] },
    { tipo: "sobria", desdeMs: 9450, hastaMs: 14650, antetitulo: "Parte de su historia con", titulo: "Kvrass" },
    {
      tipo: "lista",
      desdeMs: 14700,
      hastaMs: 20850,
      titulo: "También canciones de",
      items: [
        { texto: "Diomedes Díaz", ms: 15781 },
        { texto: "Poncho y Los Embajadores Vallenatos", ms: 16641 },
      ],
    },
    { tipo: "sobria", desdeMs: 20900, hastaMs: 26350, antetitulo: "Para ponerle la sabrosura", titulo: "Mosaico carnavalero" },
    { tipo: "sobria", desdeMs: 32400, hastaMs: 35000, antetitulo: "Yader Romero", titulo: "«El del sabor»" },
  ],
  palabrasClave: ["Yader", "descontrolar\".", "DVD", "siete", "Kvrass.", "Diomedes,", "carnavalero.", "27", "noviembre."],
};
