import type { PlanNoticia } from "../NoticiaHoy";

// 23 nov – Óscar Gamarra y El Gamarrazo en el lanzamiento de Churo Díaz (Barranquilla)
export const plan: PlanNoticia = {
  video: "n23b/v-cut.mp4",
  subtitulos: "n23b/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // "Óscar interpretó cada una de sus canciones…" → William en ventana, el show habla solo
  ventana: [
    {
      desdeMs: 13250,
      hastaMs: 26400,
      apoyos: [{ src: "n23b/apoyo.mp4", hastaMs: 26400, desdeSeg: 0, posicion: "abajo" }],
    },
  ],
  tarjetas: [
    { tipo: "artistas", desdeMs: 600, hastaMs: 3000, artistas: [{ nombre: "Óscar Gamarra", ms: 822 }] },
    { tipo: "cancion", desdeMs: 3050, hastaMs: 7300, etiqueta: "Su sello", titulo: "El Gamarrazo", detalle: "Óscar Gamarra" },
    { tipo: "sobria", desdeMs: 7350, hastaMs: 13200, antetitulo: "Lanzamiento de Churo Díaz", titulo: "Salón Jumbo · Barranquilla" },
    { tipo: "sobria", desdeMs: 26450, hastaMs: 32500, antetitulo: "Sensación en", titulo: "Plataformas digitales y emisoras" },
    {
      tipo: "lista",
      desdeMs: 36500,
      hastaMs: 44150,
      titulo: "Suenan en La Guajira",
      items: [
        { texto: "El Cachuflo", ms: 37814 },
        { texto: "Salió pirata", ms: 38604 },
        { texto: "Ya volví", ms: 43291 },
      ],
    },
    { tipo: "sobria", desdeMs: 44200, hastaMs: 50300, antetitulo: "Mis tres recomendadas", titulo: "Óscar Gamarra y El Gamarrazo" },
  ],
  palabrasClave: ["Óscar", "Gamarra", "Gamarrazo,", "Gamarrazo", "Churo", "Barranquilla.", "Guajira:", "recomendadas"],
};
