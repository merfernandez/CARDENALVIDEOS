import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import {
  downloadWhisperModel,
  installWhisperCpp,
  transcribe,
  toCaptions,
} from "@remotion/install-whisper-cpp";

// Uso: node scripts/transcribe.mjs public/william.mp4 public/william-captions.json
const [input, output] = process.argv.slice(2);
const to = path.join(process.cwd(), "whisper.cpp");
const model = "large-v3-turbo";

await installWhisperCpp({ to, version: "1.7.6" });

// El fetch de Node no pasa por el proxy de la nube: bajar los modelos con curl
const bajar = (archivo, url) => {
  if (!fs.existsSync(archivo) || fs.statSync(archivo).size === 0) {
    execSync(`curl -sSL -o "${archivo}" "${url}"`, { stdio: "inherit" });
  }
};
bajar(
  path.join(to, `ggml-${model}.bin`),
  `https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-${model}.bin`,
);
await downloadWhisperModel({ model, folder: to });

const wav = path.join(to, "audio.wav");
execSync(`ffmpeg -v error -y -i "${input}" -ar 16000 -ac 1 "${wav}"`);

const whisperCppOutput = await transcribe({
  model,
  whisperPath: to,
  whisperCppVersion: "1.7.6",
  inputPath: wav,
  tokenLevelTimestamps: true,
  language: "es",
});

const { captions } = toCaptions({ whisperCppOutput });
fs.writeFileSync(output, JSON.stringify(captions, null, 2));
console.log(captions.map((c) => c.text).join(""));
