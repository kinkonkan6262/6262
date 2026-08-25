const { chromium } = await import(process.env.PW_MODULE || "playwright");
import fs from "fs";

const full = fs.readFileSync("anna-icon.svg", "utf8");
const small = fs.readFileSync("anna-icon-small.svg", "utf8");
const fd = fs.readFileSync("anna-folder.svg", "utf8");
const fdSmall = fs.readFileSync("anna-folder-small.svg", "utf8");
// 小サイズ（16〜48px）は A のモノグラム版、それ以上は完全版を使う
const SIZES = [
  [16, small], [32, small], [48, small],
  [64, full], [128, full], [180, full], [192, full], [256, full], [512, full], [1024, full],
];

// フォルダー用（16〜48px は唐草なしの簡略版）
const FOLDER_SIZES = [
  [16, fdSmall], [32, fdSmall], [48, fdSmall],
  [64, fd], [128, fd], [256, fd], [512, fd],
];

const b = await chromium.launch();
fs.mkdirSync("png", { recursive: true });
fs.mkdirSync("png-folder", { recursive: true });
async function shoot(svg, size, dir, name) {
  const page = await b.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(
    `<body style="margin:0">${svg.replace('width="512" height="512"', `width="${size}" height="${size}"`)}</body>`
  );
  await page.screenshot({ path: `${dir}/${name}-${size}.png`, omitBackground: true });
  await page.close();
}
for (const [size, svg] of SIZES) await shoot(svg, size, "png", "anna");
for (const [size, svg] of FOLDER_SIZES) await shoot(svg, size, "png-folder", "anna-folder");
await b.close();
console.log("png/ ・ png-folder/ 生成完了");
