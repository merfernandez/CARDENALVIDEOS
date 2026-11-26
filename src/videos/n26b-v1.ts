import type { PlanNoticia } from "../NoticiaHoy";

// 26 nov – Fello y Beto Zabaleta: "Guajira del alma" con El Pangue Maestre
export const plan: PlanNoticia = {
  video: "n26b/v-cut.mp4",
  subtitulos: "n26b/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // Clip del lanzamiento (sin audio) a pantalla completa
  apoyos: [
    { desdeMs: 9150, hastaMs: 13400, src: "ap26/fello.mp4", desdeSeg: 4.5, proporcion: 1080 / 1920 },
    { desdeMs: 33900, hastaMs: 44300, src: "ap26/fello.mp4", desdeSeg: 3, proporcion: 1080 / 1920 },
  ],
  tarjetas: [
    { tipo: "sobria", desdeMs: 100, hastaMs: 3850, antetitulo: "Amigos cardenalistas", titulo: "Mi lanzamiento de la semana" },
    {
      tipo: "artistas",
      desdeMs: 3900,
      hastaMs: 9100,
      artistas: [
        { nombre: "Fello Zabaleta", ms: 4231 },
        { nombre: "Beto Zabaleta", ms: 8076 },
      ],
    },
    {
      tipo: "cancion",
      desdeMs: 13450,
      hastaMs: 17650,
      etiqueta: "Autoría de Romualdo Brito López",
      titulo: "Guajira del alma",
      detalle: "Fello y Beto Zabaleta",
    },
    { tipo: "sobria", desdeMs: 17700, hastaMs: 22950, antetitulo: "Acordeón invitado · Rey vallenato", titulo: "Orángel «El Pangue» Maestre" },
    { tipo: "sobria", desdeMs: 23000, hastaMs: 33850, antetitulo: "Padre e hijo", titulo: "Un aporte a nuestro folclor" },
  ],
  palabrasClave: ["Fello", "Beto", "Zabaleta.", "\"Guajira", "Romualdo", "Pangue", "Maestre.", "folclor"],
};
