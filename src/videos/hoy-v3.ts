// Seguimiento: Kbeto Zuleta trasladado a la Clínica Iberoamérica en Barranquilla
// (tiempos en ms, ya sin silencios). Tono serio.
import type { PlanNoticia } from "../NoticiaHoy";

export const plan: PlanNoticia = {
  video: "hoy/v3-cut.mp4",
  subtitulos: "hoy/v3-cut-captions.json",
  seccion: "Noticia en desarrollo",
  sobrio: true,
  fotos: [
    // "En un avión ambulancia de la Fuerza Aérea Colombiana fue trasladado…"
    {
      desdeMs: 200,
      hastaMs: 6900,
      src: "hoy/v3-avion.mp4",
      desdeSeg: 2,
      lado: "izq",
    },
    // "Kbeto ingresó a la Clínica Iberoamérica…"
    {
      desdeMs: 8150,
      hastaMs: 14000,
      src: "hoy/v3-llegada.mp4",
      desdeSeg: 18,
      lado: "der",
    },
    {
      desdeMs: 14000,
      hastaMs: 18400,
      src: "hoy/v3-llegada.mp4",
      desdeSeg: 33,
      lado: "izq",
    },
  ],
  tarjetas: [
    {
      tipo: "sobria",
      desdeMs: 6950,
      hastaMs: 8100,
      antetitulo: "Trasladado a",
      titulo: "Barranquilla",
    },
    {
      tipo: "sobria",
      desdeMs: 18500,
      hastaMs: 27800,
      antetitulo: "Kbeto Zuleta",
      titulo: "En cuidados intensivos",
    },
  ],
  palabrasClave: [],
};
