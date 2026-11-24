import type { PlanNoticia } from "../NoticiaHoy";

// 24 nov – Laura Hamburguer "La China": lanzamiento en vivo de "Campeones" (27 nov, Valledupar)
export const plan: PlanNoticia = {
  video: "n24c/v-cut.mp4",
  subtitulos: "n24c/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // Cierre: William en ventana y Laura invitando habla sola
  ventana: [
    {
      desdeMs: 31000,
      hastaMs: 40200,
      apoyos: [{ src: "ap24/laura.mp4", hastaMs: 40200, desdeSeg: 12, posicion: "abajo" }],
    },
  ],
  tarjetas: [
    { tipo: "sobria", desdeMs: 300, hastaMs: 4650, antetitulo: "Todo listo · Lanzamiento en vivo", titulo: "Campeones" },
    {
      tipo: "artistas",
      desdeMs: 4700,
      hastaMs: 11300,
      artistas: [
        { nombre: "Laura Hamburguer", ms: 6619 },
        { nombre: "Sebastián Sepúlveda", ms: 9870 },
      ],
    },
    {
      tipo: "cifras",
      desdeMs: 11350,
      hastaMs: 20550,
      antetitulo: "Viernes · JR Valledupar · 8:00 p. m.",
      cifras: [
        { numero: "27", texto: "De noviembre" },
        { numero: "Gratis", texto: "Entrada" },
      ],
    },
    { tipo: "cancion", desdeMs: 20600, hastaMs: 30950, etiqueta: "Abandera el álbum", titulo: "El boom", detalle: "Autoría de Camilo Torres" },
  ],
  palabrasClave: ["Laura", "Hamburguer,", "\"Campeones\".", "Sebastián", "27", "gratis.", "boom\",", "Camilo", "Valledupar."],
};
