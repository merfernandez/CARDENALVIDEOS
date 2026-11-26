import type { PlanNoticia } from "../NoticiaHoy";

// 26 nov – Peter Manjarrés: "Soy feliz", canción recomendada del álbum "Luchador"
export const plan: PlanNoticia = {
  video: "n26a/v-cut.mp4",
  subtitulos: "n26a/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  tarjetas: [
    { tipo: "sobria", desdeMs: 100, hastaMs: 2600, antetitulo: "Amigos", titulo: "Son datos y hay que darlos" },
    {
      tipo: "lista",
      desdeMs: 4300,
      hastaMs: 7750,
      titulo: "Después de",
      items: [
        { texto: "Ojito", ms: 4552 },
        { texto: "Luchador", ms: 5204 },
        { texto: "Como tú no hay nadie", ms: 6508 },
      ],
    },
    { tipo: "sobria", desdeMs: 7800, hastaMs: 13950, antetitulo: "Un as bajo la manga", titulo: "Álbum «Luchador»" },
    { tipo: "cancion", desdeMs: 14000, hastaMs: 18550, etiqueta: "La canción", titulo: "Soy feliz", detalle: "Autoría de Sergio Amaris" },
    {
      tipo: "lista",
      desdeMs: 22000,
      hastaMs: 30850,
      titulo: "Viene pidiendo vía",
      items: [
        { texto: "Plataformas digitales", ms: 23072 },
        { texto: "Redes sociales", ms: 24995 },
        { texto: "Radio colombiana", ms: 29266 },
      ],
    },
    { tipo: "artistas", desdeMs: 30900, hastaMs: 36000, artistas: [{ nombre: "Peter Manjarrés", ms: 33183 }] },
    {
      tipo: "cancion",
      desdeMs: 42700,
      hastaMs: 50300,
      etiqueta: "Mi canción recomendada",
      titulo: "Soy feliz",
      detalle: "Peter Manjarrés · Álbum Luchador",
    },
    { tipo: "sobria", desdeMs: 50350, hastaMs: 55300, antetitulo: "Alegre y parrandero", titulo: "El jamaqueo del peterismo" },
    { tipo: "sobria", desdeMs: 55350, hastaMs: 61950, antetitulo: "Lo nuevo de Peter Manjarrés", titulo: "«Soy feliz»" },
  ],
  palabrasClave: ["Peter", "Manjarrés,", "\"Luchador\".", "\"Soy", "Sergio", "Amaris.", "radio", "recomendada.", "peterismo."],
};
