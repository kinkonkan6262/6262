import fs from "fs";
// Windows ショートカット用 .ico（PNG 埋め込み形式：Vista 以降で利用可）
const sizes = [16, 32, 48, 64, 128, 256];
const imgs = sizes.map((s) => ({ s, buf: fs.readFileSync(`png/anna-${s}.png`) }));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(imgs.length, 4);
const dir = Buffer.alloc(16 * imgs.length);
let offset = 6 + 16 * imgs.length;
imgs.forEach((im, i) => {
  const o = i * 16;
  dir[o] = im.s >= 256 ? 0 : im.s;
  dir[o + 1] = im.s >= 256 ? 0 : im.s;
  dir[o + 2] = 0; dir[o + 3] = 0;
  dir.writeUInt16LE(1, o + 4); dir.writeUInt16LE(32, o + 6);
  dir.writeUInt32LE(im.buf.length, o + 8); dir.writeUInt32LE(offset, o + 12);
  offset += im.buf.length;
});
fs.writeFileSync("anna.ico", Buffer.concat([header, dir, ...imgs.map((i) => i.buf)]));
console.log("anna.ico", fs.statSync("anna.ico").size, "bytes");
