// Display derivatives only. Original artwork and full films stay in place.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const ffmpeg = process.env.FFMPEG_PATH || 'ffmpeg';
const run = (input, output, options) => {
  const target = path.join(root, output);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', path.join(root, input), ...options, target], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`Could not create ${output}`);
  console.log(`${output}: ${(fs.statSync(target).size / 1024).toFixed(1)} KiB`);
};

const films = [
  [3, 'pages/journal-week-3-bh/journaleyes.mp4'],
  [4, 'pages/journal-week-4-bh/assets/girl-and-clouds-live.mp4'],
  [6, 'pages/journal-week-6-bh/assets/acid-rocks-wallpaper.mp4'],
  [7, 'pages/journal-week-7-bh/assets/slow-down-chaos-background.mp4'],
  [8, 'pages/journal-week-8-bh/Window-Soul-Lyrics.mp4'],
];
for (const [week, source] of films) {
  run(source, `assets/previews/week-${week}.mp4`, ['-t', '8', '-an', '-vf', "scale=640:640:force_original_aspect_ratio=decrease:force_divisible_by=2,fps=24", '-c:v', 'libx264', '-threads', '4', '-preset', 'medium', '-crf', '28', '-pix_fmt', 'yuv420p', '-movflags', '+faststart']);
}
run('pages/journal-week-6-bh/assets/stone-layer.jpeg', 'assets/previews/stone-layer.webp', ['-frames:v', '1', '-vf', 'scale=1200:-1', '-quality', '78']);
for (const number of ['05', '07', '08', '11', '13', '17', '18', '19', '20', '21']) {
  run(`images/colors${number}.jpg`, `images/optimized/colors${number}.webp`, ['-frames:v', '1', '-vf', 'scale=640:640:force_original_aspect_ratio=decrease', '-quality', '78']);
}
