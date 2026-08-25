// Anna ブランドアイコン（写真のラベル：ロイヤルブルー×ゴールド花柄 をモチーフ）
// すべてベクターパスで描画（フォント非依存）
export const BLUE = "#2F3C9E";
export const BLUE_D = "#26317F";
export const GOLD = "#F7C51A";
export const GOLD_L = "#FFD84D";
export const WHITE = "#FFFFFF";

// ---- 花・葉のパーツ -------------------------------------------------
function leaf(x, y, rot, s, fill) {
  return `<path d="M0,0 C7,-9 20,-9 27,0 C20,9 7,9 0,0 Z" fill="${fill}" transform="translate(${x},${y}) rotate(${rot}) scale(${s})"/>`;
}
function flower(x, y, s, fill, core) {
  let p = "";
  for (let i = 0; i < 6; i++) {
    p += `<ellipse cx="0" cy="-13" rx="6.4" ry="9.5" fill="${fill}" transform="rotate(${i * 60})"/>`;
  }
  return `<g transform="translate(${x},${y}) scale(${s})">${p}<circle r="4.6" fill="${core}"/></g>`;
}
function vine(d, fill, w) {
  return `<path d="${d}" fill="none" stroke="${fill}" stroke-width="${w}" stroke-linecap="round"/>`;
}

// ---- 隅の唐草（左上コーナー基準：0,0 が枠の内側の角） ----------------
function bez(P, t) {
  const u = 1 - t;
  const x = u*u*u*P[0][0] + 3*u*u*t*P[1][0] + 3*u*t*t*P[2][0] + t*t*t*P[3][0];
  const y = u*u*u*P[0][1] + 3*u*u*t*P[1][1] + 3*u*t*t*P[2][1] + t*t*t*P[3][1];
  const dx = 3*u*u*(P[1][0]-P[0][0]) + 6*u*t*(P[2][0]-P[1][0]) + 3*t*t*(P[3][0]-P[2][0]);
  const dy = 3*u*u*(P[1][1]-P[0][1]) + 6*u*t*(P[2][1]-P[1][1]) + 3*t*t*(P[3][1]-P[2][1]);
  return { x, y, a: Math.atan2(dy, dx) * 180 / Math.PI };
}

export function cornerSprig(fill, core) {
  // 枠の角に沿って流れる蔓（左辺 → 角 → 上辺）
  const P = [[4, 150], [4, 44], [44, 4], [150, 4]];
  const d = `M${P[0][0]},${P[0][1]} C${P[1][0]},${P[1][1]} ${P[2][0]},${P[2][1]} ${P[3][0]},${P[3][1]}`;
  let g = vine(d, fill, 6.5);
  // 蔓に交互に葉を付ける
  const stops = [0.1, 0.26, 0.42, 0.58, 0.74, 0.9];
  stops.forEach((t, i) => {
    const b = bez(P, t);
    const side = i % 2 ? 1 : -1;
    const size = 0.85 + 0.18 * Math.sin(t * Math.PI);
    g += leaf(b.x, b.y, b.a + side * 52, size, fill);
    if (i % 2 === 0) g += leaf(b.x, b.y, b.a + side * 10, size * 0.66, fill);
  });
  // 花：蔓の両端と角の内側
  const c = bez(P, 0.5);
  g += flower(P[0][0] + 6, P[0][1] + 22, 0.85, fill, core);
  g += flower(P[3][0] + 22, P[3][1] + 6, 0.85, fill, core);
  g += flower(c.x + 30, c.y + 30, 0.8, fill, core);
  return g;
}

// ---- スクリプト体「Anna」（手描きベクター・モノライン） --------------
// 座標系: 0..400 x 0..200 / ベースライン145 / x-height上端90 / キャップ上端24
export function annaWordmark(stroke, w = 13) {
  const A = `
    <path d="M20,150 C36,112 62,60 92,22" />
    <path d="M92,22 C100,64 112,112 128,150" />
    <path d="M48,120 C74,107 104,107 126,118" />
  `;
  // 筆記体の n（立ち上がり → 肩のアーチ → 下ろし → 次への渡り）
  const n = (x) => `
    <path d="M${x},150
             C${x + 2},124 ${x + 5},101 ${x + 13},93
             C${x + 22},84 ${x + 33},89 ${x + 34},105
             C${x + 35},121 ${x + 36},138 ${x + 39},149
             C${x + 42},157 ${x + 49},156 ${x + 55},148" />
  `;
  // 筆記体の a（ボウル → 軸 → 終筆のはらい）
  const a = (x) => `
    <path d="M${x + 36},101
             C${x + 30},87 ${x + 11},84 ${x + 4},101
             C${x - 3},119 ${x + 6},136 ${x + 19},132
             C${x + 30},128 ${x + 35},113 ${x + 37},97" />
    <path d="M${x + 37},97
             C${x + 34},118 ${x + 34},137 ${x + 38},146
             C${x + 43},157 ${x + 56},155 ${x + 68},140" />
  `;
  return `<g fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">
    ${A}${n(136)}${n(190)}${a(246)}
  </g>`;
}

// ---- 「P R O」（モノライン・幾何ベクター） ---------------------------
export function proMark(stroke, w = 9) {
  const P = `<path d="M0,0 L0,54 M0,0 L14,0 C26,0 26,24 14,24 L0,24"/>`;
  const R = `<path d="M0,0 L0,54 M0,0 L14,0 C26,0 26,23 14,23 L0,23 M13,23 L27,54"/>`;
  const O = `<path d="M14,0 C25,0 30,12 30,27 C30,42 25,54 14,54 C3,54 -2,42 -2,27 C-2,12 3,0 14,0 Z"/>`;
  return `<g fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">
    <g transform="translate(0,0)">${P}</g>
    <g transform="translate(46,0)">${R}</g>
    <g transform="translate(98,0)">${O}</g>
  </g>`;
}
