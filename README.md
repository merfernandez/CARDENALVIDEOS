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
- **Sin zoom sobre el video.** Nada de punch-in/punch-out en la imagen: cansa. Las animaciones van solo en letras y gráficos.
- **El audio del video principal manda.** No se agregan otras pistas de audio; los videos de apoyo van sin sonido.

### Noticias vallenatas

- Estilo sobrio: subtítulos pequeños (54 px) en frases de 3–5 palabras, tiempos con Whisper DTW (`scripts/dtw_captions.py`).
- Rótulo de William tipo noticiero (`src/RotuloNoticia.tsx`) durante unos 15 s.
- Tarjetas arriba con artistas, canción y plataformas (`src/TarjetasNoticia.tsx`). Se puede usar el color del artista (ej. Oscar Gamarra: amarillo).
- Cierre animado: logo con rebote, brillo y ondas de radio + "Síguenos en www.cardenalstereo.com" (`src/CierreNoticias.tsx`).
- **Todos los cierres** llevan el crédito "Edición: Equipo Digital Sistema Cardenal" (`CREDITO_EDICION` en `src/brand.ts`).
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
6. **Exportar en máxima calidad:**
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
