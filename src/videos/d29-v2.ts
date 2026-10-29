// Oscar Gamarra: Tour del Gamarrazo, Bogotá y Riohacha (tiempos en ms, ya sin silencios)
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "d29/v2-cut.mp4",
  subtitulos: "d29/v2-cut-captions.json",
  seccion: "Noticias vallenatas",
  ventana: [
    {
      // "llega con invitados especiales a Bogotá…" → "Riohacha vivirá el Gamarrazo…"
      desdeMs: 6750,
      hastaMs: 28950,
      apoyos: [
        { src: "d29/v2-a.mp4", hastaMs: 17450, posicion: "abajo" },
        { src: "d29/v2-b.mp4", hastaMs: 28950 },
      ],
    },
  ],
  tarjetas: [
    {
      tipo: "sobria",
      desdeMs: 300,
      hastaMs: 6600,
      antetitulo: "Tour del Gamarrazo",
      titulo: "Desde el sábado 31 de octubre",
    },
    {
      tipo: "cancion",
      desdeMs: 29050,
      hastaMs: 37500,
      etiqueta: "La canción del Gamarrazo",
      titulo: "El Cachuflo",
      detalle: "Oscar Gamarra",
    },
  ],
  palabrasClave: [
    "gamarrazo",
    "oscar",
    "gamarra",
    "colombia",
    "31",
    "octubre",
    "bogotá",
    "jimmy",
    "zambrano",
    "juancho",
    "espriella",
    "morre",
    "romero",
    "camilo",
    "carvajal",
    "riohacha",
    "franco",
    "argüelles",
    "goyo",
    "oviedo",
    "cachuflo",
    "carnaval",
  ],
};
