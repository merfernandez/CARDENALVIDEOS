// Tipos compartidos del plan de edición de cada video (tiempos en ms)

export type ZoomClave = {
  ms: number;
  escala: number;
  // Punto que queda fijo al hacer zoom (0–1). Por defecto la cara al centro.
  x?: number;
  y?: number;
};

export type StickerPlan = {
  ms: number;
  duracionMs: number;
  src: string;
  lado: "izq" | "der";
  top?: number;
  // Si se indica, se dibuja una tarjeta tipo calendario en vez de una imagen
  tarjeta?: { arriba: string; abajo: string };
};

export type Orador = {
  nombre: string;
  cargo?: string;
  instagram: string;
  desdeSeg: number;
  hastaSeg: number;
  lado: "izq" | "der" | "centro";
};

// Frase clave que reemplaza los subtítulos normales mientras se dice
export type Destacado = {
  desdeMs: number;
  hastaMs: number;
  lineas: {
    texto: string;
    ms: number;
    estilo: "enorme" | "bloque" | "etiqueta";
  }[];
};
