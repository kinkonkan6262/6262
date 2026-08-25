import fs from "fs";
import { BLUE, BLUE_D, GOLD, GOLD_L, WHITE, cornerSprig } from "./icon_core.mjs";
import { textPath } from "./mkword.mjs";

const GV = "node_modules/@fontsource/great-vibes/files/great-vibes-latin-400-normal.woff";
const CZ = "node_modules/@fontsource/cinzel/files/cinzel-latin-500-normal.woff";

// 文字パスを指定の枠に収めて中央配置する
function fit(fontFile, text, box, opts = {}) {
  const { d, bbox } = textPath(fontFile, text, 200, opts.tracking || 0);
  const w = bbox.x2 - bbox.x1, h = bbox.y2 - bbox.y1;
  const s = Math.min(box.w / w, box.h / h);
  const tx = box.x + (box.w - w * s) / 2 - bbox.x1 * s;
  const ty = box.y + (box.h - h * s) / 2 - bbox.y1 * s;
  return `<g transform="translate(${tx.toFixed(2)},${ty.toFixed(2)}) scale(${s.toFixed(4)})"><path d="${d}" fill="${opts.fill}"/></g>`;
}

// ===== フルアイコン（512基準） =====
export function iconFull() {
  const sprig = cornerSprig(GOLD, BLUE);
  const corners = `
    <g opacity="0.95">
      <g transform="translate(52,52)">${sprig}</g>
      <g transform="translate(460,52) scale(-1,1)">${sprig}</g>
      <g transform="translate(52,460) scale(1,-1)">${sprig}</g>
      <g transform="translate(460,460) scale(-1,-1)">${sprig}</g>
    </g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="annaIcoBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${BLUE}"/><stop offset="1" stop-color="${BLUE_D}"/>
    </linearGradient>
    <linearGradient id="annaIcoGold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${GOLD_L}"/><stop offset="1" stop-color="${GOLD}"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#annaIcoBg)"/>
  <rect x="30" y="30" width="452" height="452" rx="88" fill="none" stroke="url(#annaIcoGold)" stroke-width="7"/>
  <rect x="45" y="45" width="422" height="422" rx="76" fill="none" stroke="url(#annaIcoGold)" stroke-width="2.6" opacity="0.75"/>
  ${corners}
  ${fit(GV, "Anna", { x: 108, y: 172, w: 296, h: 140 }, { fill: WHITE })}
  ${fit(CZ, "PREMIUM", { x: 156, y: 344, w: 200, h: 30 }, { fill: GOLD, tracking: 14 })}
</svg>`;
}

// ===== 小サイズ用（16〜32px：A モノグラム） =====
export function iconSmall() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="annaIcoBg2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${BLUE}"/><stop offset="1" stop-color="${BLUE_D}"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#annaIcoBg2)"/>
  <rect x="34" y="34" width="444" height="444" rx="86" fill="none" stroke="${GOLD}" stroke-width="14"/>
  ${fit(GV, "A", { x: 120, y: 110, w: 272, h: 292 }, { fill: WHITE })}
</svg>`;
}

fs.writeFileSync("anna-icon.svg", iconFull());
fs.writeFileSync("anna-icon-small.svg", iconSmall());
console.log("wrote anna-icon.svg / anna-icon-small.svg");
