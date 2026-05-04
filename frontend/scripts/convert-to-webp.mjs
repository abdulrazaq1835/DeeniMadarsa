import sharp from "sharp";
import { readdirSync, existsSync, statSync } from "fs";
import { join, extname, basename, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const images = readdirSync(publicDir).filter((f) =>
  [".jpeg", ".jpg", ".png"].includes(extname(f).toLowerCase())
);

for (const file of images) {
  const input = join(publicDir, file);
  const outName = basename(file, extname(file)) + ".webp";
  const output = join(publicDir, outName);

  if (existsSync(output)) {
    console.log(`skip (exists): ${outName}`);
    continue;
  }

  try {
    await sharp(input)
      .webp({ quality: 82, effort: 4 })
      .toFile(output);
    const inSize = statSync(input).size;
    const outSize = statSync(output).size;
    const saved = Math.round((1 - outSize / inSize) * 100);
    console.log(`✓ ${file} → ${outName}  (${Math.round(outSize / 1024)}KB, saved ${saved}%)`);
  } catch (e) {
    console.error(`✗ ${file}: ${e.message}`);
  }
}
