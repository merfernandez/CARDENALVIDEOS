// Noticia vallenata: Oscar Gamarra lanza «El Gamarrazo» con caravana en Riohacha
// (tiempos en ms, ya sin silencios). Sin zoom sobre el video.

export const AMARILLO = "#FFD100";

type Apoyo = {
  desdeMs: number;
  hastaMs: number;
  src: string;
  // Segundo del video de apoyo desde el que se toma la imagen
  desdeSeg: number;
  estilo: "tarjeta" | "completa";
  lado?: "izq" | "der";
};

export const APOYOS: Apoyo[] = [
  // "espectacular caravana de lanzamiento": camión y tarima
  {
    desdeMs: 4700,
    hastaMs: 8000,
    src: "gamarra-a1.mp4",
    desdeSeg: 6.2,
    estilo: "tarjeta",
    lado: "der",
  },
  // "El Gamarrazo": dron con el título del álbum
  {
    desdeMs: 9450,
    hastaMs: 11100,
    src: "gamarra-a1.mp4",
    desdeSeg: 1.3,
    estilo: "completa",
  },
  // "salieron vestidos de amarillo… calles y avenidas"
  {
    desdeMs: 11900,
    hastaMs: 17300,
    src: "gamarra-a2.mp4",
    desdeSeg: 11,
    estilo: "tarjeta",
    lado: "izq",
  },
  // "Rodeado del cariño de sus familiares, amigos y artistas"
  {
    desdeMs: 26700,
    hastaMs: 31600,
    src: "gamarra-a2.mp4",
    desdeSeg: 40.5,
    estilo: "tarjeta",
    lado: "der",
  },
  // "El Gamarrazo con una caravana espectacular": fuegos artificiales
  {
    desdeMs: 38100,
    hastaMs: 41950,
    src: "gamarra-a2.mp4",
    desdeSeg: 18,
    estilo: "completa",
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
