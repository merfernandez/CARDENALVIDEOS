// Haffit David: discos de oro, platino y diamante por «Zúmbalo» (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "hd/v-cut.mp4",
  subtitulos: "hd/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // Foto de las placas a pantalla completa (fondo desenfocado, sin recortar)
  apoyos: [
    { desdeMs: 4650, hastaMs: 11200, src: "hd/placas.jpg", proporcion: 16 / 9 },
  ],
  tarjetas: [
    {
      tipo: "artistas",
      desdeMs: 300,
      hastaMs: 4600,
      artistas: [{ nombre: "Haffit David", ms: 3819 }],
    },
    {
      tipo: "portada",
      desdeMs: 11300,
      hastaMs: 15400,
      src: "hd/zumbalo.jpg",
      lado: "izq",
      etiqueta: "Su primera producción",
    },
    {
      tipo: "redes",
      desdeMs: 15500,
      hastaMs: 23500,
      texto: "Placa de YouTube: +100 mil suscriptores",
      redes: ["youtube"],
    },
    {
      tipo: "sobria",
      desdeMs: 23600,
      hastaMs: 32000,
      antetitulo: "Barranquilla",
      titulo: "Estadio Romelio Martínez",
    },
    {
      tipo: "sobria",
      desdeMs: 32100,
      hastaMs: 40400,
      antetitulo: "Orgullo de La Guajira",
      titulo: "Riohacha",
    },
  ],
  palabrasClave: [
    "haffit",
    "haffit,",
    "david",
    "david.",
    "riohachero",
    "bogotá",
    "oro,",
    "platino",
    "diamante",
    "zúmbalo.",
    "youtube",
    "100",
    "mil",
    "barranquilla",
    "romelio",
    "martínez.",
    "guajira",
    "riohacha.",
  ],
};
