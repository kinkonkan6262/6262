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

// 「Anna」の下に添える金の飾り罫
function flourish() {
  const half = `<path d="M-112,0 L-20,0" stroke-width="3.4"/>
    <circle cx="-118" cy="0" r="3.6" fill="${GOLD}" stroke="none"/>`;
  return `<g transform="translate(256,354)" fill="none" stroke="${GOLD}" stroke-linecap="round">
    ${half}
    <g transform="scale(-1,1)">${half}</g>
    <g transform="rotate(45)"><rect x="-6" y="-6" width="12" height="12" fill="${GOLD}" stroke="none"/></g>
  </g>`;
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
  ${fit(GV, "Anna", { x: 100, y: 150, w: 312, h: 176 }, { fill: WHITE })}
  ${flourish()}
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


// ===== フォルダー用アイコン（Windowsのフォルダー差し替え用） =====
export function iconFolder() {
  const sprig = cornerSprig(GOLD, BLUE);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="annaFdBack" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3B49B4"/><stop offset="1" stop-color="#2A3690"/>
    </linearGradient>
    <linearGradient id="annaFdFront" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#36439F"/><stop offset="1" stop-color="#222C74"/>
    </linearGradient>
    <linearGradient id="annaFdGold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${GOLD_L}"/><stop offset="1" stop-color="${GOLD}"/>
    </linearGradient>
  </defs>
  <!-- 背面（タブ付き） -->
  <path d="M26,150 Q26,116 60,116 L188,116 Q204,116 214,129 L242,166 L458,166
           Q486,166 486,194 L486,404 Q486,432 458,432 L54,432 Q26,432 26,404 Z"
        fill="url(#annaFdBack)"/>
  <!-- 前面 -->
  <path d="M26,214 Q26,190 52,190 L460,190 Q486,190 486,214 L486,406
           Q486,432 458,432 L54,432 Q26,432 26,406 Z" fill="url(#annaFdFront)"/>
  <path d="M26,214 Q26,190 52,190 L460,190 Q486,190 486,214 L486,406
           Q486,432 458,432 L54,432 Q26,432 26,406 Z"
        fill="none" stroke="url(#annaFdGold)" stroke-width="6"/>
  <path d="M46,208 L466,208" stroke="url(#annaFdGold)" stroke-width="2.6" opacity="0.55"/>
  <!-- 四隅の唐草（前面の内側） -->
  <g opacity="0.9" transform="translate(0,0)">
    <g transform="translate(44,206) scale(0.5)">${sprig}</g>
    <g transform="translate(468,206) scale(-0.5,0.5)">${sprig}</g>
    <g transform="translate(44,416) scale(0.5,-0.5)">${sprig}</g>
    <g transform="translate(468,416) scale(-0.5,-0.5)">${sprig}</g>
  </g>
  ${fit(GV, "Anna", { x: 128, y: 236, w: 256, h: 122 }, { fill: WHITE })}
  <g transform="translate(256,392)" fill="none" stroke="${GOLD}" stroke-linecap="round">
    <path d="M-92,0 L-18,0" stroke-width="3"/>
    <path d="M92,0 L18,0" stroke-width="3"/>
    <g transform="rotate(45)"><rect x="-5" y="-5" width="10" height="10" fill="${GOLD}" stroke="none"/></g>
  </g>
</svg>`;
}


// 小サイズ用フォルダー（唐草なし・Anna のみ）
export function iconFolderSmall() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="annaFdsBack" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3B49B4"/><stop offset="1" stop-color="#2A3690"/>
    </linearGradient>
    <linearGradient id="annaFdsFront" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#36439F"/><stop offset="1" stop-color="#222C74"/>
    </linearGradient>
  </defs>
  <path d="M26,150 Q26,116 60,116 L188,116 Q204,116 214,129 L242,166 L458,166
           Q486,166 486,194 L486,404 Q486,432 458,432 L54,432 Q26,432 26,404 Z"
        fill="url(#annaFdsBack)"/>
  <path d="M26,214 Q26,190 52,190 L460,190 Q486,190 486,214 L486,406
           Q486,432 458,432 L54,432 Q26,432 26,406 Z" fill="url(#annaFdsFront)"/>
  <path d="M26,214 Q26,190 52,190 L460,190 Q486,190 486,214 L486,406
           Q486,432 458,432 L54,432 Q26,432 26,406 Z"
        fill="none" stroke="${GOLD}" stroke-width="12"/>
  ${fit(GV, "Anna", { x: 96, y: 232, w: 320, h: 152 }, { fill: WHITE })}
</svg>`;
}

fs.writeFileSync("anna-icon.svg", iconFull());
fs.writeFileSync("anna-icon-small.svg", iconSmall());
fs.writeFileSync("anna-folder.svg", iconFolder());
fs.writeFileSync("anna-folder-small.svg", iconFolderSmall());
console.log("wrote anna-icon.svg / anna-icon-small.svg / anna-folder.svg");
