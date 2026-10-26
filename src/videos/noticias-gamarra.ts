// Noticia vallenata: Oscar Gamarra lanza «El Gamarrazo» con caravana en Riohacha
// (tiempos en ms, ya sin silencios). Sin zoom sobre el video.

export const AMARILLO = "#FFD100";

import type { TramoDividido } from "../PantallaDividida";

// Videos de apoyo a pantalla completa (la voz de William sigue de fondo).
// Solo en tres momentos y nunca cuando habla del cumpleaños (no hay imágenes de eso).
export const TRAMOS_APOYO: TramoDividido[] = [
  {
    // "espectacular caravana de lanzamiento": camión y tarima
    desdeMs: 4700,
    hastaMs: 7900,
    clips: [{ src: "gamarra-a1.mp4", desdeSeg: 6.2, hastaMs: 7900 }],
  },
  {
    // "El Gamarrazo" (dron con el título) → "vestidos de amarillo… calles y avenidas"
    desdeMs: 9450,
    hastaMs: 17300,
    clips: [
      { src: "gamarra-a1.mp4", desdeSeg: 1.3, hastaMs: 11150 },
      { src: "gamarra-a2.mp4", desdeSeg: 11, hastaMs: 17300 },
    ],
  },
  {
    // "El Gamarrazo con una caravana espectacular": fuegos artificiales
    desdeMs: 38100,
    hastaMs: 41950,
    clips: [{ src: "gamarra-a2.mp4", desdeSeg: 18, hastaMs: 41950 }],
  },
];

export const NOMBRES = [
  { desdeMs: 150, hastaMs: 3400, etiqueta: "Artista guajiro" },
  { desdeMs: 20400, hastaMs: 23400, etiqueta: "Celebró su cumpleaños" },
  { desdeMs: 33300, hastaMs: 35900, etiqueta: "Lanzamiento" },
];

export const ALBUM = {
  desdeMs: 7950,
  hastaMs: 9450,
  etiqueta: "Nuevo álbum",
  titulo: "El Gamarrazo",
  detalle: "Oscar Gamarra",
};

export const PALABRAS_CLAVE = [
  "oscar",
  "gamarra",
  "riohacha",
  "caravana",
  "gamarrazo",
  "amarillo",
  "riohacheros",
  "cumpleaños",
  "álbum",
  "lanzamiento",
  "guajiro",
  "espectacular",
];
