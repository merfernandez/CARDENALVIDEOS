// Seguimiento Kbeto Zuleta: video de inicio + nota de audio + video final.
// Tiempos de la nota en ms DESDE EL INICIO DE LA NOTA DE AUDIO.
import type { ApoyoPlan } from "../ApoyoSobrio";

const ARCHIVO = "Imágenes de archivo";

export const DURACION_INICIO_MS = 28180;
export const DURACION_NOTA_MS = 101560;
export const DURACION_FINAL_MS = 15950;

export const APOYOS_NOTA: ApoyoPlan[] = [
  // "Carlos Alberto Kbeto Zuleta García permanece estable…"
  { desdeMs: 0, hastaMs: 5100, src: "kbeto/kbeto.jpg", etiqueta: ARCHIVO },
  // "…el puente sobre el río Ariguaní"
  {
    desdeMs: 23000,
    hastaMs: 28500,
    src: "accidente-b3.mp4",
    desdeSeg: 11.3,
    etiqueta: ARCHIVO,
  },
  // "En un comunicado, la institución informó…"
  {
    desdeMs: 28400,
    hastaMs: 35400,
    src: "kbeto/boletin-2.jpg",
    proporcion: 1629 / 2037,
  },
  // "Sobre el estado de Kbeto Zuleta…"
  {
    desdeMs: 47900,
    hastaMs: 56500,
    src: "kbeto/concierto-1.mp4",
    desdeSeg: 20,
    proporcion: 576 / 1024,
    etiqueta: ARCHIVO,
  },
  // "Poncho Zuleta suspendió los compromisos…"
  {
    desdeMs: 66100,
    hastaMs: 73700,
    src: "kbeto/concierto-2.mp4",
    desdeSeg: 40,
    proporcion: 576 / 1024,
    etiqueta: ARCHIVO,
  },
  // "Poncho Zuleta llegó al municipio de Bosconia…"
  {
    desdeMs: 85600,
    hastaMs: DURACION_NOTA_MS,
    src: "kbeto/poncho.mp4",
    desdeSeg: 0,
    proporcion: 480 / 600,
  },
];

export const TARJETAS_NOTA = [
  {
    desdeMs: 300,
    hastaMs: 5100,
    antetitulo: "Kbeto Zuleta",
    titulo: "Estable en cuidados intensivos",
  },
  {
    desdeMs: 5300,
    hastaMs: 16900,
    antetitulo: "Clínica Sinais Vitais",
    titulo: "Bosconia, Cesar",
  },
  {
    desdeMs: 17100,
    hastaMs: 22900,
    antetitulo: "Continúan hospitalizadas",
    titulo: "16 personas",
  },
  {
    desdeMs: 73700,
    hastaMs: 85400,
    antetitulo: "Poncho Zuleta",
    titulo: "Regresó para acompañar a su hijo",
  },
];

export const CIFRAS = {
  desdeMs: 35400,
  hastaMs: 47800,
  antetitulo: "16 pacientes hospitalizados",
  cifras: [
    { numero: "4", texto: "Cirugía general" },
    { numero: "2", texto: "Cuidados intensivos" },
    { numero: "10", texto: "Traumatología" },
  ],
};
