import type { PlanNoticia } from "../NoticiaHoy";

// 19 nov – Churo Díaz: "Un amanecer para nunca olvidar" (Feria de la Chinita) y agenda
export const plan: PlanNoticia = {
  video: "n19a/v-cut.mp4",
  subtitulos: "n19a/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // Fotos del concierto (sin franjas negras) a pantalla completa con fondo difuminado
  apoyos: [
    { desdeMs: 5650, hastaMs: 11250, src: "n19a/apoyo.mp4", desdeSeg: 3, proporcion: 720 / 1040, etiqueta: "Feria de la Chinita" },
    { desdeMs: 15350, hastaMs: 21350, src: "n19a/apoyo.mp4", desdeSeg: 14, proporcion: 720 / 1040 },
  ],
  tarjetas: [
    { tipo: "sobria", desdeMs: 300, hastaMs: 5600, antetitulo: "Así escribió Churo Díaz", titulo: "«Un amanecer para nunca olvidar»" },
    {
      tipo: "cifras",
      desdeMs: 11300,
      hastaMs: 15300,
      antetitulo: "Churo se presentó a las",
      cifras: [{ numero: "9:40", texto: "De la mañana" }],
    },
    {
      tipo: "lista",
      desdeMs: 26900,
      hastaMs: 35400,
      titulo: "La agenda sigue",
      items: [
        { texto: "Viernes · Salón Jumbo", ms: 28420 },
        { texto: "Sábado 21 · Riohacha", ms: 32218 },
      ],
    },
    { tipo: "cancion", desdeMs: 35450, hastaMs: 40830, etiqueta: "El gran regreso", titulo: "Pluma Blanca", detalle: "Churo Díaz" },
  ],
  palabrasClave: ["Churo", "Díaz", "amanecer", "Chinita", "9", "40", "Jumbo", "Riohacha", "Pluma"],
};
