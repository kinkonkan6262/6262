const { chromium } = await import(process.env.PW_MODULE || "playwright");
import fs from "fs";

const full = fs.readFileSync("anna-icon.svg", "utf8");
const small = fs.readFileSync("anna-icon-small.svg", "utf8");
// 小サイズ（16〜48px）は A のモノグラム版、それ以上は完全版を使う
const SIZES = [
  [16, small], [32, small], [48, small],
  [64, full], [128, full], [180, full], [192, full], [256, full], [512, full], [1024, full],
];

const b = await chromium.launch();
fs.mkdirSync("png", { recursive: true });
for (const [size, svg] of SIZES) {
  const page = await b.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(
    `<body style="margin:0">${svg.replace('width="512" height="512"', `width="${size}" height="${size}"`)}</body>`
  );
  await page.screenshot({ path: `png/anna-${size}.png`, omitBackground: true });
  await page.close();
}
await b.close();
console.log("png/ 生成完了");
