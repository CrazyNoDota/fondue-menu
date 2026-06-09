// Generates the table QR code for Fondue.
// Scanning it opens the live site and jumps straight to the menu section.
//
// Usage:  node scripts/generate-qr.mjs [url]
// Default URL: https://fondue-menu.vercel.app/#menu

import QRCode from "qrcode";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] ?? "https://fondue-menu.vercel.app/#menu";
const out = join(__dirname, "..", "public", "qr.png");

await QRCode.toFile(out, url, {
  errorCorrectionLevel: "H", // tolerant of print smudges / logo overlay
  margin: 2,
  width: 1024,
  color: {
    dark: "#160508", // brand wine-black
    light: "#F6ECD8", // warm cream
  },
});

console.log(`QR → ${out}\n  encodes: ${url}`);
