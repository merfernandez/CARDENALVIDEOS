// Silvestre Dangond graba su nuevo álbum en Urumita (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

const f = (n: number) => `hoy/silvestre/s${n}.jpg`;

export const plan: PlanNoticia = {
  video: "hoy/v2-cut.mp4",
  subtitulos: "hoy/v2-cut-captions.json",
  seccion: "Noticias vallenatas",
  fotos: [
    { desdeMs: 300, hastaMs: 3900, src: f(1), lado: "izq" }, // "imágenes naturales…"
    { desdeMs: 3900, hastaMs: 6800, src: f(2), lado: "der" }, // "entorno de tranquilidad… su tierra"
    { desdeMs: 10900, hastaMs: 14500, src: f(3), lado: "izq" }, // "grabación de su próximo álbum"
    { desdeMs: 14500, hastaMs: 17400, src: f(5), lado: "der" }, // "dándole gracias a Dios"
    { desdeMs: 17400, hastaMs: 20600, src: f(0), lado: "izq" }, // "diferentes paisajes, calles…"
    { desdeMs: 20600, hastaMs: 22700, src: f(4), lado: "der" }, // "el origen donde todo comenzó"
  ],
  tarjetas: [
    {
      tipo: "artistas",
      desdeMs: 6850,
      hastaMs: 10800,
      artistas: [{ nombre: "Silvestre Dangond", ms: 6910 }],
    },
    {
      tipo: "cancion",
      desdeMs: 22730,
      hastaMs: 27200,
      etiqueta: "Nuevo álbum",
      titulo: "En grabación",
      detalle: "Silvestre Dangond",
    },
    {
      tipo: "sobria",
      desdeMs: 28300,
      hastaMs: 31400,
      antetitulo: "El silvestrismo",
      titulo: "Feliz por la noticia",
    },
    {
      tipo: "redes",
      desdeMs: 33000,
      hastaMs: 36600,
      texto: "Anunciado en sus redes sociales",
      redes: ["instagram", "tiktok", "facebook", "youtube"],
    },
  ],
  palabrasClave: [
    "silvestre",
    "dangond",
    "urumitera",
    "álbum",
    "grabación",
    "dios",
    "origen",
    "silvestrismo",
    "feliz",
    "redes",
    "sociales",
  ],
};
