// Laura Hamburguer "La China": álbum «Campeones» (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "lh/v-cut.mp4",
  subtitulos: "lh/v-cut-captions.json",
  seccion: "Noticias vallenatas",
  // El afiche llena la pantalla y William queda en ventana; el afiche habla solo
  ventana: [
    {
      desdeMs: 5800,
      hastaMs: 12100,
      apoyos: [{ src: "lh/afiche.png", hastaMs: 12100, posicion: "abajo" }],
    },
  ],
  tarjetas: [
    {
      tipo: "artistas",
      desdeMs: 2950,
      hastaMs: 5700,
      artistas: [
        { nombre: "Laura «La China»", ms: 3059 },
        { nombre: "Sebastián Sepúlveda", ms: 4184 },
      ],
    },
    {
      tipo: "cifras",
      desdeMs: 12200,
      hastaMs: 19500,
      antetitulo: "Álbum «Campeones»",
      cifras: [
        { numero: "13", texto: "Canciones" },
        { numero: "12", texto: "De noviembre" },
      ],
    },
    {
      tipo: "sobria",
      desdeMs: 19600,
      hastaMs: 25400,
      antetitulo: "La China",
      titulo: "Le sigue apostando a su proyecto",
    },
    {
      tipo: "cancion",
      desdeMs: 25500,
      hastaMs: 30000,
      etiqueta: "Nueva producción",
      titulo: "Campeones",
      detalle: "Laura Hamburguer «La China»",
    },
  ],
  palabrasClave: [
    "china",
    "china.",
    "laura",
    "hamburguer",
    "hamburguer,",
    "sebastián",
    "sepúlveda",
    "jueves",
    "12",
    "noviembre",
    "campeones,",
    "campeones",
    "13",
    "canciones",
    "compositores",
    "inédita",
  ],
};
