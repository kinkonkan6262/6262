import opentype from "opentype.js";
import fs from "fs";

// フォントの字形をそのままベクターパス化する（配布物はフォント非依存になる）
export function textPath(fontFile, text, size, letterSpacing = 0) {
  const f = opentype.parse(fs.readFileSync(fontFile).buffer);
  const scale = size / f.unitsPerEm;
  let x = 0, prev = null, d = "";
  const bb = { x1: Infinity, y1: Infinity, x2: -Infinity, y2: -Infinity };
  for (const ch of text) {
    const g = f.charToGlyph(ch);
    if (prev) {
      let k = 0;
      try { k = f.getKerningValue(prev, g); } catch (e) { k = 0; }
      if (isFinite(k)) x = Math.round((x + k * scale) * 1000) / 1000;
    }
    const p = g.getPath(x, 0, size);
    d += p.toPathData(2) + " ";
    const b = p.getBoundingBox();
    if (isFinite(b.x1)) {
      bb.x1 = Math.min(bb.x1, b.x1); bb.y1 = Math.min(bb.y1, b.y1);
      bb.x2 = Math.max(bb.x2, b.x2); bb.y2 = Math.max(bb.y2, b.y2);
    }
    // 端数の浮動小数点誤差が opentype.js のパス出力を壊すため丸める
    x = Math.round((x + g.advanceWidth * scale + letterSpacing) * 1000) / 1000;
    prev = g;
  }
  return { d: d.trim(), bbox: bb, advance: x };
}
