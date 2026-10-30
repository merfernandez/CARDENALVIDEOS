# Videos Cardenal Stereo 91.7 FM

Proyecto de [Remotion](https://www.remotion.dev) para editar los Reels y TikToks de Cardenal Stereo (Riohacha): subtítulos animados palabra por palabra, palabras clave gigantes, nombre e Instagram de quien habla, zooms suaves y cierre de marca.

## Estilo de la marca

- **Colores:** rojo `#E30613`, negro y blanco (`src/brand.ts`).
- **Letra:** Montserrat (gruesa en subtítulos, limpia en los nombres).
- **Formato:** 1080×1920 vertical, 30 fps.
- **Subtítulos:** blancos con borde negro; la palabra que se está diciendo va en un recuadro rojo; las palabras clave en rojo.
- **Palabras clave gigantes** (fecha, hora, lugar, marca): las letras caen una por una con rebote. Sin rayas ni fondos detrás.
- **Nombre del orador:** franja oscura con línea roja, nombre en mayúsculas, cargo (opcional) e ícono de Instagram a color con el @. Aparece mientras esa persona habla por primera vez.
- **Sin emojis ni logo encima de las personas.** El logo grande va en el cierre.
- **Ningún cuadro (tarjeta, foto o video de apoyo) puede caer sobre la cara, la cabeza o los hombros de nadie.** Antes de exportar, revisar en la muestra dónde está la persona en ESE video (a veces William está corrido a un lado) y elegir el lado y tamaño del cuadro según eso. Las tarjetas de esquina son de 320×400 (`src/FotoEsquina.tsx`).
- **No usar la versión "experimental"** (pantalla de dato gigante, pantalla dividida con William abajo, píldoras, pantalla "Síguenos" con flecha): a la directora no le gustó.
- **Las tarjetas de arriba nunca pueden caer sobre la cabeza o la cara de nadie** (`ALTURA_TARJETAS` en `src/TarjetasNoticia.tsx`). Revisar en la muestra antes de exportar.
- **Sin zoom sobre el video.** Nada de punch-in/punch-out en la imagen: cansa. Las animaciones van solo en letras y gráficos.
- **El audio del video principal manda.** No se agregan otras pistas de audio; los videos de apoyo van sin sonido.

### Imágenes de apoyo: variar el formato

La directora pide **no repetir siempre el mismo formato**: si en el día hay 2 videos con apoyo, cada uno con un formato distinto. Formatos disponibles:

1. **Tarjetas en las esquinas de arriba** (`src/FotoEsquina.tsx`): fotos o videos al lado de la cara, sin taparla. Usado en Silvestre Dangond y Kbeto en Barranquilla.
2. **Pantalla completa con cortina** (`ApoyoCompleto` en `src/PantallaDividida.tsx`): entra barriendo con una línea de color. Usado en Oscar Gamarra.
3. **Pantalla completa con fundido y fondo desenfocado** (`src/ApoyoSobrio.tsx`): para noticias serias o medios que no son verticales.
4. Ideas nuevas por probar: el video de William se reduce (sin recortarlo) y el apoyo sale abajo; fotos tipo polaroid que se apilan; apoyo que sube desde abajo sobre los subtítulos.

No usar la pantalla dividida que corta a William por la cintura (a la directora no le gustó).

### Color

- William desactivó el **Video HDR** del iPhone: los próximos videos deberían llegar en formato normal. En ese caso, respetar el color original (ajuste mínimo).
- Si llegan en HDR (`color_transfer=arib-std-b67`), usar `bash scripts/preparar_video.sh entrada salida calido` (el color del video de Peter).
- Los videos de William suelen venir **en espejo** (modo selfie): voltear con `hflip` para que las letras del fondo y de la camiseta se lean bien.

### Las Más Virales (viernes)

- Un solo video de William con las 3 noticias más importantes de la semana; estilo más ágil y moderno.
- **Logo aprobado: opción 1 "Viral"** (`LogoMasVirales` / `LogoMasViralesAnimado` en `src/MasVirales.tsx`): entra grande al centro y queda pequeño arriba a la izquierda todo el video.

### Noticias vallenatas

- Estilo sobrio: subtítulos pequeños (54 px) en frases de 3–5 palabras, tiempos con Whisper DTW (`scripts/dtw_captions.py`).
- Rótulo de William tipo noticiero (`src/RotuloNoticia.tsx`) durante unos 15 s.
- Tarjetas arriba con artistas, canción y plataformas (`src/TarjetasNoticia.tsx`). Se puede usar el color del artista (ej. Oscar Gamarra: amarillo).
- Cierre animado: logo con rebote, brillo y ondas de radio + "Síguenos en www.cardenalstereo.com" (`src/CierreNoticias.tsx`).
- **Todos los cierres** llevan los créditos (`src/Creditos.tsx`), grandes y destacados: "Edición: Equipo Digital Sistema Cardenal", Mercy Edith Fernández Pacheco (Directora General Sistema Cardenal) y Adaluz Trespalacios (Asistente Ejecutiva Sistema Cardenal).
- **Notas de audio (audiograma):** el círculo con la foto va más abajo (`src/Audiograma.tsx`) para que las tarjetas de arriba no le tapen la cabeza.
- **Cierre:** logo + fecha + hora + lugar (`src/CierreHalloween.tsx` para eventos de Halloween).

## Pasos para un video nuevo

1. **Preparar el video** (corrige el color de iPhone HDR):
   ```bash
   bash scripts/preparar_video.sh original.mov public/nuevo.mp4
   ```
2. **Transcribir** (Whisper, en español):
   ```bash
   node scripts/transcribe.mjs public/nuevo.mp4 public/nuevo-raw.json
   python3 scripts/clean_captions.py public/nuevo-raw.json public/nuevo-captions.json
   ```
   `clean_captions.py` corrige nombres propios (Suchiimma, Cardenal Stereo, Riohacha). Agregar más correcciones en la lista `FIX`.
3. **Quitar silencios** y re-sincronizar subtítulos:
   ```bash
   python3 scripts/cut_silences.py public/nuevo.mp4 public/nuevo-captions.json public/nuevo-cut.mp4 public/nuevo-cut-captions.json
   ```
4. **Plan de edición:** copiar `src/videos/fiesta-duo.ts` y ajustar oradores (nombre, cargo, Instagram, cuándo hablan), zooms y palabras destacadas, usando los tiempos que imprime el paso 3.
5. **Vista previa:** `npm run dev`
6. **Exportar (calidad máxima que se puede descargar):** `bash scripts/exportar.sh ComposicionId out/video.mp4` — render maestro sin pérdidas y compresión final con tope de ~48 MB (100 MB no se descargó en la app).

   Alternativa, solo maestro pesado:
   ```bash
   npx remotion render FiestaDuo out/video.mp4 --image-format=png --crf=12 --x264-preset=slow --audio-bitrate=320k --color-space=bt709
   ```

## Pendientes para los próximos videos

- **Sincronía de subtítulos:** los tiempos de Whisper son aproximados y algunas palabras se adelantan o atrasan. Usar alineación más precisa (Whisper con DTW + Silero VAD) y revisar cuadro por cuadro antes de exportar.
- **Palabras que se saltan:** dar un tiempo mínimo en pantalla a cada palabra.
- **Logo y nombres:** la directora enviará referencias de cómo le gustan.

## Composiciones

- `CardenalReel`: video de William de la Rosa (un orador).
- `FiestaDuo`: William de la Rosa + Sixto A. Carrillo (dos oradores, cierre de Halloween).

## Herramientas

- FFmpeg (color y cortes), Whisper.cpp (transcripción; se instala solo en `whisper.cpp/`), Silero VAD (detección de voz, modelo de Whisper.cpp), auto-editor y HyperFrames (`scripts/setup.sh`).
